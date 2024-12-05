import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private userRepository: Repository<User>
      ){}
    
      async register(data: {username: string; email: string, password: string}){
        const hashedPassword = await bcrypt.hash(data.password, 10)
        const user = this.userRepository.create({...data, password: hashedPassword})
        return this.userRepository.save(user)
      }

      async login(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, username: user.username };
        return { accessToken: this.jwtService.sign(payload) };
      }
}
