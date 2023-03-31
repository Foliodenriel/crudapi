import { Controller, UseGuards, Body, Get } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {

    @Get()
    getDocumentation() {
        return 'For more information: https://github.com/Foliodenriel/crudapi/blob/main/README.md';
    }

    @UseGuards(JwtAuthGuard)
    @Get('product')
    getProduct(@Body() req) {

        const off = require('openfoodfacts-nodejs'); // Couldn't manage to import it in any way
        const cli = new off();
        const result = cli.getProduct(req.product);
        return result;
    }
}