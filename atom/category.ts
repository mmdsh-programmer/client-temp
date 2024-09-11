import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import { atom } from "recoil";
import { logEffect } from "@utils/index";

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
  effects: [logEffect("categoryQueryParamsAtom")],
});

export const categoryAtom = atom<ICategoryMetadata | null>({
  key: "categoryAtom",
  default: null,
  effects: [logEffect("categoryAtom")],
});

export const categoryShowAtom = atom<ICategoryMetadata | null>({
  key: "categoryShowAtom",
  default: null,
  effects: [logEffect("categoryShowAtom")],
});

export const categoryBreadCrumbAtom = atom<ICategoryMetadata[]>({
  key: "categoryBreadCrumbAtom",
  default: [],
  effects: [logEffect("categoryBreadCrumbAtom")],
});

export const categoryMoveDestAtom = atom<ICategoryMetadata | null>({
  key: "categoryMoveDestAtom",
  default: null,
  effects: [logEffect("categoryMoveDestAtom")],
});

export const categorySearchContentAtom = atom<boolean>({
  key: "categorySearchContentAtom",
  default: false,
  effects: [logEffect("categorySearchContentAtom")],
});

export const categorySearchContentParamAtom = atom<string>({
  key: "categorySearchContentParamAtom",
  default: "",
  effects: [logEffect("categorySearchContentParamAtom")],
});

export const categoryViewModeAtom = atom<"table" | "tree">({
  key: "categoryViewModeAtom",
  default: "table",
  effects: [logEffect("categoryViewModeAtom")],
});

export const childrenSearchAtom = atom<string | null>({
  key: "childrenSearchAtom",
  default: null,
  effects: [logEffect("childrenSearchAtom")],
});

export const createCatDocDrawerAtom = atom<boolean | null>({
  key: "createCatDocDrawerAtom",
  default: null,
  effects: [logEffect("createCatDocDrawerAtom")],
});

export const categoryDrawerAtom = atom<boolean | null>({
  key: "categoryDrawerAtom",
  default: null,
  effects: [logEffect("categoryDrawerAtom")],
});
