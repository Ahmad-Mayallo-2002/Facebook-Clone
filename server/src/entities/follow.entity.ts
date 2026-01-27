import { Field, ID, ObjectType } from "type-graphql";
import { IdDate } from "../graphql/interfaceTypes/IdDate";
import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { User } from "./user.entity";

@ObjectType({implements: IdDate})
@Entity({name: 'follows'})
export class Follow extends IdDate {
    @Field(() => ID)
    @Column({type: 'varchar', length: 100, name: 'follower_id'})
    followerId!: string;
    
    @Field(() => ID)
    @Column({type: 'varchar', length: 100, name: 'following_id'})
    followingId!: string;

    // Relationships
    @Field(() => User)
    @JoinColumn()
    @ManyToOne(() => User, user => user.followers)
    following!: Relation<User>;
    
    @Field(() => User)
    @JoinColumn()
    @ManyToOne(() => User, user => user.followings)
    follower!: Relation<User>;
}