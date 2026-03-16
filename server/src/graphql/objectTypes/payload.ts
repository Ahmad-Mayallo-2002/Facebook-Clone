import { Field, ObjectType } from "type-graphql";
import { Roles } from "../../enums/roles.enum";

@ObjectType()
export class PayloadType {
  @Field()
  id!: string;

  @Field()
  accessToken!: string;

  @Field(() => Roles)
  role!: Roles;
}