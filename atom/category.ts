import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import { logger } from "@utils/index";
import { atom } from "recoil";

export interface ICategoryTreeItem extends ICategoryMetadata {
  parent?: number;
  droppable?: boolean;
}

export interface IDocumentTreeItem extends IDocumentMetadata {
  parent?: number;
  droppable?: boolean;
}

export interface CategoryChildrenQueryParams {
  page: number;
  limit: number;
  total: number;
}

// ----------------------------------
export const categoryQueryParams = atom<CategoryChildrenQueryParams>({
  key: "categoryQueryParams",
  default: {
    limit: 10,
    page: 1,
    total: 0,
  },
});

export const category = atom<ICategoryMetadata | null>({
  key: "category",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("category", newValue, oldValue);
      });
    },
  ],
});

export const categoryShow = atom<ICategoryMetadata | null>({
  key: "categoryShow",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("categoryShow", newValue, oldValue);
      });
    },
  ],
});

export const categoryBreadCrumb = atom<ICategoryMetadata[]>({
  key: "categoryBreadcrumb",
  default: [],
});

export const categoryMoveDest = atom<ICategoryMetadata | null>({
  key: "categoryMoveDest",
  default: null,
});

export const categorySearchContent = atom<boolean>({
  key: "categorySearchContent",
  default: false,
});

export const categorySearchContentParam = atom<string>({
  key: "categorySearchContentParam",
  default: "",
});

export const categoryViewModeAtom = atom<"table" | "tree">({
  key: "categoryViewMode",
  default: "table",
});

export const childrenSearch = atom<string | null>({
  key: "childrenSearch",
  default: null,
});

export const createCatDocDrawerAtom = atom<boolean | null>({
  key: "createCatDocDrawerAtom",
  default: null,
});

export const categoryDrawerAtom = atom<boolean | null>({
  key: "categoryDrawerAtom",
  default: null,
});
