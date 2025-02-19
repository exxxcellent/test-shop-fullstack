import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { UserModule } from 'src/user/user.module';
import { PaymentController } from './payment.controller';
import { TokenModule } from 'src/token/token.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [UserModule, TokenModule, PrismaModule],
    providers: [PaymentService],
    exports: [PaymentService],
    controllers: [PaymentController],
})
export class PaymentModule {}
