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
exports.Follow = void 0;
const type_graphql_1 = require("type-graphql");
const IdDate_1 = require("../graphql/interfaceTypes/IdDate");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const page_entity_1 = require("./page.entity");
let Follow = class Follow extends IdDate_1.IdDate {
};
exports.Follow = Follow;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'follower_id' }),
    __metadata("design:type", String)
], Follow.prototype, "followerId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'following_user_id', nullable: true }),
    __metadata("design:type", String)
], Follow.prototype, "followingUserId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'following_page_id', nullable: true }),
    __metadata("design:type", String)
], Follow.prototype, "followingPageId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'following_user' }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.followers),
    __metadata("design:type", Object)
], Follow.prototype, "followingUser", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => page_entity_1.Page),
    (0, typeorm_1.JoinColumn)({ name: 'following_page' }),
    (0, typeorm_1.ManyToOne)(() => page_entity_1.Page, page => page.followers),
    __metadata("design:type", Object)
], Follow.prototype, "followingPage", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.followings),
    __metadata("design:type", Object)
], Follow.prototype, "follower", void 0);
exports.Follow = Follow = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: IdDate_1.IdDate }),
    (0, typeorm_1.Entity)({ name: 'follows' })
], Follow);
