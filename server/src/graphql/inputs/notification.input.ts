import { Field, ID, InputType } from "type-graphql";
import { NotificationType } from "../../enums/notification-type.enum";
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

@InputType()
export class NotificationInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  content!: string;

  @Field(() => NotificationType)
  @IsEnum(NotificationType)
  type!: NotificationType;

  @Field(() => ID)
  @IsUUID()
  receiverId!: string;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  referenceId?: string;
}
