import { ERoles } from "./enums";

export interface IRequestUser {
  family_name?: string;
  given_name?: string;
  id: number;
  picture?: string;
  preferred_username: string;
  role?: ERoles;
}

export interface IAccessRequest {
  createdAt: string;
  id: number;
  repoId: number;
  repoName?: string;
  role: ERoles;
  status: string;
  type: string;
  user: IRequestUser;
  userSSOID: number;
}

export interface IAccessRequestResponse {
  list: IAccessRequest[];
  offset: number;
  size: number;
  total: number;
}
