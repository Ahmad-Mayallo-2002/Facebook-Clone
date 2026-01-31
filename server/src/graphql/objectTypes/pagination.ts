import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaginationType {
  @Field()
  prev!: boolean;

  @Field()
  next!: boolean;

  @Field()
  currentPage!: number;

  @Field()
  totalPages!: number;
}
