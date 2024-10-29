import { EEmptyList } from "@components/molecules/emptyList";
import {FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,} from "@tanstack/react-query";
import { IListResponse } from "./repo.interface";
import { IDocumentMetadata } from "./document.interface";

export interface ICategory {
  id: number;
  name: string;
  children: ICategory[];
  description: string;
  parentId?: number;
  createDate: number;
  userGroupHash: string;
  newOne?: boolean;
}

export interface ICategoryCrud {
  id?: number;
  name: string;
  description: string;
  parentId?: number;
}

export interface ICategoryMetadata {
  id: number;
  name: string;
  description: string;
  repoId: number;
  type: "category";
  extraDetails: string | null;
  isHidden: boolean;
  creator: {
    img: string;
    name: string;
    ssoId: number;
    userName: string;
    contactId: string | null;
  } | null;
  order?: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  parentId: number | null;
  active: boolean;
  isTemplate: boolean;
  userGroupHash: string | null;
  newOne?: boolean;
}

export interface ICategoryView {
  isLoading: boolean;
  getCategoryList:
    | InfiniteData<
        IListResponse<ICategoryMetadata | IDocumentMetadata>,
        unknown
      >
    | undefined;
  hasNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<
        IListResponse<ICategoryMetadata | IDocumentMetadata>,
        unknown
      >,
      Error
    >
  >;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  type: EEmptyList;
}
