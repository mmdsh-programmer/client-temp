import { logEffect } from "@utils/index";
import { atom } from "recoil";

export enum ETourSection {
    REPO = "repo",
    DOCUMENTS = "documents",
    VERSION = "version",
    DASHBOARD = "dashboard"
  }

export const activeTourAtom = atom<null|ETourSection>({
  key: "activeTourAtom",
  default: null,
  effects: [logEffect("activeTourAtom")],
});