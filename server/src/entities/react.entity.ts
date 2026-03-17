import { Field, ID, ObjectType } from "type-graphql";
import { Emotions } from "../enums/emotions.enum";
import { ReactType } from "../enums/reactType.enum";
import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { IdDate } from "../graphql/interfaceTypes/IdDate";
import { User } from "./user.entity";
import { Post } from "./post.entity";

@ObjectType({ implements: IdDate })
@Entity({ name: "reacts" })
export class React extends IdDate {
  @Field(() => Emotions)
  @Column({ type: "enum", enum: Emotions })
  value!: Emotions;

  @Field(() => ReactType)
  @Column({ type: "enum", enum: ReactType })
  type!: ReactType;

  @Field()
  @Column({ type: "varchar", length: 100, name: "user_id" })
  userId!: string;

  @Field(() => ID, { nullable: true })
  @Column({ type: "varchar", length: 100, name: "post_id", nullable: true })
  postId!: string;

  // Relationships
  @Field(() => User)
  @JoinColumn({ name: "user" })
  @ManyToOne(() => User, (user) => user.reacts)
  user!: Relation<User>;

  @Field(() => Post)
  @JoinColumn({ name: "post" })
  @ManyToOne(() => Post, (post) => post.reacts)
  post!: Relation<Post>;
}
