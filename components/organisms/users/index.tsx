import React from "react";
import InviteToRepo from "./inviteToRepo";
import RepoUsers from "./repoUsers";
import { useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import { ERoles } from "@interface/enums";

interface IProps {
  createRepoDialog?: boolean;
}

const Users = ({ createRepoDialog }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);

  return (
    <>
      {getRepo?.roleName === ERoles.admin || getRepo?.roleName === ERoles.owner ? (
        <InviteToRepo />
      ) : null}
      <RepoUsers createRepoDialog={createRepoDialog} />
    </>
  );
};

export default Users;
