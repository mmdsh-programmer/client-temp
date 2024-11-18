import { EDocumentTypes } from "./enums";

export interface IServerResult<T> {
  data: T;
  referenceNumber: string;
  timestamp: number;
  cacheResponse: boolean;
}

export interface IUserInfo {
  business: boolean;
  firstName?: string;
  isClasorAdmin: boolean;
  lastName?: string;
  nickName?: string;
  profileImage?: string;
  ssoId: number;
  userId: number;
  username: string;
}

export type TUserData = Pick<
  IUserInfo,
  | "firstName"
  | "lastName"
  | "nickName"
  | "profileImage"
  | "username"
  | "ssoId"
  | "userId"
  | "business"
  | "isClasorAdmin"
> & {
  private: boolean;
  access_token: string;
  refresh_token: string;
};

export interface IMyInfo {
  owner: number;
  bookmark: number;
  access: number;
  archived: number;
}

export interface IPodspaceResult {
  attributes: string[];
  created: number;
  extension: string;
  hash: string;
  name: string;
  owner: {
    name: string;
    roles: string[];
    ssoId: number;
    username: string;
  };
  parentHash: string;
  size: number;
  thumbnail: string;
  type: string;
  updated: number;
  uploader: {
    avatar: string;
    name: string;
    roles: string[];
    ssoId: number;
    username: string;
  };
  version: number;
}

export declare interface IThreadInfo {
  id: number;
  joinDate: number;
  title: string;
  inviter: {
    id: number;
    coreUserId: number;
    threadId: number;
    sendEnable: boolean;
    receiveEnable: boolean;
    firstName: string;
    name: string;
    notSeenDuration: number;
    blocked: boolean;
    username: string;
  };
  time: number;
  lastMessage: string;
  lastParticipantName: string;
  group: boolean;
  lastParticipantImage: string;
  lastSeenMessageId: number;
  lastSeenMessageTime: number;
  lastMessageVO: {
    id: number;
    threadId: number;
    ownerId: number;
    uniqueId: string;
    previousId: number;
    message: string;
    messageType: number;
    edited: boolean;
    editable: boolean;
    deletable: boolean;
    mentioned: boolean;
    pinned: boolean;
    participant: {
      id: number;
      coreUserId: number;
      threadId: number;
      sendEnable: boolean;
      receiveEnable: boolean;
      firstName: string;
      lastName: string;
      name: string;
      image: string;
      notSeenDuration: number;
      blocked: boolean;
      username: string;
    };
    conversation: {
      id: number;
      title: string;
      time: number;
      group: boolean;
      lastSeenMessageId: number;
      lastSeenMessageTime: number;
      partnerLastSeenMessageTime: null | number;
      partnerLastDeliveredMessageTime: null | number;
      type: number;
      userGroupHash: string;
      closed: boolean;
    };
    metadata: { [key: string]: string };
    time: number;
    timeMiliSeconds: number;
    timeNanos: number;
  };
  partnerLastSeenMessageTime: null | number;
  partnerLastDeliveredMessageTime: null | number;
  type: number;
  mute: boolean;
  participantCount: number;
  canEditInfo: boolean;
  admin: boolean;
  mentioned: boolean;
  pin: boolean;
  userGroupHash: string;
  unreadCount?: number;
  closed: boolean;
}

export interface IChildrenFilter {
  default: boolean;
  type: {
    document: boolean;
    category: boolean;
  };
  tagIds: number[];
  contentTypes?: EDocumentTypes[];
  isTemplate: boolean;
  bookmarked: boolean;
  title?: string;
}

export interface IReportFilter {
  title?: string;
  tagIds: number[];
  contentTypes: EDocumentTypes[];
  isTemplate: boolean;
  bookmarked: boolean;
  slug?: string;
}

export interface IClasorError {
  cacheResponse: boolean;
  messages: string[];
  referenceNumber: string;
  timestamp: number;
}

export interface IGetToken {
  accessToken: string;
  refreshToken: string;
}

export interface IActionError {
  error?: boolean;
  errorCode: number;
  errorList: string[];
  originalError?: {
    data: {
      error: string;
      message: string[];
      referenceNumber: string;
    };
  };
  referenceNumber?: string;
}

export interface ISocialError {
  message: string;
  status: number;
  url: string;
}
export interface ISocialResponse<T> {
  count: number;
  errorCode: number;
  hasError: boolean;
  message: string;
  messageId: number;
  ott: string;
  referenceNumber: string;
  result: T;
}

export interface ISocialProfile {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  profileImage: string;
  numOfStories: number;
  private: boolean;
}

export interface IPostInfo {
  disliked: boolean;
  favorite: boolean;
  liked: boolean;
  postId: number;
}

export interface IGetCommentLike {
  id: number;
  timestamp: number;
  user: {
    id: number;
    name: string;
    ssoId: string;
    ssoIssuerCode: number;
    profileImage: string;
  };
}

export interface IMetaQuery {
  field: string;
  is: string;
  and?: IMetaQuery[]; // Optional recursive definition for nested conditions
}

export interface IGetTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface ICustomPostMetadata {
  id: number;
  domain: string;
  clientId: string;
  type: string;
  clientSecret: string;
  CUSTOM_POST_TYPE: "DOMAIN_BUSINESS";
  entityId: number;
  data: string;
  cryptoInitVectorKey: string;
  cryptoSecretKey: string;
  enablePublishPage: false;
}

export interface IThemeInfo {
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  textColorLight?: string;
  textColorLabel?: string;
  textColorSecondary?: string;
  textColorPrimary?: string;
  borderColor?: string;
  backgroundColor?: string;
  logo?: string;
  projectName?: string;
  projectDescription?: string;
  heroImage?: string;
}

export interface IEditorValue {
  content: string;
  outline: string;
}
