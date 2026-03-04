"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolveTime = void 0;
const console_1 = require("console");
const ResolveTime = async ({ info }, next) => {
    const { parentType: { name }, fieldName } = info;
    if (name !== "Query" && name !== "Mutation")
        return next();
    const start = Date.now();
    await next();
    const resolveTime = Date.now() - start;
    const object = {
        name: name,
        fieldName: fieldName,
        time: `${resolveTime}ms`,
    };
    (0, console_1.log)(object);
};
exports.ResolveTime = ResolveTime;
