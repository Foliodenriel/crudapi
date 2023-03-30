import { Controller, UseGuards, Body, Get } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {

    @UseGuards(JwtAuthGuard)
    @Get('product')
    getProduct(@Body() req) {

        const off = require('openfoodfacts-nodejs'); // Couldn't manage to import it in any way
        const cli = new off();
        const result = cli.getProduct(req.product);
        return result;
    }
}