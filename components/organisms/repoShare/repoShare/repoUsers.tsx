import React from "react";
import { useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import useGetRepoUsers from "@hooks/user/useGetRepoUsers";
import useGetInviteRequestsByOwner from "@hooks/user/useGetInviteRequestsByOwner";
import useGetRoles from "@hooks/user/useGetRoles";
import UserItem from "./userItem";
import InviteRequestByOwner from "./inviteRequestByOwner";

const RepoUsers = () => {
  const getRepo = useRecoilValue(repoAtom);
  const { data: getRoles, isFetching: isFetchingRoles } = useGetRoles();
  const {
    data: getRepoUsers,
    isFetching: isFetchingRepoUsers,
    isLoading: isLoadingRepoUsers,
  } = useGetRepoUsers(getRepo?.id, 20, true);

  const {
    data: getInviteToRepoRequests,
    isFetching: isFetchingInviteToRepoRequests,
    isLoading: isLoadingInviteToRepoRequests,
  } = useGetInviteRequestsByOwner(getRepo?.id, 20, true);

  return (
    <div className="overflow-y-auto">
      <div className="flex flex-col overflow-y-auto h-[510px] xs:h-[210px]">
        {getRepoUsers?.pages.map((page) => {
          return page.list.map((user) => {
            return <UserItem key={user.userInfo.ssoId} user={user} />;
          });
        })}
        {getInviteToRepoRequests?.pages.map((page) => {
          return page.list.map((user) => {
            return <InviteRequestByOwner key={user.userSSOID} user={user} />;
          });
        })}
      </div>
    </div>
  );
};

export default RepoUsers;
