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
exports.React = void 0;
const type_graphql_1 = require("type-graphql");
const emotions_enum_1 = require("../enums/emotions.enum");
const reactType_enum_1 = require("../enums/reactType.enum");
const typeorm_1 = require("typeorm");
const IdDate_1 = require("../graphql/interfaceTypes/IdDate");
const user_entity_1 = require("./user.entity");
const post_entity_1 = require("./post.entity");
const comment_entity_1 = require("./comment.entity");
let React = class React extends IdDate_1.IdDate {
};
exports.React = React;
__decorate([
    (0, type_graphql_1.Field)(() => emotions_enum_1.Emotions),
    (0, typeorm_1.Column)({ type: "enum", enum: emotions_enum_1.Emotions }),
    __metadata("design:type", String)
], React.prototype, "value", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => reactType_enum_1.ReactType),
    (0, typeorm_1.Column)({ type: "enum", enum: reactType_enum_1.ReactType }),
    __metadata("design:type", String)
], React.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 100, name: "user_id" }),
    __metadata("design:type", String)
], React.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    (0, typeorm_1.Column)({ type: "varchar", length: 100, name: "post_id", nullable: true }),
    __metadata("design:type", String)
], React.prototype, "postId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true }),
    (0, typeorm_1.Column)({ type: "varchar", length: 100, name: "comment_id", nullable: true }),
    __metadata("design:type", String)
], React.prototype, "commentId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: "user" }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.reacts),
    __metadata("design:type", Object)
], React.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => post_entity_1.Post),
    (0, typeorm_1.JoinColumn)({ name: "post" }),
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, (post) => post.reacts),
    __metadata("design:type", Object)
], React.prototype, "post", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => comment_entity_1.Comment),
    (0, typeorm_1.JoinColumn)({ name: "comment" }),
    (0, typeorm_1.ManyToOne)(() => comment_entity_1.Comment, (comment) => comment.reacts),
    __metadata("design:type", Object)
], React.prototype, "comment", void 0);
exports.React = React = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: IdDate_1.IdDate }),
    (0, typeorm_1.Entity)({ name: "reacts" })
], React);
