export interface IPodspaceResult<T> {
  path: string;
  reference: string;
  result: T;
  status: number;
  timestamp: string;
}

interface IUsergroupHashInfo {
  created: number;
  files: IFile[];
  hash: string;
  isRemoved: boolean;
  owner: any;
  updated: number;
  users: [];
  zoneNames: string;
}

export interface IFile {
  attributes: [];
  created: number;
  extension: string;
  hash: string;
  name: string;
  owner: {
    username: string;
    name: string;
    ssoId: number;
    roles: string[];
  };
  parentHash: string;
  postId?: number;
  size: number;
  thumbnail: string;
  type: string;
  updated: number;
  uploader: {
    username: string;
    name: string;
    ssoId: number;
    roles: string[];
  };
  version: string;
}

export interface IPublishFile {
  attributes: [];
  cachePolicy: string;
  created: number;
  extension: string;
  hash: string;
  indexState: string;
  md5: string;
  name: string;
  owner: {
    username: string;
    name: string;
    ssoId: number;
    roles: string[];
    type: string;
  };
  parentHash: string;
  sha256: string;
  size: number;
  thumbnail: string;
  type: string;
  updated: number;
  uploader: {
    username: string;
    name: string;
    ssoId: number;
    roles: string[];
    type: string;
  };
  version: string;
}

export interface IPublishAttachmentList {
  list: IPublishFile[];
  offset: number;
  size: number;
  total: number;
}
