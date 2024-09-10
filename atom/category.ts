import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import { atom } from "recoil";
import { logger } from "@utils/index";

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

export const categoryQueryParamsAtom = atom<CategoryChildrenQueryParams>({
  key: "categoryQueryParamsAtom",
  default: {
    limit: 10,
    page: 1,
    total: 0,
  },
});

export const categoryAtom = atom<ICategoryMetadata | null>({
  key: "categoryAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("categoryAtom", newValue, oldValue);
      });
    },
  ],
});

export const categoryShowAtom = atom<ICategoryMetadata | null>({
  key: "categoryShowAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("categoryShowAtom", newValue, oldValue);
      });
    },
  ],
});

export const categoryBreadCrumbAtom = atom<ICategoryMetadata[]>({
  key: "categoryBreadCrumbAtom",
  default: [],
});

export const categoryMoveDestAtom = atom<ICategoryMetadata | null>({
  key: "categoryMoveDestAtom",
  default: null,
});

export const categorySearchContentAtom = atom<boolean>({
  key: "categorySearchContentAtom",
  default: false,
});

export const categorySearchContentParamAtom = atom<string>({
  key: "categorySearchContentParamAtom",
  default: "",
});

export const categoryViewModeAtom = atom<"table" | "tree">({
  key: "categoryViewModeAtom",
  default: "table",
});

export const childrenSearchAtom = atom<string | null>({
  key: "childrenSearchAtom",
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
