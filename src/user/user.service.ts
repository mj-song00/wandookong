import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService, // private authService: AuthService,
  ) {}
  async signUp(createUserDto: CreateUserDto) {
    const { email, password, nickname } = createUserDto;
    const isExist = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (isExist) throw new BadRequestException(`It's existing email`);

    const PASSWORD_SALT = parseInt(process.env.PASSWORD_SALT);
    const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT);
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        nickname,
      },
    });
    delete user.password;

    return { result: user, message: 'user create success' };
  }
}
