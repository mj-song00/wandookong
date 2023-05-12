import { SginInDto } from './../user/dto/create-user.dto';
import { AuthGuard } from './jwt/auth.guard';
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body() sginInDto: SginInDto) {
    return this.authService.signIn(sginInDto);
  }
}
