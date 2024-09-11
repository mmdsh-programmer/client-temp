import { logger } from "@utils/index";
import { atom, selector } from "recoil";
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

export const editorVersionAtom = atom<IVersion | null>({
  key: "editorVersion",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("editorVersion", newValue, oldValue);
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

export const editorTrackChangeAtom = selector({
  key: "trackChange",
  get: ({ get }) => {
    const editorData = get(editorDataAtom);
    const selectedVersion = get(editorVersionAtom);
    const editorMode = get(editorModeAtom);
    if (editorData && selectedVersion && editorMode === "edit") {
      const { content: orginal } = editorData;
      const { content: modified } = selectedVersion;
      return orginal !== modified;
    }
    return false;
  },
});

export const editorScreenMode = atom<boolean>({
  key: "editorScreen",
  default: false,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("editorScreenMode", newValue, oldValue);
      });
    },
  ],
});

export const editorTabDataAtom = atom<ITab | null>({
  key: "editorTabData",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("editorTabData", newValue, oldValue);
      });
    },
  ],
});

export const editorTablastVersionAtom = atom<IVersion | undefined>({
  key: "editorTabLastVersion",
  default: undefined,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("editorTabLastVersion", newValue, oldValue);
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