import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateItemDto {
    @IsString()
    title: string;

    @IsString()
    categoryId: string;

    @Transform(({ value }) => +value)
    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    description: string | null;

    @Transform(({ value }) => +value)
    @IsOptional()
    @IsNumber()
    amount: number;
}
