import { Service } from "typedi";
import { User } from "../entities/user.entity";
import { DeepPartial } from "typeorm";
import { UserInput } from "../graphql/inputs/user.input";
import { UploaderContext } from "../utils/uploaderContext";
import { CloudinaryUploader } from "../utils/cloudinaryUploader";
import { UploadApiResponse, v2 } from "cloudinary";
import { getRepo } from "../utils/getRepo";

@Service()
export class UserService {
  private userRepo = getRepo<User>(User);

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
    input: Partial<UserInput>
  ): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) throw new Error("User not found");

    const { image, banner, ...rest } = input;
    const data: DeepPartial<User> = { ...rest };


    if (image) {
      await v2.api.delete_all_resources([user.image.public_id]);
      const file = await image;
      const uploader = new UploaderContext(new CloudinaryUploader());
      const { secure_url: url, public_id, ...rest } = await uploader.performStrategy(file) as UploadApiResponse;
      data.image = { url, public_id };
    }

    if (banner) {
      await v2.api.delete_all_resources([user.banner.public_id]);
      const file = await banner;
      const uploader = new UploaderContext(new CloudinaryUploader());
      const { secure_url: url, public_id } = await uploader.performStrategy(file) as UploadApiResponse;
      data.banner = { url, public_id };
    }

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