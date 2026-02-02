import { IsEmail, MaxLength, MinLength } from "class-validator";
import { FileUpload, GraphQLUpload } from "graphql-upload-ts";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
    @Field({ nullable: true })
    @MinLength(5)
    @MaxLength(20)
    username!: string;

    @Field({ nullable: true })
    @IsEmail()
    email!: string;

    @Field(() => GraphQLUpload, { nullable: true })
    image!: Promise<FileUpload>;

    @Field(() => GraphQLUpload, { nullable: true })
    banner!: Promise<FileUpload>;
}