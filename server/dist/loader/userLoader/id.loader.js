"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIdsByUserLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const user_entity_1 = require("../../entities/user.entity");
const getRepo_1 = require("../../utils/getRepo");
const typeorm_1 = require("typeorm");
const createIdsByUserLoader = () => new dataloader_1.default(async (userIds) => {
    const userRepo = (0, getRepo_1.getRepo)(user_entity_1.User);
    const users = await userRepo.find({
        where: { id: (0, typeorm_1.In)(userIds) },
    });
    const userMap = {};
    users.forEach((u) => {
        userMap[u.id] = u;
    });
    return userIds.map((id) => userMap[id]);
});
exports.createIdsByUserLoader = createIdsByUserLoader;
