import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { UserModule } from 'src/user/user.module';
import { ItemModule } from 'src/item/item.module';
import { PaymentController } from './payment.controller';
import { TokenModule } from 'src/token/token.module';

@Module({
    imports: [UserModule, ItemModule, TokenModule],
    providers: [PaymentService],
    exports: [PaymentService],
    controllers: [PaymentController],
})
export class PaymentModule {}
