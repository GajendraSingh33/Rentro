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
exports.MediaResponseDto = exports.UpdateDisplayOrderDto = exports.SetCoverImageDto = exports.UploadVideoDto = exports.UploadImageDto = void 0;
const class_validator_1 = require("class-validator");
let UploadImageDto = (() => {
    var _a;
    let _listingId_decorators;
    let _listingId_initializers = [];
    let _listingId_extraInitializers = [];
    return _a = class UploadImageDto {
            constructor() {
                this.listingId = __runInitializers(this, _listingId_initializers, void 0);
                __runInitializers(this, _listingId_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _listingId_decorators = [(0, class_validator_1.IsInt)()];
            __esDecorate(null, null, _listingId_decorators, { kind: "field", name: "listingId", static: false, private: false, access: { has: obj => "listingId" in obj, get: obj => obj.listingId, set: (obj, value) => { obj.listingId = value; } }, metadata: _metadata }, _listingId_initializers, _listingId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.UploadImageDto = UploadImageDto;
let UploadVideoDto = (() => {
    var _a;
    let _listingId_decorators;
    let _listingId_initializers = [];
    let _listingId_extraInitializers = [];
    return _a = class UploadVideoDto {
            constructor() {
                this.listingId = __runInitializers(this, _listingId_initializers, void 0);
                __runInitializers(this, _listingId_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _listingId_decorators = [(0, class_validator_1.IsInt)()];
            __esDecorate(null, null, _listingId_decorators, { kind: "field", name: "listingId", static: false, private: false, access: { has: obj => "listingId" in obj, get: obj => obj.listingId, set: (obj, value) => { obj.listingId = value; } }, metadata: _metadata }, _listingId_initializers, _listingId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.UploadVideoDto = UploadVideoDto;
let SetCoverImageDto = (() => {
    var _a;
    let _listingId_decorators;
    let _listingId_initializers = [];
    let _listingId_extraInitializers = [];
    return _a = class SetCoverImageDto {
            constructor() {
                this.listingId = __runInitializers(this, _listingId_initializers, void 0);
                __runInitializers(this, _listingId_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _listingId_decorators = [(0, class_validator_1.IsInt)()];
            __esDecorate(null, null, _listingId_decorators, { kind: "field", name: "listingId", static: false, private: false, access: { has: obj => "listingId" in obj, get: obj => obj.listingId, set: (obj, value) => { obj.listingId = value; } }, metadata: _metadata }, _listingId_initializers, _listingId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.SetCoverImageDto = SetCoverImageDto;
let UpdateDisplayOrderDto = (() => {
    var _a;
    let _order_decorators;
    let _order_initializers = [];
    let _order_extraInitializers = [];
    return _a = class UpdateDisplayOrderDto {
            constructor() {
                this.order = __runInitializers(this, _order_initializers, void 0);
                __runInitializers(this, _order_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _order_decorators = [(0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0)];
            __esDecorate(null, null, _order_decorators, { kind: "field", name: "order", static: false, private: false, access: { has: obj => "order" in obj, get: obj => obj.order, set: (obj, value) => { obj.order = value; } }, metadata: _metadata }, _order_initializers, _order_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.UpdateDisplayOrderDto = UpdateDisplayOrderDto;
class MediaResponseDto {
}
exports.MediaResponseDto = MediaResponseDto;
