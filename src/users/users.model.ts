import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
  email: string
  password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({example: '1', description: 'Unique identificator'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'dog@monkey.com', description: 'Email of user'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({example: 'fff3sf', description: 'Password of user'})
  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @ApiProperty({example: 'false', description: 'Shows whether user was banned or not', default: false})
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  banned: boolean;
  
  @ApiProperty({example: 'Rude speech', description: 'Shows the reason why user was banned'})
  @Column({type: DataType.STRING, allowNull: true})
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Post)
  posts: Post[]; 
}