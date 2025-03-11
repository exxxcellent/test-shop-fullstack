import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TokenModule } from 'src/token/token.module';
import { CategoryModule } from 'src/category/category.module';
import { FilesService } from 'src/files/files.service';
import { UuidModule } from 'nestjs-uuid';

@Module({
    imports: [PrismaModule, TokenModule, CategoryModule, UuidModule],
    controllers: [ItemController],
    providers: [ItemService, FilesService],
    exports: [ItemService],
})
export class ItemModule {}
