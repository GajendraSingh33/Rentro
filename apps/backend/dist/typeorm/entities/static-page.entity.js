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
exports.StaticPage = exports.PageStatus = exports.PageType = void 0;
const typeorm_1 = require("typeorm");
var PageType;
(function (PageType) {
    PageType["STATIC"] = "static";
    PageType["FAQ"] = "faq";
    PageType["BLOG"] = "blog";
    PageType["POLICY"] = "policy";
})(PageType || (exports.PageType = PageType = {}));
var PageStatus;
(function (PageStatus) {
    PageStatus["DRAFT"] = "draft";
    PageStatus["PUBLISHED"] = "published";
    PageStatus["ARCHIVED"] = "archived";
})(PageStatus || (exports.PageStatus = PageStatus = {}));
let StaticPage = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('static_pages')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _slug_decorators;
    let _slug_initializers = [];
    let _slug_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _excerpt_decorators;
    let _excerpt_initializers = [];
    let _excerpt_extraInitializers = [];
    let _page_type_decorators;
    let _page_type_initializers = [];
    let _page_type_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _meta_title_decorators;
    let _meta_title_initializers = [];
    let _meta_title_extraInitializers = [];
    let _meta_description_decorators;
    let _meta_description_initializers = [];
    let _meta_description_extraInitializers = [];
    let _meta_keywords_decorators;
    let _meta_keywords_initializers = [];
    let _meta_keywords_extraInitializers = [];
    let _featured_image_decorators;
    let _featured_image_initializers = [];
    let _featured_image_extraInitializers = [];
    let _category_decorators;
    let _category_initializers = [];
    let _category_extraInitializers = [];
    let _tags_decorators;
    let _tags_initializers = [];
    let _tags_extraInitializers = [];
    let _author_id_decorators;
    let _author_id_initializers = [];
    let _author_id_extraInitializers = [];
    let _view_count_decorators;
    let _view_count_initializers = [];
    let _view_count_extraInitializers = [];
    let _sort_order_decorators;
    let _sort_order_initializers = [];
    let _sort_order_extraInitializers = [];
    let _published_at_decorators;
    let _published_at_initializers = [];
    let _published_at_extraInitializers = [];
    let _created_at_decorators;
    let _created_at_initializers = [];
    let _created_at_extraInitializers = [];
    let _updated_at_decorators;
    let _updated_at_initializers = [];
    let _updated_at_extraInitializers = [];
    let _deleted_at_decorators;
    let _deleted_at_initializers = [];
    let _deleted_at_extraInitializers = [];
    var StaticPage = _classThis = class {
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.title = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.slug = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
            this.content = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _content_initializers, void 0));
            this.excerpt = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _excerpt_initializers, void 0));
            this.page_type = (__runInitializers(this, _excerpt_extraInitializers), __runInitializers(this, _page_type_initializers, void 0));
            this.status = (__runInitializers(this, _page_type_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.meta_title = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _meta_title_initializers, void 0));
            this.meta_description = (__runInitializers(this, _meta_title_extraInitializers), __runInitializers(this, _meta_description_initializers, void 0));
            this.meta_keywords = (__runInitializers(this, _meta_description_extraInitializers), __runInitializers(this, _meta_keywords_initializers, void 0));
            this.featured_image = (__runInitializers(this, _meta_keywords_extraInitializers), __runInitializers(this, _featured_image_initializers, void 0));
            this.category = (__runInitializers(this, _featured_image_extraInitializers), __runInitializers(this, _category_initializers, void 0));
            this.tags = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
            this.author_id = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _author_id_initializers, void 0));
            this.view_count = (__runInitializers(this, _author_id_extraInitializers), __runInitializers(this, _view_count_initializers, void 0));
            this.sort_order = (__runInitializers(this, _view_count_extraInitializers), __runInitializers(this, _sort_order_initializers, void 0));
            this.published_at = (__runInitializers(this, _sort_order_extraInitializers), __runInitializers(this, _published_at_initializers, void 0));
            this.created_at = (__runInitializers(this, _published_at_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            this.deleted_at = (__runInitializers(this, _updated_at_extraInitializers), __runInitializers(this, _deleted_at_initializers, void 0));
            __runInitializers(this, _deleted_at_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "StaticPage");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _title_decorators = [(0, typeorm_1.Column)({ length: 200 })];
        _slug_decorators = [(0, typeorm_1.Index)({ unique: true }), (0, typeorm_1.Column)({ length: 200 })];
        _content_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
        _excerpt_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _page_type_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: PageType,
                default: PageType.STATIC,
            })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: PageStatus,
                default: PageStatus.DRAFT,
            })];
        _meta_title_decorators = [(0, typeorm_1.Column)({ length: 200, nullable: true })];
        _meta_description_decorators = [(0, typeorm_1.Column)({ length: 500, nullable: true })];
        _meta_keywords_decorators = [(0, typeorm_1.Column)({ type: 'simple-array', nullable: true })];
        _featured_image_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _category_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _tags_decorators = [(0, typeorm_1.Column)({ type: 'simple-array', nullable: true })];
        _author_id_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _view_count_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _sort_order_decorators = [(0, typeorm_1.Column)({ default: 0 })];
        _published_at_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updated_at_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deleted_at_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: obj => "slug" in obj, get: obj => obj.slug, set: (obj, value) => { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, null, _excerpt_decorators, { kind: "field", name: "excerpt", static: false, private: false, access: { has: obj => "excerpt" in obj, get: obj => obj.excerpt, set: (obj, value) => { obj.excerpt = value; } }, metadata: _metadata }, _excerpt_initializers, _excerpt_extraInitializers);
        __esDecorate(null, null, _page_type_decorators, { kind: "field", name: "page_type", static: false, private: false, access: { has: obj => "page_type" in obj, get: obj => obj.page_type, set: (obj, value) => { obj.page_type = value; } }, metadata: _metadata }, _page_type_initializers, _page_type_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _meta_title_decorators, { kind: "field", name: "meta_title", static: false, private: false, access: { has: obj => "meta_title" in obj, get: obj => obj.meta_title, set: (obj, value) => { obj.meta_title = value; } }, metadata: _metadata }, _meta_title_initializers, _meta_title_extraInitializers);
        __esDecorate(null, null, _meta_description_decorators, { kind: "field", name: "meta_description", static: false, private: false, access: { has: obj => "meta_description" in obj, get: obj => obj.meta_description, set: (obj, value) => { obj.meta_description = value; } }, metadata: _metadata }, _meta_description_initializers, _meta_description_extraInitializers);
        __esDecorate(null, null, _meta_keywords_decorators, { kind: "field", name: "meta_keywords", static: false, private: false, access: { has: obj => "meta_keywords" in obj, get: obj => obj.meta_keywords, set: (obj, value) => { obj.meta_keywords = value; } }, metadata: _metadata }, _meta_keywords_initializers, _meta_keywords_extraInitializers);
        __esDecorate(null, null, _featured_image_decorators, { kind: "field", name: "featured_image", static: false, private: false, access: { has: obj => "featured_image" in obj, get: obj => obj.featured_image, set: (obj, value) => { obj.featured_image = value; } }, metadata: _metadata }, _featured_image_initializers, _featured_image_extraInitializers);
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: obj => "category" in obj, get: obj => obj.category, set: (obj, value) => { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: obj => "tags" in obj, get: obj => obj.tags, set: (obj, value) => { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
        __esDecorate(null, null, _author_id_decorators, { kind: "field", name: "author_id", static: false, private: false, access: { has: obj => "author_id" in obj, get: obj => obj.author_id, set: (obj, value) => { obj.author_id = value; } }, metadata: _metadata }, _author_id_initializers, _author_id_extraInitializers);
        __esDecorate(null, null, _view_count_decorators, { kind: "field", name: "view_count", static: false, private: false, access: { has: obj => "view_count" in obj, get: obj => obj.view_count, set: (obj, value) => { obj.view_count = value; } }, metadata: _metadata }, _view_count_initializers, _view_count_extraInitializers);
        __esDecorate(null, null, _sort_order_decorators, { kind: "field", name: "sort_order", static: false, private: false, access: { has: obj => "sort_order" in obj, get: obj => obj.sort_order, set: (obj, value) => { obj.sort_order = value; } }, metadata: _metadata }, _sort_order_initializers, _sort_order_extraInitializers);
        __esDecorate(null, null, _published_at_decorators, { kind: "field", name: "published_at", static: false, private: false, access: { has: obj => "published_at" in obj, get: obj => obj.published_at, set: (obj, value) => { obj.published_at = value; } }, metadata: _metadata }, _published_at_initializers, _published_at_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: obj => "created_at" in obj, get: obj => obj.created_at, set: (obj, value) => { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: obj => "updated_at" in obj, get: obj => obj.updated_at, set: (obj, value) => { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, null, _deleted_at_decorators, { kind: "field", name: "deleted_at", static: false, private: false, access: { has: obj => "deleted_at" in obj, get: obj => obj.deleted_at, set: (obj, value) => { obj.deleted_at = value; } }, metadata: _metadata }, _deleted_at_initializers, _deleted_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StaticPage = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StaticPage = _classThis;
})();
exports.StaticPage = StaticPage;
