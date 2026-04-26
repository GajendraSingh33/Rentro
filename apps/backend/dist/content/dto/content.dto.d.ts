import { PageType, PageStatus } from '../../typeorm/entities/static-page.entity';
export declare class CreatePageDto {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    page_type: PageType;
    status?: PageStatus;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string[];
    featured_image?: string;
    category?: string;
    tags?: string[];
    sort_order?: number;
}
export declare class UpdatePageDto {
    title?: string;
    slug?: string;
    content?: string;
    excerpt?: string;
    page_type?: PageType;
    status?: PageStatus;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string[];
    featured_image?: string;
    category?: string;
    tags?: string[];
    sort_order?: number;
}
export declare class ListPagesDto {
    search?: string;
    page_type?: PageType;
    status?: PageStatus;
    category?: string;
    tag?: string;
    page?: number;
    limit?: number;
}
export declare class CreateFaqDto {
    question: string;
    answer: string;
    category: string;
    sort_order?: number;
}
