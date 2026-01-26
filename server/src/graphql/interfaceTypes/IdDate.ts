import { Field, ID, InterfaceType } from "type-graphql";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@InterfaceType()
export abstract class IdDate {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column({ name: "created_at" })
  @Field(() => Date)
  createdAt!: Date;

  @Column({ name: "updated_at" })
  @Field(() => Date)
  updatedAt!: Date;
}
