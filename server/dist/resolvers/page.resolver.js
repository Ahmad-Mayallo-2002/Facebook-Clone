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
exports.PageResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const page_entity_1 = require("../entities/page.entity");
const page_service_1 = require("../services/page.service");
const page_input_1 = require("../graphql/inputs/page.input");
const checkToken_middleware_1 = require("../middlewares/checkToken.middleware");
const pagePaginated_1 = require("../graphql/objectTypes/pagePaginated");
let PageResolver = class PageResolver {
    constructor(pageService) {
        this.pageService = pageService;
    }
    async getAllPages(take, skip) {
        return await this.pageService.getAllPages(take, skip);
    }
    async getPage(id) {
        return await this.pageService.getById(id);
    }
    async getUserPages(userId, take, skip) {
        return await this.pageService.getUserPages(userId, take, skip);
    }
    async createPage(userId, input) {
        return await this.pageService.createPage(userId, input);
    }
    async updatePage(id, input, { session }) {
        const page = await this.pageService.getById(id);
        if (page.userId !== session.user.id) {
            throw new Error("Not authorized");
        }
        return await this.pageService.updatePage(id, input);
    }
    async deletePage(id, { session }) {
        const page = await this.pageService.getById(id);
        if (page.userId !== session.user.id) {
            throw new Error("Not authorized");
        }
        return await this.pageService.deletePage(id);
    }
};
exports.PageResolver = PageResolver;
__decorate([
    (0, type_graphql_1.Query)(() => pagePaginated_1.PagePaginated),
    __param(0, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PageResolver.prototype, "getAllPages", null);
__decorate([
    (0, type_graphql_1.Query)(() => page_entity_1.Page),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PageResolver.prototype, "getPage", null);
__decorate([
    (0, type_graphql_1.Query)(() => pagePaginated_1.PagePaginated),
    __param(0, (0, type_graphql_1.Arg)("userId")),
    __param(1, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], PageResolver.prototype, "getUserPages", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => page_entity_1.Page),
    __param(0, (0, type_graphql_1.Arg)("userId")),
    __param(1, (0, type_graphql_1.Arg)("input", () => page_input_1.PageInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, page_input_1.PageInput]),
    __metadata("design:returntype", Promise)
], PageResolver.prototype, "createPage", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => page_entity_1.Page),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("input", () => page_input_1.PageInput)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PageResolver.prototype, "updatePage", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PageResolver.prototype, "deletePage", null);
exports.PageResolver = PageResolver = __decorate([
    (0, type_graphql_1.UseMiddleware)(checkToken_middleware_1.CheckToken),
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [page_service_1.PageService])
], PageResolver);
