import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';

// service
import { AuthService } from './auth.service';

// dto
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';

// entity
import { User } from '../users/entity/user.entity';
import { AuthGuard } from '@nestjs/passport';

// TODO: after testing remove token from body
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(
    @Body() signUpDto: SignUpDto
  ): Promise<{ user: User; token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res() response: Response
  ): Promise<void> {
    const { user, token } = await this.authService.login(loginDto);

    response
      .cookie('accessToken', token, {
        httpOnly: true,
        domain: 'localhost',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
      })
      .send({ user, token });
  }

  @UseGuards(AuthGuard('google'))
  @Get('/google')
  @HttpCode(HttpStatus.SEE_OTHER)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(@Req() req: Request): Promise<void> {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const userData = await this.authService.socialLogin(req);
    await res.redirect(
      `${process.env.FRONT_END_URL}/auth/success?token=${userData.token}`
    );
  }

  // !* this endpoint only for testing flow
  @Get('/success')
  async success(@Query() query: any): Promise<any> {
    return { accessToken: query.token };
  }

  // !* this endpoint only for certbot SSL verification
  @Get('/.well-known/acme-challenge/inJyQ1Xgr93V_QGgvIaJjmyE-AzAOF0ffP_8SDBuj8g')
  async certbotAcmeChallenge(@Query() query: any): Promise<any> {
    return 'inJyQ1Xgr93V_QGgvIaJjmyE-AzAOF0ffP_8SDBuj8g.s2B09Sc4-eE5gL3NHeyWuY5ogmUczTv5sfuVWxI2t1A';
  }
}
