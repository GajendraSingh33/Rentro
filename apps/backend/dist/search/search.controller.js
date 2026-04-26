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
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
let SearchController = (() => {
    let _classDecorators = [(0, common_1.Controller)('search')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _search_decorators;
    let _searchWithFacets_decorators;
    let _autocomplete_decorators;
    let _getPopularSearches_decorators;
    let _getNearbyListings_decorators;
    let _getSimilarListings_decorators;
    var SearchController = _classThis = class {
        constructor(searchService) {
            this.searchService = (__runInitializers(this, _instanceExtraInitializers), searchService);
        }
        /**
         * Main search endpoint with all filters
         * GET /search?city=bangalore&min_rent=5000&max_rent=15000&room_type=single...
         */
        async search(searchDto) {
            return this.searchService.search(searchDto);
        }
        /**
         * Search with facets (filter counts)
         * GET /search/with-facets?city=bangalore...
         */
        async searchWithFacets(searchDto) {
            return this.searchService.searchWithFacets(searchDto);
        }
        /**
         * Autocomplete suggestions
         * GET /search/autocomplete?query=ban
         */
        async autocomplete(autocompleteDto) {
            return this.searchService.autocomplete(autocompleteDto);
        }
        /**
         * Get popular searches
         * GET /search/popular
         */
        async getPopularSearches() {
            const suggestions = await this.searchService.getPopularSearches();
            return { suggestions };
        }
        /**
         * Get nearby listings based on coordinates
         * GET /search/nearby?latitude=12.9716&longitude=77.5946&radius_km=10
         */
        async getNearbyListings(latitude, longitude, radiusKm, limit) {
            const data = await this.searchService.getNearbyListings(parseFloat(latitude), parseFloat(longitude), radiusKm ? parseFloat(radiusKm) : 10, limit ? parseInt(limit) : 10);
            return { data };
        }
        /**
         * Get similar listings
         * GET /search/similar/:listingId
         */
        async getSimilarListings(listingId, limit) {
            const data = await this.searchService.getSimilarListings(listingId, limit ? parseInt(limit) : 6);
            return { data };
        }
    };
    __setFunctionName(_classThis, "SearchController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _search_decorators = [(0, common_1.Get)(), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _searchWithFacets_decorators = [(0, common_1.Get)('with-facets'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _autocomplete_decorators = [(0, common_1.Get)('autocomplete'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getPopularSearches_decorators = [(0, common_1.Get)('popular'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getNearbyListings_decorators = [(0, common_1.Get)('nearby'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getSimilarListings_decorators = [(0, common_1.Get)('similar/:listingId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        __esDecorate(_classThis, null, _search_decorators, { kind: "method", name: "search", static: false, private: false, access: { has: obj => "search" in obj, get: obj => obj.search }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _searchWithFacets_decorators, { kind: "method", name: "searchWithFacets", static: false, private: false, access: { has: obj => "searchWithFacets" in obj, get: obj => obj.searchWithFacets }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _autocomplete_decorators, { kind: "method", name: "autocomplete", static: false, private: false, access: { has: obj => "autocomplete" in obj, get: obj => obj.autocomplete }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPopularSearches_decorators, { kind: "method", name: "getPopularSearches", static: false, private: false, access: { has: obj => "getPopularSearches" in obj, get: obj => obj.getPopularSearches }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getNearbyListings_decorators, { kind: "method", name: "getNearbyListings", static: false, private: false, access: { has: obj => "getNearbyListings" in obj, get: obj => obj.getNearbyListings }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getSimilarListings_decorators, { kind: "method", name: "getSimilarListings", static: false, private: false, access: { has: obj => "getSimilarListings" in obj, get: obj => obj.getSimilarListings }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SearchController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SearchController = _classThis;
})();
exports.SearchController = SearchController;
