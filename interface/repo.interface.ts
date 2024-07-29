import { ERoles } from "./enums";

export interface IRepo {
  id: number;
  name: string;
  description: string;
  bookmark: boolean;
  createDate: string;
  lastAccessDate: string;
  imageFileHash: string;
  roleName: ERoles;
  updatedAt: string;
  userGroupHash: string;
  chatThreadId?: number;
  owner?: {
    userName: string;
    name: string;
    ssoId: number;
    img: string;
  };
  unreadCount?: number;
  isPublish: boolean;
  isArchived: boolean;
  publishExpireTime: number;
  adminPublicLink: IPublicLink | null;
  viewerPublicLink: IPublicLink | null;
  writerPublicLink: IPublicLink | null;
  editorPublicLink: IPublicLink | null;
  metadata?: null;
}

export interface IPublicLink {
  hasPassword: boolean | null;
  expireTime: number;
  link: string;
}

export interface IResponse {
  list: IRepo[];
  offset: number;
  size: number;
  total: number;
}
export interface IReport {
  categories: number;
  documents: number;
  drafts: number;
  pendingDrafts: number;
  pendingVersions: number;
  podSpaceStatus: {
    bandwidthLimit: number;
    plan: {
      title: string;
      hash: string;
      description: string;
      type: string;
      size: number;
      bandwidth: number;
      connections: number;
      versions: number;
    };
    storageLimit: number;
    storageUsage: number;
  };
}

export interface INotificationAccess {
  serviceName: string;
  title: string;
  notificationAccess: boolean;
  allowed: boolean;
  blocked: boolean;
}
