"use client";

import { EEmptyList } from "@components/molecules/emptyList";
import { IRepoView } from "@interface/repo.interface";
import PublishCardView from "../repoView/publishCardView";
import React from "react";
import useGetPublishRepositories from "@hooks/repository/useGetPublishRepositories";

const PublishRepositories = () => {
  const {
    data: publishRepoList,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useGetPublishRepositories(15);

  const commonProps: IRepoView = {
    isLoading,
    getRepoList: publishRepoList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    type: EEmptyList.PUBLISHED_REPO,
  };

  return <PublishCardView {...commonProps} />;
};

export default PublishRepositories;
