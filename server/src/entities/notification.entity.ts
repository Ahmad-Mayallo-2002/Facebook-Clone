import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { IdDate } from "../graphql/interfaceTypes/IdDate";
import { User } from "./user.entity";
import { NotificationType } from "../enums/notification-type.enum";

@ObjectType({ implements: IdDate })
@Entity({ name: "notifications" })
export class Notification extends IdDate {
  @Field(() => String)
  @Column({ type: "varchar", length: 100 })
  content!: string;

  @Field(() => NotificationType)
  @Column({ type: "enum", enum: NotificationType })
  type!: NotificationType;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  referenceId?: string;

  @Field(() => ID)
  @Column({type: 'varchar', length: 100})
  senderId!: string;
  

  @Field(() => ID)
  @Column({type: 'varchar', length: 100})
  receiverId!: string;

  // Relationships
  @Field(() => User)
  @JoinColumn({ name: "sender" })
  @ManyToOne(() => User, (user) => user.sentNotifications)
  sender!: Relation<User>;

  @Field(() => User)
  @JoinColumn({ name: "receiver" })
  @ManyToOne(() => User, (user) => user.receivedNotifications)
  receiver!: Relation<User>;
}
