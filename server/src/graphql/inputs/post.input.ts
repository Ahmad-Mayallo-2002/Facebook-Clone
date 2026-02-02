import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload-ts";

@InputType()
export class CreatePostInput {
  @Field({ nullable: true })
  @MaxLength(5000)
  content?: string;

  @Field(() => [GraphQLUpload], { nullable: true })
  media?: Promise<FileUpload>[];
}
