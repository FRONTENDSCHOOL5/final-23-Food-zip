import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const modalState = atom({
  key: "modalState",
  default: { show: false, type: "setting", commentId: null, postId: null },
  effects_UNSTABLE: [persistAtom],
});
