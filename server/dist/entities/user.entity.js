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
exports.User = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IdDate_1 = require("../graphql/interfaceTypes/IdDate");
const roles_enum_1 = require("../enums/roles.enum");
const mediaObject_1 = require("../graphql/objectTypes/mediaObject");
const post_entity_1 = require("./post.entity");
const comment_entity_1 = require("./comment.entity");
const react_entity_1 = require("./react.entity");
const page_entity_1 = require("./page.entity");
const notification_entity_1 = require("./notification.entity");
const follow_entity_1 = require("./follow.entity");
const gender_enum_1 = require("../enums/gender.enum");
let defaultValue = { url: "", public_id: "" };
let User = class User extends IdDate_1.IdDate {
    // Before Insert
    setDefaultMedia() {
        if (!this.image || !this.image.url) {
            if (this.gender === gender_enum_1.Gender.MALE) {
                this.image = {
                    url: "/images/default-male-image.jpg",
                    public_id: "",
                };
            }
            else if (this.gender === gender_enum_1.Gender.FEMALE) {
                this.image = {
                    url: "/images/default-female-image.jpg",
                    public_id: "",
                };
            }
        }
        if (!this.banner || !this.banner.url) {
            this.banner = {
                url: "/images/default-background.jpeg",
                public_id: "",
            };
        }
    }
};
exports.User = User;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: "Hello, I am Facebook User" }),
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: "Hello, I am Facebook User",
    }),
    __metadata("design:type", String)
], User.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => roles_enum_1.Roles, { defaultValue: roles_enum_1.Roles.USER }),
    (0, typeorm_1.Column)({ type: "enum", enum: roles_enum_1.Roles, default: roles_enum_1.Roles.USER }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => mediaObject_1.MediaObjectType, { defaultValue }),
    (0, typeorm_1.Column)({ type: "simple-json", default: defaultValue }),
    __metadata("design:type", Object)
], User.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => mediaObject_1.MediaObjectType, { defaultValue }),
    (0, typeorm_1.Column)({ type: "simple-json", default: defaultValue }),
    __metadata("design:type", Object)
], User.prototype, "banner", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => gender_enum_1.Gender),
    (0, typeorm_1.Column)({ type: "enum", enum: gender_enum_1.Gender }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [post_entity_1.Post]),
    (0, typeorm_1.OneToMany)(() => post_entity_1.Post, (posts) => posts.user),
    __metadata("design:type", Object)
], User.prototype, "posts", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [comment_entity_1.Comment]),
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comments) => comments.user),
    __metadata("design:type", Object)
], User.prototype, "comments", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [react_entity_1.React]),
    (0, typeorm_1.OneToMany)(() => react_entity_1.React, (reacts) => reacts.user),
    __metadata("design:type", Object)
], User.prototype, "reacts", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [page_entity_1.Page]),
    (0, typeorm_1.OneToMany)(() => page_entity_1.Page, (page) => page.user),
    __metadata("design:type", Object)
], User.prototype, "pages", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [follow_entity_1.Follow]),
    (0, typeorm_1.OneToMany)(() => follow_entity_1.Follow, (follow) => follow.followingUser),
    __metadata("design:type", Object)
], User.prototype, "followers", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [follow_entity_1.Follow]),
    (0, typeorm_1.OneToMany)(() => follow_entity_1.Follow, (follow) => follow.follower),
    __metadata("design:type", Object)
], User.prototype, "followings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, (notification) => notification.sender),
    __metadata("design:type", Object)
], User.prototype, "sentNotifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, (notification) => notification.receiver),
    __metadata("design:type", Object)
], User.prototype, "receivedNotifications", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "setDefaultMedia", null);
exports.User = User = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: IdDate_1.IdDate }),
    (0, typeorm_1.Entity)({ name: "users" })
], User);
