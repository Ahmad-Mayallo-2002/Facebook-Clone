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
exports.NotificationInput = void 0;
const type_graphql_1 = require("type-graphql");
const notification_type_enum_1 = require("../../enums/notification-type.enum");
const class_validator_1 = require("class-validator");
let NotificationInput = class NotificationInput {
};
exports.NotificationInput = NotificationInput;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NotificationInput.prototype, "content", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => notification_type_enum_1.NotificationType),
    (0, class_validator_1.IsEnum)(notification_type_enum_1.NotificationType),
    __metadata("design:type", String)
], NotificationInput.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], NotificationInput.prototype, "receiverId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationInput.prototype, "referenceId", void 0);
exports.NotificationInput = NotificationInput = __decorate([
    (0, type_graphql_1.InputType)()
], NotificationInput);
