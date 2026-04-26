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
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
let S3Service = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var S3Service = _classThis = class {
        constructor(configService) {
            this.configService = configService;
            this.region = this.configService.get('AWS_REGION') || 'us-east-1';
            this.bucketName = this.configService.get('AWS_S3_BUCKET') || 'rentro-media';
            this.s3Client = new client_s3_1.S3Client({
                region: this.region,
                credentials: {
                    accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                    secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
                },
            });
        }
        /**
         * Upload a file to S3
         * @param file - File buffer to upload
         * @param key - S3 object key (file path)
         * @param contentType - MIME type of the file
         * @returns S3 object URL
         */
        async uploadFile(file, key, contentType) {
            try {
                const upload = new lib_storage_1.Upload({
                    client: this.s3Client,
                    params: {
                        Bucket: this.bucketName,
                        Key: key,
                        Body: file,
                        ContentType: contentType,
                        ACL: 'public-read', // Make files publicly accessible
                    },
                });
                await upload.done();
                // Return the public URL
                return this.getPublicUrl(key);
            }
            catch (error) {
                throw new Error(`Failed to upload file to S3: ${error.message}`);
            }
        }
        /**
         * Delete a file from S3
         * @param key - S3 object key to delete
         */
        async deleteFile(key) {
            try {
                const command = new client_s3_1.DeleteObjectCommand({
                    Bucket: this.bucketName,
                    Key: key,
                });
                await this.s3Client.send(command);
            }
            catch (error) {
                throw new Error(`Failed to delete file from S3: ${error.message}`);
            }
        }
        /**
         * Get file from S3
         * @param key - S3 object key
         * @returns File buffer
         */
        async getFile(key) {
            try {
                const command = new client_s3_1.GetObjectCommand({
                    Bucket: this.bucketName,
                    Key: key,
                });
                const response = await this.s3Client.send(command);
                const stream = response.Body;
                return Buffer.from(await stream.transformToByteArray());
            }
            catch (error) {
                throw new Error(`Failed to get file from S3: ${error.message}`);
            }
        }
        /**
         * Generate public URL for an S3 object
         * @param key - S3 object key
         * @returns Public URL
         */
        getPublicUrl(key) {
            return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
        }
        /**
         * Extract S3 key from URL
         * @param url - S3 URL
         * @returns S3 key
         */
        extractKeyFromUrl(url) {
            const urlParts = url.split('.amazonaws.com/');
            return urlParts.length > 1 ? urlParts[1] : '';
        }
        /**
         * Check if S3 credentials are configured
         * @returns true if credentials are set
         */
        isConfigured() {
            return !!(this.configService.get('AWS_ACCESS_KEY_ID') &&
                this.configService.get('AWS_SECRET_ACCESS_KEY'));
        }
    };
    __setFunctionName(_classThis, "S3Service");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        S3Service = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return S3Service = _classThis;
})();
exports.S3Service = S3Service;
