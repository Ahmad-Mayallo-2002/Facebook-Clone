import { Service } from "typedi";
import { getRepo } from "../utils/getRepo";
import { Page } from "../entities/page.entity";
import { DeepPartial } from "typeorm";
import { PageInput } from "../graphql/inputs/page.input";
import { UploaderContext } from "../utils/uploaderContext";
import { CloudinaryUploader } from "../utils/cloudinaryUploader";
import { UploadApiResponse, v2 } from "cloudinary";
import { UserService } from "./user.service";
import { MediaObject } from "../interfaces/mediaObject.interface";

@Service()
export class PageService {
    private readonly pageRepo = getRepo(Page);

    constructor(private readonly userService: UserService) { }

    async createPage(userId: string, input: PageInput): Promise<Page> {
        const { description, image, banner } = input;
        const imageObject: MediaObject = { url: '', public_id: '' };
        const bannerObject: MediaObject = { url: '', public_id: '' };

        if (image || banner) {
            const uploader = new UploaderContext(new CloudinaryUploader());
            if (image) {
                const { public_id, secure_url: url } = await uploader.performStrategy(await image) as UploadApiResponse;
                imageObject.url = url;
                imageObject.public_id = public_id;
            }

            if (banner) {
                const { public_id, secure_url: url } = await uploader.performStrategy(await banner) as UploadApiResponse;
                bannerObject.url = url;
                bannerObject.public_id = public_id;
            }
        }


        const newPage = this.pageRepo.create({
            userId,
            description,
            image: imageObject,
            banner: bannerObject
        });

        return await this.pageRepo.save(newPage);
    }

    async getAllPages(): Promise<Page[]> {
        const pages = await this.pageRepo.find({
            relations: ["user"],
            order: { createdAt: "DESC" },
        });
        if (!pages.length) throw new Error("No pages found");
        return pages;
    }

    async getUserPages(userId: string): Promise<Page[]> {
        await this.userService.getById(userId);
        const pages = await this.pageRepo.find({
            where: { userId },
            relations: ["user"],
            order: { createdAt: "DESC" },
        });
        if (!pages.length) throw new Error("No pages found for this user");
        return pages;
    }

    async getById(id: string): Promise<Page> {
        const page = await this.pageRepo.findOne({
            where: { id },
            relations: ["user"],
        });
        if (!page) throw new Error("Page not found");
        return page;
    }

    async updatePage(id: string, input: Partial<PageInput>): Promise<Page> {
        const page = await this.getById(id);
        const { image, banner, ...rest } = input;
        const data: DeepPartial<Page> = { ...rest };

        if (image) {
            if (page.image?.public_id)
                await v2.uploader.destroy(page.image.public_id);
            const file = await image;
            const uploader = new UploaderContext(new CloudinaryUploader());
            const { secure_url: url, public_id } = (await uploader.performStrategy(file)) as UploadApiResponse;
            data.image = { url, public_id };
        }

        if (banner) {
            if (page.banner?.public_id)
                await v2.uploader.destroy(page.banner.public_id);
            const file = await banner;
            const uploader = new UploaderContext(new CloudinaryUploader());
            const { secure_url: url, public_id } = (await uploader.performStrategy(file)) as UploadApiResponse;
            data.banner = { url, public_id };
        }

        Object.assign(page, data);
        return await this.pageRepo.save(page);
    }

    async deletePage(id: string): Promise<boolean> {
        const page = await this.getById(id);
        if (page.image?.public_id)
            await v2.uploader.destroy(page.image.public_id);
        if (page.banner?.public_id)
            await v2.uploader.destroy(page.banner.public_id);
        await this.pageRepo.remove(page);
        return true;
    }
}