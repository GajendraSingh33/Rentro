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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFaqDto = exports.ListPagesDto = exports.UpdatePageDto = exports.CreatePageDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const static_page_entity_1 = require("../../typeorm/entities/static-page.entity");
let CreatePageDto = (() => {
    var _a;
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
    let _sort_order_decorators;
    let _sort_order_initializers = [];
    let _sort_order_extraInitializers = [];
    return _a = class CreatePageDto {
            constructor() {
                this.title = __runInitializers(this, _title_initializers, void 0);
                this.slug = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
                this.content = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _content_initializers, void 0));
                this.excerpt = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _excerpt_initializers, void 0));
                this.page_type = (__runInitializers(this, _excerpt_extraInitializers), __runInitializers(this, _page_type_initializers, void 0));
                this.status = (__runInitializers(this, _page_type_extraInitializers), __runInitializers(this, _status_initializers, static_page_entity_1.PageStatus.DRAFT));
                this.meta_title = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _meta_title_initializers, void 0));
                this.meta_description = (__runInitializers(this, _meta_title_extraInitializers), __runInitializers(this, _meta_description_initializers, void 0));
                this.meta_keywords = (__runInitializers(this, _meta_description_extraInitializers), __runInitializers(this, _meta_keywords_initializers, void 0));
                this.featured_image = (__runInitializers(this, _meta_keywords_extraInitializers), __runInitializers(this, _featured_image_initializers, void 0));
                this.category = (__runInitializers(this, _featured_image_extraInitializers), __runInitializers(this, _category_initializers, void 0));
                this.tags = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
                this.sort_order = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _sort_order_initializers, void 0));
                __runInitializers(this, _sort_order_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _title_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(3), (0, class_validator_1.MaxLength)(200)];
            _slug_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(3), (0, class_validator_1.MaxLength)(200)];
            _content_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(10)];
            _excerpt_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _page_type_decorators = [(0, class_validator_1.IsEnum)(static_page_entity_1.PageType)];
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(static_page_entity_1.PageStatus)];
            _meta_title_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(200)];
            _meta_description_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
            _meta_keywords_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _featured_image_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _category_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _tags_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _sort_order_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)()];
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
            __esDecorate(null, null, _sort_order_decorators, { kind: "field", name: "sort_order", static: false, private: false, access: { has: obj => "sort_order" in obj, get: obj => obj.sort_order, set: (obj, value) => { obj.sort_order = value; } }, metadata: _metadata }, _sort_order_initializers, _sort_order_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.CreatePageDto = CreatePageDto;
let UpdatePageDto = (() => {
    var _a;
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
    let _sort_order_decorators;
    let _sort_order_initializers = [];
    let _sort_order_extraInitializers = [];
    return _a = class UpdatePageDto {
            constructor() {
                this.title = __runInitializers(this, _title_initializers, void 0);
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
                this.sort_order = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _sort_order_initializers, void 0));
                __runInitializers(this, _sort_order_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _title_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(3), (0, class_validator_1.MaxLength)(200)];
            _slug_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(3), (0, class_validator_1.MaxLength)(200)];
            _content_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _excerpt_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _page_type_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(static_page_entity_1.PageType)];
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(static_page_entity_1.PageStatus)];
            _meta_title_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(200)];
            _meta_description_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
            _meta_keywords_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _featured_image_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _category_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _tags_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _sort_order_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)()];
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
            __esDecorate(null, null, _sort_order_decorators, { kind: "field", name: "sort_order", static: false, private: false, access: { has: obj => "sort_order" in obj, get: obj => obj.sort_order, set: (obj, value) => { obj.sort_order = value; } }, metadata: _metadata }, _sort_order_initializers, _sort_order_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.UpdatePageDto = UpdatePageDto;
let ListPagesDto = (() => {
    var _a;
    let _search_decorators;
    let _search_initializers = [];
    let _search_extraInitializers = [];
    let _page_type_decorators;
    let _page_type_initializers = [];
    let _page_type_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _category_decorators;
    let _category_initializers = [];
    let _category_extraInitializers = [];
    let _tag_decorators;
    let _tag_initializers = [];
    let _tag_extraInitializers = [];
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    return _a = class ListPagesDto {
            constructor() {
                this.search = __runInitializers(this, _search_initializers, void 0);
                this.page_type = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _page_type_initializers, void 0));
                this.status = (__runInitializers(this, _page_type_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.category = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _category_initializers, void 0));
                this.tag = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _tag_initializers, void 0));
                this.page = (__runInitializers(this, _tag_extraInitializers), __runInitializers(this, _page_initializers, 1));
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, 20));
                __runInitializers(this, _limit_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _search_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _page_type_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(static_page_entity_1.PageType)];
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(static_page_entity_1.PageStatus)];
            _category_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _tag_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _page_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)()];
            _limit_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)()];
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: obj => "search" in obj, get: obj => obj.search, set: (obj, value) => { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            __esDecorate(null, null, _page_type_decorators, { kind: "field", name: "page_type", static: false, private: false, access: { has: obj => "page_type" in obj, get: obj => obj.page_type, set: (obj, value) => { obj.page_type = value; } }, metadata: _metadata }, _page_type_initializers, _page_type_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: obj => "category" in obj, get: obj => obj.category, set: (obj, value) => { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _tag_decorators, { kind: "field", name: "tag", static: false, private: false, access: { has: obj => "tag" in obj, get: obj => obj.tag, set: (obj, value) => { obj.tag = value; } }, metadata: _metadata }, _tag_initializers, _tag_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.ListPagesDto = ListPagesDto;
let CreateFaqDto = (() => {
    var _a;
    let _question_decorators;
    let _question_initializers = [];
    let _question_extraInitializers = [];
    let _answer_decorators;
    let _answer_initializers = [];
    let _answer_extraInitializers = [];
    let _category_decorators;
    let _category_initializers = [];
    let _category_extraInitializers = [];
    let _sort_order_decorators;
    let _sort_order_initializers = [];
    let _sort_order_extraInitializers = [];
    return _a = class CreateFaqDto {
            constructor() {
                this.question = __runInitializers(this, _question_initializers, void 0);
                this.answer = (__runInitializers(this, _question_extraInitializers), __runInitializers(this, _answer_initializers, void 0));
                this.category = (__runInitializers(this, _answer_extraInitializers), __runInitializers(this, _category_initializers, void 0));
                this.sort_order = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _sort_order_initializers, void 0));
                __runInitializers(this, _sort_order_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _question_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(10)];
            _answer_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(10)];
            _category_decorators = [(0, class_validator_1.IsString)()];
            _sort_order_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsNumber)()];
            __esDecorate(null, null, _question_decorators, { kind: "field", name: "question", static: false, private: false, access: { has: obj => "question" in obj, get: obj => obj.question, set: (obj, value) => { obj.question = value; } }, metadata: _metadata }, _question_initializers, _question_extraInitializers);
            __esDecorate(null, null, _answer_decorators, { kind: "field", name: "answer", static: false, private: false, access: { has: obj => "answer" in obj, get: obj => obj.answer, set: (obj, value) => { obj.answer = value; } }, metadata: _metadata }, _answer_initializers, _answer_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: obj => "category" in obj, get: obj => obj.category, set: (obj, value) => { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _sort_order_decorators, { kind: "field", name: "sort_order", static: false, private: false, access: { has: obj => "sort_order" in obj, get: obj => obj.sort_order, set: (obj, value) => { obj.sort_order = value; } }, metadata: _metadata }, _sort_order_initializers, _sort_order_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.CreateFaqDto = CreateFaqDto;
