import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Relation } from "typeorm";
import { IdDate } from "../graphql/interfaceTypes/IdDate";
import { MediaObject } from "../interfaces/mediaObject.interface";
import { MediaObjectType } from "../graphql/objectTypes/mediaObject";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";
import { React } from "./react.entity";

@ObjectType({ implements: IdDate })
@Entity({ name: "posts" })
export class Post extends IdDate {
  @Field(() => String, {defaultValue: ''})
  @Column({ type: "text", default: '' })
  content!: string;

  @Field(() => [MediaObjectType], {defaultValue: []})
  @Column({type: 'simple-array', default: []})
  media!: MediaObject[];

  @Field(() => Boolean, {defaultValue: true})
  @Column({ type: 'boolean' ,default: true })
  isVisible!: boolean;

  @Field(() => ID)
  @Column({ type: "varchar", length: 100, name: "user_id" })
  userId!: string;

  // Relationships
  @Field(() => User)
  @JoinColumn()
  @ManyToOne(() => User, (user) => user.posts)
  user!: Relation<User>;
  
  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post)
  comments!: Relation<Comment[]>;
  
  @Field(() => [React])
  @OneToMany(() => React, (react) => react.post)
  reacts!: Relation<React[]>;
}
