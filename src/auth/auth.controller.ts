import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('generateToken')
    async generateToken(@Body() req) {
        if (!req.hasOwnProperty('username') || !req.hasOwnProperty('password'))
            throw new HttpException('Invalid or missing field.', HttpStatus.BAD_REQUEST);
        return this.authService.login(req);
    }
}
