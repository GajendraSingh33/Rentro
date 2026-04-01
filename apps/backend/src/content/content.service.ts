import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { StaticPage, PageType, PageStatus } from '../typeorm/entities/static-page.entity';
import { CreatePageDto, UpdatePageDto, ListPagesDto, CreateFaqDto } from './dto/content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(StaticPage)
    private pageRepository: Repository<StaticPage>,
  ) {}

  // Generate a URL-friendly slug from a title
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  async createPage(dto: CreatePageDto, authorId: number): Promise<StaticPage> {
    // Check if slug already exists
    const existingPage = await this.pageRepository.findOne({
      where: { slug: dto.slug },
    });

    if (existingPage) {
      throw new ConflictException('A page with this slug already exists');
    }

    const page = this.pageRepository.create({
      ...dto,
      author_id: authorId,
      published_at: dto.status === PageStatus.PUBLISHED ? new Date() : null,
    });

    return this.pageRepository.save(page);
  }

  async updatePage(id: number, dto: UpdatePageDto): Promise<StaticPage> {
    const page = await this.pageRepository.findOne({ where: { id } });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    // Check slug uniqueness if changing
    if (dto.slug && dto.slug !== page.slug) {
      const existingPage = await this.pageRepository.findOne({
        where: { slug: dto.slug },
      });
      if (existingPage) {
        throw new ConflictException('A page with this slug already exists');
      }
    }

    // Set published_at when publishing
    if (dto.status === PageStatus.PUBLISHED && page.status !== PageStatus.PUBLISHED) {
      page.published_at = new Date();
    }

    Object.assign(page, dto);
    return this.pageRepository.save(page);
  }

  async deletePage(id: number): Promise<void> {
    const page = await this.pageRepository.findOne({ where: { id } });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    await this.pageRepository.softDelete(id);
  }

  async getPageById(id: number): Promise<StaticPage> {
    const page = await this.pageRepository.findOne({ where: { id } });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    return page;
  }

  async getPageBySlug(slug: string, incrementView = true): Promise<StaticPage> {
    const page = await this.pageRepository.findOne({
      where: { slug, status: PageStatus.PUBLISHED },
    });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    // Increment view count
    if (incrementView) {
      page.view_count += 1;
      await this.pageRepository.save(page);
    }

    return page;
  }

  async listPages(dto: ListPagesDto, includeUnpublished = false) {
    const { search, page_type, status, category, tag, page = 1, limit = 20 } = dto;

    const queryBuilder = this.pageRepository.createQueryBuilder('page');

    // Only show published pages for public queries
    if (!includeUnpublished) {
      queryBuilder.andWhere('page.status = :status', { status: PageStatus.PUBLISHED });
    } else if (status) {
      queryBuilder.andWhere('page.status = :status', { status });
    }

    // Search
    if (search) {
      queryBuilder.andWhere(
        '(page.title ILIKE :search OR page.content ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Filter by page type
    if (page_type) {
      queryBuilder.andWhere('page.page_type = :page_type', { page_type });
    }

    // Filter by category
    if (category) {
      queryBuilder.andWhere('page.category = :category', { category });
    }

    // Filter by tag
    if (tag) {
      queryBuilder.andWhere(':tag = ANY(page.tags)', { tag });
    }

    // Order
    queryBuilder.orderBy('page.sort_order', 'ASC').addOrderBy('page.created_at', 'DESC');

    // Pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [pages, total] = await queryBuilder.getManyAndCount();

    return {
      data: pages,
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  // ============ FAQ-specific methods ============

  async createFaq(dto: CreateFaqDto, authorId: number): Promise<StaticPage> {
    const slug = this.generateSlug(dto.question);

    const faq = this.pageRepository.create({
      title: dto.question,
      slug: `faq-${slug}-${Date.now()}`,
      content: dto.answer,
      page_type: PageType.FAQ,
      status: PageStatus.PUBLISHED,
      category: dto.category,
      sort_order: dto.sort_order || 0,
      author_id: authorId,
      published_at: new Date(),
    });

    return this.pageRepository.save(faq);
  }

  async listFaqs(category?: string) {
    const queryBuilder = this.pageRepository
      .createQueryBuilder('page')
      .where('page.page_type = :type', { type: PageType.FAQ })
      .andWhere('page.status = :status', { status: PageStatus.PUBLISHED });

    if (category) {
      queryBuilder.andWhere('page.category = :category', { category });
    }

    queryBuilder.orderBy('page.category', 'ASC').addOrderBy('page.sort_order', 'ASC');

    const faqs = await queryBuilder.getMany();

    // Group by category
    const grouped = faqs.reduce((acc, faq) => {
      const cat = faq.category || 'General';
      if (!acc[cat]) {
        acc[cat] = [];
      }
      acc[cat].push({
        id: faq.id,
        question: faq.title,
        answer: faq.content,
      });
      return acc;
    }, {} as Record<string, Array<{ id: number; question: string; answer: string }>>);

    return grouped;
  }

  async getFaqCategories(): Promise<string[]> {
    const result = await this.pageRepository
      .createQueryBuilder('page')
      .select('DISTINCT page.category', 'category')
      .where('page.page_type = :type', { type: PageType.FAQ })
      .andWhere('page.status = :status', { status: PageStatus.PUBLISHED })
      .andWhere('page.category IS NOT NULL')
      .getRawMany();

    return result.map((r) => r.category);
  }

  // ============ Blog-specific methods ============

  async listBlogPosts(dto: ListPagesDto) {
    const { search, category, tag, page = 1, limit = 10 } = dto;

    const queryBuilder = this.pageRepository
      .createQueryBuilder('page')
      .where('page.page_type = :type', { type: PageType.BLOG })
      .andWhere('page.status = :status', { status: PageStatus.PUBLISHED });

    if (search) {
      queryBuilder.andWhere(
        '(page.title ILIKE :search OR page.content ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (category) {
      queryBuilder.andWhere('page.category = :category', { category });
    }

    if (tag) {
      queryBuilder.andWhere(':tag = ANY(page.tags)', { tag });
    }

    queryBuilder.orderBy('page.published_at', 'DESC');

    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [posts, total] = await queryBuilder.getManyAndCount();

    return {
      data: posts.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        featured_image: post.featured_image,
        category: post.category,
        tags: post.tags,
        published_at: post.published_at,
        view_count: post.view_count,
      })),
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  async getBlogCategories(): Promise<string[]> {
    const result = await this.pageRepository
      .createQueryBuilder('page')
      .select('DISTINCT page.category', 'category')
      .where('page.page_type = :type', { type: PageType.BLOG })
      .andWhere('page.status = :status', { status: PageStatus.PUBLISHED })
      .andWhere('page.category IS NOT NULL')
      .getRawMany();

    return result.map((r) => r.category);
  }

  async getBlogTags(): Promise<string[]> {
    const result = await this.pageRepository
      .createQueryBuilder('page')
      .select('DISTINCT UNNEST(page.tags)', 'tag')
      .where('page.page_type = :type', { type: PageType.BLOG })
      .andWhere('page.status = :status', { status: PageStatus.PUBLISHED })
      .getRawMany();

    return result.map((r) => r.tag).filter(Boolean);
  }
}
