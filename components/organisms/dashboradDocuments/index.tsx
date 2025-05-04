import React, { useEffect, useState } from "react";
import { categoryQueryParamsAtom, categoryShowAtom } from "@atom/category";
import { sortAtom } from "@atom/sortParam";
import { EEmptyList } from "@components/molecules/emptyList";
import TabComponent from "@components/molecules/tab";
import useGetUserDocuments from "@hooks/document/useGetUserDocuments";
import { ICategoryView } from "@interface/category.interface";
import { useRecoilState, useRecoilValue } from "recoil";
import TableView from "../categoryView/categoryTableView";
import MobileView from "../categoryView/categoryMobileView";
import VersionDialogView from "../versionView/versionDialogView";
import Editor from "../dialogs/editor";
import { versionModalListAtom } from "@atom/version";
import { editorModalAtom } from "@atom/editor";
import useGetCategoryChildren from "@hooks/category/useGetCategorychildren";
import useGetUser from "@hooks/auth/useGetUser";
import { Typography } from "@material-tailwind/react";
import CategoryMenu from "@components/molecules/categoryMenu/categoryMenu";
import DocumentMenu from "@components/molecules/documentMenu";

export enum ETabs {
  MY_DOCUMENTS = "سندهای من",
  SHARED_DOCUMENTS = "سندهای اشتراکی",
}

const DashboardDocuments = () => {
  const [activeTab, setActiveTab] = useState<string>(ETabs.MY_DOCUMENTS);
  const getShowVersionList = useRecoilValue(versionModalListAtom);
  const [getEditorModal, setEditorModal] = useRecoilState(editorModalAtom);
  const getCategoryShow = useRecoilValue(categoryShowAtom);

  const getSortParams = useRecoilValue(sortAtom);
  const queryParams = useRecoilValue(categoryQueryParamsAtom);

  const { data: userInfo } = useGetUser();

  const {
    data: reportData,
    hasNextPage: reportHasNextPage,
    fetchNextPage: reportFetchNextPage,
    isFetchingNextPage: reportIsFetchingNextPage,
    isLoading: reportIsLoading,
    isFetching: reportIsFetching,
    refetch: refetchReport,
  } = useGetUserDocuments(
    undefined,
    getSortParams,
    queryParams.limit,
    null,
    "myAccessDocuments",
    activeTab === ETabs.SHARED_DOCUMENTS,
  );

  const {
    data: childrenData,
    hasNextPage: childrenHasNextPage,
    fetchNextPage: childrenFetchNextPage,
    isFetchingNextPage: childrenIsFetchingNextPage,
    isLoading: childrenIsLoading,
    isFetching: childrenIsFetching,
    refetch: refetchChildren,
  } = useGetCategoryChildren(
    userInfo!.repository.id ?? 0,
    getCategoryShow?.id,
    getSortParams,
    queryParams.limit,
    null,
    undefined,
    null,
    false,
    !!userInfo!.repository.id && activeTab === ETabs.MY_DOCUMENTS,
  );

  useEffect(() => {
    if (activeTab === ETabs.MY_DOCUMENTS) {
      refetchChildren();
    } else {
      refetchReport();
    }
  }, [getSortParams, activeTab, refetchChildren, refetchReport]);

  const commonProps: ICategoryView = {
    isLoading: activeTab === ETabs.MY_DOCUMENTS ? childrenIsLoading : reportIsLoading,
    getCategoryList: activeTab === ETabs.MY_DOCUMENTS ? childrenData : reportData,
    hasNextPage: activeTab === ETabs.MY_DOCUMENTS ? childrenHasNextPage : reportHasNextPage,
    fetchNextPage: activeTab === ETabs.MY_DOCUMENTS ? childrenFetchNextPage : reportFetchNextPage,
    isFetchingNextPage:
      activeTab === ETabs.MY_DOCUMENTS ? childrenIsFetchingNextPage : reportIsFetchingNextPage,
    isFetching: activeTab === ETabs.MY_DOCUMENTS ? childrenIsFetching : reportIsFetching,
    type: EEmptyList.CHILDREN,
  };

  const renderContent = () => {
    return (
      <>
        <div className="category-children hidden xs:block">
          <TableView {...commonProps} />
        </div>
        <div className="block xs:hidden min-h-[150px]">
          <MobileView {...commonProps} />
        </div>
      </>
    );
  };

  const tabList = [
    {
      tabTitle: ETabs.MY_DOCUMENTS,
      tabContent: activeTab === ETabs.MY_DOCUMENTS ? renderContent() : null,
    },
    {
      tabTitle: ETabs.SHARED_DOCUMENTS,
      tabContent: activeTab === ETabs.SHARED_DOCUMENTS ? renderContent() : null,
    },
  ];
  return (
    <>
      {getShowVersionList ? <VersionDialogView /> : null}
      {getEditorModal ? (
        <Editor
          setOpen={() => {
            return setEditorModal(false);
          }}
        />
      ) : null}
      <div className="flex flex-col gap-0 xs:gap-4">
        <Typography className="title_t1 p-4 font-medium text-primary_normal xs:p-0">
          سندها
        </Typography>
        <div className="px-4 xs:px-0">
          <TabComponent
            tabList={tabList}
            headerClassName="mb-4 bg-gray-200"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
      <CategoryMenu showDrawer />
      <DocumentMenu showDrawer />
    </>
  );
};

export default DashboardDocuments;
