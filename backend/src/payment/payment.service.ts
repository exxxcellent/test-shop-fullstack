import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthError, EntityError, OrderError } from '@shared/enums';
import { ItemService } from 'src/item/item.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PaymentService {
    constructor(
        private readonly userService: UserService,
        private readonly itemService: ItemService,
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
        const updatedUserBalance = await this.userService.updateOneById(
            userId,
            {
                balance: balance - price,
            },
        );
        if (!updatedUserBalance)
            throw new BadRequestException(EntityError.NOT_UPDATED);
        return updatedUserBalance;
    }

    public async buyItem(
        userId: string,
        balance: number,
        price: number,
    ): Promise<User> {
        const balanceIsPayable = this.checkBalance(balance, price);
        if (!balanceIsPayable)
            throw new BadRequestException(OrderError.BALANCE_IS_LOW);
        const updatedUser = await this.pay(userId, balance, price);
        return updatedUser;
    }

    public async fillBalance(userId: string, sum: number): Promise<User> {
        const user = await this.userService.getOneById(userId);
        if (!user) throw new UnauthorizedException(AuthError.AUTH_REQUIRED);
        const updatedUser = await this.userService.updateOneById(userId, {
            balance: user.balance + sum,
        });
        return updatedUser;
    }
}
