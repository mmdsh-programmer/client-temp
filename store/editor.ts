import { create } from "zustand";

export type EditorMode = "edit" | "preview" | "view" | null;

interface EditorState {
  editorModal: boolean;
  setEditorModal: (open: boolean) => void;
  editorMode: EditorMode;
  setEditorMode: (mode: EditorMode) => void;
}

export const useEditorStore = create<EditorState>((set) => {
  return {
    editorModal: false,
    setEditorModal: (open) => {
      set({ editorModal: open });
    },
    editorMode: null,
    setEditorMode: (mode) => {
      set({ editorMode: mode });
    },
  };
});