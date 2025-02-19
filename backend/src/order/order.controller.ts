import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@shared/guards';
import { CreateOrderDto } from './dto/create.dto';
import { Order } from '@prisma/client';
import { UpdateOrderDto } from './dto/update.dto';

@Controller('order')
@UseGuards(AuthGuard)
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get('')
    public async getMany(): Promise<Order[]> {
        return await this.orderService.getMany();
    }

    @Get('/:userId/orders')
    public async getManyOrdersByUserId(
        @Param('userId') userId: string,
    ): Promise<Order[]> {
        return await this.orderService.getManyByUserId(userId);
    }

    @Get('/:id')
    public async getOneOrderById(@Param('id') id: string): Promise<Order> {
        return await this.orderService.getOneById(id);
    }

    @Post('')
    public async create(
        @Body()
        body: CreateOrderDto,
    ): Promise<Order> {
        return await this.orderService.create(body);
    }

    @Post('/:id/pay')
    public async payOrder(@Param('id') id: string): Promise<Order | null> {
        return await this.orderService.payOrder(id);
    }

    @Put('/:id')
    public async updateOneById(
        @Param('id') id: string,
        @Body() body: UpdateOrderDto,
    ) {
        return await this.orderService.updateOneById(id, body);
    }

    @Delete('/:id')
    public async deleteOneById(@Param('id') id: string) {
        return await this.orderService.deleteOneById(id);
    }
}
