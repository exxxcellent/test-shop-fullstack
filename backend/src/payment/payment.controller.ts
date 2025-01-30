import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from '@shared/guards';
import { User } from '@prisma/client';

@Controller('payment')
@UseGuards(AuthGuard)
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post('/:userId')
    public async fillBalance(
        @Param('userId') userId: string,
        @Body('sum') sum: number,
    ): Promise<User> {
        return await this.paymentService.fillBalance(userId, sum);
    }
}
