export interface ICreateGroup {
  groupParentId: string;
  groupId: string;
  name: string;
  title: string;
  description: string;
  path: string;
  members: {
    preferred_username: string;
    given_name: string;
    family_name: string;
    id: number;
    picture: string;
    phone_number_verified: boolean;
    email_verified: boolean;
    nationalcode_verified: boolean;
  }[];
  cascadeGroupAccess: boolean;
}

export interface IDeleteGroup {
  data: "group deleted successfully";
}

export interface IGetGroup {
  groupParentId: string;
  groupId: string;
  title: string;
  description: string;
  path: string;
  members: {
    list: {
      preferred_username: string;
      given_name: string;
      family_name: string;
      id: number;
      picture: string;
      phone_number_verified: boolean;
      email_verified: boolean;
      nationalcode_verified: boolean;
    }[];
    offset: number;
    size: number;
    total: number;
  };
  cascadeGroupAccess: boolean;
}

export interface IGetGroups {
  path: string;
  title: string;
  description: string;
}

export interface IUpdateGroup {
  groupParentId: string;
  groupId: string;
  title: string;
  description: string;
  path: string;
  members: {
    preferred_username: string;
    given_name: string;
    family_name: string;
    id: number;
    picture: string;
    phone_number_verified: boolean;
    email_verified: boolean;
    nationalcode_verified: boolean;
  }[];
  cascadeGroupAccess: boolean;
}

export interface IAddMembers {
  groupParentId: string;
  groupId: string;
  title: string;
  description: string;
  path: string;
  members: {
    preferred_username: string;
    given_name: string;
    family_name: string;
    id: number;
    picture: string;
    phone_number_verified: boolean;
    email_verified: boolean;
    nationalcode_verified: boolean;
  }[];
  cascadeGroupAccess: boolean;
}

export interface IRemoveMembers {
  groupParentId: string;
  groupId: string;
  title: string;
  description: string;
  path: string;
  members: {
    preferred_username: string;
    given_name: string;
    family_name: string;
    id: number;
    picture: string;
    phone_number_verified: boolean;
    email_verified: boolean;
    nationalcode_verified: boolean;
  }[];
  cascadeGroupAccess: boolean;
}
