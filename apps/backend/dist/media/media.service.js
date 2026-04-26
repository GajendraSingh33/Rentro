"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const sharp = __importStar(require("sharp"));
const media_entity_1 = require("../typeorm/entities/media.entity");
const uuid_1 = require("uuid");
let MediaService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MediaService = _classThis = class {
        constructor(mediaRepository, s3Service) {
            this.mediaRepository = mediaRepository;
            this.s3Service = s3Service;
            // Maximum file sizes
            this.MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
            this.MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
            // Allowed MIME types
            this.ALLOWED_IMAGE_TYPES = [
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/webp',
            ];
            this.ALLOWED_VIDEO_TYPES = [
                'video/mp4',
                'video/mpeg',
                'video/quicktime',
            ];
        }
        /**
         * Upload an image with compression and thumbnail generation
         */
        async uploadImage(file, listingId) {
            // Validate file
            this.validateImageFile(file);
            try {
                // Generate unique filename
                const fileExtension = file.originalname.split('.').pop();
                const uniqueFilename = `${(0, uuid_1.v4)()}.${fileExtension}`;
                const s3Key = `listings/${listingId}/images/${uniqueFilename}`;
                const thumbnailKey = `listings/${listingId}/thumbnails/${uniqueFilename}`;
                // Compress and optimize image
                const compressedImage = await this.compressImage(file.buffer);
                // Generate thumbnail
                const thumbnail = await this.generateThumbnail(file.buffer);
                // Get image metadata
                const metadata = await sharp(file.buffer).metadata();
                // Upload to S3
                const [imageUrl, thumbnailUrl] = await Promise.all([
                    this.s3Service.uploadFile(compressedImage, s3Key, 'image/webp'),
                    this.s3Service.uploadFile(thumbnail, thumbnailKey, 'image/webp'),
                ]);
                // Save to database
                const media = this.mediaRepository.create({
                    listing_id: listingId,
                    media_type: media_entity_1.MediaType.IMAGE,
                    url: imageUrl,
                    thumbnail_url: thumbnailUrl,
                    original_filename: file.originalname,
                    file_size: compressedImage.length,
                    mime_type: 'image/webp', // Converted to WebP
                    width: metadata.width,
                    height: metadata.height,
                    is_processed: true,
                    display_order: await this.getNextDisplayOrder(listingId),
                });
                return await this.mediaRepository.save(media);
            }
            catch (error) {
                throw new common_1.BadRequestException(`Failed to upload image: ${error.message}`);
            }
        }
        /**
         * Upload a video
         */
        async uploadVideo(file, listingId) {
            // Validate file
            this.validateVideoFile(file);
            try {
                // Generate unique filename
                const fileExtension = file.originalname.split('.').pop();
                const uniqueFilename = `${(0, uuid_1.v4)()}.${fileExtension}`;
                const s3Key = `listings/${listingId}/videos/${uniqueFilename}`;
                // Upload to S3
                const videoUrl = await this.s3Service.uploadFile(file.buffer, s3Key, file.mimetype);
                // Save to database
                const media = this.mediaRepository.create({
                    listing_id: listingId,
                    media_type: media_entity_1.MediaType.VIDEO,
                    url: videoUrl,
                    original_filename: file.originalname,
                    file_size: file.size,
                    mime_type: file.mimetype,
                    is_processed: true,
                    display_order: await this.getNextDisplayOrder(listingId),
                });
                return await this.mediaRepository.save(media);
            }
            catch (error) {
                throw new common_1.BadRequestException(`Failed to upload video: ${error.message}`);
            }
        }
        /**
         * Delete media file
         */
        async deleteMedia(mediaId, userId) {
            const media = await this.mediaRepository.findOne({
                where: { id: mediaId },
                relations: ['listing', 'listing.owner'],
            });
            if (!media) {
                throw new common_1.BadRequestException('Media not found');
            }
            // Check ownership
            if (media.listing.owner_id !== userId) {
                throw new common_1.BadRequestException('Unauthorized to delete this media');
            }
            // Delete from S3
            const s3Key = this.s3Service.extractKeyFromUrl(media.url);
            await this.s3Service.deleteFile(s3Key);
            // Delete thumbnail if exists
            if (media.thumbnail_url) {
                const thumbnailKey = this.s3Service.extractKeyFromUrl(media.thumbnail_url);
                await this.s3Service.deleteFile(thumbnailKey);
            }
            // Soft delete from database
            await this.mediaRepository.softDelete(mediaId);
        }
        /**
         * Get all media for a listing
         */
        async getListingMedia(listingId) {
            return await this.mediaRepository.find({
                where: { listing_id: listingId },
                order: { display_order: 'ASC', created_at: 'ASC' },
            });
        }
        /**
         * Set cover image for a listing
         */
        async setCoverImage(mediaId, listingId) {
            // Remove existing cover
            await this.mediaRepository.update({ listing_id: listingId }, { is_cover: false });
            // Set new cover
            await this.mediaRepository.update(mediaId, { is_cover: true, display_order: 0 });
        }
        /**
         * Update display order
         */
        async updateDisplayOrder(mediaId, newOrder) {
            await this.mediaRepository.update(mediaId, { display_order: newOrder });
        }
        // Private helper methods
        validateImageFile(file) {
            if (!file) {
                throw new common_1.BadRequestException('No file provided');
            }
            if (!this.ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
                throw new common_1.BadRequestException(`Invalid image type. Allowed: ${this.ALLOWED_IMAGE_TYPES.join(', ')}`);
            }
            if (file.size > this.MAX_IMAGE_SIZE) {
                throw new common_1.BadRequestException(`Image too large. Maximum size: ${this.MAX_IMAGE_SIZE / 1024 / 1024}MB`);
            }
        }
        validateVideoFile(file) {
            if (!file) {
                throw new common_1.BadRequestException('No file provided');
            }
            if (!this.ALLOWED_VIDEO_TYPES.includes(file.mimetype)) {
                throw new common_1.BadRequestException(`Invalid video type. Allowed: ${this.ALLOWED_VIDEO_TYPES.join(', ')}`);
            }
            if (file.size > this.MAX_VIDEO_SIZE) {
                throw new common_1.BadRequestException(`Video too large. Maximum size: ${this.MAX_VIDEO_SIZE / 1024 / 1024}MB`);
            }
        }
        async compressImage(buffer) {
            return await sharp(buffer)
                .webp({ quality: 85 }) // Convert to WebP with 85% quality
                .resize(1920, 1080, {
                fit: 'inside',
                withoutEnlargement: true,
            })
                .toBuffer();
        }
        async generateThumbnail(buffer) {
            return await sharp(buffer)
                .webp({ quality: 70 })
                .resize(400, 300, {
                fit: 'cover',
            })
                .toBuffer();
        }
        async getNextDisplayOrder(listingId) {
            const maxOrder = await this.mediaRepository
                .createQueryBuilder('media')
                .where('media.listing_id = :listingId', { listingId })
                .select('MAX(media.display_order)', 'max')
                .getRawOne();
            return (maxOrder?.max || 0) + 1;
        }
    };
    __setFunctionName(_classThis, "MediaService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MediaService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MediaService = _classThis;
})();
exports.MediaService = MediaService;
