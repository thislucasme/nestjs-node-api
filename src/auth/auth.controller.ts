import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiBody({
      description: "Informações do usuário",
      examples: {
        "application/json":{
          value: {
            username: "Lucas",
            email: "lucas@email.com",
            password: "password"
          }
        }
      }
    })
    @Post('register')
    register(@Body() data: { username: string; email: string; password: string }) {
      return this.authService.register(data);
    }

    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 201, description: 'User logged successfully' })
    @ApiResponse({ status: 401, description: 'Not authorized' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiBody({
      description: "Informações do usuário",
      examples: {
        "application/json":{
          value: {
            email: "lucas@email.com",
            password: "password"
          }
        }
      }
    })
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
