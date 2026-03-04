"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckToken = void 0;
const type_graphql_1 = require("type-graphql");
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = require("dotenv");
const typedi_1 = require("typedi");
(0, dotenv_1.config)();
let CheckToken = class CheckToken {
    async use({ context: { req, session } }, next) {
        const user = session.user;
        if (!user?.token)
            throw new type_graphql_1.AuthorizationError("No access token provided");
        try {
            (0, jsonwebtoken_1.verify)(user?.token, process.env.ACCESS_TOKEN_SECRET);
        }
        catch (err) {
            throw new type_graphql_1.AuthorizationError("Invalid token");
        }
        return next();
    }
};
exports.CheckToken = CheckToken;
exports.CheckToken = CheckToken = __decorate([
    (0, typedi_1.Service)()
], CheckToken);
