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
exports.FollowResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const follow_entity_1 = require("../entities/follow.entity");
const follow_service_1 = require("../services/follow.service");
const checkToken_middleware_1 = require("../middlewares/checkToken.middleware");
const roles_enum_1 = require("../enums/roles.enum");
const followPaginated_1 = require("../graphql/objectTypes/followPaginated");
const user_entity_1 = require("../entities/user.entity");
let FollowResolver = class FollowResolver {
    constructor(followService) {
        this.followService = followService;
    }
    async getAllFollows(take, skip) {
        return await this.followService.getAllFollows(take, skip);
    }
    async getFollow(id) {
        return await this.followService.getById(id);
    }
    async getUserFollowers(userId, take, skip) {
        return await this.followService.getUserFollowers(userId, take, skip);
    }
    async getUserFollowings(userId, take, skip) {
        return await this.followService.getUserFollowings(userId, take, skip);
    }
    async getPageFollowers(pageId, take, skip) {
        return await this.followService.getPageFollowers(pageId, take, skip);
    }
    async getPageFollowings(userId, take, skip) {
        return await this.followService.getPageFollowings(userId, take, skip);
    }
    async followerOrNot({ session }, targetId) {
        return await this.followService.followerOrNot(session.user.id, targetId);
    }
    async addUserFollowing(userId, targetId) {
        return await this.followService.addUserFollowing(userId, targetId);
    }
    async addPageFollowing(userId, pageId) {
        return await this.followService.addPageFollowing(userId, pageId);
    }
    async cancelFollowing(userId, targetId) {
        return await this.followService.cancelFollowing(userId, targetId);
    }
    // Field Resolver for Followings and Followers
    async follower(follow, { idByUserLoader }) {
        return await idByUserLoader.load(follow.followerId);
    }
    async followingUser(follow, { idByUserLoader }) {
        return await idByUserLoader.load(follow.followingUserId);
    }
};
exports.FollowResolver = FollowResolver;
__decorate([
    (0, type_graphql_1.Authorized)(roles_enum_1.Roles.ADMIN),
    (0, type_graphql_1.Query)(() => followPaginated_1.FollowPaginated),
    __param(0, (0, type_graphql_1.Arg)("take")),
    __param(1, (0, type_graphql_1.Arg)("skip")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], FollowResolver.prototype, "getAllFollows", null);
__decorate([
    (0, type_graphql_1.Authorized)(roles_enum_1.Roles.ADMIN),
    (0, type_graphql_1.Query)(() => follow_entity_1.Follow),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowResolver.prototype, "getFollow", null);
__decorate([
    (0, type_graphql_1.Query)(() => followPaginated_1.FollowPaginated),
    __param(0, (0, type_graphql_1.Arg)("userId")),
    __param(1, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], FollowResolver.prototype, "getUserFollowers", null);
__decorate([
    (0, type_graphql_1.Query)(() => followPaginated_1.FollowPaginated),
    __param(0, (0, type_graphql_1.Arg)("userId")),
    __param(1, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], FollowResolver.prototype, "getUserFollowings", null);
__decorate([
    (0, type_graphql_1.Query)(() => followPaginated_1.FollowPaginated),
    __param(0, (0, type_graphql_1.Arg)("pageId")),
    __param(1, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], FollowResolver.prototype, "getPageFollowers", null);
__decorate([
    (0, type_graphql_1.Query)(() => followPaginated_1.FollowPaginated),
    __param(0, (0, type_graphql_1.Arg)("userId")),
    __param(1, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], FollowResolver.prototype, "getPageFollowings", null);
__decorate([
    (0, type_graphql_1.Query)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("targetId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FollowResolver.prototype, "followerOrNot", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => follow_entity_1.Follow),
    __param(0, (0, type_graphql_1.Arg)("userId")),
    __param(1, (0, type_graphql_1.Arg)("targetId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FollowResolver.prototype, "addUserFollowing", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => follow_entity_1.Follow),
    __param(0, (0, type_graphql_1.Arg)("userId")),
    __param(1, (0, type_graphql_1.Arg)("pageId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FollowResolver.prototype, "addPageFollowing", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("userId")),
    __param(1, (0, type_graphql_1.Arg)("targetId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FollowResolver.prototype, "cancelFollowing", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => user_entity_1.User),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [follow_entity_1.Follow, Object]),
    __metadata("design:returntype", Promise)
], FollowResolver.prototype, "follower", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => user_entity_1.User),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [follow_entity_1.Follow, Object]),
    __metadata("design:returntype", Promise)
], FollowResolver.prototype, "followingUser", null);
exports.FollowResolver = FollowResolver = __decorate([
    (0, type_graphql_1.UseMiddleware)(checkToken_middleware_1.CheckToken),
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(() => follow_entity_1.Follow),
    __metadata("design:paramtypes", [follow_service_1.FollowService])
], FollowResolver);
