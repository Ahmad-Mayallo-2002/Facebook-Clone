import { SaveList } from "../../entities/saveList.entity";
import { PaginatedResponse } from "../../utils/paginatedResponse";

export const SaveListPaginated = PaginatedResponse(SaveList);