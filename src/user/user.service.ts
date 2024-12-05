import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>
  ){}

  async register(data: {username: string; email: string, password: string}){
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = this.userRepository.create({...data, password: hashedPassword})
    return this.userRepository.save(user)
  }
}
