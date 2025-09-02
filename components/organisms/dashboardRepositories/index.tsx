/* eslint-disable no-nested-ternary */
import React, { useCallback, useState } from "react";
import { EEmptyList } from "@components/molecules/emptyList";
import TabComponent from "@components/molecules/tab";
import useGetAllRepositories from "@hooks/repository/useGetAllRepositories";
import CardView from "../repoView/cardView";
import useGetMyRepoList from "@hooks/repository/useGetMyRepoList";
import useGetAccessList from "@hooks/repository/useGetAccessList";
import { IRepoView } from "@interface/repo.interface";
import { Typography } from "@material-tailwind/react";
import DrawerTemplate from "@components/templates/drawerTemplate";
import RepoDialogs from "@components/molecules/repoDialogs";
import { useRepoActionDrawerStore, useRepositoryStore } from "@store/repository";
import useRepoMenuList from "@components/molecules/repoMenu/useRepoMenuList";

export enum ETabs {
  ALL_REPO = "همه‌ی مخزن‌ها",
  MY_REPO = "مخزن‌های من",
  ACCESS_REPO = "مخزن‌های اشتراکی",
}

const DashboardRepositories = () => {
  const [activeTab, setActiveTab] = useState<string>(ETabs.ALL_REPO);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { repo, setRepo } = useRepositoryStore();
  const { openRepoActionDrawer, setOpenRepoActionDrawer } = useRepoActionDrawerStore();

  const handleSetModal = useCallback(
    (modalName: string) => {
      if (repo) {
        setRepo(repo);
        setActiveModal(modalName);
      }
    },
    [repo, setRepo],
  );

  const menuList = useRepoMenuList(repo, handleSetModal).map((item) => {
    return {
      ...item,
      onClick: () => {
        item.onClick();
        setOpenRepoActionDrawer(false);
      },
    };
  });

  const {
    data: allRepoList,
    hasNextPage: allRepoHasNextPage,
    fetchNextPage: allRepoFetchNextPage,
    isFetchingNextPage: allRepoIsFetchingNextPage,
    isLoading: allRepoIsLoading,
  } = useGetAllRepositories(20, undefined, activeTab === ETabs.ALL_REPO);

  const {
    data: getMyRepoList,
    hasNextPage: myRepoHasNextPage,
    fetchNextPage: myRepoFetchNextPage,
    isFetchingNextPage: myRepoIsFetchingNextPage,
    isLoading: myRepoIsLoading,
  } = useGetMyRepoList(20, false, undefined, undefined, activeTab === ETabs.MY_REPO);
  const {
    data: getAccessRepoList,
    hasNextPage: accessRepoHasNextPage,
    fetchNextPage: accessRepoFetchNextPage,
    isFetchingNextPage: accessRepoIsFetchingNextPage,
    isLoading: accessRepoIsLoading,
  } = useGetAccessList(20, undefined, activeTab === ETabs.ACCESS_REPO);

  const commonProps: IRepoView = {
    isLoading:
      activeTab === ETabs.ALL_REPO
        ? allRepoIsLoading
        : activeTab === ETabs.MY_REPO
          ? myRepoIsLoading
          : accessRepoIsLoading,
    getRepoList:
      activeTab === ETabs.ALL_REPO
        ? allRepoList
        : activeTab === ETabs.MY_REPO
          ? getMyRepoList
          : getAccessRepoList,
    hasNextPage:
      activeTab === ETabs.ALL_REPO
        ? allRepoHasNextPage
        : activeTab === ETabs.MY_REPO
          ? myRepoHasNextPage
          : accessRepoHasNextPage,
    fetchNextPage:
      activeTab === ETabs.ALL_REPO
        ? allRepoFetchNextPage
        : activeTab === ETabs.MY_REPO
          ? myRepoFetchNextPage
          : accessRepoFetchNextPage,
    isFetchingNextPage:
      activeTab === ETabs.ALL_REPO
        ? allRepoIsFetchingNextPage
        : activeTab === ETabs.MY_REPO
          ? myRepoIsFetchingNextPage
          : accessRepoIsFetchingNextPage,
    type:
      activeTab === ETabs.MY_REPO
        ? EEmptyList.MY_REPO
        : activeTab === ETabs.ALL_REPO
          ? EEmptyList.DASHBOARD
          : EEmptyList.ACCESS_REPO,
  };

  const renderList = () => {
    return (
      <div className="h-[calc(100vh-220px)] min-h-[calc(100vh-220px)] overflow-auto">
        <CardView {...commonProps} />
      </div>
    );
  };

  const tabList = [
    {
      tabTitle: ETabs.ALL_REPO,
      tabContent: activeTab === ETabs.ALL_REPO ? renderList() : null,
    },
    {
      tabTitle: ETabs.MY_REPO,
      tabContent: activeTab === ETabs.MY_REPO ? renderList() : null,
    },
    {
      tabTitle: ETabs.ACCESS_REPO,
      tabContent: activeTab === ETabs.ACCESS_REPO ? renderList() : null,
    },
  ];

  return (
    <div className="flex flex-col gap-0 xs:gap-4">
      <Typography className="title_t1 p-4 font-medium text-primary_normal xs:p-0">
        مخزن‌ها
      </Typography>
      <div className="px-4 xs:px-0">
        <TabComponent
          tabList={tabList}
          headerClassName="mb-4 bg-gray-200"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="xs:hidden">
        <DrawerTemplate
          openDrawer={openRepoActionDrawer}
          setOpenDrawer={setOpenRepoActionDrawer}
          menuList={menuList}
        />
      </div>
      <RepoDialogs
        activeModal={activeModal}
        closeModal={() => {
          return setActiveModal(null);
        }}
      />
    </div>
  );
};

export default DashboardRepositories;
