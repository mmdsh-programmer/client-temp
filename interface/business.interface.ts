export interface IBusinessList {
  active: boolean;
  id: number;
  name: string;
  description: string;
  createdAt: string;
  type: string;
  creatorSSOID: number;
}

export interface IOwnerBusinessList {
  list: IBusinessList[];
  offset: number;
  size: number;
  total: number;
}

export interface IBusinessRequest {
  createdAt: string;
  id: number;
  message: string;
  status: string;
  business: {
    id: number;
    name: string;
    description: string;
    creatorSSOID: number;
    createdAt: number;
    active: boolean;
  };
}

export interface IRepoDetails {
  adminPublicLink?: string;
  chatThreadId?: number;
  createdAt?: string;
  deletedAt?: number;
  description: string;
  editorPublicLink?: string;
  id: number;
  imageFileHash: string;
  metadata: string;
  name: string;
  updatedAt?: string;
  userGroupHash: string;
  viewerPublicLink?: string;
  writerPublicLink?: string;
}

export interface IBusinessUserRequest {
  createdAt: string;
  id: number;
  message: string;
  status: string;
  business: {
    id: number;
    name: string;
    description: string;
    creatorSSOID: number;
    createdAt: number;
  };
  repo: {
    adminPublicLink?: string;
    chatThreadId?: number;
    createdAt?: string;
    deletedAt?: number;
    description: string;
    editorPublicLink?: string;
    id: number;
    imageFileHash: string;
    metadata: string;
    name: string;
    updatedAt?: string;
    userGroupHash: string;
    viewerPublicLink?: string;
    writerPublicLink?: string;
  };
  Applicant:{
    ssoid :string;
    fullName:string;
    userName:string;
    contactId:string;
    img :string;
  }
}

export interface IBusinessUserRequestResponse {
  offset: number;
  list: IBusinessUserRequest[];
  size: number;
  total: number;
}
