import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string | null;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    amount: number;

    @IsString()
    categoryId: string;

    @IsOptional()
    @IsString()
    imageUrl: string | null;
}
