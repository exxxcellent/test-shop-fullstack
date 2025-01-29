import { IsEmail, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsNumber()
    balance?: number;
}
