"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gender = void 0;
const type_graphql_1 = require("type-graphql");
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
})(Gender || (exports.Gender = Gender = {}));
(0, type_graphql_1.registerEnumType)(Gender, {
    name: "Gender",
    description: "Gender Enum Description",
});
