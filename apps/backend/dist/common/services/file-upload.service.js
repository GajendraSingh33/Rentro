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
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sharp = __importStar(require("sharp"));
const uuid_1 = require("uuid");
let FileUploadService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FileUploadService = _classThis = class {
        constructor() {
            this.logger = new common_1.Logger(FileUploadService.name);
            this.uploadsDir = path.join(process.cwd(), 'uploads');
            // Create uploads directory if it doesn't exist
            if (!fs.existsSync(this.uploadsDir)) {
                fs.mkdirSync(this.uploadsDir, { recursive: true });
            }
        }
        async uploadProfilePicture(file) {
            const options = {
                maxSize: 5 * 1024 * 1024, // 5MB
                allowedMimes: ['image/jpeg', 'image/png', 'image/webp'],
            };
            return this.uploadFile(file, 'profiles', options);
        }
        async uploadListingImage(file) {
            const options = {
                maxSize: 10 * 1024 * 1024, // 10MB
                allowedMimes: ['image/jpeg', 'image/png', 'image/webp'],
            };
            return this.uploadFile(file, 'listings', options);
        }
        async uploadListingVideo(file) {
            const options = {
                maxSize: 100 * 1024 * 1024, // 100MB
                allowedMimes: ['video/mp4', 'video/webm', 'video/quicktime'],
            };
            return this.uploadFile(file, 'videos', options);
        }
        async uploadFile(file, category, options) {
            // Validate file
            if (!file) {
                throw new common_1.BadRequestException('No file provided');
            }
            // Check file size
            if (options.maxSize && file.size > options.maxSize) {
                throw new common_1.BadRequestException(`File size exceeds maximum of ${options.maxSize / 1024 / 1024}MB`);
            }
            // Check MIME type
            if (options.allowedMimes && !options.allowedMimes.includes(file.mimetype)) {
                throw new common_1.BadRequestException(`File type not allowed. Allowed types: ${options.allowedMimes.join(', ')}`);
            }
            try {
                const fileName = `${(0, uuid_1.v4)()}-${Date.now()}`;
                const categoryDir = path.join(this.uploadsDir, category);
                // Create category directory if it doesn't exist
                if (!fs.existsSync(categoryDir)) {
                    fs.mkdirSync(categoryDir, { recursive: true });
                }
                // For images, optimize and compress
                if (file.mimetype.startsWith('image/')) {
                    const filePath = path.join(categoryDir, `${fileName}.webp`);
                    await sharp(file.buffer)
                        .resize(2000, 2000, {
                        fit: 'inside',
                        withoutEnlargement: true,
                    })
                        .webp({ quality: 80 })
                        .toFile(filePath);
                    this.logger.log(`Image uploaded: ${fileName}.webp`);
                    return `uploads/${category}/${fileName}.webp`;
                }
                // For videos, save as-is
                const ext = path.extname(file.originalname);
                const filePath = path.join(categoryDir, `${fileName}${ext}`);
                fs.writeFileSync(filePath, file.buffer);
                this.logger.log(`File uploaded: ${fileName}${ext}`);
                return `uploads/${category}/${fileName}${ext}`;
            }
            catch (error) {
                this.logger.error(`File upload error: ${error.message}`);
                throw new common_1.BadRequestException(`Failed to upload file: ${error.message}`);
            }
        }
        async deleteFile(filePath) {
            try {
                const fullPath = path.join(process.cwd(), filePath);
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                    this.logger.log(`File deleted: ${filePath}`);
                }
            }
            catch (error) {
                this.logger.error(`Failed to delete file: ${error.message}`);
                throw new common_1.BadRequestException(`Failed to delete file: ${error.message}`);
            }
        }
    };
    __setFunctionName(_classThis, "FileUploadService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FileUploadService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FileUploadService = _classThis;
})();
exports.FileUploadService = FileUploadService;
