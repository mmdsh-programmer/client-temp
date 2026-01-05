export interface IQAResponse {
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
  userSrv: {
    id: number;
    name: string;
    ssoId: string;
    ssoIssuerCode: number;
    profileImage: string;
  };
  rate: {
    rate: number;
    rateCount: number;
  };
  userPostInfo: {
    postId: number;
    liked: boolean;
    disliked: boolean;
    favorite: boolean;
  };
  latitude: number;
  longitude: number;
  canComment: boolean;
  canLike: boolean;
  canRate: boolean;
  tags: string[];
  tagTrees: string[];
  name: string;
  content: string;
}

export interface IQAList {
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
  business: {
    id: number;
    name: string;
    imageInfo: {
      id: number;
      name: string;
      hashCode: string;
      description: string;
      actualWidth: number;
      actualHeight: number;
      width: number;
      height: number;
    };
    image: string;
    numOfProducts: number;
    rate: {
      myRate: number;
      rate: number;
      rateCount: number;
    };
    sheba: string;
    phone: string;
    serviceCallName: string;
    ssoId: string;
  };
  userSrv: {
    id: number;
    name: string;
    ssoId: string;
    ssoIssuerCode: number;
    profileImage: string;
  };
  rate: {
    myRate: number;
    rate: number;
    rateCount: number;
  };
  userPostInfo: {
    postId: number;
    liked: boolean;
    disliked: boolean;
    favorite: boolean;
  };
  metadata: string;
  lgContent: string;
  latitude: number;
  longitude: number;
  uniqueId: string;
  canComment: boolean;
  canLike: boolean;
  canRate: boolean;
  tags: string[];
  tagTrees: {
    id: number;
    name: string;
    code: string;
  }[];
  repliedItemSrv: {
    id: 0;
    version: 0;
    timelineId: 0;
    entityId: 0;
    forwardedId: 0;
    numOfLikes: 0;
    numOfDisLikes: 0;
    numOfSaved: 0;
    numOfShare: 0;
    numOfFavorites: 0;
    numOfComments: 0;
    timestamp: 0;
    enable: true;
    hide: true;
    replyPostConfirmation: true;
    business: {
      id: number;
      name: string;
      imageInfo: {
        id: number;
        name: string;
        hashCode: string;
        description: string;
        actualWidth: number;
        actualHeight: number;
        width: number;
        height: number;
      };
      image: string;
      numOfProducts: number;
      rate: {
        myRate: number;
        rate: number;
        rateCount: number;
      };
      sheba: string;
      phone: string;
      serviceCallName: string;
      ssoId: string;
    };
    userSrv: {
      id: number;
      name: string;
      ssoId: string;
      ssoIssuerCode: number;
      profileImage: string;
    };
    rate: {
      myRate: number;
      rate: number;
      rateCount: number;
    };
    userPostInfo: {
      postId: number;
      liked: boolean;
      disliked: boolean;
      favorite: boolean;
    };
    metadata: string;
    lgContent: string;
    latitude: number;
    longitude: number;
    uniqueId: string;
    canComment: boolean;
    canLike: boolean;
    canRate: boolean;
    tags: string[];
    tagTrees: {
      id: number;
      name: string;
      code: string;
    }[];
    attributeValues: {
      code: string;
      name: string;
      value: string;
    }[];
    templateCode: string;
  };
  attributeValues: {
    code: string;
    name: string;
    value: string;
  }[];
  templateCode: string;
  name: string;
  content: string;
  repliedPostId: number;
  forwardedDescription: string;
  forwardedPostOwner: {
    id: number;
    name: string;
    ssoId: string;
    ssoIssuerCode: number;
    profileImage: string;
  };
  mentionedUserIds: number[];
}

export interface IQuestionDetailsProps extends IQAList {
  repoId: number;
  docPostId: number;
  docName: string;
}

export interface IPostRate {
  myRate: number;
  rate: number;
  rateCount: number;
}

export interface IUserPostInfo {
  disliked: boolean;
  favorite: boolean;
  liked: boolean;
  postId: number;
  saved: boolean;
}

export interface IUserSrv {
  id: number;
  name: string;
  ssoId: string;
  ssoIssuerCode: number;
  profileImage?: string
}

export interface IQuestion {
  id: number;
  entityId: number;
  timelineId: number;
  content: string;
  metadata: string;
  name: string;
  timestamp: number;
  version: number;

  canComment: boolean;
  canLike: boolean;
  canRate: boolean;
  enable: boolean;
  hide: boolean;
  pin: boolean;
  replyPostConfirmation: boolean;

  numOfComments: number;
  numOfDisLikes: number;
  numOfFavorites: number;
  numOfLikes: number;
  numOfSaved: number;
  numOfShare: number;

  latitude: number;
  longitude: number;

  forwardedId: number;
  repliedPostId: number;

  rate: IPostRate;
  userPostInfo: IUserPostInfo;
  userSrv: IUserSrv;

  tags: any[];
  tagTrees: any[];
}

export interface IQuestionMetadata {
  type: string;
  status: string;
  repoId: number;
  documentId: number;
  creatorSSOID: string;
  creatorUserName: string;
  creatorUserId: number;
  title: string;
  content: string;
  parentPostId: number;
}

export interface IAnswerMetadata {
  type: string;
  status: string;
  repoId: number;
  documentId: number;
  creatorSSOID: string;
  creatorUserName: string;
  creatorUserId: number;
  title: string;
  content: string;
  parentPostId: number;
  questionPostId: number
}
