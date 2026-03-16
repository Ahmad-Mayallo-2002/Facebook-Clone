import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  Relation,
} from "typeorm";
import { IdDate } from "../graphql/interfaceTypes/IdDate";
import { User } from "./user.entity";
import { SaveItem } from "./saveItem.entity";

@ObjectType({ implements: IdDate })
@Entity({ name: "save_list" })
export class SaveList extends IdDate {
  @Index()
  @Field(() => ID)
  @Column({ name: "user_id", type: "varchar", length: 100 })
  userId!: string;

  // Relationships
  @Field(() => User)
  @JoinColumn({ name: "user" })
  @OneToOne(() => User, (user) => user.save)
  user!: Relation<User>;

  @Field(() => [SaveItem])
  @JoinColumn({ name: "save_item" })
  @OneToMany(() => SaveItem, (saveItem) => saveItem.save)
  saveItems!: Relation<SaveItem[]>;
}
