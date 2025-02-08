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
