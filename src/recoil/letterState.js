import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist(
    {
        key: "localStorage",
        storage: localStorage,
    }
);

  export const userIdState = atom({
    key: 'userId',
    default: 'share',
    effects_UNSTABLE: [persistAtom]
  });

  export const userLoginValidState = atom({
    key: 'userLoginValidState',
    default: false,
    effects_UNSTABLE: [persistAtom]
  });

  export const groupIdState = atom({
    key: 'groupIdState',
    default: '',
    effects_UNSTABLE: [persistAtom]
  });

  export const groupMemIdState = atom({
    key: 'groupMemIdState',
    default: '',
    effects_UNSTABLE: [persistAtom]
  });