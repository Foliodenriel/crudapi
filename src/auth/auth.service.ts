import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async login(user: any) {
        const cUser = await this.usersService.findOneById(user.id);
        const cmpPass = await bcrypt.compare(user.password, cUser.password);
        if (!user || !cmpPass || !cUser.isActive)
            throw new UnauthorizedException();
        const payload = { login: cUser.login, sub: cUser.id };
        return {
            access_token: this.jwtService.sign(payload, { secret: this.configService.get<string>('JWT_SECRET'), expiresIn: '300s' })
        }
    }
}
