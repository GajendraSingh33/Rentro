"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const static_page_entity_1 = require("../typeorm/entities/static-page.entity");
let ContentService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ContentService = _classThis = class {
        constructor(pageRepository) {
            this.pageRepository = pageRepository;
        }
        // Generate a URL-friendly slug from a title
        generateSlug(title) {
            return title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
        }
        async createPage(dto, authorId) {
            // Check if slug already exists
            const existingPage = await this.pageRepository.findOne({
                where: { slug: dto.slug },
            });
            if (existingPage) {
                throw new common_1.ConflictException('A page with this slug already exists');
            }
            const page = this.pageRepository.create({
                ...dto,
                author_id: authorId,
                published_at: dto.status === static_page_entity_1.PageStatus.PUBLISHED ? new Date() : null,
            });
            return this.pageRepository.save(page);
        }
        async updatePage(id, dto) {
            const page = await this.pageRepository.findOne({ where: { id } });
            if (!page) {
                throw new common_1.NotFoundException('Page not found');
            }
            // Check slug uniqueness if changing
            if (dto.slug && dto.slug !== page.slug) {
                const existingPage = await this.pageRepository.findOne({
                    where: { slug: dto.slug },
                });
                if (existingPage) {
                    throw new common_1.ConflictException('A page with this slug already exists');
                }
            }
            // Set published_at when publishing
            if (dto.status === static_page_entity_1.PageStatus.PUBLISHED && page.status !== static_page_entity_1.PageStatus.PUBLISHED) {
                page.published_at = new Date();
            }
            Object.assign(page, dto);
            return this.pageRepository.save(page);
        }
        async deletePage(id) {
            const page = await this.pageRepository.findOne({ where: { id } });
            if (!page) {
                throw new common_1.NotFoundException('Page not found');
            }
            await this.pageRepository.softDelete(id);
        }
        async getPageById(id) {
            const page = await this.pageRepository.findOne({ where: { id } });
            if (!page) {
                throw new common_1.NotFoundException('Page not found');
            }
            return page;
        }
        async getPageBySlug(slug, incrementView = true) {
            const page = await this.pageRepository.findOne({
                where: { slug, status: static_page_entity_1.PageStatus.PUBLISHED },
            });
            if (!page) {
                throw new common_1.NotFoundException('Page not found');
            }
            // Increment view count
            if (incrementView) {
                page.view_count += 1;
                await this.pageRepository.save(page);
            }
            return page;
        }
        async listPages(dto, includeUnpublished = false) {
            const { search, page_type, status, category, tag, page = 1, limit = 20 } = dto;
            const queryBuilder = this.pageRepository.createQueryBuilder('page');
            // Only show published pages for public queries
            if (!includeUnpublished) {
                queryBuilder.andWhere('page.status = :status', { status: static_page_entity_1.PageStatus.PUBLISHED });
            }
            else if (status) {
                queryBuilder.andWhere('page.status = :status', { status });
            }
            // Search
            if (search) {
                queryBuilder.andWhere('(page.title ILIKE :search OR page.content ILIKE :search)', { search: `%${search}%` });
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
        async createFaq(dto, authorId) {
            const slug = this.generateSlug(dto.question);
            const faq = this.pageRepository.create({
                title: dto.question,
                slug: `faq-${slug}-${Date.now()}`,
                content: dto.answer,
                page_type: static_page_entity_1.PageType.FAQ,
                status: static_page_entity_1.PageStatus.PUBLISHED,
                category: dto.category,
                sort_order: dto.sort_order || 0,
                author_id: authorId,
                published_at: new Date(),
            });
            return this.pageRepository.save(faq);
        }
        async listFaqs(category) {
            const queryBuilder = this.pageRepository
                .createQueryBuilder('page')
                .where('page.page_type = :type', { type: static_page_entity_1.PageType.FAQ })
                .andWhere('page.status = :status', { status: static_page_entity_1.PageStatus.PUBLISHED });
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
            }, {});
            return grouped;
        }
        async getFaqCategories() {
            const result = await this.pageRepository
                .createQueryBuilder('page')
                .select('DISTINCT page.category', 'category')
                .where('page.page_type = :type', { type: static_page_entity_1.PageType.FAQ })
                .andWhere('page.status = :status', { status: static_page_entity_1.PageStatus.PUBLISHED })
                .andWhere('page.category IS NOT NULL')
                .getRawMany();
            return result.map((r) => r.category);
        }
        // ============ Blog-specific methods ============
        async listBlogPosts(dto) {
            const { search, category, tag, page = 1, limit = 10 } = dto;
            const queryBuilder = this.pageRepository
                .createQueryBuilder('page')
                .where('page.page_type = :type', { type: static_page_entity_1.PageType.BLOG })
                .andWhere('page.status = :status', { status: static_page_entity_1.PageStatus.PUBLISHED });
            if (search) {
                queryBuilder.andWhere('(page.title ILIKE :search OR page.content ILIKE :search)', { search: `%${search}%` });
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
        async getBlogCategories() {
            const result = await this.pageRepository
                .createQueryBuilder('page')
                .select('DISTINCT page.category', 'category')
                .where('page.page_type = :type', { type: static_page_entity_1.PageType.BLOG })
                .andWhere('page.status = :status', { status: static_page_entity_1.PageStatus.PUBLISHED })
                .andWhere('page.category IS NOT NULL')
                .getRawMany();
            return result.map((r) => r.category);
        }
        async getBlogTags() {
            const result = await this.pageRepository
                .createQueryBuilder('page')
                .select('DISTINCT UNNEST(page.tags)', 'tag')
                .where('page.page_type = :type', { type: static_page_entity_1.PageType.BLOG })
                .andWhere('page.status = :status', { status: static_page_entity_1.PageStatus.PUBLISHED })
                .getRawMany();
            return result.map((r) => r.tag).filter(Boolean);
        }
    };
    __setFunctionName(_classThis, "ContentService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ContentService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ContentService = _classThis;
})();
exports.ContentService = ContentService;
