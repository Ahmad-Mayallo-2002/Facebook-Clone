"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const notification_service_1 = require("../services/notification.service");
const notification_entity_1 = require("../entities/notification.entity");
const notification_input_1 = require("../graphql/inputs/notification.input");
const user_entity_1 = require("../entities/user.entity");
const notificationPaginated_1 = require("../graphql/objectTypes/notificationPaginated");
let NotificationResolver = class NotificationResolver {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async getNotifications(take, skip) {
        return this.notificationService.getNotifications(take, skip);
    }
    async getReceiverNotifications(take, skip, { session }) {
        return this.notificationService.getReceiverNotifications(session.userId, take, skip);
    }
    async getById(id) {
        return this.notificationService.getById(id);
    }
    async deleteNotification(id) {
        return this.notificationService.deleteNotification(id);
    }
    async createNotification(input, { session }) {
        const notification = await this.notificationService.createNotification(input, session.userId);
        return notification;
    }
    // Field Resolvers for Data Loader
    async sender(notification, { idByUserLoader }) {
        return await idByUserLoader.load(notification.senderId);
    }
    async receiver(notification, { idByUserLoader }) {
        return await idByUserLoader.load(notification.receiverId);
    }
};
exports.NotificationResolver = NotificationResolver;
__decorate([
    (0, type_graphql_1.Query)(() => notificationPaginated_1.NotificationPaginated),
    __param(0, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "getNotifications", null);
__decorate([
    (0, type_graphql_1.Query)(() => notificationPaginated_1.NotificationPaginated),
    __param(0, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "getReceiverNotifications", null);
__decorate([
    (0, type_graphql_1.Query)(() => notification_entity_1.Notification),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "getById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "deleteNotification", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => notification_entity_1.Notification),
    __param(0, (0, type_graphql_1.Arg)("input", () => notification_input_1.NotificationInput)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_input_1.NotificationInput, Object]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "createNotification", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => user_entity_1.User),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_entity_1.Notification, Object]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "sender", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => user_entity_1.User),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_entity_1.Notification, Object]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "receiver", null);
exports.NotificationResolver = NotificationResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(() => notification_entity_1.Notification),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationResolver);
