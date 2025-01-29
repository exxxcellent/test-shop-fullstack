import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsNumber()
    popularity: number;
}
