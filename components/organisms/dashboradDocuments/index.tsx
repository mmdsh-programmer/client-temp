import React, { useCallback, useEffect, useState } from "react";
import { useCategoryDrawerStore, useCategoryStore } from "@store/category";
import { useSortStore } from "@store/sortParam";
import { EEmptyList } from "@components/molecules/emptyList";
import TabComponent from "@components/molecules/tab";
import useGetUserDocuments from "@hooks/document/useGetUserDocuments";
import { ICategoryView } from "@interface/category.interface";
import { useVersionStore } from "@store/version";
import { useEditorStore } from "@store/editor";
import TableView from "@components/organisms/categoryView/categoryTableView";
import MobileView from "@components/organisms/categoryView/categoryMobileView";
import VersionDialogView from "@components/organisms/versionView/versionDialogView";
import Editor from "@components/organisms/dialogs/editor";
import useGetCategoryChildren from "@hooks/category/useGetCategorychildren";
import useGetUser from "@hooks/auth/useGetUser";
import { Typography } from "@material-tailwind/react";
import DrawerTemplate from "@components/templates/drawerTemplate";
import CategoryDialogs from "@components/molecules/categoryDialogs";
import useCategoryMenuList from "@components/molecules/categoryMenu/useCategoryMenuList";
import DocumentDialogs from "@components/molecules/documentDialogs";
import useDocumentMenuList from "@components/molecules/documentMenu/useDocumentMenuList";
import { useDocumentDrawerStore, useDocumentStore } from "@store/document";

export enum ETabs {
  MY_DOCUMENTS = "سندهای من",
  SHARED_DOCUMENTS = "سندهای اشتراکی",
}

const DashboardDocuments = () => {
  const [activeTab, setActiveTab] = useState<string>(ETabs.MY_DOCUMENTS);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const {
    category,
    setCategory,
    setCategoryShow,
    categoryShow: getCategoryShow,
    categoryQueryParams: queryParams,
  } = useCategoryStore();

  const { setCategoryDrawer, categoryDrawer } = useCategoryDrawerStore();
  const { documentDrawer, setDocumentDrawer } = useDocumentDrawerStore();
  const { selectedDocument, setSelectedDocument } = useDocumentStore();
  const { versionModalList: getShowVersionList } = useVersionStore();
  const { editorModal: getEditorModal, setEditorModal } = useEditorStore();
  const { sort: getSortParams } = useSortStore();

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

  const handleCategorySetModal = useCallback(
    (modalName: string) => {
      setCategory(category);
      setActiveModal(modalName);
    },
    [category, setCategory],
  );

  const categoryMenuList = useCategoryMenuList(category, handleCategorySetModal);
  const categoryCloseModal = () => {
    setActiveModal(null);
    setCategory(null);
  };

  const handleDocumentSetModal = useCallback(
    (modalName: string) => {
      setSelectedDocument(selectedDocument);
      setActiveModal(modalName);
    },
    [selectedDocument, setSelectedDocument],
  );

  const documentMenuList = useDocumentMenuList(selectedDocument, handleDocumentSetModal);
  const documentCloseModal = () => {
    setActiveModal(null);
    setSelectedDocument(null);
  };

  useEffect(() => {
    if (activeTab === ETabs.MY_DOCUMENTS) {
      refetchChildren();
    } else {
      refetchReport();
    }
  }, [getSortParams, activeTab, refetchChildren, refetchReport]);

  useEffect(() => {
    setCategoryShow(null);
  }, [activeTab]);

  const commonProps: ICategoryView = {
    isLoading: activeTab === ETabs.MY_DOCUMENTS ? childrenIsLoading : reportIsLoading,
    getCategoryList: activeTab === ETabs.MY_DOCUMENTS ? childrenData : reportData,
    hasNextPage: activeTab === ETabs.MY_DOCUMENTS ? childrenHasNextPage : reportHasNextPage,
    fetchNextPage: activeTab === ETabs.MY_DOCUMENTS ? childrenFetchNextPage : reportFetchNextPage,
    isFetchingNextPage:
      activeTab === ETabs.MY_DOCUMENTS ? childrenIsFetchingNextPage : reportIsFetchingNextPage,
    isFetching: activeTab === ETabs.MY_DOCUMENTS ? childrenIsFetching : reportIsFetching,
    type: activeTab === ETabs.MY_DOCUMENTS ? EEmptyList.CHILDREN : EEmptyList.SHARED_DOCUMENTS,
  };

  const renderContent = () => {
    return (
      <>
        <div className="category-children hidden xs:block">
          <TableView {...commonProps} />
        </div>
        <div className="block min-h-[150px] xs:hidden">
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
        <Typography
          placeholder=""
          className="title_t1 p-4 font-medium text-primary_normal xs:p-0"
          {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
        >
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
      <>
        <div className="category-menu flex xs:hidden">
          <DrawerTemplate
            openDrawer={categoryDrawer}
            setOpenDrawer={setCategoryDrawer}
            menuList={categoryMenuList}
          />
        </div>
        <CategoryDialogs activeModal={activeModal} closeModal={categoryCloseModal} />
      </>
      <>
        <div className="document-menu flex xs:hidden">
          <DrawerTemplate
            openDrawer={documentDrawer}
            setOpenDrawer={setDocumentDrawer}
            menuList={documentMenuList}
          />
        </div>
        <DocumentDialogs activeModal={activeModal} closeModal={documentCloseModal} />
      </>
    </>
  );
};

export default DashboardDocuments;
