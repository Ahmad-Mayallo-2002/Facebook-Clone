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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const user_entity_1 = require("../entities/user.entity");
const user_service_1 = require("../services/user.service");
const user_input_1 = require("../graphql/inputs/user.input");
const checkToken_middleware_1 = require("../middlewares/checkToken.middleware");
const roles_enum_1 = require("../enums/roles.enum");
const post_entity_1 = require("../entities/post.entity");
const comment_entity_1 = require("../entities/comment.entity");
const userPaginated_1 = require("../graphql/objectTypes/userPaginated");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async getAllUsers(take, skip) {
        return await this.userService.getAll(take, skip);
    }
    async getUser(id) {
        return await this.userService.getById(id);
    }
    async me({ session }) {
        if (!session.user)
            throw new Error("You are not login");
        return await this.userService.getById(session.user.id);
    }
    async updateUser(id, input) {
        return await this.userService.updateUser(id, input);
    }
    async deleteUser(id) {
        return await this.userService.deleteUser(id);
    }
    async activeUser(id, status) {
        return await this.userService.activeUser(id, status);
    }
    // Field Resolvers for Data Loaders
    async posts(user, { postsByUserLoader }) {
        return postsByUserLoader.load(user.id);
    }
    async comments(user, { commentsByUserLoader }) {
        return commentsByUserLoader.load(user.id);
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, type_graphql_1.Query)(() => userPaginated_1.UserPaginated),
    __param(0, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getAllUsers", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_entity_1.User),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_entity_1.User, { name: "me" }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("input", () => user_input_1.UserInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    (0, type_graphql_1.Authorized)(roles_enum_1.Roles.ADMIN),
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "activeUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => [post_entity_1.Post]),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "posts", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => [comment_entity_1.Comment]),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "comments", null);
exports.UserResolver = UserResolver = __decorate([
    (0, type_graphql_1.UseMiddleware)(checkToken_middleware_1.CheckToken),
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(() => user_entity_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
