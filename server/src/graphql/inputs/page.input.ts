import { MaxLength } from "class-validator";
import { FileUpload, GraphQLUpload } from "graphql-upload-ts";
import { Field, InputType } from "type-graphql";

@InputType()
export class PageInput {
    @Field({ nullable: true })
    @MaxLength(255)
    description?: string;

    @Field(() => GraphQLUpload, { nullable: true })
    image?: Promise<FileUpload>;

    @Field(() => GraphQLUpload, { nullable: true })
    banner?: Promise<FileUpload>;
}
