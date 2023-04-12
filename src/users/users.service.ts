import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
    constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
    ) {}

    async create(createUserDto: CreateUserDto) {
        const cUser = await this.findOneByLogin(createUserDto.login);
        if (cUser) throw new HttpException('User already exists with same login.', HttpStatus.CONFLICT);

        const newUser = new User();
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(createUserDto.password, salt);

        newUser.login = createUserDto.login;
        newUser.password = hashPassword;
        return this.usersRepository.save(newUser);
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.findOneById(id);
        const dUser = await this.findOneByLogin(updateUserDto.login); // Used to check for duplicates
        if (!user || (dUser && id != dUser.id)) throw new UnauthorizedException();
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(updateUserDto.password, salt);

        user.login = updateUserDto.login;
        user.password = hashPassword;
        this.usersRepository.save(user);
        return {
            "statusCode": "200",
            "message": "User updated successfully."
        };
    }

    findOneByLogin(login: string): Promise<User> {
        const cUser = this.usersRepository.findOneBy({ login: login });
        return cUser;
    }

    findOneById(id: number) {
        const cUser = this.usersRepository.findOneBy({ id: id });
        return cUser;
    }
}
