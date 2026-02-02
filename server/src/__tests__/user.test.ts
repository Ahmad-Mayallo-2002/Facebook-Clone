import { User } from "../entities/user.entity"

describe("Describe User", () => {
    it('Create User By Email', () => {
        const user = new User();
        user.username = 'asdasdasd';
        user.email = 'asdads';
        user.password = 'asdasdas';
        expect(user).toBeInstanceOf(User);
    });
});