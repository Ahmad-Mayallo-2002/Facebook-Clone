import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from "typeorm";
import { IdDate } from "../graphql/interfaceTypes/IdDate";
import { MediaObjectType } from "../graphql/objectTypes/mediaObject";
import { MediaObject } from "../interfaces/mediaObject.interface";
import { User } from "./user.entity";
import { Post } from "./post.entity";
import { React } from "./react.entity";

@ObjectType({ implements: IdDate })
@Entity({ name: "comments" })
export class Comment extends IdDate {
  @Field(() => String, { defaultValue: "" })
  @Column({ type: "varchar", length: 255, default: "" })
  content!: string;

  @Field(() => [MediaObjectType])
  @Column({ type: "simple-json", default: [] })
  media!: MediaObject[];

  @Field()
  @Column({ default: true })
  isVisible!: boolean;

  @Field(() => ID)
  @Column({ type: "varchar", length: 100, name: "user_id" })
  userId!: string;

  @Field(() => ID)
  @Column({ type: "varchar", length: 100, name: "post_id" })
  postId!: string;

  // Relationships
  @Field(() => User)
  @JoinColumn({ name: "user" })
  @ManyToOne(() => User, (user) => user.comments)
  user!: Relation<User>;

  @Field(() => Post)
  @JoinColumn({ name: "post" })
  @ManyToOne(() => Post, (post) => post.comments)
  post!: Relation<Post>;

  @Field(() => [React])
  @OneToMany(() => React, (react) => react.comment)
  reacts!: Relation<React>;
}
