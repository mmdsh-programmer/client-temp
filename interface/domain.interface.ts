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
  bgPrimaryColor: string;
  bgSecondaryColor: string;
  bgSecondaryLightColor: string;
  bgTertiaryColor: string;
  bgCardBackground: string;
  gray50: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray700: string;
  gray800: string;
  gray900: string;
  iconActive: string;
  iconHover: string;
  criticalNormal: string;
  error: string;
  successNormal: string;
  successSecondary: string;
  info: string;
  infoSecondary: string;
  textPrimary: string;
  textSecondary: string;
  textHint: string;
  textPlaceholder: string;
  textDisabled: string;
  textPrimaryNormal: string;
  textLink: string;
  borderNormal: string;
  orange100: string;
  blueGreen: string;
  useDomainTag: boolean;
  hasLikes: boolean;
  hasComments: boolean;
  hasQuestions: boolean;
  needsAdminApprovalForComments: boolean;
  needsAdminApprovalForQuestions: boolean;
  allowQuestionReplies: boolean;
  accessToCreateRepo: boolean;
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
