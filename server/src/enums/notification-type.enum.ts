import { registerEnumType } from "type-graphql";

export enum NotificationType {
    REACT = 'REACT',
    COMMENT = 'COMMENT',
    FOLLOW = 'FOLLOW',   
}

registerEnumType(NotificationType, {
    name: 'NotificationType',
    description: 'Type of notification',
})