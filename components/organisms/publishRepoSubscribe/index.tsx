"use client";

import React from "react";
import useGetUser from "@hooks/auth/useGetUser";
import { IRepo } from "@interface/repo.interface";
import PublishRepoSubscribeButton from "./publishRepoSubscribeButton";

interface IProps {
  repository: IRepo;
}

const PublishRepoSubscribe = ({ repository }: IProps) => {
  const { data: userInfo, isLoading, isFetching } = useGetUser();
  const isOwner = repository.owner?.ssoId === Number(userInfo?.ssoId);

  // Only render the button when we have both repository and user data
  if (isLoading || isFetching || !userInfo || isOwner) {
    return null;
  }

  return <PublishRepoSubscribeButton repository={repository} userInfo={userInfo} />;
};

export default PublishRepoSubscribe;
