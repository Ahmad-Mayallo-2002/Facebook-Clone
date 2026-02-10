import { ClassType, Field, ObjectType } from "type-graphql";
import { PaginationType } from "../graphql/objectTypes/pagination";

export function PaginatedResponse<T extends object>(TItemClass: ClassType<T>) {
  @ObjectType()
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    data!: T[];

    @Field()
    pagination!: PaginationType;
  }

  return PaginatedResponseClass;
}
