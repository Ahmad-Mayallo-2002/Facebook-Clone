import { Field, InputType } from "type-graphql";
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { IsEmailOrPhone } from "../validators/isEmailOrPhone";

@InputType()
export class CreateUser {
    @Field()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    username!: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    @IsEmailOrPhone()
    identified!: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password!: string;
}