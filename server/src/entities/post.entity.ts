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
import { MediaObject } from "../interfaces/mediaObject.interface";
import { MediaObjectType } from "../graphql/objectTypes/mediaObject";
import { User } from "./user.entity";
import { Page } from "./page.entity";
import { Comment } from "./comment.entity";
import { React } from "./react.entity";

@ObjectType({ implements: IdDate })
@Entity({ name: "posts" })
export class Post extends IdDate {
  @Field(() => String, { defaultValue: "" })
  @Column({ type: "text", default: "" })
  content!: string;

  @Field(() => [MediaObjectType], { defaultValue: [] })
  @Column({ type: "jsonb", default: [] })
  media!: MediaObject[];

  @Field(() => Boolean, { defaultValue: true })
  @Column({ type: "boolean", default: true })
  isVisible!: boolean;

  @Field(() => ID, { nullable: true })
  @Column({ type: "varchar", length: 100, name: "user_id", nullable: true })
  userId?: string;

  // optional page reference
  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", length: 100, name: "page_id", nullable: true })
  pageId?: string;

  // Relationships
  @Field(() => User, { nullable: true })
  @JoinColumn({ name: "user" })
  @ManyToOne(() => User, (user) => user.posts, { nullable: true })
  user?: Relation<User>;

  @Field(() => Page, { nullable: true })
  @JoinColumn({ name: "page" })
  @ManyToOne(() => Page, (page) => page.posts, { nullable: true })
  page?: Relation<Page>;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post)
  comments!: Relation<Comment[]>;

  @Field(() => [React])
  @OneToMany(() => React, (react) => react.post)
  reacts!: Relation<React[]>;
}
