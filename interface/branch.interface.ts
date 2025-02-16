export interface IBranch {
  AttachedRepoList: [];
  businessId: number;
  createdAt: string;
  id: number;
  parentId: number;
  title: string;
  type: string;
  updateAt: string;
  userSSOID: number;
  repoTypeName: string;
  userName: string;
}

export interface IBranchList {
  list: IBranch[];
  offset: number;
  size: number;
  total: number;
}

export interface IBranchUser {
  user: {
    preferred_username: string;
    given_name: string;
    family_name: string;
    id: number;
    phone_number_verified: boolean;
    email_verified: boolean;
    nationalcode_verified: boolean;
  };
  grants: string[];
}

export interface IBranchUserList {
  list: IBranchUser[];
  offset: number;
  size: number;
  total: number;
}

