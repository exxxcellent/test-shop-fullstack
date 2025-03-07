import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    parentId?: string | null;

    @IsOptional()
    @IsNumber()
    popularity?: number;
}
