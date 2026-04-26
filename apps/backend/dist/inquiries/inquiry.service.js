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
exports.InquiryService = void 0;
const common_1 = require("@nestjs/common");
const inquiry_entity_1 = require("../typeorm/entities/inquiry.entity");
let InquiryService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InquiryService = _classThis = class {
        constructor(inquiryRepository, listingRepository, userRepository) {
            this.inquiryRepository = inquiryRepository;
            this.listingRepository = listingRepository;
            this.userRepository = userRepository;
        }
        async createInquiry(createInquiryDto, seekerId) {
            const listing = await this.listingRepository.findOne({
                where: { id: createInquiryDto.listing_id },
                relations: ['owner'],
            });
            if (!listing) {
                throw new common_1.NotFoundException('Listing not found');
            }
            const seeker = await this.userRepository.findOne({
                where: { id: seekerId },
            });
            const inquiry = this.inquiryRepository.create({
                ...createInquiryDto,
                seeker_id: seekerId,
                owner_id: listing.owner_id,
                seeker_name: seeker.full_name,
                seeker_email: seeker.email,
                seeker_phone: seeker.phone_number,
                status: inquiry_entity_1.InquiryStatus.NEW,
            });
            // Increment inquiry count on listing
            await this.listingRepository.increment({ id: listing.id }, 'inquiry_count', 1);
            return await this.inquiryRepository.save(inquiry);
        }
        async getInquiries(userId, isOwner, filterDto) {
            const page = filterDto.page || 1;
            const limit = filterDto.limit || 20;
            const skip = (page - 1) * limit;
            const query = this.inquiryRepository
                .createQueryBuilder('inquiry')
                .leftJoinAndSelect('inquiry.listing', 'listing')
                .leftJoinAndSelect('inquiry.seeker', 'seeker')
                .leftJoinAndSelect('inquiry.owner', 'owner');
            if (isOwner) {
                query.where('inquiry.owner_id = :userId', { userId });
            }
            else {
                query.where('inquiry.seeker_id = :userId', { userId });
            }
            if (filterDto.status) {
                query.andWhere('inquiry.status = :status', { status: filterDto.status });
            }
            if (filterDto.listing_id) {
                query.andWhere('inquiry.listing_id = :listingId', {
                    listingId: filterDto.listing_id,
                });
            }
            const total = await query.getCount();
            const data = await query
                .orderBy('inquiry.created_at', 'DESC')
                .skip(skip)
                .take(limit)
                .getMany();
            return {
                data,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        }
        async updateStatus(inquiryId, statusDto, userId) {
            const inquiry = await this.inquiryRepository.findOne({
                where: { id: inquiryId },
            });
            if (!inquiry) {
                throw new common_1.NotFoundException('Inquiry not found');
            }
            if (inquiry.owner_id !== userId) {
                throw new common_1.ForbiddenException('Only the owner can update inquiry status');
            }
            await this.inquiryRepository.update(inquiryId, {
                status: statusDto.status,
                viewed_at: statusDto.status === inquiry_entity_1.InquiryStatus.VIEWED ? new Date() : inquiry.viewed_at,
            });
            return await this.inquiryRepository.findOne({ where: { id: inquiryId } });
        }
        async respondToInquiry(inquiryId, respondDto, userId) {
            const inquiry = await this.inquiryRepository.findOne({
                where: { id: inquiryId },
            });
            if (!inquiry) {
                throw new common_1.NotFoundException('Inquiry not found');
            }
            if (inquiry.owner_id !== userId) {
                throw new common_1.ForbiddenException('Only the owner can respond');
            }
            await this.inquiryRepository.update(inquiryId, {
                owner_response: respondDto.response,
                status: inquiry_entity_1.InquiryStatus.RESPONDED,
                responded_at: new Date(),
            });
            return await this.inquiryRepository.findOne({ where: { id: inquiryId } });
        }
        async revealContact(inquiryId, userId) {
            const inquiry = await this.inquiryRepository.findOne({
                where: { id: inquiryId },
                relations: ['listing'],
            });
            if (!inquiry) {
                throw new common_1.NotFoundException('Inquiry not found');
            }
            if (inquiry.seeker_id !== userId) {
                throw new common_1.ForbiddenException('Unauthorized');
            }
            if (!inquiry.contact_revealed) {
                await this.inquiryRepository.update(inquiryId, {
                    contact_revealed: true,
                    contact_revealed_at: new Date(),
                });
            }
            return {
                contact_phone: inquiry.listing.contact_phone,
                contact_email: inquiry.listing.contact_email,
                preferred_contact_method: inquiry.listing.preferred_contact_method,
            };
        }
        async getInquiryStats(userId) {
            const [total, newCount, respondedCount, rejectedCount] = await Promise.all([
                this.inquiryRepository.count({ where: { owner_id: userId } }),
                this.inquiryRepository.count({
                    where: { owner_id: userId, status: inquiry_entity_1.InquiryStatus.NEW },
                }),
                this.inquiryRepository.count({
                    where: { owner_id: userId, status: inquiry_entity_1.InquiryStatus.RESPONDED },
                }),
                this.inquiryRepository.count({
                    where: { owner_id: userId, status: inquiry_entity_1.InquiryStatus.REJECTED },
                }),
            ]);
            return {
                total,
                new: newCount,
                responded: respondedCount,
                rejected: rejectedCount,
            };
        }
    };
    __setFunctionName(_classThis, "InquiryService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InquiryService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InquiryService = _classThis;
})();
exports.InquiryService = InquiryService;
