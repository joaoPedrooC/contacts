import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ContactsModule } from './modules/contacts/contacts.module';

@Module({
  imports: [UsersModule, AuthModule, ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
