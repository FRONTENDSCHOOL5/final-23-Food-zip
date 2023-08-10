import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const randomFoodState = atom({
  key: "randomFoodState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const isAnimationActiveState = atom({
  key: "isAnimationActiveState",
  default: true,
  effects_UNSTABLE: [persistAtom],
});
