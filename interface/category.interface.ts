import { IDocumentMetadata } from "./document.interface";

export interface ICategoryChildren {
  list: (ICategoryMetadata | IDocumentMetadata)[];
  size: number;
  page: number;
  total: number;
}

export interface ICategory {
  id: number;
  name: string;
  children: ICategory[];
  description: string;
  parentId?: number;
  createDate: number;
  userGroupHash: string;
}

export interface ICategoryCrud {
  id?: number;
  name: string;
  description: string;
  parentId?: number;
}

export interface ICategoryMetadata {
  id:number;
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
}
