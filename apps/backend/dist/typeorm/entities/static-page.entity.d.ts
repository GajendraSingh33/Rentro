export declare enum PageType {
    STATIC = "static",
    FAQ = "faq",
    BLOG = "blog",
    POLICY = "policy"
}
export declare enum PageStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived"
}
export declare class StaticPage {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    page_type: PageType;
    status: PageStatus;
    meta_title: string;
    meta_description: string;
    meta_keywords: string[];
    featured_image: string;
    category: string;
    tags: string[];
    author_id: number;
    view_count: number;
    sort_order: number;
    published_at: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
