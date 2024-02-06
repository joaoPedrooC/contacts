import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findByEmail(email)

    if(!user) {
      throw new UnauthorizedException('Invalid e-mail or password')
    }
    
    const isPasswordHashed = compareSync(password, user.password)
    
    if(!isPasswordHashed) {
      throw new UnauthorizedException('Invalid e-mail or password')
    }

    return {
      token: this.jwtService.sign({ email }, { subject: user.id })
    }
  }
}
