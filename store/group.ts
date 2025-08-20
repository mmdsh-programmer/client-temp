import { create } from "zustand";
import { IGetGroups } from "@interface/group.interface";

// Zustand store for group management (replaces group atoms)
export const useGroupStore = create<{
  createGroup: boolean | null;
  setCreateGroup: (create: boolean | null) => void;
  selectedGroup: IGetGroups | undefined;
  setSelectedGroup: (group: IGetGroups | undefined) => void;
  editGroup: boolean | null;
  setEditGroup: (edit: boolean | null) => void;
  deleteGroup: boolean | null;
  setDeleteGroup: (deleteGroup: boolean | null) => void;
  groupDrawer: boolean | null;
  setGroupDrawer: (drawer: boolean | null) => void;
}>((set) => {
  return {
    createGroup: null,
    setCreateGroup: (createGroup) => {
      return set({ createGroup });
    },
    selectedGroup: undefined,
    setSelectedGroup: (group) => {
      return set({ selectedGroup: group });
    },
    editGroup: null,
    setEditGroup: (edit) => {
      return set({ editGroup: edit });
    },
    deleteGroup: null,
    setDeleteGroup: (deleteGroup) => {
      return set({ deleteGroup });
    },
    groupDrawer: null,
    setGroupDrawer: (drawer) => {
      return set({ groupDrawer: drawer });
    },
  };
});
