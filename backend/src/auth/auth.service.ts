import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { LoginDto } from './dto/login.dto.js';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const existing = await this.usersService.findActiveByLoginId(dto.id);
    if (existing) {
      throw new ConflictException('이미 사용 중인 아이디입니다.');
    }

    const hashed = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const user = await this.usersService.create({
      id: dto.id,
      password: hashed,
      nickname: dto.nickname,
    });

    return this.buildAuthResponse(user.no, user.id, user.nickname);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findActiveByLoginId(dto.id);
    if (!user) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 올바르지 않습니다.');
    }

    const matches = await bcrypt.compare(dto.password, user.password);
    if (!matches) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 올바르지 않습니다.');
    }

    return this.buildAuthResponse(user.no, user.id, user.nickname);
  }

  private buildAuthResponse(no: number, id: string, nickname?: string) {
    const accessToken = this.jwtService.sign({ sub: no, id });
    return {
      accessToken,
      user: { no, id, nickname },
    };
  }
}
