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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInput = void 0;
const class_validator_1 = require("class-validator");
const graphql_upload_ts_1 = require("graphql-upload-ts");
const type_graphql_1 = require("type-graphql");
let UserInput = class UserInput {
};
exports.UserInput = UserInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UserInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_upload_ts_1.GraphQLUpload, { nullable: true }),
    __metadata("design:type", Promise)
], UserInput.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_upload_ts_1.GraphQLUpload, { nullable: true }),
    __metadata("design:type", Promise)
], UserInput.prototype, "banner", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UserInput.prototype, "description", void 0);
exports.UserInput = UserInput = __decorate([
    (0, type_graphql_1.InputType)()
], UserInput);
