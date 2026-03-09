import { registerEnumType } from "type-graphql";

export enum NotificationType {
    REACT = 'REACT',
    COMMENT = 'COMMENT',
    FRIENDSHIP_REQUEST = 'FRIENDSHIP_REQUEST',
    FRIENDSHIP_ACCEPT = 'FRIENDSHIP_ACCEPT',
    FRIENDSHIP_REJECT = 'FRIENDSHIP_REJECT',
}

registerEnumType(NotificationType, {
    name: 'NotificationType',
    description: 'Type of notification',
})