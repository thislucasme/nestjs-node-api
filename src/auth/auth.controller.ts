import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('register')
    register(@Body() data: { username: string; email: string; password: string }) {
      return this.authService.register(data);
    }

    @Post('login')
    login(@Body() data: { email: string; password: string }) {
      return this.authService.login(data.email, data.password);
    }

    @Post('me')
    @UseGuards(JwtAuthGuard)
    me(@Req() req) {
      return req.user;
    }
}
