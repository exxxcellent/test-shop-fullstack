import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { DeliveryType, Order, OrderStatus } from '@prisma/client';
import { AuthError, EntityError } from '@shared/enums';
import { OrderError } from '@shared/enums/order-error.enum';
import { CategoryService } from 'src/category/category.service';
import { ItemService } from 'src/item/item.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { UpdateOrderDto } from './dto/update.dto';
import { MailService } from 'src/mail/mail.service';
import { PaymentService } from 'src/payment/payment.service';

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

    public async getOneOrderById(id: string): Promise<Order> {
        const order = await this.prismaService.order.findUnique({
            where: {
                id,
            },
        });
        if (!order) throw new BadRequestException(EntityError.NOT_FOUND);
        return order;
    }

    public async getManyOrdersByUserId(userId: string): Promise<Order[]> {
        const user = await this.userService.getOneById(userId);
        if (!user) throw new UnauthorizedException(EntityError.NOT_FOUND);
        const orders = await this.prismaService.order.findMany({
            where: {
                userId,
            },
        });
        if (!orders.length) throw new NotFoundException(EntityError.NOT_FOUND);
        return orders;
    }

    public async create(
        userId: string,
        itemId: string,
        deliveryType?: DeliveryType,
        status?: OrderStatus,
    ): Promise<Order> {
        const user = await this.userService.getOneById(userId);
        if (!user) throw new UnauthorizedException(AuthError.AUTH_REQUIRED);
        const item = await this.itemService.getOneById(itemId);
        if (!item) throw new NotFoundException(EntityError.NOT_FOUND);
        if (item.amount == 0)
            throw new BadRequestException(OrderError.AMOUNT_IS_NULL);
        const isPaid = await this.paymentService.buyItem(
            user.id,
            user.balance,
            item.price,
        );
        if (!isPaid) throw new BadRequestException(OrderError.NOT_PAID);
        await this.itemService.updateOneById(item.id, {
            amount: item.amount - 1,
        });
        const category = await this.categoryService.getOneById(item.categoryId);
        if (!category) throw new BadRequestException(EntityError.NOT_FOUND);
        await this.categoryService.updateOneById(category.id, {
            popularity: category.popularity + 1,
        });
        await this.mailService.sendMailOrderCreated(user.email, itemId);
        return await this.prismaService.order.create({
            data: {
                userId,
                itemId,
                deliveryType,
                status,
            },
        });
    }

    public async updateOneById(
        id: string,
        body: UpdateOrderDto,
    ): Promise<Order> {
        const order = await this.prismaService.order.findUnique({
            where: {
                id,
            },
        });
        if (!order) throw new BadRequestException(EntityError.NOT_FOUND);
        const user = await this.userService.getOneById(order.userId);
        if (!user) throw new UnauthorizedException(AuthError.AUTH_REQUIRED);
        const updatedOrder = await this.prismaService.order.update({
            where: {
                id,
            },
            data: {
                ...body,
            },
        });
        await this.mailService.sendMailOrderUpdateStatus(
            user.email,
            order.itemId,
            body.status,
        );
        return updatedOrder;
    }
}
