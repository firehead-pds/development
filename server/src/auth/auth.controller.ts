import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import LoginDto from './dtos/login.dto';
import { AuthService } from './auth.service';
import { FastifyReply } from 'fastify';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

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
    const accessToken = await this.authService.login(body.email, body.password);

    response.setCookie('access-token', accessToken, {
      httpOnly: true,
    });

    console.log('got here');
    return { message: 'successfully logged in' };
  }
}
