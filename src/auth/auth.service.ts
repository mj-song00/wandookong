import { SginInDto } from './../user/dto/create-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async signIn(sginInDto: SginInDto) {
    const { email, password } = sginInDto;
    const user = await this.prismaService.user.findUnique({ where: { email } });

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!email || !validatePassword) throw new BadRequestException();

    const payload = { username: user.nickname, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
