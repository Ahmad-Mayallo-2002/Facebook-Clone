import { mainEndPoint } from "@/assets/assets";
import type { MediaObject } from "@/interface/mediaObject";

export const getUrl = (image: MediaObject) =>
  (image.public_id ? "" : mainEndPoint) + image.url;
