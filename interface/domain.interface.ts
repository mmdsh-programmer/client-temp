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
