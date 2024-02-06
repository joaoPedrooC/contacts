import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto, req: any) {
    const contact = new Contact()
    Object.assign(contact, { ...createContactDto } )

    contact.contactOwnerId = req.user.id
    const newContact = await this.prisma.contact.create({ data: { ...contact } })

    return newContact
  }

  async findAll(req: any) {
    return await this.prisma.contact.findMany({ where: { contactOwnerId: req.user.id } })
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  async update(id: string, updateContactDto: UpdateContactDto, req: any) {
    const contact = await this.prisma.contact.findUnique({ where: { id } })

    if(!contact) {
      throw new NotFoundException('Contact not found')
    }

    if(contact.contactOwnerId !== req.user.id) {
      throw new UnauthorizedException('You don\'t have permission to access this')
    }

    const updatedContact = await this.prisma.contact.update({ where: { id }, data: {...updateContactDto} })
    return updatedContact
  }

  async remove(id: string, req: any) {
    const contact = await this.prisma.contact.findUnique({ where: { id } })

    if(!contact) {
      throw new NotFoundException('Contact not found')
    }
    
    if(contact.contactOwnerId !== req.user.id) {
      throw new UnauthorizedException('You don\'t have permission to access this')
    }

    await this.prisma.contact.delete({ where: { id } })
  }
}
