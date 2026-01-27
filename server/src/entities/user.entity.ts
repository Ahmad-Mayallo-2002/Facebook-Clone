import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, Relation } from "typeorm";
import { IdDate } from "../graphql/interfaceTypes/IdDate";
import { Roles } from "../enums/roles.enum";
import { MediaObject } from "../interfaces/mediaObject.interface";
import { MediaObjectType } from "../graphql/objectTypes/mediaObject";
import { Post } from "./post.entity";
import { Comment } from "./comment.entity";
import { React } from "./react.entity";
import { Page } from "./page.entity";
import { Notification } from "./notification.entity";
import { Follow } from "./follow.entity";

@ObjectType({ implements: IdDate })
@Entity({ name: "users" })
export class User extends IdDate {
  @Field()
  @Column({ type: "varchar", length: 100 })
  username!: string;

  @Field({ defaultValue: "" })
  @Column({ type: "varchar", length: 100, default: "" })
  email!: string;

  @Field({ defaultValue: "" })
  @Column({ type: "varchar", length: 100, default: "" })
  phone!: string;

  @Field({ defaultValue: "Hello, I'm Facebook User" })
  @Column({ type: "varchar", length: 255, default: "Hello, I'm Facebook User" })
  description!: string;

  @Column({ type: "varchar", length: 100 })
  password!: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Field(() => Roles, { defaultValue: Roles.USER })
  @Column({ type: "enum", enum: Roles, default: Roles.USER })
  role!: Roles;

  @Field(() => MediaObjectType, {defaultValue: {}})
  @Column({ type: "simple-json", default: {} })
  image!: MediaObject;

  @Field(() => MediaObjectType, {defaultValue: {}})
  @Column({ type: "simple-json", default: {} })
  banner!: MediaObject;

  // Relationships
  @Field(() => [Post])
  @OneToMany(() => Post, (posts) => posts.user)
  posts!: Relation<Post[]>;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comments) => comments.user)
  comments!: Relation<Comment[]>;

  @Field(() => [React])
  @OneToMany(() => React, (reacts) => reacts.user)
  reacts!: Relation<React[]>;

  @Field(() => [Page])
  @OneToMany(() => Page, page => page.user)
  pages!: Relation<Page[]>;

  @Field(() => [Notification])
  @OneToMany(() => Notification, (notifications) => notifications.user)
  notifications!: Relation<Notification[]>;

  @Field(() => [Follow])
  @OneToMany(() => Follow, follow => follow.following)
  followers!: Relation<Follow[]>;

  @Field(() => [Follow])
  @OneToMany(() => Follow, (follow) => follow.follower)
  followings!: Relation<Follow[]>;
}