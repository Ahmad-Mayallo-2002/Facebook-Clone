import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { IdDate } from "../graphql/interfaceTypes/IdDate";
import { Roles } from "../enums/roles.enum";
import { MediaObject } from "../interfaces/mediaObject.interface";
import { MediaObjectType } from "../graphql/objectTypes/mediaObject";

@ObjectType({ implements: IdDate })
@Entity({ name: "users" })
export class User extends IdDate {
  @Field()
  @Column({ type: "varchar", length: 100 })
  username!: string;

  @Field({ defaultValue: "" })
  @Column({ type: "varchar", length: 100, default: "" })
  email: string | undefined;

  @Field({ defaultValue: "" })
  @Column({ type: "varchar", length: 100, default: "" })
  phone: string | undefined;

  @Field({ defaultValue: "Hello, I'm Facebook User" })
  @Column({ type: "varchar", length: 255, default: "Hello, I'm Facebook User" })
  description!: string;

  @Column({ type: "varchar", length: 100 })
  password!: string;

  @Field(() => Roles, { defaultValue: Roles.USER })
  @Column({ type: "enum", enum: Roles, default: Roles.USER })
  role!: Roles;

  @Field(() => MediaObjectType)
  @Column({ type: "simple-json" })
  image!: MediaObject;

  @Field(() => MediaObjectType)
  @Column({ type: "simple-json" })
  banner!: MediaObject;
}