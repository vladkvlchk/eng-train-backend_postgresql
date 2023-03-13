import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/user.model";
import { LoginDto } from "./dto/login-dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: LoginDto) {
    const user = await this.validateUser(userDto);
    const token = await this.generateToken(user);
    return {token}
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        "A user with this email already exists",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { 
        email: user.email, 
        id: user.id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        roles: user.roles.map(role => role.value) 
    };
    return this.jwtService.sign(payload);
  }

  private async validateUser(userDto: CreateUserDto | LoginDto) {
    try{
        const user = await this.userService.getUserByEmail(userDto.email);
        if (!user){
            throw new UnauthorizedException({message: 'Email or password is incorrect...'})
        }
        const passwordEquals = await bcrypt.compare(
            userDto.password,
            user.password
            );
        if(user && passwordEquals){
            return user
        }
        throw new UnauthorizedException({message: 'Email or password is incorrect'})
    } catch (e){
        throw new UnauthorizedException({message: `Error: ${e.message}`})
    }
  }
}