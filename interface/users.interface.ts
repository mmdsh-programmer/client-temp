import { ERoles } from "./enums";

export interface IRoles {
  id: number;
  name: ERoles;
}

export interface IUserResponse {
  offset: number;
  size: number;
  total: number;
  list: IUser[];
}
export interface IUser {
  lastAccessDate: number | null;
  userInfo: {
    img: string;
    name: string;
    ssoId: number;
    userName: string;
  };
  userRole: ERoles;
}
