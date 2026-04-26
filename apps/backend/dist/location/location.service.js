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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
let LocationService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LocationService = _classThis = class {
        constructor(configService) {
            this.configService = configService;
            this.apiKey = this.configService.get('GOOGLE_MAPS_API_KEY');
            this.googleMapsClient = new google_maps_services_js_1.Client({});
        }
        /**
         * Geocode an address to get coordinates
         */
        async geocodeAddress(address) {
            try {
                const response = await this.googleMapsClient.geocode({
                    params: {
                        address,
                        key: this.apiKey,
                    },
                });
                if (response.data.results.length === 0) {
                    throw new Error('Address not found');
                }
                const result = response.data.results[0];
                return {
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng,
                    formatted_address: result.formatted_address,
                };
            }
            catch (error) {
                throw new Error(`Geocoding failed: ${error.message}`);
            }
        }
        /**
         * Reverse geocode coordinates to get address
         */
        async reverseGeocode(latitude, longitude) {
            try {
                const response = await this.googleMapsClient.reverseGeocode({
                    params: {
                        latlng: { lat: latitude, lng: longitude },
                        key: this.apiKey,
                    },
                });
                if (response.data.results.length === 0) {
                    throw new Error('Location not found');
                }
                return response.data.results[0].formatted_address;
            }
            catch (error) {
                throw new Error(`Reverse geocoding failed: ${error.message}`);
            }
        }
        /**
         * Find nearby places
         */
        async findNearbyLandmarks(latitude, longitude, radius = 1000) {
            try {
                const response = await this.googleMapsClient.placesNearby({
                    params: {
                        location: { lat: latitude, lng: longitude },
                        radius,
                        type: 'point_of_interest',
                        key: this.apiKey,
                    },
                });
                return response.data.results
                    .slice(0, 5)
                    .map((place) => place.name);
            }
            catch (error) {
                throw new Error(`Finding landmarks failed: ${error.message}`);
            }
        }
        /**
         * Calculate distance between two points (in km)
         */
        calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371; // Radius of Earth in km
            const dLat = this.toRad(lat2 - lat1);
            const dLon = this.toRad(lon2 - lon1);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.toRad(lat1)) *
                    Math.cos(this.toRad(lat2)) *
                    Math.sin(dLon / 2) *
                    Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        }
        toRad(degrees) {
            return (degrees * Math.PI) / 180;
        }
    };
    __setFunctionName(_classThis, "LocationService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LocationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LocationService = _classThis;
})();
exports.LocationService = LocationService;
