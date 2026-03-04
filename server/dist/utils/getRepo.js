"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepo = void 0;
const dataSource_1 = require("../dataSource");
const getRepo = (target) => {
    return dataSource_1.dataSource.getRepository(target);
};
exports.getRepo = getRepo;
