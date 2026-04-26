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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const media_module_1 = require("./media/media.module");
const listing_module_1 = require("./listings/listing.module");
const location_module_1 = require("./location/location.module");
const availability_module_1 = require("./availability/availability.module");
const inquiry_module_1 = require("./inquiries/inquiry.module");
const analytics_module_1 = require("./analytics/analytics.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const contact_module_1 = require("./contact/contact.module");
const moderation_module_1 = require("./moderation/moderation.module");
const notification_module_1 = require("./notifications/notification.module");
// Phase 4 modules
const search_module_1 = require("./search/search.module");
const favorites_module_1 = require("./favorites/favorites.module");
const reviews_module_1 = require("./reviews/reviews.module");
const seeker_dashboard_module_1 = require("./seeker-dashboard/seeker-dashboard.module");
// Phase 5 modules
const admin_module_1 = require("./admin/admin.module");
const content_module_1 = require("./content/content.module");
// Phase 6 modules
const messaging_module_1 = require("./messaging/messaging.module");
const booking_module_1 = require("./bookings/booking.module");
const entities_1 = require("./typeorm/entities");
let AppModule = (() => {
    let _classDecorators = [(0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: '.env',
                }),
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: process.env.DB_HOST || 'localhost',
                    port: parseInt(process.env.DB_PORT) || 5432,
                    username: process.env.DB_USERNAME || 'rentro_user',
                    password: process.env.DB_PASSWORD || 'rentro_password',
                    database: process.env.DB_NAME || 'rentro_dev',
                    entities: [entities_1.User, entities_1.PGListing, entities_1.Inquiry, entities_1.Availability, entities_1.Media, entities_1.Favorite, entities_1.Review, entities_1.StaticPage, entities_1.Message, entities_1.Conversation, entities_1.Booking, entities_1.Payment, entities_1.PremiumListing, entities_1.Offer, entities_1.UserActivity, entities_1.DeviceToken],
                    synchronize: process.env.NODE_ENV === 'development',
                    logging: process.env.NODE_ENV === 'development',
                }),
                auth_module_1.AuthModule,
                media_module_1.MediaModule,
                listing_module_1.ListingModule,
                location_module_1.LocationModule,
                availability_module_1.AvailabilityModule,
                inquiry_module_1.InquiryModule,
                analytics_module_1.AnalyticsModule,
                dashboard_module_1.DashboardModule,
                contact_module_1.ContactModule,
                moderation_module_1.ModerationModule,
                notification_module_1.NotificationModule,
                // Phase 4 modules
                search_module_1.SearchModule,
                favorites_module_1.FavoritesModule,
                reviews_module_1.ReviewsModule,
                seeker_dashboard_module_1.SeekerDashboardModule,
                // Phase 5 modules
                admin_module_1.AdminModule,
                content_module_1.ContentModule,
                // Phase 6 modules
                messaging_module_1.MessagingModule,
                booking_module_1.BookingModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppModule = _classThis = class {
    };
    __setFunctionName(_classThis, "AppModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
})();
exports.AppModule = AppModule;
