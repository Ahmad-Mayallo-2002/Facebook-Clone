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
exports.Comment = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IdDate_1 = require("../graphql/interfaceTypes/IdDate");
const mediaObject_1 = require("../graphql/objectTypes/mediaObject");
const user_entity_1 = require("./user.entity");
const post_entity_1 = require("./post.entity");
const react_entity_1 = require("./react.entity");
let Comment = class Comment extends IdDate_1.IdDate {
};
exports.Comment = Comment;
__decorate([
    (0, type_graphql_1.Field)(() => String, { defaultValue: "" }),
    (0, typeorm_1.Column)({ type: "varchar", length: 255, default: "" }),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [mediaObject_1.MediaObjectType]),
    (0, typeorm_1.Column)({ type: "simple-json", default: [] }),
    __metadata("design:type", Array)
], Comment.prototype, "media", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Comment.prototype, "isVisible", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.Column)({ type: "varchar", length: 100, name: "user_id" }),
    __metadata("design:type", String)
], Comment.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.Column)({ type: "varchar", length: 100, name: "post_id" }),
    __metadata("design:type", String)
], Comment.prototype, "postId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: "user" }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.comments),
    __metadata("design:type", Object)
], Comment.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => post_entity_1.Post),
    (0, typeorm_1.JoinColumn)({ name: "post" }),
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, (post) => post.comments),
    __metadata("design:type", Object)
], Comment.prototype, "post", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [react_entity_1.React]),
    (0, typeorm_1.OneToMany)(() => react_entity_1.React, (react) => react.comment),
    __metadata("design:type", Object)
], Comment.prototype, "reacts", void 0);
exports.Comment = Comment = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: IdDate_1.IdDate }),
    (0, typeorm_1.Entity)({ name: "comments" })
], Comment);
