import { ERoles } from "./enums";

export interface IResource {
  id: number;
  uniqueId: string;
  parentId: number;
  name: string;
  metadata: string;
  active: boolean;
  creator: string;
  hasChildren: boolean;
}

export interface IGetResourceAccesses {
  list: {
    access: ERoles;
    expireGrants: {};
    user: {
      email_verified: boolean;
      family_name: string;
      given_name: string;
      id: number;
      nationalcode_verified: boolean;
      phone_number_verified: boolean;
      preferred_username: string;
    };
  }[];
  resource: IResource;
  offset: number;
  size: number;
  total: number;
}

export interface IResourceUser {
  userName: string;
  name: string;
  ssoId: number;
  img?: string;
  userRole: ERoles;
}

export interface IGetUserAccesses {
  list: IResourceUser[];
  offset: number;
  size: number;
  total: number;
}

export interface IAddAccessesToResource {
  resource: IResource;
  access: ERoles[];
  user?: {
    preferred_username: string;
    given_name: string;
    family_name: string;
    id: number;
    picture: string;
  };
  groupTitle?: string;
}
