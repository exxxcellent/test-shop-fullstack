import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
