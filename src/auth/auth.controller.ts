import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('generateToken')
    async generateToken(@Body() req) {
        return this.authService.login(req);
    }
}
