import { registerEnumType } from "type-graphql";

export enum ReactType {
  POST = "POST",
  COMMENT = "COMMENT",
}

registerEnumType(ReactType, {
  name: "ReactType",
  description: "ReactType Enum",
});
