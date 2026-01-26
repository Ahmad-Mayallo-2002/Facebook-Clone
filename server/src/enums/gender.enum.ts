import { registerEnumType } from "type-graphql";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

registerEnumType(Gender, {
  name: "Gender",
  description: "Gender Enum Description",
});
