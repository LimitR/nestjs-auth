import {Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {UserService} from "./user.service";

@ApiTags('Пользователь')
@Controller('user')
export class UserController {

    constructor(private usersService: UserService){}

    @HttpCode(200)
    @ApiOperation({summary: 'Это нельзя в прод'})
    @Post('/check-token')
    async check_token(@Body() token){
      return await this.usersService.check_token(token.token)
    }

    @ApiOperation({summary: 'Активировать аккаунт пользователя'})
    @Get('/active/:link')
    actived(@Param('link') link){
        this.usersService.actived(link)
    }
}
