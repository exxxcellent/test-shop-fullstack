import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from '@shared/guards';
import { Balance, User } from '@prisma/client';
import { CreatePaymentDto } from './dto/create.dto';

@Controller('payment')
// @UseGuards(AuthGuard)
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Get('/:userId')
    public async getBalanceHistoryByUserId(
        @Param('userId') userId: string,
    ): Promise<Balance[]> {
        return await this.paymentService.getManyByUserId(userId);
    }

    @Get('')
    public async getMany(): Promise<Balance[]> {
        return await this.paymentService.getMany();
    }

    @Post('/:userId')
    public async create(
        @Param('userId') userId: string,
        @Body() createPaymentDto: CreatePaymentDto,
    ): Promise<{
        user: User;
        payment: Balance;
    }> {
        return await this.paymentService.fill(
            userId,
            createPaymentDto.sum,
            createPaymentDto.paymentMethod,
        );
    }

    @Put('/:id')
    public async updateBalanceById(@Param('id') id: string) {}
}
