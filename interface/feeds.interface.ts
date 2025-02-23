export interface IFeedItem {
  id: number;
  version: number;
  timelineId: number;
  entityId: number;
  forwardedId: number;
  numOfLikes: number;
  numOfDisLikes: number;
  numOfSaved: number;
  numOfShare: number;
  numOfFavorites: number;
  numOfComments: number;
  timestamp: number;
  enable: boolean;
  hide: boolean;
  replyPostConfirmation: boolean;
  userSrv: IUserSrv;
  rate: IRate;
  userPostInfo: IUserPostInfo;
  latitude: number;
  longitude: number;
  canComment: boolean;
  canLike: boolean;
  canRate: boolean;
  tags: number[];
  tagTrees: number[];
  name: string;
  content: string;
  pin: boolean;
  metadata: string
}

export interface IRate {
  myRate: number;
  rate: number;
  rateCount: number;
}

export interface IUserPostInfo {
  postId: number;
  liked: boolean;
  disliked: boolean;
  favorite: boolean;
  saved: boolean;
}

export interface IUserSrv {
  id: number;
  name: string;
  ssoId: string;
  ssoIssuerCode: number;
}
