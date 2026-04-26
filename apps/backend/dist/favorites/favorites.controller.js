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
exports.FavoritesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let FavoritesController = (() => {
    let _classDecorators = [(0, common_1.Controller)('favorites'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _addFavorite_decorators;
    let _getFavorites_decorators;
    let _getFavoritesCount_decorators;
    let _checkFavorite_decorators;
    let _checkMultipleFavorites_decorators;
    let _toggleFavorite_decorators;
    let _updateFavorite_decorators;
    let _removeFavorite_decorators;
    var FavoritesController = _classThis = class {
        constructor(favoritesService) {
            this.favoritesService = (__runInitializers(this, _instanceExtraInitializers), favoritesService);
        }
        /**
         * Add a listing to favorites
         * POST /favorites
         */
        async addFavorite(userId, dto) {
            return this.favoritesService.addFavorite(userId, dto);
        }
        /**
         * Get user's favorites list
         * GET /favorites
         */
        async getFavorites(userId, query) {
            return this.favoritesService.getFavorites(userId, query);
        }
        /**
         * Get favorites count
         * GET /favorites/count
         */
        async getFavoritesCount(userId) {
            const count = await this.favoritesService.getFavoritesCount(userId);
            return { count };
        }
        /**
         * Check if a listing is favorited
         * GET /favorites/check/:listingId
         */
        async checkFavorite(userId, listingId) {
            return this.favoritesService.checkFavorite(userId, listingId);
        }
        /**
         * Check multiple listings for favorites (batch)
         * POST /favorites/check-batch
         */
        async checkMultipleFavorites(userId, body) {
            const favorites = await this.favoritesService.checkMultipleFavorites(userId, body.listing_ids);
            return { favorites };
        }
        /**
         * Toggle favorite status
         * POST /favorites/toggle/:listingId
         */
        async toggleFavorite(userId, listingId) {
            return this.favoritesService.toggleFavorite(userId, listingId);
        }
        /**
         * Update favorite notes
         * PUT /favorites/:favoriteId
         */
        async updateFavorite(userId, favoriteId, dto) {
            return this.favoritesService.updateFavorite(userId, favoriteId, dto);
        }
        /**
         * Remove from favorites by listing ID
         * DELETE /favorites/listing/:listingId
         */
        async removeFavorite(userId, listingId) {
            return this.favoritesService.removeFavorite(userId, listingId);
        }
    };
    __setFunctionName(_classThis, "FavoritesController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _addFavorite_decorators = [(0, common_1.Post)(), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED)];
        _getFavorites_decorators = [(0, common_1.Get)(), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getFavoritesCount_decorators = [(0, common_1.Get)('count'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _checkFavorite_decorators = [(0, common_1.Get)('check/:listingId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _checkMultipleFavorites_decorators = [(0, common_1.Post)('check-batch'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _toggleFavorite_decorators = [(0, common_1.Post)('toggle/:listingId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _updateFavorite_decorators = [(0, common_1.Put)(':favoriteId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _removeFavorite_decorators = [(0, common_1.Delete)('listing/:listingId'), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT)];
        __esDecorate(_classThis, null, _addFavorite_decorators, { kind: "method", name: "addFavorite", static: false, private: false, access: { has: obj => "addFavorite" in obj, get: obj => obj.addFavorite }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getFavorites_decorators, { kind: "method", name: "getFavorites", static: false, private: false, access: { has: obj => "getFavorites" in obj, get: obj => obj.getFavorites }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getFavoritesCount_decorators, { kind: "method", name: "getFavoritesCount", static: false, private: false, access: { has: obj => "getFavoritesCount" in obj, get: obj => obj.getFavoritesCount }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _checkFavorite_decorators, { kind: "method", name: "checkFavorite", static: false, private: false, access: { has: obj => "checkFavorite" in obj, get: obj => obj.checkFavorite }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _checkMultipleFavorites_decorators, { kind: "method", name: "checkMultipleFavorites", static: false, private: false, access: { has: obj => "checkMultipleFavorites" in obj, get: obj => obj.checkMultipleFavorites }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _toggleFavorite_decorators, { kind: "method", name: "toggleFavorite", static: false, private: false, access: { has: obj => "toggleFavorite" in obj, get: obj => obj.toggleFavorite }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateFavorite_decorators, { kind: "method", name: "updateFavorite", static: false, private: false, access: { has: obj => "updateFavorite" in obj, get: obj => obj.updateFavorite }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeFavorite_decorators, { kind: "method", name: "removeFavorite", static: false, private: false, access: { has: obj => "removeFavorite" in obj, get: obj => obj.removeFavorite }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FavoritesController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FavoritesController = _classThis;
})();
exports.FavoritesController = FavoritesController;
