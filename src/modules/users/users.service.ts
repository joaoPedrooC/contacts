import { ConflictException, Injectable, NotFoundException, Post, UnauthorizedException } from '@nestjs/common';
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
    const findByEmail = await this.findByEmail(createUserDto.email)
    const findByNumber = await this.prisma.user.findFirst({ where: { number: createUserDto.number } })
    
    if(findByEmail || findByNumber) {
      throw new ConflictException('User already exists')
    }

    const user = new User();
    Object.assign(user, { ...createUserDto })

    const createdUser = await this.prisma.user.create({ data: { ...user } })
    return plainToInstance(User, createdUser)
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  async findOne(id: string, req: any) {
    if(req.user.id !== id) {
      throw new UnauthorizedException('You don\'t have permission to access this')
    }

    const foundUser = await this.prisma.user.findFirst({ where: { id }, include: { contacts: true } })

    if(!foundUser) {
      throw new NotFoundException('User not found')
    }

    return plainToInstance(User, foundUser)
  }

  async findByEmail(email: string) {
    const foundUser = await this.prisma.user.findFirst({ where: { email } })
    return foundUser
  }

  async update(id: string, updateUserDto: UpdateUserDto, req: any) {
    if(req.user.id !== id) {
      throw new UnauthorizedException('You don\'t have permission to access this')
    }

    console.log(updateUserDto);
    
    const findByEmail = await this.findByEmail(updateUserDto.email)
    const findByNumber = await this.prisma.user.findFirst({ where: { number: updateUserDto.number } })

    if((findByEmail && updateUserDto.email) || (findByNumber && updateUserDto.number)) {
      throw new UnauthorizedException('User with this e-mail or number already exists')
    }

    const foundUser = await this.prisma.user.findFirst({ where: { id } })

    if(!foundUser) {
      throw new NotFoundException('User not found')
    }

    const updatedUser = await this.prisma.user.update({ where: { id }, data: { ...updateUserDto } })
    return plainToInstance(User, updatedUser)
  }

  async remove(id: string, req: any) {
    if(id !== req.user.id) {
      throw new UnauthorizedException('You don\'t have permission to access this')
    }

    return await this.prisma.user.delete({ where: { id } })
  }
}
