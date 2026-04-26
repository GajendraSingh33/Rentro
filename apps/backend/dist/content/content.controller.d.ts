import { ContentService } from './content.service';
import { CreatePageDto, UpdatePageDto, ListPagesDto, CreateFaqDto } from './dto/content.dto';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
    getPageBySlug(slug: string): Promise<import("../typeorm/entities").StaticPage>;
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
    getBlogPost(slug: string): Promise<import("../typeorm/entities").StaticPage>;
    createPage(dto: CreatePageDto, userId: number): Promise<import("../typeorm/entities").StaticPage>;
    listAllPages(dto: ListPagesDto): Promise<{
        data: import("../typeorm/entities").StaticPage[];
        meta: {
            total: number;
            page: number;
            limit: number;
            total_pages: number;
        };
    }>;
    getPageById(id: number): Promise<import("../typeorm/entities").StaticPage>;
    updatePage(id: number, dto: UpdatePageDto): Promise<import("../typeorm/entities").StaticPage>;
    deletePage(id: number): Promise<{
        message: string;
    }>;
    createFaq(dto: CreateFaqDto, userId: number): Promise<import("../typeorm/entities").StaticPage>;
}
