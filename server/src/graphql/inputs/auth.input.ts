import { Field, InputType } from "type-graphql";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Gender } from "../../enums/gender.enum";

@InputType()
export class AuthInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    @IsEmail({}, {message: 'Invalid email syntax'})
    email!: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password!: string;
}


@InputType()
export class RegisterInput extends AuthInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    username!: string;

    @IsNotEmpty()
    @IsEnum(Gender)
    @Field(() => Gender)
    gender!: Gender;
}