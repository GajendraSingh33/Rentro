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
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let MediaController = (() => {
    let _classDecorators = [(0, common_1.Controller)('media'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _uploadImage_decorators;
    let _uploadVideo_decorators;
    let _getListingMedia_decorators;
    let _deleteMedia_decorators;
    let _setCoverImage_decorators;
    let _updateDisplayOrder_decorators;
    var MediaController = _classThis = class {
        constructor(mediaService) {
            this.mediaService = (__runInitializers(this, _instanceExtraInitializers), mediaService);
        }
        /**
         * Upload an image
         * POST /media/upload-image
         */
        async uploadImage(file, listingId, req) {
            if (!file) {
                throw new common_1.BadRequestException('No file provided');
            }
            return await this.mediaService.uploadImage(file, listingId);
        }
        /**
         * Upload a video
         * POST /media/upload-video
         */
        async uploadVideo(file, listingId, req) {
            if (!file) {
                throw new common_1.BadRequestException('No file provided');
            }
            return await this.mediaService.uploadVideo(file, listingId);
        }
        /**
         * Get all media for a listing
         * GET /media/listing/:listingId
         */
        async getListingMedia(listingId) {
            return await this.mediaService.getListingMedia(listingId);
        }
        /**
         * Delete media
         * DELETE /media/:id
         */
        async deleteMedia(id, req) {
            await this.mediaService.deleteMedia(id, req.user.id);
            return { message: 'Media deleted successfully' };
        }
        /**
         * Set cover image
         * PATCH /media/:id/set-cover
         */
        async setCoverImage(id, listingId) {
            await this.mediaService.setCoverImage(id, listingId);
            return { message: 'Cover image updated successfully' };
        }
        /**
         * Update display order
         * PATCH /media/:id/order
         */
        async updateDisplayOrder(id, order) {
            await this.mediaService.updateDisplayOrder(id, order);
            return { message: 'Display order updated successfully' };
        }
    };
    __setFunctionName(_classThis, "MediaController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _uploadImage_decorators = [(0, common_1.Post)('upload-image'), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file'))];
        _uploadVideo_decorators = [(0, common_1.Post)('upload-video'), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file'))];
        _getListingMedia_decorators = [(0, common_1.Get)('listing/:listingId')];
        _deleteMedia_decorators = [(0, common_1.Delete)(':id')];
        _setCoverImage_decorators = [(0, common_1.Patch)(':id/set-cover')];
        _updateDisplayOrder_decorators = [(0, common_1.Patch)(':id/order')];
        __esDecorate(_classThis, null, _uploadImage_decorators, { kind: "method", name: "uploadImage", static: false, private: false, access: { has: obj => "uploadImage" in obj, get: obj => obj.uploadImage }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _uploadVideo_decorators, { kind: "method", name: "uploadVideo", static: false, private: false, access: { has: obj => "uploadVideo" in obj, get: obj => obj.uploadVideo }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getListingMedia_decorators, { kind: "method", name: "getListingMedia", static: false, private: false, access: { has: obj => "getListingMedia" in obj, get: obj => obj.getListingMedia }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteMedia_decorators, { kind: "method", name: "deleteMedia", static: false, private: false, access: { has: obj => "deleteMedia" in obj, get: obj => obj.deleteMedia }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setCoverImage_decorators, { kind: "method", name: "setCoverImage", static: false, private: false, access: { has: obj => "setCoverImage" in obj, get: obj => obj.setCoverImage }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateDisplayOrder_decorators, { kind: "method", name: "updateDisplayOrder", static: false, private: false, access: { has: obj => "updateDisplayOrder" in obj, get: obj => obj.updateDisplayOrder }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MediaController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MediaController = _classThis;
})();
exports.MediaController = MediaController;
