export interface IDomainSubscription {
  id: number;
  repoId: number;
  repoName: string;
  repoTypeName: string;
  repoTypeId: number;
  status: "accepted" | "pending" | "rejected";
  type: "subscribe" | "unsubscribe";
  userFullName: string;
  username: string;
  userSSOID: number;
  domainUrl: string;
  requestId: number;
  userId: number;
}

export interface IDomainSubscriptionList {
  list: IDomainSubscription[];
  offset: number;
  size: number;
  total: number;
}

export interface IDomainTag{
  id: number;
  name: string;
  description: string;
  parentId: number | null;
  domainId: number;
  domainUrl: string;
  domainEntityId: number;
  createdAt: string;
  updatedAt?: string;
  order: number;
}

export interface IDomainTagList {
  list: IDomainTag[];
  offset: number;
  size: number;
  total: number;
}
