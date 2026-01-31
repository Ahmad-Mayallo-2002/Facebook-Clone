import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { MediaObject } from "../../interfaces/mediaObject.interface";
import { FileUpload, GraphQLUpload } from "graphql-upload-ts";

@InputType()
class MediaObjectInput implements MediaObject {
  @Field()
  url!: string;

  @Field()
  public_id!: string;
}

@InputType()
export class CreatePostInput {
  @Field({ nullable: true })
  @MaxLength(5000)
  content?: string;

  @Field(() => [GraphQLUpload], { nullable: true })
  media?: Promise<FileUpload[]>
}

