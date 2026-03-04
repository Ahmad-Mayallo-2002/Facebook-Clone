"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentsByPostLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const comment_entity_1 = require("../../entities/comment.entity");
const getRepo_1 = require("../../utils/getRepo");
const typeorm_1 = require("typeorm");
const createCommentsByPostLoader = () => new dataloader_1.default(async (postIds) => {
    const commentRepo = (0, getRepo_1.getRepo)(comment_entity_1.Comment);
    const comments = await commentRepo.find({
        where: {
            postId: (0, typeorm_1.In)(postIds),
        },
    });
    const commentMap = {};
    postIds.forEach((id) => (commentMap[id] = []));
    comments.forEach((comment) => commentMap[comment.postId].push(comment));
    return postIds.map((id) => commentMap[id]);
});
exports.createCommentsByPostLoader = createCommentsByPostLoader;
