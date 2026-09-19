import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { User } from './user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findActiveByLoginId(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id, dDate: IsNull() } });
  }

  findActiveByNo(no: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { no, dDate: IsNull() } });
  }

  async create(data: {
    id: string;
    password: string;
    nickname?: string;
  }): Promise<User> {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  async softDelete(no: number): Promise<void> {
    await this.usersRepository.update(no, {
      dDate: new Date().toISOString().slice(0, 10),
      dTime: new Date().toISOString().slice(11, 19),
    });
  }
}
