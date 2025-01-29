import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        try {
            console.log('Connecting to db...');
            await this.$connect();
            console.log('Connect is successfully');
        } catch (e) {
            console.log('Connect error! \n', e);
        }
    }
}
