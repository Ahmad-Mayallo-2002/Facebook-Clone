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
exports.FollowService = void 0;
const typedi_1 = require("typedi");
const getRepo_1 = require("../utils/getRepo");
const follow_entity_1 = require("../entities/follow.entity");
const typeorm_1 = require("typeorm");
const user_service_1 = require("./user.service");
const page_service_1 = require("./page.service");
const paginationCalculation_1 = require("../utils/paginationCalculation");
let FollowService = class FollowService {
    constructor(userService, pageService) {
        this.userService = userService;
        this.pageService = pageService;
        this.followRepo = (0, getRepo_1.getRepo)(follow_entity_1.Follow);
    }
    async getAllFollows(take, skip) {
        const [follows, counts] = await this.followRepo.findAndCount({
            order: { createdAt: "DESC" },
            take,
            skip,
        });
        if (!follows.length)
            throw new Error("No follows found");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        return { data: follows, pagination };
    }
    async getById(id) {
        const follow = await this.followRepo.findOne({
            where: { id },
        });
        if (!follow)
            throw new Error("Follow not found");
        return follow;
    }
    async getUserFollowers(userId, take, skip) {
        await this.userService.getById(userId);
        const [follows, counts] = await this.followRepo.findAndCount({
            where: { followingUserId: userId },
            order: { createdAt: "DESC" },
            take,
            skip,
        });
        if (!follows.length)
            throw new Error("No followers found for this user");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        return { data: follows, pagination };
    }
    async getUserFollowings(userId, take, skip) {
        await this.userService.getById(userId);
        const [follows, counts] = await this.followRepo.findAndCount({
            where: { followerId: userId, followingUserId: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) },
            order: { createdAt: "DESC" },
            take,
            skip,
        });
        if (!follows.length)
            throw new Error("No user followings found");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        return { data: follows, pagination };
    }
    async getPageFollowers(pageId, take, skip) {
        await this.pageService.getById(pageId);
        const [follows, counts] = await this.followRepo.findAndCount({
            where: { followingPageId: pageId },
            order: { createdAt: "DESC" },
            take,
            skip,
        });
        if (!follows.length)
            throw new Error("No followers found for this page");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        return { data: follows, pagination };
    }
    async getPageFollowings(userId, take, skip) {
        await this.userService.getById(userId);
        const [follows, counts] = await this.followRepo.findAndCount({
            where: { followerId: userId, followingPageId: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) },
            order: { createdAt: "DESC" },
            take,
            skip,
        });
        if (!follows.length)
            throw new Error("No page followings found");
        const pagination = (0, paginationCalculation_1.paginationCalculation)({ counts, take, skip });
        return { data: follows, pagination };
    }
    async followerOrNot(userId, targetId) {
        const currentFollowing = await this.followRepo.findOne({
            where: [
                { followerId: userId, followingPageId: targetId },
                { followerId: userId, followingUserId: targetId },
            ],
        });
        if (!currentFollowing)
            return false;
        return true;
    }
    async addUserFollowing(userId, targetId) {
        await this.userService.getById(targetId);
        if (userId === targetId)
            throw new Error("You cannot follow yourself");
        const currentFollowing = await this.followRepo.findOne({
            where: { followerId: userId, followingUserId: targetId },
        });
        if (currentFollowing)
            throw new Error("You already follow this user");
        const newFollowing = this.followRepo.create({
            followerId: userId,
            follower: { id: userId },
            followingUserId: targetId,
            followingUser: { id: targetId },
        });
        return await this.followRepo.save(newFollowing);
    }
    async addPageFollowing(userId, pageId) {
        const page = await this.pageService.getById(pageId);
        if (page.userId === userId)
            throw new Error("You cannot follow your page");
        const currentFollowing = await this.followRepo.findOne({
            where: { followerId: userId, followingPageId: pageId },
        });
        if (currentFollowing)
            throw new Error("You already follow this page");
        const newFollowing = this.followRepo.create({
            followerId: userId,
            follower: { id: userId },
            followingPageId: pageId,
            followingPage: { id: pageId },
        });
        return await this.followRepo.save(newFollowing);
    }
    async cancelFollowing(userId, targetId) {
        const following = await this.followRepo.findOne({
            where: [
                { followerId: userId, followingUserId: targetId },
                { followerId: userId, followingPageId: targetId },
            ],
        });
        if (!following)
            throw new Error("No following found");
        await this.followRepo.remove(following);
        return true;
    }
};
exports.FollowService = FollowService;
exports.FollowService = FollowService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        page_service_1.PageService])
], FollowService);
