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
exports.AvailabilityService = void 0;
const common_1 = require("@nestjs/common");
const availability_entity_1 = require("../typeorm/entities/availability.entity");
let AvailabilityService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AvailabilityService = _classThis = class {
        constructor(availabilityRepository, listingRepository) {
            this.availabilityRepository = availabilityRepository;
            this.listingRepository = listingRepository;
        }
        async getAvailability(listingId) {
            return await this.availabilityRepository.find({
                where: { listing_id: listingId },
                order: { room_number: 'ASC' },
            });
        }
        async updateAvailability(listingId, roomNumber, data) {
            let availability = await this.availabilityRepository.findOne({
                where: { listing_id: listingId, room_number: roomNumber },
            });
            if (!availability) {
                availability = this.availabilityRepository.create({
                    listing_id: listingId,
                    room_number: roomNumber,
                    ...data,
                });
            }
            else {
                Object.assign(availability, data);
            }
            const saved = await this.availabilityRepository.save(availability);
            await this.syncListingAvailability(listingId);
            return saved;
        }
        async bulkUpdateAvailability(listingId, updates) {
            const results = [];
            for (const update of updates) {
                const result = await this.updateAvailability(listingId, update.room_number, update);
                results.push(result);
            }
            await this.syncListingAvailability(listingId);
            return results;
        }
        async createRoomAvailability(listingId, roomNumber, totalBeds) {
            const availability = this.availabilityRepository.create({
                listing_id: listingId,
                room_number: roomNumber,
                total_beds_in_room: totalBeds,
                available_beds_in_room: totalBeds,
                status: availability_entity_1.AvailabilityStatus.AVAILABLE,
            });
            return await this.availabilityRepository.save(availability);
        }
        async syncListingAvailability(listingId) {
            const rooms = await this.availabilityRepository.find({ where: { listing_id: listingId } });
            const totalBeds = rooms.reduce((sum, r) => sum + r.total_beds_in_room, 0);
            const availableBeds = rooms.reduce((sum, r) => sum + r.available_beds_in_room, 0);
            const totalRooms = rooms.length;
            const availableRooms = rooms.filter(r => r.available_beds_in_room > 0).length;
            await this.listingRepository.update(listingId, {
                total_beds: totalBeds,
                available_beds: availableBeds,
                total_rooms: totalRooms,
                available_rooms: availableRooms,
            });
        }
    };
    __setFunctionName(_classThis, "AvailabilityService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AvailabilityService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AvailabilityService = _classThis;
})();
exports.AvailabilityService = AvailabilityService;
