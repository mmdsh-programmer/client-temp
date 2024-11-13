export interface IFollowUser {
  id: number;
  followerUserSrv: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    profileImage: string;
    private: boolean;
  };
  followingUserSrv: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    profileImage: string;
    private: boolean;
  };
  version: number;
  subscribeDate: string;
  lastSubscribeDate: string;
  subscribed: boolean;
  status: string;
}

export interface ISubscriptionStatus {
  myFollower: boolean;
  myFollowing: boolean;
  myFollowRequestStatus: string;
  userFollowRequestStatus: string;
  userSrv: {
    firstName: string;
    id: number;
    lastName: string;
    private: boolean;
    profileImage: string;
    username: string;
  };
}
