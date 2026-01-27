import { Service } from "typedi";
import { User } from "../entities/user.entity";
import { DeepPartial, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async getAll(): Promise<User[]> {
    const users = await this.userRepo.find();
    if (!users.length) throw new Error("No users found");
    return users;
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) throw new Error("User not found");
    return user;
  }

  async updateUser(
    id: string,
    data: DeepPartial<User>
  ): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) throw new Error("User not found");
    Object.assign(user, data);
    return await this.userRepo.save(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) throw new Error("User not found");
    await this.userRepo.remove(user);
    return true;
  }

  async activeUser(id: string, status: boolean): Promise<string> {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) throw new Error("User not found");
    user.isActive = status;
    await this.userRepo.save(user);
    return `This user is ${status ? 'active' : 'unactive'}`
  }
}