import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(login: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByLogin(login);
        if (!user)
            throw new UnauthorizedException();
        const cmpPass = await bcrypt.compare(pass, user.password);
        if (cmpPass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
