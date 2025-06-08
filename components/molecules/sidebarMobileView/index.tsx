import React, { useEffect, useState } from "react";
import {
  ArchiveIcon,
  BookmarkRepoIcon,
  DashboardIcon,
  FolderShareIcon,
  MyDocumentsIcon,
  MyFolderIcon,
  PublishIcon,
  SharedDocumentsIcon,
  UserGroupIcon,
} from "@components/atoms/icons";
import { repoAtom, repoGroupingAtom, repoSearchParamAtom } from "@atom/repository";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ERepoGrouping } from "@interface/enums";
import { ESidebarSection, sidebarSectionAtom } from "@atom/sidebar";
import { Button, Typography } from "@material-tailwind/react";
import { categoryAtom } from "@atom/category";
import { selectedDocumentAtom } from "@atom/document";
import { useRouter } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";

const SidebarMobileView = () => {
  const router = useRouter();
  const [getRepoGroup, setRepoGroup] = useRecoilState(repoGroupingAtom);
  const [sidebarSection, setSidebarSection] = useRecoilState(sidebarSectionAtom);
  const setRepo = useSetRecoilState(repoAtom);
  const setSearchParam = useSetRecoilState(repoSearchParamAtom);
  const setCategory = useSetRecoilState(categoryAtom);
  const setDocument = useSetRecoilState(selectedDocumentAtom);
  const { data: userInfo } = useGetUser();

  const [activeTab, setActiveTab] = useState<"main" | "documents" | "repos">("main");
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (
      sidebarSection === ESidebarSection.MY_DOCUMENTS ||
      sidebarSection === ESidebarSection.SHARED_DOCUMENTS
    ) {
      setActiveTab("documents");
      setShowList(false);
    } else if (sidebarSection === ESidebarSection.REPOSITORY_MANAGEMENT) {
      setActiveTab("repos");
      setShowList(false);
    } else if (
      sidebarSection === ESidebarSection.DASHBOARD ||
      sidebarSection === ESidebarSection.DOMAIN_MANAGEMENT ||
      sidebarSection === ESidebarSection.BRANCH_MANAGEMENT
    ) {
      setActiveTab("main");
    }
  }, [sidebarSection]);

  const handleNavigation = (path: string, section: ESidebarSection) => {
    setSidebarSection(section);

    if (section === ESidebarSection.DASHBOARD) {
      setRepoGroup(ERepoGrouping.DASHBOARD);
    } else if (
      section === ESidebarSection.DOMAIN_MANAGEMENT ||
      section === ESidebarSection.BRANCH_MANAGEMENT
    ) {
      setRepoGroup(null);
    }

    setRepo(null);
    setCategory(null);
    setDocument(null);
    setSearchParam(null);
    setShowList(false);

    router.push(path);
  };

  const handleRepoSelection = (repoGrouping: ERepoGrouping) => {
    setRepoGroup(repoGrouping);
    setShowList(false);
  };

  const handleDocumentNavigation = (path: string, section: ESidebarSection) => {
    setSidebarSection(section);
    setRepoGroup(null);
    setShowList(false);
    router.push(path);
  };

  const renderDocumentsContent = () => {
    return (
      <div className="fixed bottom-16 left-0 right-0 top-[108px] z-40 overflow-auto bg-white pb-4 xs:hidden">
        <div className="flex flex-col">
          <Button
            className={`flex w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 ${
              sidebarSection === ESidebarSection.MY_DOCUMENTS
                ? "bg-gray-100 stroke-icon-active text-primary_normal"
                : "stroke-gray-400 text-gray-400"
            }`}
            onClick={() => {
              return handleDocumentNavigation("/admin/myDocuments", ESidebarSection.MY_DOCUMENTS);
            }}
          >
            <MyDocumentsIcon className="ml-3 h-6 w-6" />
            <Typography className="title_t3">سندهای من</Typography>
          </Button>
          <Button
            className={`flex w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 ${
              sidebarSection === ESidebarSection.SHARED_DOCUMENTS
                ? "bg-gray-100 stroke-icon-active text-primary_normal"
                : "stroke-gray-400 text-gray-400"
            }`}
            onClick={() => {
              return handleDocumentNavigation(
                "/admin/sharedDocuments",
                ESidebarSection.SHARED_DOCUMENTS,
              );
            }}
          >
            <SharedDocumentsIcon className="ml-3 h-6 w-6" />
            <Typography className="title_t3">سندهای اشتراکی</Typography>
          </Button>
        </div>
      </div>
    );
  };

  const renderReposContent = () => {
    return (
      <div className="fixed bottom-16 left-0 right-0 top-[108px] z-40 overflow-auto bg-white pb-4 xs:hidden">
        <div className="flex flex-col">
          <Button
            className={`flex w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 ${
              getRepoGroup === ERepoGrouping.MY_REPO
                ? "bg-gray-100 stroke-icon-active text-primary_normal"
                : "stroke-gray-400 text-gray-400"
            }`}
            onClick={() => {
              handleRepoSelection(ERepoGrouping.MY_REPO);
              setSidebarSection(ESidebarSection.MY_REPOS);
              router.push("/admin/myRepoList");
            }}
          >
            <MyFolderIcon className="ml-3 h-6 w-6" />
            <Typography className="title_t3">مخزن‌های من</Typography>
          </Button>
          <Button
            className={`flex w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 ${
              getRepoGroup === ERepoGrouping.ACCESS_REPO
                ? "bg-gray-100 text-primary_normal"
                : "text-gray-400"
            }`}
            onClick={() => {
              handleRepoSelection(ERepoGrouping.ACCESS_REPO);
              setSidebarSection(ESidebarSection.SHARED_REPOS);
              router.push("/admin/accessRepoList");
            }}
          >
            <FolderShareIcon
              className={`ml-3 h-6 w-6 ${
                getRepoGroup === ERepoGrouping.ACCESS_REPO ? "fill-icon-active" : "fill-gray-400"
              }`}
            />
            <Typography className="title_t3">مخزن‌های اشتراکی</Typography>
          </Button>

          <Button
            className={`flex w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 ${
              getRepoGroup === ERepoGrouping.BOOKMARK_REPO
                ? "bg-gray-100 text-primary_normal"
                : "text-gray-400"
            }`}
            onClick={() => {
              handleRepoSelection(ERepoGrouping.BOOKMARK_REPO);
              setSidebarSection(ESidebarSection.BOOKMARK_REPOS);
              router.push("/admin/bookmarkRepoList");
            }}
          >
            <BookmarkRepoIcon
              className={`ml-3 h-6 w-6 ${
                getRepoGroup === ERepoGrouping.BOOKMARK_REPO ? "fill-icon-active" : "fill-gray-400"
              }`}
            />
            <Typography className="title_t3">مخزن‌های نشان شده </Typography>
          </Button>

          <Button
            className={`flex w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 ${
              getRepoGroup === ERepoGrouping.ARCHIVE_REPO
                ? "bg-gray-100 text-primary_normal"
                : "text-gray-400"
            }`}
            onClick={() => {
              handleRepoSelection(ERepoGrouping.ARCHIVE_REPO);
              setSidebarSection(ESidebarSection.ARCHIVE_REPOS);
              router.push("/admin/archiveRepoList");
            }}
          >
            <ArchiveIcon
              className={`ml-3 h-6 w-6 ${
                getRepoGroup === ERepoGrouping.ARCHIVE_REPO ? "fill-icon-active" : "fill-gray-400"
              }`}
            />
            <Typography className="title_t3">مخزن‌های بایگانی </Typography>
          </Button>
          <Button
            className={`flex w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 ${
              getRepoGroup === ERepoGrouping.PUBLISHED_REPO
                ? "bg-gray-100 text-primary_normal"
                : "text-gray-400"
            }`}
            onClick={() => {
              handleRepoSelection(ERepoGrouping.PUBLISHED_REPO);
              setSidebarSection(ESidebarSection.PUBLISHED_REPOS);
              router.push("/admin/publishedRepoList");
            }}
          >
            <PublishIcon
              className={`ml-3 h-6 w-6 ${
                getRepoGroup === ERepoGrouping.PUBLISHED_REPO ? "fill-icon-active" : "fill-gray-400"
              }`}
            />
            <Typography className="title_t3"> مخزن‌های منتشرشده </Typography>
          </Button>
        </div>
      </div>
    );
  };

  const renderBottomNavigation = () => {
    return (
      <div className="flex h-full items-center justify-between">
        <div
          className={`flex cursor-pointer flex-col items-center ${
            sidebarSection === ESidebarSection.DASHBOARD && activeTab !== "repos"
              ? "stroke-icon-active text-primary_normal"
              : "stroke-gray-400 text-gray-400"
          }`}
          onClick={() => {
            return handleNavigation("/admin/dashboard", ESidebarSection.DASHBOARD);
          }}
        >
          <DashboardIcon className="h-6 w-6" />
          <Typography className="title_t4">داشبورد</Typography>
        </div>

        <div
          className={`flex cursor-pointer flex-col items-center ${
            activeTab === "documents"
              ? "stroke-icon-active text-primary_normal"
              : "stroke-gray-400 text-gray-400"
          }`}
          onClick={() => {
            if (activeTab === "documents") {
              setShowList(!showList);
            } else {
              setActiveTab("documents");
              setShowList(true);
            }
          }}
        >
          <MyDocumentsIcon className="h-6 w-6" />
          <Typography className="title_t4">اسناد</Typography>
        </div>

        <div
          className={`flex cursor-pointer flex-col items-center ${
            activeTab === "repos"
              ? "stroke-icon-active text-primary_normal"
              : "stroke-gray-400 text-gray-400"
          }`}
          onClick={() => {
            if (activeTab === "repos") {
              setShowList(!showList);
            } else {
              setActiveTab("repos");
              setShowList(true);
            }
          }}
        >
          <MyFolderIcon className="h-6 w-6" />
          <Typography className="title_t4">مخزن‌ها</Typography>
        </div>
        {userInfo?.domainRole === "owner" || userInfo?.domainRole === "participant" ? (
          <div
            className={`flex cursor-pointer flex-col items-center ${
              sidebarSection === ESidebarSection.DOMAIN_MANAGEMENT
                ? "stroke-icon-active text-primary_normal"
                : "stroke-gray-400 text-gray-400"
            }`}
            onClick={() => {
              return handleNavigation("/admin/domainManagement", ESidebarSection.DOMAIN_MANAGEMENT);
            }}
          >
            <UserGroupIcon className="h-6 w-6" />
            <Typography className="title_t4">دامنه</Typography>
          </div>
        ) : null}

        <div
          className={`flex cursor-pointer flex-col items-center ${
            sidebarSection === ESidebarSection.BRANCH_MANAGEMENT
              ? "stroke-icon-active text-primary_normal"
              : "stroke-gray-400 text-gray-400"
          }`}
          onClick={() => {
            return handleNavigation("/admin/branchManagement", ESidebarSection.BRANCH_MANAGEMENT);
          }}
        >
          <UserGroupIcon className="h-6 w-6" />
          <Typography className="title_t4">سازمانی</Typography>
        </div>
      </div>
    );
  };

  return (
    <>
      {activeTab === "documents" && showList && renderDocumentsContent()}
      {activeTab === "repos" && showList && renderReposContent()}
      <div className="sidebar-mobile-view z-50 h-16 min-h-16 w-full border-normal bg-primary px-4 xs:hidden">
        {renderBottomNavigation()}
      </div>
    </>
  );
};

export default SidebarMobileView;
