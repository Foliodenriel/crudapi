import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {}

    @Post('auth/login')
    async login(@Body() req) {
        return this.authService.login(req);
    }

    @UseGuards(JwtAuthGuard)
    @Get('product')
    getProduct(@Body() req) {

        const off = require('openfoodfacts-nodejs');
        const cli = new off();
        const result = cli.getProduct('5000112546415');
        return result;
    }
}