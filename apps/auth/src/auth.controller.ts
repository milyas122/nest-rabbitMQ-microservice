import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './users/decorator/current-user.decorator';
import { UserDocument } from './users/schema/users.schema';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.login(user, res);
    res.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
