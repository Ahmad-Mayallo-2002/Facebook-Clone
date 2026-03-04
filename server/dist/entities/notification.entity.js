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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IdDate_1 = require("../graphql/interfaceTypes/IdDate");
const user_entity_1 = require("./user.entity");
const notification_type_enum_1 = require("../enums/notification-type.enum");
let Notification = class Notification extends IdDate_1.IdDate {
};
exports.Notification = Notification;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Notification.prototype, "content", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => notification_type_enum_1.NotificationType),
    (0, typeorm_1.Column)({ type: "enum", enum: notification_type_enum_1.NotificationType }),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "referenceId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Notification.prototype, "senderId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Notification.prototype, "receiverId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: "sender" }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.sentNotifications),
    __metadata("design:type", Object)
], Notification.prototype, "sender", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: "receiver" }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.receivedNotifications),
    __metadata("design:type", Object)
], Notification.prototype, "receiver", void 0);
exports.Notification = Notification = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: IdDate_1.IdDate }),
    (0, typeorm_1.Entity)({ name: "notifications" })
], Notification);
