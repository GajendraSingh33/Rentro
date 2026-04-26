"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const admin_guard_1 = require("../auth/guards/admin.guard");
let ContentController = (() => {
    let _classDecorators = [(0, common_1.Controller)('content')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getPageBySlug_decorators;
    let _listFaqs_decorators;
    let _getFaqCategories_decorators;
    let _listBlogPosts_decorators;
    let _getBlogCategories_decorators;
    let _getBlogTags_decorators;
    let _getBlogPost_decorators;
    let _createPage_decorators;
    let _listAllPages_decorators;
    let _getPageById_decorators;
    let _updatePage_decorators;
    let _deletePage_decorators;
    let _createFaq_decorators;
    var ContentController = _classThis = class {
        constructor(contentService) {
            this.contentService = (__runInitializers(this, _instanceExtraInitializers), contentService);
        }
        // ============ Public Routes ============
        async getPageBySlug(slug) {
            return this.contentService.getPageBySlug(slug);
        }
        async listFaqs(category) {
            return this.contentService.listFaqs(category);
        }
        async getFaqCategories() {
            return this.contentService.getFaqCategories();
        }
        async listBlogPosts(dto) {
            return this.contentService.listBlogPosts(dto);
        }
        async getBlogCategories() {
            return this.contentService.getBlogCategories();
        }
        async getBlogTags() {
            return this.contentService.getBlogTags();
        }
        async getBlogPost(slug) {
            return this.contentService.getPageBySlug(slug);
        }
        // ============ Admin Routes ============
        async createPage(dto, userId) {
            return this.contentService.createPage(dto, userId);
        }
        async listAllPages(dto) {
            return this.contentService.listPages(dto, true); // Include unpublished
        }
        async getPageById(id) {
            return this.contentService.getPageById(id);
        }
        async updatePage(id, dto) {
            return this.contentService.updatePage(id, dto);
        }
        async deletePage(id) {
            await this.contentService.deletePage(id);
            return { message: 'Page deleted successfully' };
        }
        async createFaq(dto, userId) {
            return this.contentService.createFaq(dto, userId);
        }
    };
    __setFunctionName(_classThis, "ContentController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getPageBySlug_decorators = [(0, common_1.Get)('pages/:slug')];
        _listFaqs_decorators = [(0, common_1.Get)('faq')];
        _getFaqCategories_decorators = [(0, common_1.Get)('faq/categories')];
        _listBlogPosts_decorators = [(0, common_1.Get)('blog')];
        _getBlogCategories_decorators = [(0, common_1.Get)('blog/categories')];
        _getBlogTags_decorators = [(0, common_1.Get)('blog/tags')];
        _getBlogPost_decorators = [(0, common_1.Get)('blog/:slug')];
        _createPage_decorators = [(0, common_1.Post)('admin/pages'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard)];
        _listAllPages_decorators = [(0, common_1.Get)('admin/pages'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard)];
        _getPageById_decorators = [(0, common_1.Get)('admin/pages/:id'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard)];
        _updatePage_decorators = [(0, common_1.Put)('admin/pages/:id'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard)];
        _deletePage_decorators = [(0, common_1.Delete)('admin/pages/:id'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard)];
        _createFaq_decorators = [(0, common_1.Post)('admin/faq'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard)];
        __esDecorate(_classThis, null, _getPageBySlug_decorators, { kind: "method", name: "getPageBySlug", static: false, private: false, access: { has: obj => "getPageBySlug" in obj, get: obj => obj.getPageBySlug }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _listFaqs_decorators, { kind: "method", name: "listFaqs", static: false, private: false, access: { has: obj => "listFaqs" in obj, get: obj => obj.listFaqs }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getFaqCategories_decorators, { kind: "method", name: "getFaqCategories", static: false, private: false, access: { has: obj => "getFaqCategories" in obj, get: obj => obj.getFaqCategories }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _listBlogPosts_decorators, { kind: "method", name: "listBlogPosts", static: false, private: false, access: { has: obj => "listBlogPosts" in obj, get: obj => obj.listBlogPosts }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getBlogCategories_decorators, { kind: "method", name: "getBlogCategories", static: false, private: false, access: { has: obj => "getBlogCategories" in obj, get: obj => obj.getBlogCategories }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getBlogTags_decorators, { kind: "method", name: "getBlogTags", static: false, private: false, access: { has: obj => "getBlogTags" in obj, get: obj => obj.getBlogTags }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getBlogPost_decorators, { kind: "method", name: "getBlogPost", static: false, private: false, access: { has: obj => "getBlogPost" in obj, get: obj => obj.getBlogPost }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createPage_decorators, { kind: "method", name: "createPage", static: false, private: false, access: { has: obj => "createPage" in obj, get: obj => obj.createPage }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _listAllPages_decorators, { kind: "method", name: "listAllPages", static: false, private: false, access: { has: obj => "listAllPages" in obj, get: obj => obj.listAllPages }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPageById_decorators, { kind: "method", name: "getPageById", static: false, private: false, access: { has: obj => "getPageById" in obj, get: obj => obj.getPageById }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updatePage_decorators, { kind: "method", name: "updatePage", static: false, private: false, access: { has: obj => "updatePage" in obj, get: obj => obj.updatePage }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deletePage_decorators, { kind: "method", name: "deletePage", static: false, private: false, access: { has: obj => "deletePage" in obj, get: obj => obj.deletePage }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createFaq_decorators, { kind: "method", name: "createFaq", static: false, private: false, access: { has: obj => "createFaq" in obj, get: obj => obj.createFaq }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ContentController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ContentController = _classThis;
})();
exports.ContentController = ContentController;
