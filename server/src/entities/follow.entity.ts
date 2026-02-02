import { Field, ID, ObjectType } from "type-graphql";
import { IdDate } from "../graphql/interfaceTypes/IdDate";
import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { User } from "./user.entity";
import { Page } from "./page.entity";

@ObjectType({implements: IdDate})
@Entity({name: 'follows'})
export class Follow extends IdDate {
    @Field(() => ID)
    @Column({type: 'varchar', length: 100, name: 'follower_id'})
    followerId!: string;
    
    @Field(() => ID, { nullable: true })
    @Column({type: 'varchar', length: 100, name: 'following_user_id'})
    followingUserId?: string;


    @Field(() => ID, {nullable: true})
    @Column({ type: 'varchar', length: 100, name: 'following_page_id' })
    followingPageId?: string;

    // Relationships
    @Field(() => User)
    @JoinColumn({name: 'following_user'})
    @ManyToOne(() => User, user => user.followers)
    followingUser!: Relation<User>;

    @Field(() => Page)
    @JoinColumn({ name: 'following_page' })
    @ManyToOne(() => Page, page => page.followers)
    followingPage!: Relation<Page>;
    
    @Field(() => User)
    @JoinColumn()
    @ManyToOne(() => User, user => user.followings)
    follower!: Relation<User>;
}