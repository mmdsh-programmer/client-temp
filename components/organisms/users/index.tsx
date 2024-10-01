import React from "react";
import InviteToRepo from "./inviteToRepo";
import RepoUsers from "./repoUsers";

interface IProps {
  createRepoDialog?: boolean;
}

const Users = ({ createRepoDialog }: IProps) => {
  return (
    <>
      <InviteToRepo />
      <RepoUsers createRepoDialog={createRepoDialog} />
    </>
  );
};

export default Users;
