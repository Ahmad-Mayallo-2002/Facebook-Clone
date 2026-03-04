"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactPaginated = void 0;
const type_graphql_1 = require("type-graphql");
const react_entity_1 = require("../../entities/react.entity");
const paginatedResponse_1 = require("../../utils/paginatedResponse");
let ReactPaginated = class ReactPaginated extends (0, paginatedResponse_1.PaginatedResponse)(react_entity_1.React) {
};
exports.ReactPaginated = ReactPaginated;
exports.ReactPaginated = ReactPaginated = __decorate([
    (0, type_graphql_1.ObjectType)()
], ReactPaginated);
