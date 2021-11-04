import {IsString, Length, IsEmail, IsPassportNumber, IsNumberString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class IUserDataLoginDto {
    @ApiProperty({example: 'test@test.ru', description: 'Email-адрес'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string;

    @ApiProperty({example: 'qwer1234', description: 'Password'})
    @IsString({message: 'Должно быть строкой'})
    @Length(8, 18, {message: 'Должно быть строкой от 8 до 18 символов'})
    readonly password: string;
}