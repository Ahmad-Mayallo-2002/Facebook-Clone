"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReactsByCommentLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const react_entity_1 = require("../../entities/react.entity");
const getRepo_1 = require("../../utils/getRepo");
const typeorm_1 = require("typeorm");
const createReactsByCommentLoader = () => new dataloader_1.default(async (commentIds) => {
    const reactRepo = (0, getRepo_1.getRepo)(react_entity_1.React);
    const reacts = await reactRepo.find({
        where: {
            commentId: (0, typeorm_1.In)(commentIds),
        },
    });
    const reactMap = {};
    commentIds.forEach((id) => (reactMap[id] = []));
    reacts.forEach((react) => {
        reactMap[react.commentId].push(react);
    });
    return commentIds.map((id) => reactMap[id]);
});
exports.createReactsByCommentLoader = createReactsByCommentLoader;
