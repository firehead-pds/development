import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import LoginDto from './dtos/login.dto';
import { AuthService } from './auth.service';
import { FastifyReply } from 'fastify';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from './decorators/current-user.decorator';
import RefreshTokenGuard from './guards/refresh-token.guard';
import { RequestUser } from './types/request-user.type';
import { Public } from './decorators/is-public.decorator';
import { UsersService } from '../entities/users/users.service';
import { SignupDto } from './dtos/signup.dto';
import { plainToInstance } from 'class-transformer';
import LoginResponseDto from './dtos/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Public()
  @ApiCreatedResponse({ description: 'User created successfully' })
  @ApiConflictResponse({
    description:
      'Conflict! This could be due to existing cpf or email conflict.',
  })
  @ApiBadRequestResponse({ description: 'cpf is invalid' })
  @Post('local/signup')
  public async create(@Body() body: SignupDto) {
    return this.userService.create(body);
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @Post('local/login')
  @Public()
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const { user, tokens } = await this.authService.signInLocal(
      body.email,
      body.password,
    );

    this.authService.setTokenCookies(
      res,
      tokens.accessToken,
      tokens.refreshToken,
    );

    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      wingsInfo: user.wingMemberships,
    };

    return plainToInstance(LoginResponseDto, userData);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refresh(
    @CurrentUser() user: RequestUser,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    try {
      const { accessToken, refreshToken } =
        await this.authService.refreshTokens(user, user.tokenId);
      this.authService.setTokenCookies(res, accessToken, refreshToken);
    } catch (e) {
      this.authService.clearTokenCookies(res);
      throw e;
    }

    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      wingsInfo: user.wingMemberships,
    };

    return plainToInstance(LoginResponseDto, userData);
  }

  @UseGuards(RefreshTokenGuard)
  @Delete('local/logout')
  async logout(
    @CurrentUser() user: RequestUser,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    await this.authService.deleteRefreshToken(user.tokenId);
    this.authService.clearTokenCookies(res);
    return { message: 'successfully logged out' };
  }
}
