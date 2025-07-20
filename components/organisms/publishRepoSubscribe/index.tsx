"use client";

import React from "react";
import useGetUser from "@hooks/auth/useGetUser";
import { IRepo } from "@interface/repo.interface";
import PublishRepoSubscribeButton from "./publishRepoSubscribeButton";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";

interface IProps {
  repository: IRepo;
}

const PublishRepoSubscribe = ({ repository }: IProps) => {
  const { data: userInfo, isLoading, isFetching } = useGetUser();

  const { data: getDomainInfo } = useGetDomainInfo();
  const content = JSON.parse(getDomainInfo?.content || "{}");
  const { enablePrivateFeed } = content;

  if (isLoading || isFetching || !userInfo) {
    return null;
  }

  if (!enablePrivateFeed) {
    return null;
  }

  return <PublishRepoSubscribeButton repository={repository} userInfo={userInfo} />;
};

export default PublishRepoSubscribe;
