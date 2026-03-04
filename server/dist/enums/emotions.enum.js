"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emotions = void 0;
const type_graphql_1 = require("type-graphql");
var Emotions;
(function (Emotions) {
    Emotions["LIKE"] = "LIKE";
    Emotions["LOVE"] = "LOVE";
    Emotions["HAHA"] = "HAHA";
    Emotions["WOW"] = "WOW";
    Emotions["SAD"] = "SAD";
    Emotions["ANGRY"] = "ANGRY";
})(Emotions || (exports.Emotions = Emotions = {}));
(0, type_graphql_1.registerEnumType)(Emotions, {
    name: "Emotions",
    description: 'Emotions Description'
});
