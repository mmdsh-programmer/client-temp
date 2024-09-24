import { logger } from "@utils/index";
import { atom } from "recoil";
import { ITab, IVersion } from "interface/version.interface";

export const editorModalAtom = atom<boolean>({
  key: "editorModal",
  default: false,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("editorModal", newValue, oldValue);
      });
    },
  ],
});

export const editorModeAtom = atom<"edit" | "preview" | "temporaryPreview">({
  key: "editorMode",
  default: "preview",
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("editorMode", newValue, oldValue);
      });
    },
  ],
});

export const editorDataAtom = atom<IVersion | null>({
  key: "editorData",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("editorData", newValue, oldValue);
      });
    },
  ],
});

export const editorChatDrawerAtom = atom<boolean>({
  key: "editorChatDrawerAtom",
  default: false,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("editorChatDrawerAtom", newValue, oldValue);
      });
    },
  ],
});

export const editorDecryptedContentAtom = atom<string | null>({
  key: "editorDecryptedContent",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("editorDecryptedContent", newValue, oldValue);
      });
    },
  ],
});

export const editorPublicKeyAtom = atom<string | null>({
  key: "editorPublicKey",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("editorPublicKey", newValue, oldValue);
      });
    },
  ],
});