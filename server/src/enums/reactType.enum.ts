import { registerEnumType } from "type-graphql";

export enum ReactType {
  POST = "POST",
}

registerEnumType(ReactType, {
  name: "ReactType",
  description: "ReactType Enum",
});
