import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const cardShowState = atom({
  key: "cardShowState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
