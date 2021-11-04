import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[
    SequelizeModule.forFeature([User]),
    forwardRef(()=> AuthModule)
  ],
    exports: [
    UserService
  ]

})
export class UserModule {}
