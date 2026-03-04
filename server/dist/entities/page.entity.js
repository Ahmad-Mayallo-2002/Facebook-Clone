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
exports.Page = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IdDate_1 = require("../graphql/interfaceTypes/IdDate");
const mediaObject_1 = require("../graphql/objectTypes/mediaObject");
const user_entity_1 = require("./user.entity");
const follow_entity_1 = require("./follow.entity");
const post_entity_1 = require("./post.entity");
let Page = class Page extends IdDate_1.IdDate {
};
exports.Page = Page;
__decorate([
    (0, type_graphql_1.Field)(() => mediaObject_1.MediaObjectType, { defaultValue: {} }),
    (0, typeorm_1.Column)({ type: "simple-json", default: {} }),
    __metadata("design:type", Object)
], Page.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => mediaObject_1.MediaObjectType, { defaultValue: {} }),
    (0, typeorm_1.Column)({ type: "simple-json", default: {} }),
    __metadata("design:type", Object)
], Page.prototype, "banner", void 0);
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: "" }),
    (0, typeorm_1.Column)({ type: "varchar", length: 255, default: "" }),
    __metadata("design:type", String)
], Page.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.Column)({ type: "varchar", length: 100, name: "user_id" }),
    __metadata("design:type", String)
], Page.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.pages),
    __metadata("design:type", Object)
], Page.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [follow_entity_1.Follow]),
    (0, typeorm_1.OneToMany)(() => follow_entity_1.Follow, (follow) => follow.followingPage),
    __metadata("design:type", Object)
], Page.prototype, "followers", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [post_entity_1.Post]),
    (0, typeorm_1.OneToMany)(() => post_entity_1.Post, (post) => post.page),
    __metadata("design:type", Object)
], Page.prototype, "posts", void 0);
exports.Page = Page = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: IdDate_1.IdDate }),
    (0, typeorm_1.Entity)({ name: "pages" })
], Page);
