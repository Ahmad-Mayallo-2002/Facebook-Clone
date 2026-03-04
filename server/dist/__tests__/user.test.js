"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../entities/user.entity");
describe("Describe User", () => {
    it("Create User By Email", () => {
        const user = new user_entity_1.User();
        user.username = "asdasdasd";
        user.email = "asdads";
        user.password = "asdasdas";
        expect(user).toBeInstanceOf(user_entity_1.User);
    });
});
