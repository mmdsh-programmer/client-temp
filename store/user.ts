import { create } from "zustand";
import { IUser } from "@interface/users.interface";

export const useUserStore = create<{
  selectedUser: IUser | null;
  setSelectedUser: (user: IUser | null) => void;
  blockService: boolean | null;
  setBlockService: (block: boolean | null) => void;
  notifService: boolean | null;
  setNotifService: (notif: boolean | null) => void;
  deleteUser: boolean | null;
  setDeleteUser: (notif: boolean | null) => void;
  transferOwnership: boolean | null;
  setTransferOwnership: (notif: boolean | null) => void;
  userDrawer: boolean | null;
  setUserDrawer: (drawer: boolean | null) => void;
}>((set) => {
  return {
    selectedUser: null,
    setSelectedUser: (user) => {
      return set({ selectedUser: user });
    },
    blockService: null,
    setBlockService: (block) => {
      return set({ blockService: block });
    },
    notifService: null,
    setNotifService: (notif) => {
      return set({ notifService: notif });
    },
    userDrawer: null,
    setUserDrawer: (block) => {
      return set({ userDrawer: block });
    },
    deleteUser: null,
    setDeleteUser: (user) => {
      return set({ deleteUser: user });
    },
    transferOwnership: null,
    setTransferOwnership: (user) => {
      return set({ transferOwnership: user });
    },
  };
});
