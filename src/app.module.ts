import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import { UserModule } from './user/user.module';
import {User} from "./user/user.model";
import {AuthController} from "./auth/auth.controller";
import {AuthService} from "./auth/auth.service";
import {AuthMailerHtml} from "./auth/mailer/auth-mailer-html";


@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: '.env'
      }),
      SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRESS_PORT) || 5000,
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRESS_PASSWORD,
          database: process.env.POSTGRES_DB,
          models: [User],
          autoLoadModels: true
      }),
      AuthModule,
      UserModule,
      AuthMailerHtml

  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
