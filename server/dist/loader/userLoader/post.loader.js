"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostsByUserLoader = void 0;
const typeorm_1 = require("typeorm");
const post_entity_1 = require("../../entities/post.entity");
const dataloader_1 = __importDefault(require("dataloader"));
const getRepo_1 = require("../../utils/getRepo");
const createPostsByUserLoader = () => new dataloader_1.default(async (userIds) => {
    const postRepo = (0, getRepo_1.getRepo)(post_entity_1.Post);
    const posts = await postRepo.find({
        where: {
            userId: (0, typeorm_1.In)(userIds),
        },
    });
    const postMap = {};
    userIds.forEach((id) => (postMap[id] = []));
    posts.forEach((post) => postMap[`${post.userId}`].push(post));
    return userIds.map((id) => postMap[id]);
});
exports.createPostsByUserLoader = createPostsByUserLoader;
