import { atom } from "recoil";

export const randomFoodState = atom({
  key: "randomFoodState",
  default: "",
});

export const isAnimationActiveState = atom({
  key: "isAnimationActiveState",
  default: true,
});
