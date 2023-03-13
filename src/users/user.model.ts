import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/roles/role.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'unique identifier' })
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'user@mail.com', description: 'Email address'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({example: '12345678', description: 'Password'})
  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @ApiProperty({example: 'Ariana', description: 'First name'})
  @Column({type: DataType.STRING, allowNull: false})
  firstName: string;

  @ApiProperty({example: 'Grande', description: 'Second name'})
  @Column({type: DataType.STRING, allowNull: true})
  lastName: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles : Role[];
}
