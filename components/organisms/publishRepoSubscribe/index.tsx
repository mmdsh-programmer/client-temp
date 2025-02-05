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

  if (isLoading || isFetching || !userInfo) {
    return null;
  }

  return <PublishRepoSubscribeButton repository={repository} userInfo={userInfo} />;
};

export default PublishRepoSubscribe;
