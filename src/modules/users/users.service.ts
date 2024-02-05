import { ConflictException, Injectable, NotFoundException, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  @Post()
  async create(createUserDto: CreateUserDto) {
    const findByEmail = await this.prisma.user.findFirst({ where: { email: createUserDto.email } })
    const findByNumber = await this.prisma.user.findFirst({ where: { number: createUserDto.number } })
    
    if(findByEmail || findByNumber) {
      throw new ConflictException('User already exists')
    }

    const user = new User();
    Object.assign(user, { ...createUserDto })

    const createdUser = await this.prisma.user.create({ data: { ...user } })
    return plainToInstance(User, createdUser)
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const foundUser = await this.prisma.user.findFirst({ where: { id } })

    if(!foundUser) {
      throw new NotFoundException('User not found')
    }

    return plainToInstance(User, foundUser)
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({ where: { id }, data: { ...updateUserDto } })
    return plainToInstance(User, updatedUser)
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { id } })
  }
}
