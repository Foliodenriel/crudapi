import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [UsersModule, PassportModule, JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
            return {
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '60s' }
            }
        },
        inject: [ConfigService]
    })],
    providers: [AuthService, LocalStrategy,JwtStrategy, UsersService],
    exports: [AuthService]
})
export class AuthModule {}
