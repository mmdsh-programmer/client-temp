export interface IClasorResult<T> {
  data: T;
  referenceNumber: string;
  timestamp: number;
  cacheResponse: boolean
}
export interface IClasorDomainResult {
  userName: string;
  userSSOID: number;
  domain: string;
  types: string[];
  newsFeed: {
    participants: number[];
  };
  participants: number[];
  enablePublishPage: boolean;
  id: number;
  entityId: number;
  content?: string; // optional field
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
