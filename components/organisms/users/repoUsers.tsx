import InviteRequestByOwner from "./inviteRequestByOwner";
import LoadMore from "@components/molecules/loadMore";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@material-tailwind/react";
import UserItem from "./userItem";
import { repoAtom } from "@atom/repository";
import useGetInviteRequestsByOwner from "@hooks/user/useGetInviteRequestsByOwner";
import useGetRepoUsers from "@hooks/user/useGetRepoUsers";
import { useRecoilValue } from "recoil";

interface IProps {
  createRepoDialog?: boolean;
}

const RepoUsers = ({ createRepoDialog }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const repoId = getRepo!.id;
  const {
    data: getRepoUsers,
    isLoading: isLoadingRepoUsers,
    hasNextPage: hasNextPageRepoUsers,
    isFetchingNextPage: isFetchingNextPageRepoUsers,
    fetchNextPage: fetchNextPageRepoUsers,
  } = useGetRepoUsers(repoId, 20, true);

  const {
    data: getInviteToRepoRequests,
    isLoading: isLoadingInviteToRepoRequests,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetInviteRequestsByOwner(repoId, 10);

  return (
    <div className="overflow-y-auto">
      {isLoadingInviteToRepoRequests || isLoadingRepoUsers ? (
        <Spinner className="h-0 w-0" />
      ) : (
        <div
          className={`flex flex-col overflow-auto overflow-y-auto
        ${createRepoDialog ? "!h-[250px] xs:!h-[168px]" : "!h-[370px] xs:!h-[250px]"}`}
        >
          {getRepoUsers?.pages.map((page) => {
            return page.list.map((user) => {
              return <UserItem key={user.userInfo.ssoId} user={user} />;
            });
          })}
          <RenderIf isTrue={hasNextPageRepoUsers}>
            <LoadMore
              fetchNextPage={fetchNextPageRepoUsers}
              isFetchingNextPage={isFetchingNextPageRepoUsers}
            />
          </RenderIf>
          {getInviteToRepoRequests?.pages.map((page) => {
            return page.list.map((user) => {
              return <InviteRequestByOwner key={user.userSSOID} user={user} />;
            });
          })}
          <RenderIf isTrue={hasNextPage}>
            <LoadMore
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </RenderIf>
        </div>
      )}
    </div>
  );
};

export default RepoUsers;
