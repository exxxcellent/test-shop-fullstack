import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { LoggerMiddleware } from '@shared/middlewares';
import { JwtModule } from '@nestjs/jwt';
import { ItemModule } from './item/item.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { FilesService } from './files/files.service';

@Module({
    imports: [
        PrismaModule,
        UserModule,
        TokenModule,
        AuthModule,
        MailModule,
        JwtModule,
        ItemModule,
        CategoryModule,
        OrderModule,
        PaymentModule,
    ],
    controllers: [AppController],
    providers: [AppService, FilesService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
