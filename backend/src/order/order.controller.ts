import {
    Body,
    Controller,
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
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @UseGuards(AuthGuard)
    @Get('')
    public async getMany(): Promise<Order[]> {
        return await this.orderService.getMany();
    }

    @UseGuards(AuthGuard)
    @Get('/:userId/orders')
    public async getManyOrdersByUserId(
        @Param('userId') userId: string,
    ): Promise<Order[]> {
        return await this.orderService.getManyOrdersByUserId(userId);
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    public async getOneOrderById(@Param('id') id: string): Promise<Order> {
        return await this.orderService.getOneOrderById(id);
    }

    @UseGuards(AuthGuard)
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

    @UseGuards(AuthGuard)
    @Put('/:id')
    public async updateOneById(
        @Param('id') id: string,
        @Body() body: UpdateOrderDto,
    ) {
        return await this.orderService.updateOneById(id, body);
    }
}
