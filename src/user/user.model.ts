import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";


interface UserCreationAttrs {
    email: string,
    password: string
}

@Table(
    {
        tableName: 'user'
    }
)
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: 1, description: 'Номер таблицы'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'username@mail.com', description: 'Email users'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'qwerRWWQ1234', description: 'Password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;


    @ApiProperty({example: 'sefes-fesfse-fesfesf-esfe', description: 'Уникальный токен'})
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    token: string;

    @ApiProperty({example: 'sefes-fesfse-fesfesf-esfe', description: 'Уникальный токен для обновление сессии'})
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    refresh_token: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    active: boolean;

    @ApiProperty({example: 'awdawdawdawde', description: 'Уникальная строка для верификации почты'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    activedLink: string

}