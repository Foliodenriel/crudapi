import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

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

    async login(createUserDto: CreateUserDto) {}

    findOneByLogin(login: string): Promise<User> {
        const cUser = this.usersRepository.findOneBy({ login });
        return cUser;
    }

    findOneById(id: number) {
        const cUser = this.usersRepository.findOneBy({ id });
        return cUser;
    }

// findAll() {
//   return `This action returns all users`;
// }

// update(id: number, updateUserDto: UpdateUserDto) {
//   return `This action updates a #${id} user`;
// }

// remove(id: number) {
//   return `This action removes a #${id} user`;
// }
}
