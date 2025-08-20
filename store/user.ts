import { create } from "zustand";
import { IUser } from "@interface/users.interface";

// Zustand store for user management (replaces user atoms)
export const useUserStore = create<{
  selectedUser: IUser | null;
  setSelectedUser: (user: IUser | null) => void;
}>((set) => {
  return {
    selectedUser: null,
    setSelectedUser: (user) => {
      return set({ selectedUser: user });
    },
  };
});


