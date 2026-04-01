import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { ContentService } from './content.service';
import { CreatePageDto, UpdatePageDto, ListPagesDto, CreateFaqDto } from './dto/content.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  // ============ Public Routes ============

  @Get('pages/:slug')
  async getPageBySlug(@Param('slug') slug: string) {
    return this.contentService.getPageBySlug(slug);
  }

  @Get('faq')
  async listFaqs(@Query('category') category?: string) {
    return this.contentService.listFaqs(category);
  }

  @Get('faq/categories')
  async getFaqCategories() {
    return this.contentService.getFaqCategories();
  }

  @Get('blog')
  async listBlogPosts(@Query() dto: ListPagesDto) {
    return this.contentService.listBlogPosts(dto);
  }

  @Get('blog/categories')
  async getBlogCategories() {
    return this.contentService.getBlogCategories();
  }

  @Get('blog/tags')
  async getBlogTags() {
    return this.contentService.getBlogTags();
  }

  @Get('blog/:slug')
  async getBlogPost(@Param('slug') slug: string) {
    return this.contentService.getPageBySlug(slug);
  }

  // ============ Admin Routes ============

  @Post('admin/pages')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async createPage(@Body() dto: CreatePageDto, @GetUser('id') userId: number) {
    return this.contentService.createPage(dto, userId);
  }

  @Get('admin/pages')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async listAllPages(@Query() dto: ListPagesDto) {
    return this.contentService.listPages(dto, true); // Include unpublished
  }

  @Get('admin/pages/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async getPageById(@Param('id', ParseIntPipe) id: number) {
    return this.contentService.getPageById(id);
  }

  @Put('admin/pages/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updatePage(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePageDto,
  ) {
    return this.contentService.updatePage(id, dto);
  }

  @Delete('admin/pages/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async deletePage(@Param('id', ParseIntPipe) id: number) {
    await this.contentService.deletePage(id);
    return { message: 'Page deleted successfully' };
  }

  @Post('admin/faq')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async createFaq(@Body() dto: CreateFaqDto, @GetUser('id') userId: number) {
    return this.contentService.createFaq(dto, userId);
  }
}
