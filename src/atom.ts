import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export const modeAtom = atom({
  key: "mode",
  default: false,
});
