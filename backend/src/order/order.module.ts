import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TokenModule } from 'src/token/token.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ItemModule } from 'src/item/item.module';
import { UserModule } from 'src/user/user.module';
import { CategoryModule } from 'src/category/category.module';
import { MailModule } from 'src/mail/mail.module';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
    imports: [
        TokenModule,
        PrismaModule,
        ItemModule,
        UserModule,
        PaymentModule,
        CategoryModule,
        MailModule,
    ],
    providers: [OrderService],
    controllers: [OrderController],
})
export class OrderModule {}
