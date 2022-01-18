import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

// service
import { AuthService } from './auth.service';

// dto
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';

// entity
import { User } from '../users/entity/user.entity';

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
      .send(user);
  }

  // @UseGuards(AuthGuard('google'))
  // @Get('/google')
  // @HttpCode(HttpStatus.SEE_OTHER)
  // async googleAuth(@Req() req: Request): Promise<void> {}
  //
  // @Get('/google/redirect')
  // @UseGuards(AuthGuard('google'))
  // async googleAuthRedirect(
  //   @Req() req: Request,
  //   @Res() res: Response
  // ): Promise<any> {
  //   await this.authService.socialLogin(req);
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   return res.redirect(`http://localhost:3000/`);
  // }
}
