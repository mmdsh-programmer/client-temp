export interface IBranch {
  AttachedRepoList: [];
  businessId: number;
  createdAt: string;
  id: number;
  name: string;
  parentId: number;
  title: string;
  type: string;
  updateAt: string;
  userSSOID: number;
}

export interface IBranchList {
  list: IBranch[];
  offset: number;
  size: number;
  total: number;
}
