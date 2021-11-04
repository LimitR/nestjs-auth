import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res} from '@nestjs/common';
import { IUserDataLoginDto } from './dto/userData-login.dto'
import {AuthService} from "./auth.service";
import {ApiResponse, ApiTags} from "@nestjs/swagger";

const Days30 = 30 * 24 * 60 * 60 * 1000;
@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authServer: AuthService) {
    }


    @HttpCode(200)
    @ApiResponse({status: 200, type: IUserDataLoginDto})
    @Post('/registration')
    registration(@Body() userData: IUserDataLoginDto){
        return this.authServer.registration(userData)
    }

    @ApiResponse({status: 200})
    @Post('/login')
    async login(@Body() userData: IUserDataLoginDto, @Res({ passthrough: true }) token){
        const res = this.authServer.login(userData)
        token.cookie('token', await res, {maxAge: Days30, httpOnly: true})
        return res
    }


    @Get('/refresh')
    async refresh(@Req() token){
       return await this.authServer.validateToken(token.cookies.token)
    }
}

