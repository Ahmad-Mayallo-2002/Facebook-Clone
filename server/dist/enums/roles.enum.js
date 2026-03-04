"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const type_graphql_1 = require("type-graphql");
var Roles;
(function (Roles) {
    Roles["USER"] = "USER";
    Roles["ADMIN"] = "ADMIN";
})(Roles || (exports.Roles = Roles = {}));
(0, type_graphql_1.registerEnumType)(Roles, {
    name: 'Roles',
    description: 'Roles Enum'
});
