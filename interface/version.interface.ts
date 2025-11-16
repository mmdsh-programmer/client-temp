import { EDraftStatus, EVersionStatus } from "./enums";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

import { EEmptyList } from "@components/molecules/emptyList";
import { IUserInfo } from "./app.interface";

export interface IVersion {
  createDate: number;
  updateDate: number;
  id: number;
  chatThreadId?: number;
  versionNumber: string;
  status: EDraftStatus | EVersionStatus;
  state: "draft" | "version" | "public";
  content?: string;
  outline?: string;
  postId: number;
  repoId: number;
  categoryId: number;
  documentId: number;
  dislikeCount: number;
  likeCount: number;
  hash: string;
  shareCount: number;
  metadata: string;
  favoriteCount: number;
  commentCount: number;
  changeLog: string;
  draftId: number;
  message?: string;
  creator?: {
    name: string;
    userName: string;
    ssoId: number;
  };
  fileHash?: {
    fileExtension: string;
    fileName: string;
    hash: string;
  };
  contentType?: string;
  repoUserGroupHash?: string;
  categoryUserGroupHash?: string;
  documentTitle?: string;
  repoName?: string;
  newOne?: boolean;
  formId: number | null;
  formHash: string | null;
}

export interface IComment {
  id: number;
  text: string;
  timestamp: number;
  user: {
    id: number;
    name: string;
    ssoId: string;
    ssoIssuerCode: number;
    profileImage: string;
  };
  confirmed: boolean;
  numOfLikes: number;
  numOfDislikes: number;
  numOfComments: number;
  liked: boolean;
  disliked: boolean;
}

export interface ILikeList {
  list: {
    id: number;
    timestamp: number;
    user: {
      id: number;
      name: string;
      profileImage: string;
      ssoId: string;
      ssoIssuerCode: number;
    };
  }[];
  offset: number;
  size: number;
  total: number;
}

export declare interface IOutline extends ILevelObject {
  children: IOutline[];
}
export declare interface ILevelObject {
  id: string;
  tag: string;
  level: number;
  text?: string;
  userPostInfo?: IUserPostInfo;
}

export interface IUserPostInfo {
  postId: number;
  liked: boolean;
  disliked: boolean;
  favorite: boolean;
}

export interface IVersion_Blocking_Result {
  user: IUserInfo;
  blockTime: number;
  vId: number;
  onEnd: (result: boolean) => void;
}
export interface IShared_Version_Hash_Result {
  sharedHash: string;
}

export declare interface IFileDetail {
  file: File | null;
  isUploaded: boolean;
  fileHash?: string;
}

export declare interface ITinyLinkResult {
  urlOrContent: string;
  hash: string;
  visitCount: number;
  shortenObjectKind: string;
}
export declare interface IAddVersion {
  content: string;
  hash: string;
  id: number;
  outline: string;
  versionNumber: string;
}

export interface IVersionMetadata {
  list: IVersion[];
  offset: number;
  size: number;
  total: number;
}

export interface IFileVersion {
  hash: string;
  fileName: string;
  fileExtension: string;
}

export interface IVersionView {
  isLoading: boolean;
  getVersionList?: IVersion[][];
  hasNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<IVersionMetadata | undefined, unknown>, Error>
  >;
  isFetchingNextPage: boolean;
  lastVersion?: IVersion;
  type: EEmptyList;
}

export interface IResponse {
  id: number;
  username: string;
  created: string;
  edited: boolean;
  encryptionResponse: boolean;
  gradingStatus: string;
  totalScore: number;
}

export interface IFormVersionResponseList {
  list: IResponse[];
  offset: number;
  size: number;
  total: number;
}

export interface IVersionHistoryItem {
  versionIndex: number;
  userId: string;
  username: string;
  timestamp: number;
  date: string;
}

export interface IContentVersionData {
  contentId: number;
  versionHistory: IVersionHistoryItem[];
}

export interface IContentMetadata {
  userId: string;
  username: string;
  timestamp: number;
  date: string;
}

export interface IContentVersion {
  contentId: number;
  versionIndex: number;
  content: string;
  metadata: IContentMetadata;
}

export interface IVersionsSummary {
  contentId: number;
  availableVersions: number[];
  totalVersions: number;
}

