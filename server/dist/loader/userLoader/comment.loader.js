"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentByUserLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const comment_entity_1 = require("../../entities/comment.entity");
const getRepo_1 = require("../../utils/getRepo");
const typeorm_1 = require("typeorm");
const createCommentByUserLoader = () => new dataloader_1.default(async (userIds) => {
    const commentRepo = (0, getRepo_1.getRepo)(comment_entity_1.Comment);
    const comments = await commentRepo.find({
        where: {
            userId: (0, typeorm_1.In)(userIds),
        },
    });
    const commentMap = {};
    userIds.forEach((id) => (commentMap[id] = []));
    comments.forEach((comment) => commentMap[comment.userId].push(comment));
    return userIds.map((id) => commentMap[id]);
});
exports.createCommentByUserLoader = createCommentByUserLoader;
