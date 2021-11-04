import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./user.model";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User
    ) {}

    async createUsers(dto){
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getUsersByEmail(email: string){
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return user
    }

    async actived(link: string){
        const user = await this.userRepository.findOne({where: {activedLink: link}})
        if(!user){
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
        user.active = true;
        await user.save()
        return user.token
    }

    async check_token(token){
        const user = await this.userRepository.findOne({where: {refresh_token: token}})
        if(!user){
            throw new HttpException('Пользователь не найден', HttpStatus.FORBIDDEN)
        }
    }

}
