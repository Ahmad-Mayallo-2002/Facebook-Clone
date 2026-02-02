import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { IdDate } from "../graphql/interfaceTypes/IdDate";
import { User } from "./user.entity";

@ObjectType({implements: IdDate})
@Entity({name: 'notifications'})
export class Notification extends IdDate {
  @Field(() => String)
  @Column({type: 'varchar', length: 100})
  content!: string;

  // Relationships
  @Field(() => User)
  @JoinColumn()
  @ManyToOne(() => User, user => user.notifications)
  user!: Relation<User>;
}
