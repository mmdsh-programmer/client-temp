import { create } from "zustand";
import { ITag } from "@interface/tags.interface";
import { IDomainTag } from "@interface/domain.interface";

export const useTagStore = create<{
  createTag: boolean | null;
  setCreateTag: (create: boolean | null) => void;
  selectedTag: ITag | IDomainTag | undefined;
  setSelectedTag: (tag: ITag | IDomainTag | undefined) => void;
  editTag: boolean | null;
  setEditTag: (edit: boolean | null) => void;
  deleteTag: boolean | null;
  setDeleteTag: (del: boolean | null) => void;
  tagDrawer: boolean | null;
  setTagDrawer: (open: boolean | null) => void;
}>((set) => {
  return {
    createTag: null,
    setCreateTag: (createTag) => {
      return set({ createTag });
    },
    selectedTag: undefined,
    setSelectedTag: (tag) => {
      return set({ selectedTag: tag });
    },
    editTag: null,
    setEditTag: (edit) => {
      return set({ editTag: edit });
    },
    deleteTag: null,
    setDeleteTag: (del) => {
      return set({ deleteTag: del });
    },
    tagDrawer: null,
    setTagDrawer: (open) => {
      return set({ tagDrawer: open });
    },
  };
});
