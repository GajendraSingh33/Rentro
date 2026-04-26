import { Repository } from 'typeorm';
import { StaticPage } from '../typeorm/entities/static-page.entity';
import { CreatePageDto, UpdatePageDto, ListPagesDto, CreateFaqDto } from './dto/content.dto';
export declare class ContentService {
    private pageRepository;
    constructor(pageRepository: Repository<StaticPage>);
    private generateSlug;
    createPage(dto: CreatePageDto, authorId: number): Promise<StaticPage>;
    updatePage(id: number, dto: UpdatePageDto): Promise<StaticPage>;
    deletePage(id: number): Promise<void>;
    getPageById(id: number): Promise<StaticPage>;
    getPageBySlug(slug: string, incrementView?: boolean): Promise<StaticPage>;
    listPages(dto: ListPagesDto, includeUnpublished?: boolean): Promise<{
        data: StaticPage[];
        meta: {
            total: number;
            page: number;
            limit: number;
            total_pages: number;
        };
    }>;
    createFaq(dto: CreateFaqDto, authorId: number): Promise<StaticPage>;
    listFaqs(category?: string): Promise<Record<string, {
        id: number;
        question: string;
        answer: string;
    }[]>>;
    getFaqCategories(): Promise<string[]>;
    listBlogPosts(dto: ListPagesDto): Promise<{
        data: {
            id: number;
            title: string;
            slug: string;
            excerpt: string;
            featured_image: string;
            category: string;
            tags: string[];
            published_at: Date;
            view_count: number;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            total_pages: number;
        };
    }>;
    getBlogCategories(): Promise<string[]>;
    getBlogTags(): Promise<string[]>;
}
