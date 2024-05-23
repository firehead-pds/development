import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import LoginDto from './dtos/login.dto';
import { AuthService } from './auth.service';
import { FastifyReply } from 'fastify';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../entities/users/user.entity';
import RefreshTokenGuard from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const { accessToken, refreshToken } = await this.authService.signInLocal(
      body.email,
      body.password,
    );

    response.setCookie('accessToken', accessToken, {
      httpOnly: true,
      // 15 minutes in seconds
      maxAge: 60 * 15,
    });

    response.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      // 7 days in seconds
      maxAge: 60 * 60 * 24 * 7,
    });

    return { message: 'successfully logged in' };
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refresh(@CurrentUser() user: User) {
    return await this.authService.refreshTokens(user, user.tokenId);
  }
}
