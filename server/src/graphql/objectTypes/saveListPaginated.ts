import { ObjectType } from "type-graphql";
import { SaveList } from "../../entities/saveList.entity";
import { PaginatedResponse } from "../../utils/paginatedResponse";

@ObjectType()
export class SaveListPaginated extends PaginatedResponse(SaveList) {};