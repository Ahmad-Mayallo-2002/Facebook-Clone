"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = void 0;
const type_graphql_1 = require("type-graphql");
var NotificationType;
(function (NotificationType) {
    NotificationType["REACT"] = "REACT";
    NotificationType["COMMENT"] = "COMMENT";
    NotificationType["FOLLOW"] = "FOLLOW";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
(0, type_graphql_1.registerEnumType)(NotificationType, {
    name: 'NotificationType',
    description: 'Type of notification',
});
