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
exports.InquiryFilterDto = exports.RespondToInquiryDto = exports.UpdateInquiryStatusDto = exports.CreateInquiryDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const inquiry_entity_1 = require("../../typeorm/entities/inquiry.entity");
let CreateInquiryDto = (() => {
    var _a;
    let _listing_id_decorators;
    let _listing_id_initializers = [];
    let _listing_id_extraInitializers = [];
    let _message_decorators;
    let _message_initializers = [];
    let _message_extraInitializers = [];
    let _preferred_move_in_date_decorators;
    let _preferred_move_in_date_initializers = [];
    let _preferred_move_in_date_extraInitializers = [];
    let _number_of_people_decorators;
    let _number_of_people_initializers = [];
    let _number_of_people_extraInitializers = [];
    let _duration_months_decorators;
    let _duration_months_initializers = [];
    let _duration_months_extraInitializers = [];
    let _additional_requirements_decorators;
    let _additional_requirements_initializers = [];
    let _additional_requirements_extraInitializers = [];
    return _a = class CreateInquiryDto {
            constructor() {
                this.listing_id = __runInitializers(this, _listing_id_initializers, void 0);
                this.message = (__runInitializers(this, _listing_id_extraInitializers), __runInitializers(this, _message_initializers, void 0));
                this.preferred_move_in_date = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _preferred_move_in_date_initializers, void 0));
                this.number_of_people = (__runInitializers(this, _preferred_move_in_date_extraInitializers), __runInitializers(this, _number_of_people_initializers, void 0));
                this.duration_months = (__runInitializers(this, _number_of_people_extraInitializers), __runInitializers(this, _duration_months_initializers, void 0));
                this.additional_requirements = (__runInitializers(this, _duration_months_extraInitializers), __runInitializers(this, _additional_requirements_initializers, void 0));
                __runInitializers(this, _additional_requirements_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _listing_id_decorators = [(0, class_validator_1.IsInt)()];
            _message_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(10), (0, class_validator_1.MaxLength)(1000)];
            _preferred_move_in_date_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(() => Date), (0, class_validator_1.IsDate)()];
            _number_of_people_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(20)];
            _duration_months_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(120)];
            _additional_requirements_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _listing_id_decorators, { kind: "field", name: "listing_id", static: false, private: false, access: { has: obj => "listing_id" in obj, get: obj => obj.listing_id, set: (obj, value) => { obj.listing_id = value; } }, metadata: _metadata }, _listing_id_initializers, _listing_id_extraInitializers);
            __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: obj => "message" in obj, get: obj => obj.message, set: (obj, value) => { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            __esDecorate(null, null, _preferred_move_in_date_decorators, { kind: "field", name: "preferred_move_in_date", static: false, private: false, access: { has: obj => "preferred_move_in_date" in obj, get: obj => obj.preferred_move_in_date, set: (obj, value) => { obj.preferred_move_in_date = value; } }, metadata: _metadata }, _preferred_move_in_date_initializers, _preferred_move_in_date_extraInitializers);
            __esDecorate(null, null, _number_of_people_decorators, { kind: "field", name: "number_of_people", static: false, private: false, access: { has: obj => "number_of_people" in obj, get: obj => obj.number_of_people, set: (obj, value) => { obj.number_of_people = value; } }, metadata: _metadata }, _number_of_people_initializers, _number_of_people_extraInitializers);
            __esDecorate(null, null, _duration_months_decorators, { kind: "field", name: "duration_months", static: false, private: false, access: { has: obj => "duration_months" in obj, get: obj => obj.duration_months, set: (obj, value) => { obj.duration_months = value; } }, metadata: _metadata }, _duration_months_initializers, _duration_months_extraInitializers);
            __esDecorate(null, null, _additional_requirements_decorators, { kind: "field", name: "additional_requirements", static: false, private: false, access: { has: obj => "additional_requirements" in obj, get: obj => obj.additional_requirements, set: (obj, value) => { obj.additional_requirements = value; } }, metadata: _metadata }, _additional_requirements_initializers, _additional_requirements_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.CreateInquiryDto = CreateInquiryDto;
let UpdateInquiryStatusDto = (() => {
    var _a;
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    return _a = class UpdateInquiryStatusDto {
            constructor() {
                this.status = __runInitializers(this, _status_initializers, void 0);
                __runInitializers(this, _status_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _status_decorators = [(0, class_validator_1.IsEnum)(inquiry_entity_1.InquiryStatus)];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.UpdateInquiryStatusDto = UpdateInquiryStatusDto;
let RespondToInquiryDto = (() => {
    var _a;
    let _response_decorators;
    let _response_initializers = [];
    let _response_extraInitializers = [];
    return _a = class RespondToInquiryDto {
            constructor() {
                this.response = __runInitializers(this, _response_initializers, void 0);
                __runInitializers(this, _response_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _response_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(10), (0, class_validator_1.MaxLength)(2000)];
            __esDecorate(null, null, _response_decorators, { kind: "field", name: "response", static: false, private: false, access: { has: obj => "response" in obj, get: obj => obj.response, set: (obj, value) => { obj.response = value; } }, metadata: _metadata }, _response_initializers, _response_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.RespondToInquiryDto = RespondToInquiryDto;
let InquiryFilterDto = (() => {
    var _a;
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _listing_id_decorators;
    let _listing_id_initializers = [];
    let _listing_id_extraInitializers = [];
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    return _a = class InquiryFilterDto {
            constructor() {
                this.status = __runInitializers(this, _status_initializers, void 0);
                this.listing_id = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _listing_id_initializers, void 0));
                this.page = (__runInitializers(this, _listing_id_extraInitializers), __runInitializers(this, _page_initializers, void 0));
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
                __runInitializers(this, _limit_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(inquiry_entity_1.InquiryStatus)];
            _listing_id_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)()];
            _page_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)()];
            _limit_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)()];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _listing_id_decorators, { kind: "field", name: "listing_id", static: false, private: false, access: { has: obj => "listing_id" in obj, get: obj => obj.listing_id, set: (obj, value) => { obj.listing_id = value; } }, metadata: _metadata }, _listing_id_initializers, _listing_id_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.InquiryFilterDto = InquiryFilterDto;
