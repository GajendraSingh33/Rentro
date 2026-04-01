import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { StaticPage } from '../typeorm/entities/static-page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaticPage])],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
