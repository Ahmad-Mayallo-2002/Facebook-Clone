import { Field, ID, InterfaceType } from "type-graphql";
import {
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@InterfaceType()
export abstract class IdDate {
  @Index({ unique: true })
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @CreateDateColumn({ name: "created_at" })
  @Field(() => Date)
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Field(() => Date)
  updatedAt!: Date;
}
