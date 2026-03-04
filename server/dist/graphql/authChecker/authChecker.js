"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthChecker = void 0;
const typedi_1 = require("typedi");
const apollo_server_errors_1 = require("apollo-server-errors");
let AuthChecker = class AuthChecker {
    check(resolverData, roles) {
        const { args, context: { req, session }, info, root } = resolverData;
        const user = session.user;
        if (!roles.includes(user.role))
            throw new apollo_server_errors_1.ForbiddenError('Access is denied');
        return true;
    }
};
exports.AuthChecker = AuthChecker;
exports.AuthChecker = AuthChecker = __decorate([
    (0, typedi_1.Service)()
], AuthChecker);
