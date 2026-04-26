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
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
let ContactService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ContactService = _classThis = class {
        constructor(userRepository, listingRepository) {
            this.userRepository = userRepository;
            this.listingRepository = listingRepository;
        }
        maskPhone(phone) {
            if (!phone || phone.length < 10)
                return '******';
            return phone.slice(0, 3) + '*'.repeat(phone.length - 6) + phone.slice(-3);
        }
        maskEmail(email) {
            if (!email)
                return '***@***.***';
            const [local, domain] = email.split('@');
            const maskedLocal = local.slice(0, 2) + '*'.repeat(Math.max(local.length - 2, 3));
            return `${maskedLocal}@${domain}`;
        }
        async getOwnerContact(ownerId, revealed = false) {
            const owner = await this.userRepository.findOne({ where: { id: ownerId } });
            if (!owner)
                return null;
            if (revealed) {
                return {
                    name: owner.name,
                    email: owner.email,
                    phone: owner.phone,
                    preferred_contact: 'phone',
                };
            }
            return {
                name: owner.name,
                email: this.maskEmail(owner.email),
                phone: owner.phone ? this.maskPhone(owner.phone) : null,
                preferred_contact: 'inquiry',
            };
        }
        async getListingContact(listingId, revealed = false) {
            const listing = await this.listingRepository.findOne({
                where: { id: listingId },
                relations: ['owner'],
            });
            if (!listing)
                return null;
            if (revealed) {
                return {
                    contact_name: listing.contact_name || listing.owner?.name,
                    contact_phone: listing.contact_phone || listing.owner?.phone,
                    contact_email: listing.contact_email || listing.owner?.email,
                    whatsapp: listing.whatsapp_number,
                };
            }
            return {
                contact_name: listing.contact_name || listing.owner?.name,
                contact_phone: listing.contact_phone ? this.maskPhone(listing.contact_phone) : null,
                contact_email: listing.contact_email ? this.maskEmail(listing.contact_email) : null,
                whatsapp: listing.whatsapp_number ? this.maskPhone(listing.whatsapp_number) : null,
            };
        }
        async updateListingContact(listingId, data) {
            await this.listingRepository.update(listingId, data);
            return await this.listingRepository.findOne({ where: { id: listingId } });
        }
    };
    __setFunctionName(_classThis, "ContactService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ContactService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ContactService = _classThis;
})();
exports.ContactService = ContactService;
