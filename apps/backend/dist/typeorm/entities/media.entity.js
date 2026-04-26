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
exports.Media = exports.MediaType = void 0;
const typeorm_1 = require("typeorm");
const pg_listing_entity_1 = require("./pg-listing.entity");
var MediaType;
(function (MediaType) {
    MediaType["IMAGE"] = "image";
    MediaType["VIDEO"] = "video";
})(MediaType || (exports.MediaType = MediaType = {}));
let Media = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('media'), (0, typeorm_1.Index)(['listing_id']), (0, typeorm_1.Index)(['media_type']), (0, typeorm_1.Index)(['display_order']), (0, typeorm_1.Index)(['created_at'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _listing_id_decorators;
    let _listing_id_initializers = [];
    let _listing_id_extraInitializers = [];
    let _listing_decorators;
    let _listing_initializers = [];
    let _listing_extraInitializers = [];
    let _media_type_decorators;
    let _media_type_initializers = [];
    let _media_type_extraInitializers = [];
    let _url_decorators;
    let _url_initializers = [];
    let _url_extraInitializers = [];
    let _thumbnail_url_decorators;
    let _thumbnail_url_initializers = [];
    let _thumbnail_url_extraInitializers = [];
    let _original_filename_decorators;
    let _original_filename_initializers = [];
    let _original_filename_extraInitializers = [];
    let _file_size_decorators;
    let _file_size_initializers = [];
    let _file_size_extraInitializers = [];
    let _mime_type_decorators;
    let _mime_type_initializers = [];
    let _mime_type_extraInitializers = [];
    let _width_decorators;
    let _width_initializers = [];
    let _width_extraInitializers = [];
    let _height_decorators;
    let _height_initializers = [];
    let _height_extraInitializers = [];
    let _duration_decorators;
    let _duration_initializers = [];
    let _duration_extraInitializers = [];
    let _display_order_decorators;
    let _display_order_initializers = [];
    let _display_order_extraInitializers = [];
    let _is_cover_decorators;
    let _is_cover_initializers = [];
    let _is_cover_extraInitializers = [];
    let _alt_text_decorators;
    let _alt_text_initializers = [];
    let _alt_text_extraInitializers = [];
    let _caption_decorators;
    let _caption_initializers = [];
    let _caption_extraInitializers = [];
    let _is_processed_decorators;
    let _is_processed_initializers = [];
    let _is_processed_extraInitializers = [];
    let _processing_error_decorators;
    let _processing_error_initializers = [];
    let _processing_error_extraInitializers = [];
    let _created_at_decorators;
    let _created_at_initializers = [];
    let _created_at_extraInitializers = [];
    let _updated_at_decorators;
    let _updated_at_initializers = [];
    let _updated_at_extraInitializers = [];
    let _deleted_at_decorators;
    let _deleted_at_initializers = [];
    let _deleted_at_extraInitializers = [];
    var Media = _classThis = class {
        // Virtual properties
        get file_size_mb() {
            return this.file_size ? this.file_size / (1024 * 1024) : 0;
        }
        get is_image() {
            return this.media_type === MediaType.IMAGE;
        }
        get is_video() {
            return this.media_type === MediaType.VIDEO;
        }
        // Format duration for display (MM:SS)
        get formatted_duration() {
            if (!this.duration)
                return null;
            const minutes = Math.floor(this.duration / 60);
            const seconds = this.duration % 60;
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.listing_id = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _listing_id_initializers, void 0));
            this.listing = (__runInitializers(this, _listing_id_extraInitializers), __runInitializers(this, _listing_initializers, void 0));
            this.media_type = (__runInitializers(this, _listing_extraInitializers), __runInitializers(this, _media_type_initializers, void 0));
            this.url = (__runInitializers(this, _media_type_extraInitializers), __runInitializers(this, _url_initializers, void 0)); // S3 or CDN URL
            this.thumbnail_url = (__runInitializers(this, _url_extraInitializers), __runInitializers(this, _thumbnail_url_initializers, void 0)); // Thumbnail for images/videos
            this.original_filename = (__runInitializers(this, _thumbnail_url_extraInitializers), __runInitializers(this, _original_filename_initializers, void 0));
            this.file_size = (__runInitializers(this, _original_filename_extraInitializers), __runInitializers(this, _file_size_initializers, void 0)); // in bytes
            this.mime_type = (__runInitializers(this, _file_size_extraInitializers), __runInitializers(this, _mime_type_initializers, void 0)); // e.g., "image/jpeg", "video/mp4"
            this.width = (__runInitializers(this, _mime_type_extraInitializers), __runInitializers(this, _width_initializers, void 0)); // For images and videos
            this.height = (__runInitializers(this, _width_extraInitializers), __runInitializers(this, _height_initializers, void 0)); // For images and videos
            this.duration = (__runInitializers(this, _height_extraInitializers), __runInitializers(this, _duration_initializers, void 0)); // For videos (in seconds)
            this.display_order = (__runInitializers(this, _duration_extraInitializers), __runInitializers(this, _display_order_initializers, void 0)); // Order in gallery (0 = primary/cover image)
            this.is_cover = (__runInitializers(this, _display_order_extraInitializers), __runInitializers(this, _is_cover_initializers, void 0)); // Main display image for listing
            this.alt_text = (__runInitializers(this, _is_cover_extraInitializers), __runInitializers(this, _alt_text_initializers, void 0)); // For accessibility
            this.caption = (__runInitializers(this, _alt_text_extraInitializers), __runInitializers(this, _caption_initializers, void 0)); // Optional description
            // Processing status (for async uploads)
            this.is_processed = (__runInitializers(this, _caption_extraInitializers), __runInitializers(this, _is_processed_initializers, void 0));
            this.processing_error = (__runInitializers(this, _is_processed_extraInitializers), __runInitializers(this, _processing_error_initializers, void 0));
            // Timestamps
            this.created_at = (__runInitializers(this, _processing_error_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            this.deleted_at = (__runInitializers(this, _updated_at_extraInitializers), __runInitializers(this, _deleted_at_initializers, void 0));
            __runInitializers(this, _deleted_at_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Media");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('increment')];
        _listing_id_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: false })];
        _listing_decorators = [(0, typeorm_1.ManyToOne)(() => pg_listing_entity_1.PGListing, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'listing_id' })];
        _media_type_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: MediaType,
                nullable: false,
            })];
        _url_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: false })];
        _thumbnail_url_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true })];
        _original_filename_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true })];
        _file_size_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
        _mime_type_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true })];
        _width_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
        _height_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
        _duration_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
        _display_order_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _is_cover_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _alt_text_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _caption_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _is_processed_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: true })];
        _processing_error_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updated_at_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deleted_at_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _listing_id_decorators, { kind: "field", name: "listing_id", static: false, private: false, access: { has: obj => "listing_id" in obj, get: obj => obj.listing_id, set: (obj, value) => { obj.listing_id = value; } }, metadata: _metadata }, _listing_id_initializers, _listing_id_extraInitializers);
        __esDecorate(null, null, _listing_decorators, { kind: "field", name: "listing", static: false, private: false, access: { has: obj => "listing" in obj, get: obj => obj.listing, set: (obj, value) => { obj.listing = value; } }, metadata: _metadata }, _listing_initializers, _listing_extraInitializers);
        __esDecorate(null, null, _media_type_decorators, { kind: "field", name: "media_type", static: false, private: false, access: { has: obj => "media_type" in obj, get: obj => obj.media_type, set: (obj, value) => { obj.media_type = value; } }, metadata: _metadata }, _media_type_initializers, _media_type_extraInitializers);
        __esDecorate(null, null, _url_decorators, { kind: "field", name: "url", static: false, private: false, access: { has: obj => "url" in obj, get: obj => obj.url, set: (obj, value) => { obj.url = value; } }, metadata: _metadata }, _url_initializers, _url_extraInitializers);
        __esDecorate(null, null, _thumbnail_url_decorators, { kind: "field", name: "thumbnail_url", static: false, private: false, access: { has: obj => "thumbnail_url" in obj, get: obj => obj.thumbnail_url, set: (obj, value) => { obj.thumbnail_url = value; } }, metadata: _metadata }, _thumbnail_url_initializers, _thumbnail_url_extraInitializers);
        __esDecorate(null, null, _original_filename_decorators, { kind: "field", name: "original_filename", static: false, private: false, access: { has: obj => "original_filename" in obj, get: obj => obj.original_filename, set: (obj, value) => { obj.original_filename = value; } }, metadata: _metadata }, _original_filename_initializers, _original_filename_extraInitializers);
        __esDecorate(null, null, _file_size_decorators, { kind: "field", name: "file_size", static: false, private: false, access: { has: obj => "file_size" in obj, get: obj => obj.file_size, set: (obj, value) => { obj.file_size = value; } }, metadata: _metadata }, _file_size_initializers, _file_size_extraInitializers);
        __esDecorate(null, null, _mime_type_decorators, { kind: "field", name: "mime_type", static: false, private: false, access: { has: obj => "mime_type" in obj, get: obj => obj.mime_type, set: (obj, value) => { obj.mime_type = value; } }, metadata: _metadata }, _mime_type_initializers, _mime_type_extraInitializers);
        __esDecorate(null, null, _width_decorators, { kind: "field", name: "width", static: false, private: false, access: { has: obj => "width" in obj, get: obj => obj.width, set: (obj, value) => { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
        __esDecorate(null, null, _height_decorators, { kind: "field", name: "height", static: false, private: false, access: { has: obj => "height" in obj, get: obj => obj.height, set: (obj, value) => { obj.height = value; } }, metadata: _metadata }, _height_initializers, _height_extraInitializers);
        __esDecorate(null, null, _duration_decorators, { kind: "field", name: "duration", static: false, private: false, access: { has: obj => "duration" in obj, get: obj => obj.duration, set: (obj, value) => { obj.duration = value; } }, metadata: _metadata }, _duration_initializers, _duration_extraInitializers);
        __esDecorate(null, null, _display_order_decorators, { kind: "field", name: "display_order", static: false, private: false, access: { has: obj => "display_order" in obj, get: obj => obj.display_order, set: (obj, value) => { obj.display_order = value; } }, metadata: _metadata }, _display_order_initializers, _display_order_extraInitializers);
        __esDecorate(null, null, _is_cover_decorators, { kind: "field", name: "is_cover", static: false, private: false, access: { has: obj => "is_cover" in obj, get: obj => obj.is_cover, set: (obj, value) => { obj.is_cover = value; } }, metadata: _metadata }, _is_cover_initializers, _is_cover_extraInitializers);
        __esDecorate(null, null, _alt_text_decorators, { kind: "field", name: "alt_text", static: false, private: false, access: { has: obj => "alt_text" in obj, get: obj => obj.alt_text, set: (obj, value) => { obj.alt_text = value; } }, metadata: _metadata }, _alt_text_initializers, _alt_text_extraInitializers);
        __esDecorate(null, null, _caption_decorators, { kind: "field", name: "caption", static: false, private: false, access: { has: obj => "caption" in obj, get: obj => obj.caption, set: (obj, value) => { obj.caption = value; } }, metadata: _metadata }, _caption_initializers, _caption_extraInitializers);
        __esDecorate(null, null, _is_processed_decorators, { kind: "field", name: "is_processed", static: false, private: false, access: { has: obj => "is_processed" in obj, get: obj => obj.is_processed, set: (obj, value) => { obj.is_processed = value; } }, metadata: _metadata }, _is_processed_initializers, _is_processed_extraInitializers);
        __esDecorate(null, null, _processing_error_decorators, { kind: "field", name: "processing_error", static: false, private: false, access: { has: obj => "processing_error" in obj, get: obj => obj.processing_error, set: (obj, value) => { obj.processing_error = value; } }, metadata: _metadata }, _processing_error_initializers, _processing_error_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: obj => "created_at" in obj, get: obj => obj.created_at, set: (obj, value) => { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: obj => "updated_at" in obj, get: obj => obj.updated_at, set: (obj, value) => { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, null, _deleted_at_decorators, { kind: "field", name: "deleted_at", static: false, private: false, access: { has: obj => "deleted_at" in obj, get: obj => obj.deleted_at, set: (obj, value) => { obj.deleted_at = value; } }, metadata: _metadata }, _deleted_at_initializers, _deleted_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Media = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Media = _classThis;
})();
exports.Media = Media;
