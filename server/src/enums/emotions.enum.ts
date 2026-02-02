import { registerEnumType } from "type-graphql";

export enum Emotions {
  LIKE = "LIKE",
  LOVE = "LOVE",
  HAHA = "HAHA",
  WOW = "WOW",
  SAD = "SAD",
  ANGRY = "ANGRY",
}

registerEnumType(Emotions, {
  name: "Emotions",
  description: 'Emotions Description'
});