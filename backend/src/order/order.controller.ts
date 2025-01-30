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
        return await this.orderService.getManyOrdersByUserId(userId);
    }

    @Get('/:id')
    public async getOneOrderById(@Param('id') id: string): Promise<Order> {
        return await this.orderService.getOneOrderById(id);
    }

    @Post('')
    public async create(
        @Body() { userId, itemId, deliveryType, status }: CreateOrderDto,
    ): Promise<Order> {
        return await this.orderService.create(
            userId,
            itemId,
            deliveryType,
            status,
        );
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
