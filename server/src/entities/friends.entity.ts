import { Field, ID, ObjectType } from "type-graphql";
import { IdDate } from "../graphql/interfaceTypes/IdDate";
import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { FriendRequest } from "../enums/friendRequest.enum";
import { User } from "./user.entity";

@ObjectType({ implements: IdDate })
@Entity({ name: "friends" })
export class Friends extends IdDate {
  @Field(() => ID)
  @Column({ type: "varchar", length: 100, name: "sender_id" })
  senderId!: string;

  @Field(() => ID)
  @Column({ type: "varchar", length: 100, name: "receiver_id" })
  receiverId!: string;

  @Field(() => FriendRequest)
  @Column({ type: "enum", enum: FriendRequest, default: FriendRequest.PENDING })
  status!: FriendRequest;

  // Relationships
  @Field(() => User)
  @JoinColumn({ name: "sender" })
  @ManyToOne(() => User, (user) => user.sender)
  sender!: Relation<User>;

  @Field(() => User)
  @JoinColumn({ name: "receiver" })
  @ManyToOne(() => User, (user) => user.receiver)
  receiver!: Relation<User>;
}
