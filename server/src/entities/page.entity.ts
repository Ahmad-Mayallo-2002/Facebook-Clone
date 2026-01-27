import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { IdDate } from "../graphql/interfaceTypes/IdDate";
import { MediaObjectType } from "../graphql/objectTypes/mediaObject";
import { MediaObject } from "../interfaces/mediaObject.interface";
import { User } from "./user.entity";

@ObjectType({ implements: IdDate })
@Entity({ name: "pages" })
export class Page extends IdDate {
  @Field(() => MediaObjectType, {defaultValue: {}})
  @Column({ type: "simple-json", default: {} })
  image!: MediaObject;

  @Field(() => MediaObjectType, {defaultValue: {}})
  @Column({ type: "simple-json", default: {} })
  banner!: MediaObject;

  @Field({ defaultValue: "" })
  @Column({ type: "varchar", length: 255, default: "" })
  description!: string;

  @Field(() => ID)
  @Column({type: 'varchar', length: 100, name: 'user_id'})
  userId!: string;

  // Relationships
  @Field(() => User)
  @JoinColumn()
  @ManyToOne(() => User, user => user.pages)
  user!: Relation<User>;
}
