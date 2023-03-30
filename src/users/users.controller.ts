import { Logger, Request, Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Session } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    /**
     * 
     * @param createUserDto Needed field for user creation
     * @returns Save result
     */
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    update(@Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(updateUserDto);
    }
}
