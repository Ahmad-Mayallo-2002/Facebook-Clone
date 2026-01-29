import { Field, ID, InterfaceType } from "type-graphql";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@InterfaceType()
export abstract class IdDate {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column({ name: "created_at", default: new Date() })
  @Field(() => Date, { defaultValue: new Date() })
  createdAt!: Date;

  @Column({ name: "updated_at", default: new Date() })
  @Field(() => Date, { defaultValue: new Date() })
  updatedAt!: Date;
}
