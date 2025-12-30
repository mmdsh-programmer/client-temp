/* eslint-disable @typescript-eslint/no-explicit-any */
import { EDocumentTypes } from "./enums";
import { IVersion, IVersionMetadata } from "./version.interface";

export interface IDocumentList {
  contentType: EDocumentTypes;
  createdAt: string | null;
  creatorId: number;
  deletedAt: string | null;
  description: string;
  id: number;
  metadata: any;
  tags: number[];
  title: string;
  updatedAt: string | null;
  userData: null;
  userFullName: string;
}

export interface IDocument {
  category: { id: number; name: string };
  createDate: number;
  description: string;
  id: number;
  tags: string[];
  title: string;
  updatedAt: number;
  versions: IVersion[];
  postId?: number;
  chatThreadId: string;
  hasPassword: boolean;
  hasWhiteList: boolean;
  hasBlackList: boolean;
  newOne?: boolean;
}

export interface IDocumentCrud {
  id?: number | null;
  categoryId?: number;
  categoryName?: string;
  documentTitle?: string;
  documentDescription?: string;
  versionNumber?: string;
  contentType: EDocumentTypes;
  tagIds?: number[];
  isHidden?: boolean;
  isTemplate?: boolean;
}

export interface IDocumentInfo {
  documentTitle?: string;
  documentDescription?: string;
  documentId?: number;
  repoId?: number;
  categoryId?: number;
  cmsUniqId?: string;
}

export interface ICategorisedVersion {
  [key: number]: IVersion[];
}

export interface IDocumentResult {
  data: IDocumentList[];
  pageInfo: {
    itemsPerPage: number;
    totalCount: number;
  };
}

export type IClasorDocumentType = {
  outline?: string;
  content?: string;
  versionNumber: string;
  metadata?: string;
  fileHash?: { hash: string; fileExtension: string; fileName: string }[];
};
export interface IMeetingDocumentType {
  projectName: string;
  members: string;
  meetingStartTime: string;
  meetingDate: string;
  meetingDay: string;
  meetingEndTime: string;
  decisions: string;
  subjects: string;
  versionNumber: string;
  metadata?: string;
}
export interface IProjectDocumentType {
  reportData: string;
  versionNumber: string;
  metadata?: string;
}
export interface IStakeholdersDocumentType {
  title: string;
  register?: string;
  ralationship?: string;
  createDate?: string;
  engagementApproach?: string;
  analysisMatrix?: string;
  powerInterest?: string;
  versionNumber: string;
  metadata?: string;
}

export interface IClasorField {
  id: number;
  uniqueId: string;
  name: string;
  data: string;
}

interface ParticipantRole {
  [key: string]: any;
}

export interface IDocumentMetadata {
  id: number;
  name: string;
  description: string;
  type: "document";
  repoId: number;
  repoName: string;
  categoryId: number;
  categoryName: string;
  extraDetails: string | null;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  creatorSSOID?: number;
  isHidden: boolean;
  isBookmarked: boolean;
  hasPassword: boolean;
  creator: {
    img: string;
    name: string;
    ssoId?: number;
    userName?: string;
    contactId?: string | null;
  } | null;
  order?: number | null;
  tags:
    | {
        name: string;
        id: number;
      }[]
    | number[];
  contentType: EDocumentTypes;
  lastVersionId: number | null;
  isTemplate: boolean;
  chatThreadId: number | null;
  isPublish: boolean;
  publishLinkPassword: string | null;
  publishExpireTime: number | null;
  versions?: IVersionMetadata;
  publicKeyId?: string;
  userGroupHash: string | null;
  attachmentUserGroup: string | null;
  podspaceAttachmentHash: string | null;
  podspaceAttachmentFolderHash: string | null;
  hasWhiteList: boolean;
  hasBlackList: boolean;
  hasDirectAccess: boolean;
  newOne?: boolean;
  accesses?: string[];
  createDate: number;
  customPostEntityId: number;
  customPostId: number;
  deleteDate: number | null;
  domainTags: any[];
  imageAlt: string | null;
  imageUrl: string | null;
  isCommitted: boolean;
  isPublished: boolean;
  parentId: number | null;
  participants: string[];
  participantsRoles: {
    [participantId: string]: ParticipantRole;
  };
  readTime: number | null;
  repoTypeId: number;
  sharedArray: any[];
  updateDate: number;
}

export interface IWhiteListItem {
  preferred_username: string;
  given_name: string;
  family_name: string;
  id: number;
  picture: string;
}

export interface IWhiteList {
  blackList: IWhiteListItem[];
  whiteList: IWhiteListItem[];
}

export interface IDocumentWhiteListRequest {
  documentId: number;
  documentName: string;
  id: number;
  repoId: number;
  repoName: string;
  type: string;
  userFullName: string;
  userSSOID: number;
  username: string;
}
