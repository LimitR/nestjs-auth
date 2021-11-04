import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    forwardRef(()=> UserModule) ,
    JwtModule.register({
      secret: process.env.PRIVAT_KEY || 'SECRET',
      signOptions: {
        expiresIn: '30d'
      }
    })],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
