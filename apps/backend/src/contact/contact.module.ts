import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/user.entity';
import { PGListing } from '../typeorm/entities/pg-listing.entity';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, PGListing])],
  providers: [ContactService],
  controllers: [ContactController],
  exports: [ContactService],
})
export class ContactModule {}
