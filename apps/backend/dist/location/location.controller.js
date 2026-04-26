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
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
class GeocodeDto {
}
class ReverseGeocodeDto {
}
class NearbyDto {
}
let LocationController = (() => {
    let _classDecorators = [(0, common_1.Controller)('location')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _geocode_decorators;
    let _reverseGeocode_decorators;
    let _nearbyLandmarks_decorators;
    let _autocomplete_decorators;
    let _calculateDistance_decorators;
    var LocationController = _classThis = class {
        constructor(locationService) {
            this.locationService = (__runInitializers(this, _instanceExtraInitializers), locationService);
        }
        async geocode(dto) {
            return await this.locationService.geocode(dto.address);
        }
        async reverseGeocode(dto) {
            return await this.locationService.reverseGeocode(dto.lat, dto.lng);
        }
        async nearbyLandmarks(dto) {
            return await this.locationService.searchNearbyLandmarks(dto.lat, dto.lng, dto.radius || 1000);
        }
        async autocomplete(input) {
            if (!input || input.length < 3)
                return [];
            return await this.locationService.autocomplete(input);
        }
        async calculateDistance(dto) {
            const distance = this.locationService.calculateDistance(dto.from.lat, dto.from.lng, dto.to.lat, dto.to.lng);
            return { distance, unit: 'meters' };
        }
    };
    __setFunctionName(_classThis, "LocationController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _geocode_decorators = [(0, common_1.Post)('geocode')];
        _reverseGeocode_decorators = [(0, common_1.Post)('reverse-geocode')];
        _nearbyLandmarks_decorators = [(0, common_1.Post)('nearby')];
        _autocomplete_decorators = [(0, common_1.Get)('autocomplete')];
        _calculateDistance_decorators = [(0, common_1.Post)('distance')];
        __esDecorate(_classThis, null, _geocode_decorators, { kind: "method", name: "geocode", static: false, private: false, access: { has: obj => "geocode" in obj, get: obj => obj.geocode }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _reverseGeocode_decorators, { kind: "method", name: "reverseGeocode", static: false, private: false, access: { has: obj => "reverseGeocode" in obj, get: obj => obj.reverseGeocode }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _nearbyLandmarks_decorators, { kind: "method", name: "nearbyLandmarks", static: false, private: false, access: { has: obj => "nearbyLandmarks" in obj, get: obj => obj.nearbyLandmarks }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _autocomplete_decorators, { kind: "method", name: "autocomplete", static: false, private: false, access: { has: obj => "autocomplete" in obj, get: obj => obj.autocomplete }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _calculateDistance_decorators, { kind: "method", name: "calculateDistance", static: false, private: false, access: { has: obj => "calculateDistance" in obj, get: obj => obj.calculateDistance }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LocationController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LocationController = _classThis;
})();
exports.LocationController = LocationController;
