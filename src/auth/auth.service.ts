import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService, private configService: ConfigService) {}

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

    async login(user: any) {
        const payload = { login: user.login, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload, { secret: this.configService.get<string>('JWT_SECRET'), expiresIn: '60s' })
        }
    }
}
