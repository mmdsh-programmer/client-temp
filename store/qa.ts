import { IQuestion } from "@interface/qa.interface";
import { create } from "zustand";

interface QaStoreState {
  selectedQuestion: IQuestion | null;
  setSelectedQuestion: (selectedQuestion: IQuestion | null) => void;

  selectedAnswer: IQuestion | null;
  setSelectedAnswer: (selectedAnswer: IQuestion | null) => void;

  openAnswer: boolean | null;
  setOpenAnswer: (openAnswer: boolean | null) => void;

  openEdit: boolean | null;
  setOpenEdit: (openEdit: boolean | null) => void;

  openDelete: boolean | null;
  setOpenDelete: (openDelete: boolean | null) => void;

  openEditAnswer: boolean | null;
  setOpenEditAnswer: (openEditAnswer: boolean | null) => void;

  openDeleteAnswer: boolean | null;
  setOpenDeleteAnswer: (openDeleteAnswer: boolean | null) => void;

  openComment: boolean | null;
  setOpenComment: (openComment: boolean | null) => void;
}

export const useQaStore = create<QaStoreState>((set) => {
  return {
    selectedQuestion: null,
    setSelectedQuestion: (selectedQuestion) => {
      return set({ selectedQuestion });
    },

    selectedAnswer: null,
    setSelectedAnswer: (selectedAnswer) => {
      return set({ selectedAnswer });
    },
    openAnswer: false,
    setOpenAnswer: (openAnswer) => {
      return set({ openAnswer });
    },

    openEdit: false,
    setOpenEdit: (openEdit) => {
      return set({ openEdit });
    },

    openDelete: false,
    setOpenDelete: (openDelete) => {
      return set({ openDelete });
    },

    openEditAnswer: false,
    setOpenEditAnswer: (openEditAnswer) => {
      return set({ openEditAnswer });
    },

    openDeleteAnswer: false,
    setOpenDeleteAnswer: (openDeleteAnswer) => {
      return set({ openDeleteAnswer });
    },

    openComment: false,
    setOpenComment: (openComment) => {
      return set({ openComment });
    },
  };
});
