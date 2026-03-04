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
exports.Post = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IdDate_1 = require("../graphql/interfaceTypes/IdDate");
const mediaObject_1 = require("../graphql/objectTypes/mediaObject");
const user_entity_1 = require("./user.entity");
const page_entity_1 = require("./page.entity");
const comment_entity_1 = require("./comment.entity");
const react_entity_1 = require("./react.entity");
let Post = class Post extends IdDate_1.IdDate {
};
exports.Post = Post;
__decorate([
    (0, type_graphql_1.Field)(() => String, { defaultValue: "" }),
    (0, typeorm_1.Column)({ type: "text", default: "" }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [mediaObject_1.MediaObjectType], { defaultValue: [] }),
    (0, typeorm_1.Column)({ type: "jsonb", default: [] }),
    __metadata("design:type", Array)
], Post.prototype, "media", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { defaultValue: true }),
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], Post.prototype, "isVisible", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    (0, typeorm_1.Column)({ type: "varchar", length: 100, name: "user_id", nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: "varchar", length: 100, name: "page_id", nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "pageId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "user" }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.posts, { nullable: true }),
    __metadata("design:type", Object)
], Post.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => page_entity_1.Page, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "page" }),
    (0, typeorm_1.ManyToOne)(() => page_entity_1.Page, (page) => page.posts, { nullable: true }),
    __metadata("design:type", Object)
], Post.prototype, "page", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [comment_entity_1.Comment]),
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.post),
    __metadata("design:type", Object)
], Post.prototype, "comments", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [react_entity_1.React]),
    (0, typeorm_1.OneToMany)(() => react_entity_1.React, (react) => react.post),
    __metadata("design:type", Object)
], Post.prototype, "reacts", void 0);
exports.Post = Post = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: IdDate_1.IdDate }),
    (0, typeorm_1.Entity)({ name: "posts" })
], Post);
