import { create } from "zustand";
import { IVersion } from "@interface/version.interface";

// Zustand store for editor management (replaces editor atoms)
export const useEditorStore = create<{
  editorModal: boolean;
  setEditorModal: (modal: boolean) => void;
  editorMode: "edit" | "preview" | "temporaryPreview";
  setEditorMode: (mode: "edit" | "preview" | "temporaryPreview") => void;
  editorData: IVersion | null;
  setEditorData: (data: IVersion | null) => void;
  editorListDrawer: boolean;
  setEditorListDrawer: (drawer: boolean) => void;
  editorDecryptedContent: string | null;
  setEditorDecryptedContent: (content: string | null) => void;
  editorPublicKey: string | null;
  setEditorPublicKey: (key: string | null) => void;
  postId: number | null;
  setPostId: (id: number | null) => void;
}>((set) => {
  return {
    editorModal: false,
    setEditorModal: (modal) => {
      return set({ editorModal: modal });
    },
    editorMode: "preview",
    setEditorMode: (mode) => {
      return set({ editorMode: mode });
    },
    editorData: null,
    setEditorData: (data) => {
      return set({ editorData: data });
    },
    editorListDrawer: false,
    setEditorListDrawer: (drawer) => {
      return set({ editorListDrawer: drawer });
    },
    editorDecryptedContent: null,
    setEditorDecryptedContent: (content) => {
      return set({ editorDecryptedContent: content });
    },
    editorPublicKey: null,
    setEditorPublicKey: (key) => {
      return set({ editorPublicKey: key });
    },
    postId: null,
    setPostId: (id) => {
      return set({ postId: id });
    },
  };
});