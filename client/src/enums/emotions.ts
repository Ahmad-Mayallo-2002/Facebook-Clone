import LIKE from "@/assets/like.svg";
import LOVE from "@/assets/love.svg";
import HAHA from "@/assets/haha.svg";
import WOW from "@/assets/wow.svg";
import SAD from "@/assets/sad.svg";
import ANGRY from "@/assets/angry.svg";

export enum Emotions {
  LIKE = "LIKE",
  LOVE = "LOVE",
  HAHA = "HAHA",
  WOW = "WOW",
  SAD = "SAD",
  ANGRY = "ANGRY",
}

export const emotionList = [
  { name: Emotions.LIKE, icon: LIKE },
  { name: Emotions.LOVE, icon: LOVE },
  { name: Emotions.HAHA, icon: HAHA },
  { name: Emotions.WOW, icon: WOW },
  { name: Emotions.SAD, icon: SAD },
  { name: Emotions.ANGRY, icon: ANGRY },
];