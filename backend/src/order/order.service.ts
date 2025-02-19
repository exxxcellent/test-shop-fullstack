import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import {
    BalanceStatus,
    DeliveryType,
    Order,
    OrderStatus,
    PaymentMethod,
} from '@prisma/client';
import { AuthError, EntityError } from '@shared/enums';
import { OrderError } from '@shared/enums/order-error.enum';
import { CategoryService } from 'src/category/category.service';
import { ItemService } from 'src/item/item.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { UpdateOrderDto } from './dto/update.dto';
import { MailService } from 'src/mail/mail.service';
import { PaymentService } from 'src/payment/payment.service';
import { CreateOrderDto } from './dto/create.dto';

@Injectable()
export class OrderService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly itemService: ItemService,
        private readonly paymentService: PaymentService,
        private readonly categoryService: CategoryService,
        private readonly mailService: MailService,
    ) {}

    public async getMany(): Promise<Order[]> {
        return await this.prismaService.order.findMany();
    }

    public async getOneById(id: string): Promise<Order> {
        const order = await this.prismaService.order.findUnique({
            where: {
                id,
            },
        });
        if (!order) throw new NotFoundException(EntityError.NOT_FOUND);
        return order;
    }

    public async getManyByUserId(userId: string): Promise<Order[]> {
        await this.userService.getOneById(userId);
        const orders = await this.prismaService.order.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return orders;
    }

    public async create(body: CreateOrderDto): Promise<Order> {
        const user = await this.userService.getOneById(body.userId);
        const item = await this.itemService.getOneById(body.itemId);
        await this.categoryService.getOneById(item.categoryId);

        if (item.amount == 0) {
            await this.mailService.sendMailErrorItemAmount(
                user.email,
                body.itemId,
            );
            return await this.prismaService.order.create({
                data: {
                    userId: body.userId,
                    itemId: body.itemId,
                    address: body.address,
                    deliveryType: body.deliveryType,
                    status: OrderStatus.CANCELED,
                    sum: item.price,
                },
            });
        }

        await this.itemService.decreaseAmount(item.id);

        const isPaid = await this.paymentService.buyItem(
            user.id,
            user.balance,
            item.price,
        );
        if (!isPaid) {
            await this.mailService.sendMailOrderCreated(
                user.email,
                body.itemId,
            );
            return await this.prismaService.order.create({
                data: {
                    userId: body.userId,
                    itemId: body.itemId,
                    address: body.address,
                    deliveryType: body.deliveryType,
                    status: OrderStatus.CREATED,
                    sum: item.price,
                },
            });
        }

        await this.paymentService.create(
            body.userId,
            item.price,
            BalanceStatus.PAID,
            body.paymentMethod,
        );

        await this.mailService.sendMailOrderUpdateStatus(
            user.email,
            body.itemId,
            OrderStatus.PAID,
        );

        return await this.prismaService.order.create({
            data: {
                userId: body.userId,
                itemId: body.itemId,
                address: body.address,
                deliveryType: body.deliveryType,
                status: OrderStatus.PAID,
                sum: item.price,
            },
        });
    }

    public async payOrder(id: string): Promise<Order | null> {
        const { userId, itemId } = await this.getOneById(id);
        const user = await this.userService.getOneById(userId);
        const item = await this.itemService.getOneById(itemId);

        const isPaid = await this.paymentService.buyItem(
            user.id,
            user.balance,
            item.price,
        );

        if (!isPaid) {
            await this.mailService.sendMailErrorBalance(user.email, itemId);
            return null;
        }

        await this.paymentService.create(
            userId,
            item.price,
            BalanceStatus.PAID,
            PaymentMethod.OTHER,
        );

        const payedOrder = await this.updateOneById(id, {
            status: OrderStatus.PAID,
            message: null,
        });

        await this.mailService.sendMailOrderUpdateStatus(
            user.email,
            itemId,
            OrderStatus.PAID,
        );

        return payedOrder;
    }

    public async updateOneById(
        id: string,
        body: UpdateOrderDto,
    ): Promise<Order> {
        const order = await this.getOneById(id);
        const user = await this.userService.getOneById(order.userId);

        const updatedOrder = await this.prismaService.order.update({
            where: {
                id,
            },
            data: {
                ...body,
            },
        });

        if (body.status === OrderStatus.CANCELED) {
            const item = await this.itemService.getOneById(order.itemId);
            await this.paymentService.returnMoney(user.id, order.sum);
            await this.itemService.increaseAmount(item.id);
        }

        // await this.mailService.sendMailOrderUpdateStatus(
        //     user.email,
        //     order.itemId,
        //     body.status,
        // );
        return updatedOrder;
    }

    public async deleteOneById(id: string) {
        await this.getOneById(id);
        await this.prismaService.order.delete({
            where: {
                id,
            },
        });
    }
}
