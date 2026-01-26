import { registerEnumType } from "type-graphql";

export enum Roles {
  USER = "USER",
  ADMIN = "ADMIN",
}

registerEnumType(Roles, {
    name: 'Roles',
    description: 'Roles Enum'
})