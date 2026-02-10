import { ObjectType } from "type-graphql";
import { React } from "../../entities/react.entity";
import { PaginatedResponse } from "../../utils/paginatedResponse";

@ObjectType()
export class ReactPaginated extends PaginatedResponse(React) {}