import { create } from "zustand";
import { ICategoryMetadata } from "@interface/category.interface";
import { CategoryChildrenQueryParams } from "@atom/category";

interface CategoryState {
  category: ICategoryMetadata | null;
  setCategory: (cat: ICategoryMetadata | null) => void;
  categoryShow: ICategoryMetadata | null;
  setCategoryShow: (cat: ICategoryMetadata | null) => void;
  categoryQueryParams: CategoryChildrenQueryParams;
  setCategoryQueryParams: (params: CategoryChildrenQueryParams) => void;
  categoryMoveDest: ICategoryMetadata | null;
  setCategoryMoveDest: (cat: ICategoryMetadata | null) => void;
  categorySearchContentParam: string;
  setCategorySearchContentParam: (param: string) => void;
  categorySearchContentOpen: boolean;
  setCategorySearchContentOpen: (open: boolean) => void;
  categorySearchContentLink: string | null;
  setCategorySearchContentLink: (link: string | null) => void;
}

export const useCategoryStore = create<CategoryState>((set) => {
  return {
    category: null,
    setCategory: (cat) => {
      set({ category: cat });
    },
    categoryShow: null,
    setCategoryShow: (cat) => {
      set({ categoryShow: cat });
    },
    categoryQueryParams: { limit: 10, page: 1, total: 0 },
    setCategoryQueryParams: (params) => {
      set({ categoryQueryParams: params });
    },
    categoryMoveDest: null,
    setCategoryMoveDest: (cat) => {
      set({ categoryMoveDest: cat });
    },
    categorySearchContentParam: "",
    setCategorySearchContentParam: (param) => {
      set({ categorySearchContentParam: param });
    },
    categorySearchContentOpen: false,
    setCategorySearchContentOpen: (open) => {
      set({ categorySearchContentOpen: open });
    },
    categorySearchContentLink: null,
    setCategorySearchContentLink: (link) => {
      set({ categorySearchContentLink: link });
    },
  };
});

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
