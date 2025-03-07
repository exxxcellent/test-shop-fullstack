import {
    IsBoolean,
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsBoolean()
    isLogin?: boolean;

    @IsOptional()
    @IsNumber()
    balance?: number;

    @IsOptional()
    @IsString()
    loginLink?: string | null;

    @IsOptional()
    @IsBoolean()
    isActivated?: boolean;
}
