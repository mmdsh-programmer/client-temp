import { ERoles } from "./enums";

export interface IRoles {
  id: number;
  name: ERoles;
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

export interface IUserConfigPanel {
  serviceName: string;
  title: string;
  allowed: boolean;
  blocked: boolean;
  notificationAccess: boolean;
}
