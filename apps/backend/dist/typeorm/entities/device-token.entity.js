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
exports.DeviceToken = exports.DevicePlatform = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var DevicePlatform;
(function (DevicePlatform) {
    DevicePlatform["WEB"] = "web";
    DevicePlatform["ANDROID"] = "android";
    DevicePlatform["IOS"] = "ios";
})(DevicePlatform || (exports.DevicePlatform = DevicePlatform = {}));
let DeviceToken = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('device_tokens'), (0, typeorm_1.Index)(['user_id']), (0, typeorm_1.Index)(['token'], { unique: true })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _user_id_decorators;
    let _user_id_initializers = [];
    let _user_id_extraInitializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _token_decorators;
    let _token_initializers = [];
    let _token_extraInitializers = [];
    let _platform_decorators;
    let _platform_initializers = [];
    let _platform_extraInitializers = [];
    let _device_model_decorators;
    let _device_model_initializers = [];
    let _device_model_extraInitializers = [];
    let _app_version_decorators;
    let _app_version_initializers = [];
    let _app_version_extraInitializers = [];
    let _is_active_decorators;
    let _is_active_initializers = [];
    let _is_active_extraInitializers = [];
    let _last_used_at_decorators;
    let _last_used_at_initializers = [];
    let _last_used_at_extraInitializers = [];
    let _created_at_decorators;
    let _created_at_initializers = [];
    let _created_at_extraInitializers = [];
    let _updated_at_decorators;
    let _updated_at_initializers = [];
    let _updated_at_extraInitializers = [];
    var DeviceToken = _classThis = class {
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.user_id = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _user_id_initializers, void 0));
            this.user = (__runInitializers(this, _user_id_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.token = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _token_initializers, void 0)); // FCM token
            this.platform = (__runInitializers(this, _token_extraInitializers), __runInitializers(this, _platform_initializers, void 0));
            this.device_model = (__runInitializers(this, _platform_extraInitializers), __runInitializers(this, _device_model_initializers, void 0));
            this.app_version = (__runInitializers(this, _device_model_extraInitializers), __runInitializers(this, _app_version_initializers, void 0));
            this.is_active = (__runInitializers(this, _app_version_extraInitializers), __runInitializers(this, _is_active_initializers, void 0));
            this.last_used_at = (__runInitializers(this, _is_active_extraInitializers), __runInitializers(this, _last_used_at_initializers, void 0));
            this.created_at = (__runInitializers(this, _last_used_at_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            __runInitializers(this, _updated_at_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "DeviceToken");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _user_id_decorators = [(0, typeorm_1.Column)(), (0, typeorm_1.Index)()];
        _user_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'user_id' })];
        _token_decorators = [(0, typeorm_1.Column)({ type: 'text' }), (0, typeorm_1.Index)({ unique: true })];
        _platform_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: DevicePlatform,
            })];
        _device_model_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true })];
        _app_version_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true })];
        _is_active_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: true })];
        _last_used_at_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updated_at_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _user_id_decorators, { kind: "field", name: "user_id", static: false, private: false, access: { has: obj => "user_id" in obj, get: obj => obj.user_id, set: (obj, value) => { obj.user_id = value; } }, metadata: _metadata }, _user_id_initializers, _user_id_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: obj => "token" in obj, get: obj => obj.token, set: (obj, value) => { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
        __esDecorate(null, null, _platform_decorators, { kind: "field", name: "platform", static: false, private: false, access: { has: obj => "platform" in obj, get: obj => obj.platform, set: (obj, value) => { obj.platform = value; } }, metadata: _metadata }, _platform_initializers, _platform_extraInitializers);
        __esDecorate(null, null, _device_model_decorators, { kind: "field", name: "device_model", static: false, private: false, access: { has: obj => "device_model" in obj, get: obj => obj.device_model, set: (obj, value) => { obj.device_model = value; } }, metadata: _metadata }, _device_model_initializers, _device_model_extraInitializers);
        __esDecorate(null, null, _app_version_decorators, { kind: "field", name: "app_version", static: false, private: false, access: { has: obj => "app_version" in obj, get: obj => obj.app_version, set: (obj, value) => { obj.app_version = value; } }, metadata: _metadata }, _app_version_initializers, _app_version_extraInitializers);
        __esDecorate(null, null, _is_active_decorators, { kind: "field", name: "is_active", static: false, private: false, access: { has: obj => "is_active" in obj, get: obj => obj.is_active, set: (obj, value) => { obj.is_active = value; } }, metadata: _metadata }, _is_active_initializers, _is_active_extraInitializers);
        __esDecorate(null, null, _last_used_at_decorators, { kind: "field", name: "last_used_at", static: false, private: false, access: { has: obj => "last_used_at" in obj, get: obj => obj.last_used_at, set: (obj, value) => { obj.last_used_at = value; } }, metadata: _metadata }, _last_used_at_initializers, _last_used_at_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: obj => "created_at" in obj, get: obj => obj.created_at, set: (obj, value) => { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: obj => "updated_at" in obj, get: obj => obj.updated_at, set: (obj, value) => { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DeviceToken = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DeviceToken = _classThis;
})();
exports.DeviceToken = DeviceToken;
