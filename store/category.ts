/* eslint-disable @typescript-eslint/no-explicit-any */
import { create, StateCreator } from "zustand";
import { ICategoryMetadata } from "@interface/category.interface";
import { CategoryChildrenQueryParams } from "@atom/category";
import { devtools } from "zustand/middleware";
import { logger } from "./logger";

interface CategoryState {
  category: ICategoryMetadata | null;
  setCategory: (cat: ICategoryMetadata | null) => void;
  categoryShow: ICategoryMetadata | null;
  setCategoryShow: (cat: ICategoryMetadata | null) => void;
  categoryQueryParams: CategoryChildrenQueryParams;
  setCategoryQueryParams: (params: CategoryChildrenQueryParams) => void;
  categoryMoveDest: ICategoryMetadata | null;
  setCategoryMoveDest: (cat: ICategoryMetadata | null) => void;
  categorySearchContentParam: string | null;
  setCategorySearchContentParam: (param: string | null) => void;
  categorySearchContentOpen: boolean;
  setCategorySearchContentOpen: (open: boolean) => void;
  categorySearchContentLink: string | null;
  setCategorySearchContentLink: (link: string | null) => void;
}

export const useCategoryStore = create<CategoryState>()(
  devtools(
    logger((set: Parameters<StateCreator<CategoryState>>[0]) => {
      return {
        category: null,
        setCategory: (cat) => {
          (set as any)({ category: cat }, false, "setCategory");
        },
        categoryShow: null,
        setCategoryShow: (cat) => {
          (set as any)({ categoryShow: cat }, false, "setCategoryShow");
        },
        categoryQueryParams: { limit: 10, page: 1, total: 0 },
        setCategoryQueryParams: (params) => {
          (set as any)({ categoryQueryParams: params }, false, "setCategoryQueryParams");
        },
        categoryMoveDest: null,
        setCategoryMoveDest: (cat) => {
          (set as any)({ categoryMoveDest: cat }, false, "setCategoryMoveDest");
        },
        categorySearchContentParam: "",
        setCategorySearchContentParam: (param) => {
          (set as any)({ categorySearchContentParam: param }, false, "setCategorySearchContentParam");
        },
        categorySearchContentOpen: false,
        setCategorySearchContentOpen: (open) => {
          (set as any)({ categorySearchContentOpen: open }, false, "setCategorySearchContentOpen");
        },
        categorySearchContentLink: null,
        setCategorySearchContentLink: (link) => {
          (set as any)({ categorySearchContentLink: link }, false, "setCategorySearchContentLink");
        },
      };
    }),
    { name: "CategoryStore" },
  ),
);

interface CategoryDrawerState {
  categoryDrawer: boolean;
  setCategoryDrawer: (open: boolean) => void;
}

export const useCategoryDrawerStore = create<CategoryDrawerState>((set) => {
  return {
    categoryDrawer: false,
    setCategoryDrawer: (open) => {
      set({ categoryDrawer: open });
    },
  };
});
