"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const type_graphql_1 = require("type-graphql");
const auth_service_1 = require("../services/auth.service");
const auth_input_1 = require("../graphql/inputs/auth.input");
const user_entity_1 = require("../entities/user.entity");
const typedi_1 = require("typedi");
const payload_1 = require("../graphql/objectTypes/payload");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    async register(input) {
        return this.authService.register(input);
    }
    async login(input, { session }) {
        const payload = await this.authService.login(input);
        session.user = payload;
        return payload;
    }
    async forgotPassword(email) {
        try {
            return await this.authService.forgotPassword(email);
        }
        catch (error) {
            console.log(error);
            return error?.message;
        }
    }
    async verifyCode(code) {
        return this.authService.verifyCode(code);
    }
    async resetPassword(email, newPassword, confirmPassword) {
        return this.authService.resetPassword(email, newPassword, confirmPassword);
    }
    async seedAdmin() {
        return this.authService.seedAdmin();
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, type_graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_input_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => payload_1.PayloadType),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_input_1.AuthInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "forgotPassword", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("code")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "verifyCode", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("newPassword")),
    __param(2, (0, type_graphql_1.Arg)("confirmPassword")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "resetPassword", null);
__decorate([
    (0, type_graphql_1.Query)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "seedAdmin", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
