import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() userDto: LoginDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto) {
    return { token: await this.authService.registration(userDto) };
  }
}
