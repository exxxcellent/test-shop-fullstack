import {
    IsBoolean,
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsBoolean()
    isLogin?: boolean;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsNumber()
    balance?: number;

    @IsOptional()
    @IsString()
    loginLink?: string;
}
