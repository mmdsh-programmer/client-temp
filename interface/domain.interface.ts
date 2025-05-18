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

export interface IDomainTheme {
  name: string;
  description?: string;
  logo?: string | null;
  mainColor: string;
  primaryLight: string;
  error: string;
  successNormal: string;
  info: string;
  criticalNormal: string;
  iconActive: string;
  textPrimary: string;
  textSecondary: string;
  borderNormal: string;
  bgCardBackground: string;
  useDomainTag: boolean;
  hasLikes: boolean;
  hasComments: boolean;
  hasQuestions: boolean;
  needsAdminApprovalForComments: boolean;
  needsAdminApprovalForQuestions: boolean;
  allowQuestionReplies: boolean;
}

export interface ContentType {
  projectName?: string;
  projectDescription?: string;
  logo?: string | null;
  theme?: string;
  settings?: {
    hasLikes?: boolean;
    hasComments?: boolean;
    hasQuestions?: boolean;
    needsAdminApprovalForComments?: boolean;
    needsAdminApprovalForQuestions?: boolean;
    allowQuestionReplies?: boolean;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface ThemeColors {
  [key: string]: string;
} 
