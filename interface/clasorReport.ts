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
