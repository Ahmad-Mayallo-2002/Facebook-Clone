import { Field, ObjectType } from "type-graphql";
import { BeforeInsert, Column, Entity, OneToMany, Relation } from "typeorm";
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
import { Gender } from "../enums/gender.enum";

let defaultValue = { url: '', public_id: '' }

@ObjectType({ implements: IdDate })
@Entity({ name: "users" })
export class User extends IdDate {
  @Field()
  @Column({ type: "varchar", length: 100 })
  username!: string;

  @Field()
  @Column({ type: "varchar", length: 100 })
  email!: string;

  @Field({ defaultValue: "Hello, I am Facebook User" })
  @Column({ type: "varchar", length: 255, default: "Hello, I am Facebook User" })
  description!: string;

  @Column({ type: "varchar", length: 100 })
  password!: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Field(() => Roles, { defaultValue: Roles.USER })
  @Column({ type: "enum", enum: Roles, default: Roles.USER })
  role!: Roles;

  @Field(() => MediaObjectType, { defaultValue })
  @Column({ type: "simple-json", default: defaultValue })
  image!: MediaObject;

  @Field(() => MediaObjectType, { defaultValue })
  @Column({ type: "simple-json", default: defaultValue })
  banner!: MediaObject;

  @Field(() => Gender)
  @Column({ type: 'enum', enum: Gender })
  gender!: Gender;

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

  @Field(() => [Follow])
  @OneToMany(() => Follow, follow => follow.followingUser)
  followers!: Relation<Follow[]>;

  @Field(() => [Follow])
  @OneToMany(() => Follow, (follow) => follow.follower)
  followings!: Relation<Follow[]>;

  @OneToMany(() => Notification, notification => notification.sender)
  sentNotifications!: Relation<Notification[]>;

  @OneToMany(() => Notification, notification => notification.receiver)
  receivedNotifications!: Relation<Notification[]>;

  // Before Insert
  @BeforeInsert()
  setDefaultMedia() {
    if (!this.image || !this.image.url) {
      if (this.gender === Gender.MALE) {
        this.image = {
          url: "/images/default-male-image.jpg",
          public_id: "",
        };
      } else if (this.gender === Gender.FEMALE) {
        this.image = {
          url: "/images/default-female-image.jpg",
          public_id: "",
        };
      }
    }

    if (!this.banner || !this.banner.url) {
      this.banner = {
        url: "/images/default-background.jpeg",
        public_id: "",
      };
    }
  }
}