"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactType = void 0;
const type_graphql_1 = require("type-graphql");
var ReactType;
(function (ReactType) {
    ReactType["POST"] = "POST";
    ReactType["COMMENT"] = "COMMENT";
})(ReactType || (exports.ReactType = ReactType = {}));
(0, type_graphql_1.registerEnumType)(ReactType, {
    name: "ReactType",
    description: "ReactType Enum",
});
