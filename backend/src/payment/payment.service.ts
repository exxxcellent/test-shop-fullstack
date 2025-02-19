import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Balance, BalanceStatus, PaymentMethod, User } from '@prisma/client';
import { EntityError } from '@shared/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PaymentService {
    constructor(
        private readonly userService: UserService,
        private readonly prismaService: PrismaService,
    ) {}

    private checkBalance(balance: number, price: number): boolean {
        if (balance < price) return false;
        return true;
    }

    private async pay(
        userId: string,
        balance: number,
        price: number,
    ): Promise<User> {
        return await this.userService.updateOneById(userId, {
            balance: balance - price,
        });
    }

    private async getOneById(id: string) {
        const balance = await this.prismaService.balance.findFirst({
            where: {
                id,
            },
        });
        if (!balance) throw new NotFoundException(EntityError.NOT_FOUND);
        return balance;
    }

    public async buyItem(
        userId: string,
        balance: number,
        price: number,
    ): Promise<boolean> {
        const balanceIsPayable = this.checkBalance(balance, price);
        if (!balanceIsPayable) return false;
        await this.pay(userId, balance, price);
        return true;
    }

    public async create(
        userId: string,
        sum: number,
        status: BalanceStatus,
        paymentMethod: PaymentMethod,
    ): Promise<{
        user: User;
        payment: Balance;
    }> {
        const user = await this.userService.getOneById(userId);
        const payment = await this.prismaService.balance.create({
            data: {
                userId,
                sum,
                status,
                paymentMethod,
            },
        });
        return {
            user,
            payment,
        };
    }

    public async fill(
        userId: string,
        sum: number,
        paymentMethod: PaymentMethod,
    ): Promise<{
        user: User;
        payment: Balance;
    }> {
        const user = await this.userService.getOneById(userId);
        const payment = await this.prismaService.balance.create({
            data: {
                userId,
                sum,
                status: BalanceStatus.REFILL,
                paymentMethod,
            },
        });
        const updatedUser = await this.userService.updateOneById(userId, {
            balance: user.balance + sum,
        });
        return {
            user: updatedUser,
            payment,
        };
    }

    public async getManyByUserId(userId: string) {
        await this.userService.getOneById(userId);
        return await this.prismaService.balance.findMany({
            where: {
                userId,
            },
        });
    }

    public async returnMoney(userId: string, sum: number) {
        const user = await this.userService.getOneById(userId);
        await this.userService.updateOneById(userId, {
            balance: user.balance + sum,
        });
        await this.create(
            userId,
            sum,
            BalanceStatus.RETURN,
            PaymentMethod.OTHER,
        );
    }
}
