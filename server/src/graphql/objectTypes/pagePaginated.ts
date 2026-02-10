import { ObjectType } from "type-graphql";
import { Page } from "../../entities/page.entity";
import { PaginatedResponse } from "../../utils/paginatedResponse";

@ObjectType()
export class PagePaginated extends PaginatedResponse(Page) {}
