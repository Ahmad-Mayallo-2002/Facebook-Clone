"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminOrOwner = void 0;
const roles_enum_1 = require("../enums/roles.enum");
const apollo_server_errors_1 = require("apollo-server-errors");
class AdminOrOwner {
    use({ context: { req, session }, args, info }, next) {
        const user = session.user;
        if (user.role === roles_enum_1.Roles.ADMIN && user.id === args.id)
            return next();
        else
            throw new apollo_server_errors_1.ForbiddenError('Access is denied');
    }
}
exports.AdminOrOwner = AdminOrOwner;
