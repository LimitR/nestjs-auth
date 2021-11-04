import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {IUserDataLoginDto} from "./dto/userData-login.dto";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import * as nodemailer from 'nodemailer';
import {User} from "../user/user.model";
import {AuthMailerHtml} from "./mailer/auth-mailer-html";


@Injectable()
export class AuthService {
    constructor(private userService: UserService,
                private jwtService: JwtService,
    ){}

    async login(userData){

        const user = await this.validateUser(userData)
        return user.refresh_token
    }

    async registration(userData: IUserDataLoginDto){
        if(userData.password.split(/\d/).length < 2){
            throw new HttpException('В пароле должны быть числа', HttpStatus.BAD_REQUEST)
        }
        const candidate = await this.userService.getUsersByEmail(userData.email);
        if(candidate){
            throw new HttpException('Пользователь существует', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userData.password, 5);
        const activedLink: string = uuidv4();
        if(process.env.ACTIVE_MAILER == 'true'){
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                }
            })
            const mailer = new AuthMailerHtml()
            await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: userData.email,
                subject: 'Регистрация на сайте',
                text: '',
                html: mailer.generateMail(process.env.API_URL, activedLink)
            })
        }

        const user_val = await this.userService.createUsers({...userData, password: hashPassword, activedLink: activedLink})
        const token = await this.generateToken(user_val)

        user_val.refresh_token = await token.refresh_token
        user_val.token = await token.token
        user_val.save() //

        return JSON.stringify({"token": user_val.refresh_token})

    }

    async generateToken(user: User){
        const payload = {email: user.email, id: user.id};
        return{
            token: this.jwtService.signAsync(payload, {secret: process.env.PRIVAT_KEY_AUTH, expiresIn: '12h'}),
            refresh_token: this.jwtService.signAsync(payload)
        }
    }



    private async validateUser(userDto) {
        const user = await this.userService.getUsersByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals){
            user.token =  await this.generateToken(user).then((res)=>{return res.token})
            user.save()
            return user
        }
        throw new UnauthorizedException({message: 'Некорректный логин или пароль'})
    }

    async  validateToken(token) {
       let res_token =  await this.jwtService.verify(token)
         if(typeof res_token !== "object"){
             throw new HttpException('Сессия истекла', HttpStatus.UNAUTHORIZED)
         }

        return {email: res_token.email, id: res_token.id}
    }


}
