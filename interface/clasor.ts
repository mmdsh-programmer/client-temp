export interface IClasorResult<T> {
  data: T;
  referenceNumber: string;
  timestamp: number;
  cacheResponse: boolean;
}
export interface IClasorDomainResult {
  id: number;
  domain: string;
  types: string[];
  userName: string;
  userSSOID: number;
  CUSTOM_POST_TYPE: "DOMAIN_BUSINESS";
  entityId: number;
  content: string;
  enablePublishPage: boolean;
  participants: {
    ssoId: number;
    userName: string;
    name: string;
  }[];
  newsFeed: {
    participants: number[];
  };
  useDomainTag: boolean;
  hasLikes: boolean;
  hasComments: boolean;
  hasQuestions: boolean;
  needsAdminApprovalForComments: boolean;
  needsAdminApprovalForQuestions: boolean;
  allowQuestionReplies: boolean;
  accessToCreateRepo: boolean;
  sensitiveData: string;
}
export interface IClasorReport {
  podSpaceStatus: IPodSpaceStatus | null;
  repoCount: number;
  documentCount: number;
}

interface IPodSpaceStatus {
  bandwidthLimit: number;
  plan: IPlan;
  storageLimit: number;
  storageUsage: number;
}

interface IPlan {
  bandwidth: number;
  connections: number;
  description: string;
  hash: string;
  size: number;
  title: string;
  type: string;
  versions: number;
}
