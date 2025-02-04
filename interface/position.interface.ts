export interface IPosition {
  expireGrants: {};
  groupId: number;
  accessNames: [];
  groupPath: string;
  title: string;
}

export interface IPositionList {
  list: IPosition[];
  offset: number;
  size: number;
  total: number;
}

export interface IPositionMember {
  preferred_username: string;
  given_name: string;
  family_name: string;
  id: number;
  picture: string;
  phone_number_verified: boolean;
  email_verified: boolean;
  nationalcode_verified: boolean;
}

export interface IPositionInfo {
  hasError: boolean;
  messageId: number;
  referenceNumber: string;
  errorCode: number;
  message: string;
  ott: number;
  groupParentId: number;
  groupId: number;
  name: string;
  title: string;
  path: string;
  members: IPositionMember[];
  cascadeGroupAccess: boolean;
  active: boolean;
  creator: number;
}
