import { Field, ID, ObjectType } from "type-graphql";
import { IdDate } from "../graphql/interfaceTypes/IdDate";
import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { Post } from "./post.entity";
import { SaveList } from "./saveList.entity";

@ObjectType({ implements: IdDate })
@Entity({ name: "save_items" })
export class SaveItem extends IdDate {
  @Field(() => ID)
  @Column({ type: "varchar", length: 100, name: "post_id" })
  postId!: string;

  @Field(() => ID)
  @Column({ type: "varchar", length: 100, name: "save_list_id" })
  saveListId!: string;

  // Relationships
  @Field(() => Post)
  @JoinColumn({ name: "post" })
  @ManyToOne(() => Post, (post) => post.saveItems)
  post!: Relation<Post>;

  @Field(() => SaveList)
  @JoinColumn({ name: "save_list" })
  @ManyToOne(() => SaveList, (save) => save.saveItems)
  save!: Relation<SaveList>;
}
