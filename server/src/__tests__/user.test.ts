import { User } from "../entities/user.entity"

describe.skip("Describe User", () => {
    it('Create User By Email', _ => {
        const user = new User();
        user.username = 'asdasdasd';
        user.email = 'asdads';
        user.password = 'asdasdas';
        expect(user).toBeInstanceOf(User);        
    });
    it('Create User By Phone', _ => {
        const user = new User();
        user.username = 'asdasdasd';
        user.phone = '123123123';
        user.password = 'asdasdas';
        expect(user).toBeInstanceOf(User);        
    });
});