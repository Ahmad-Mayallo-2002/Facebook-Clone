import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class MediaObjectType {
  @Field()
  url!: string;

  @Field({ defaultValue: "" })
  public_id!: string;
}
