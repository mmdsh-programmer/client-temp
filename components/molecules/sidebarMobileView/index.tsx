"use client";

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
import { ERepoGrouping } from "@interface/enums";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";
import Branch from "@components/organisms/branch";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";
import { ESidebarSection, ESidebarTab, useSidebarStore } from "@store/sidebar";
import { useRepositoryStore } from "@store/repository";
import { useSidebarTabStore } from "@store/sidebarTab";

const SidebarMobileView = () => {
  const router = useRouter();
  const { repoGrouping, setRepoGrouping } = useRepositoryStore();
  const { sidebarSection, setSidebarSection } = useSidebarStore();
  const { sidebarTab: activeTab, setSidebarTab: setActiveTab } = useSidebarTabStore();

  const { data: userInfo } = useGetUser();
  const { data: getDomainInfo } = useGetDomainInfo();
  const content = JSON.parse(getDomainInfo?.content || "{}");
  const { enablePersonalDocs, enableBranch } = content;

  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (
      sidebarSection === ESidebarSection.MY_DOCUMENTS ||
      sidebarSection === ESidebarSection.SHARED_DOCUMENTS
    ) {
      setActiveTab(ESidebarTab.DOCUMENT);
      setShowList(false);
    } else if (sidebarSection === ESidebarSection.REPOSITORY_MANAGEMENT) {
      setActiveTab(ESidebarTab.REPOS);
      setShowList(false);
    } else if (
      sidebarSection === ESidebarSection.DASHBOARD ||
      sidebarSection === ESidebarSection.DOMAIN_MANAGEMENT ||
      sidebarSection === ESidebarSection.BRANCH_MANAGEMENT
    ) {
      setActiveTab(ESidebarTab.MAIN);
    }
  }, [sidebarSection, setActiveTab]);

  const handleNavigation = (path: string, section: ESidebarSection) => {
    setSidebarSection(section);

    if (section === ESidebarSection.DASHBOARD) {
      setRepoGrouping(ERepoGrouping.DASHBOARD);
    } else if (
      section === ESidebarSection.DOMAIN_MANAGEMENT ||
      section === ESidebarSection.BRANCH_MANAGEMENT
    ) {
      setRepoGrouping(null);
    }
    setShowList(false);

    router.push(path);
  };

  const handleRepoSelection = (repoGroup: ERepoGrouping) => {
    setRepoGrouping(repoGroup);
    setShowList(false);
  };

  const handleDocumentNavigation = (path: string, section: ESidebarSection) => {
    setSidebarSection(section);
    setRepoGrouping(null);
    setShowList(false);
    router.push(path);
  };

  const renderDocumentsContent = () => {
    return (
      <div className="fixed bottom-16 left-0 right-0 top-[108px] z-40 overflow-auto bg-white pb-4 xs:hidden">
        <div className="flex flex-col">
          <Button
            variant="ghost"
            className={`flex h-auto w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 font-normal hover:bg-gray-100 ${
              sidebarSection === ESidebarSection.MY_DOCUMENTS
                ? "bg-gray-100 text-primary_normal [&_svg]:stroke-icon-active"
                : "text-gray-400 [&_svg]:stroke-gray-400"
            }`}
            onClick={() => {
              return handleDocumentNavigation("/admin/myDocuments", ESidebarSection.MY_DOCUMENTS);
            }}
          >
            <MyDocumentsIcon className="ml-3 h-6 w-6" />
            <span className="title_t3">سندهای من</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex h-auto w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 font-normal hover:bg-gray-100 ${
              sidebarSection === ESidebarSection.SHARED_DOCUMENTS
                ? "bg-gray-100 text-primary_normal [&_svg]:stroke-icon-active"
                : "text-gray-400 [&_svg]:stroke-gray-400"
            }`}
            onClick={() => {
              return handleDocumentNavigation(
                "/admin/sharedDocuments",
                ESidebarSection.SHARED_DOCUMENTS,
              );
            }}
          >
            <SharedDocumentsIcon className="ml-3 h-6 w-6" />
            <span className="title_t3">سندهای اشتراکی</span>
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
            variant="ghost"
            className={`flex h-auto w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 font-normal hover:bg-gray-100 ${
              repoGrouping === ERepoGrouping.MY_REPO
                ? "bg-gray-100 text-primary_normal [&_svg]:stroke-icon-active"
                : "text-gray-400 [&_svg]:stroke-gray-400"
            }`}
            onClick={() => {
              handleRepoSelection(ERepoGrouping.MY_REPO);
              setSidebarSection(ESidebarSection.MY_REPOS);
              router.push("/admin/myRepoList");
            }}
          >
            <MyFolderIcon className="ml-3 h-6 w-6" />
            <span className="title_t3">مخزن‌های من</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex h-auto w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 font-normal hover:bg-gray-100 ${
              repoGrouping === ERepoGrouping.ACCESS_REPO
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
                repoGrouping === ERepoGrouping.ACCESS_REPO ? "fill-icon-active" : "fill-gray-400"
              }`}
            />
            <span className="title_t3">مخزن‌های اشتراکی</span>
          </Button>

          <Button
            variant="ghost"
            className={`flex h-auto w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 font-normal hover:bg-gray-100 ${
              repoGrouping === ERepoGrouping.BOOKMARK_REPO
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
                repoGrouping === ERepoGrouping.BOOKMARK_REPO ? "fill-icon-active" : "fill-gray-400"
              }`}
            />
            <span className="title_t3">مخزن‌های نشان شده</span>
          </Button>

          <Button
            variant="ghost"
            className={`flex h-auto w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 font-normal hover:bg-gray-100 ${
              repoGrouping === ERepoGrouping.ARCHIVE_REPO
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
                repoGrouping === ERepoGrouping.ARCHIVE_REPO ? "fill-icon-active" : "fill-gray-400"
              }`}
            />
            <span className="title_t3">مخزن‌های بایگانی</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex h-auto w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 font-normal hover:bg-gray-100 ${
              repoGrouping === ERepoGrouping.PUBLISHED_REPO
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
                repoGrouping === ERepoGrouping.PUBLISHED_REPO ? "fill-icon-active" : "fill-gray-400"
              }`}
            />
            <span className="title_t3">مخزن‌های منتشرشده</span>
          </Button>
        </div>
      </div>
    );
  };

  const renderDomainContent = () => {
    return (
      <div className="fixed bottom-16 left-0 right-0 top-[108px] z-40 overflow-auto bg-white pb-4 xs:hidden">
        <div className="flex flex-col">
          {userInfo?.domainRole === "owner" || userInfo?.domainRole === "participant" ? (
            <Button
              variant="ghost"
              className={`flex h-auto w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 font-normal hover:bg-gray-100 ${
                sidebarSection === ESidebarSection.DOMAIN_MANAGEMENT
                  ? "bg-gray-100 text-primary_normal [&_svg]:stroke-icon-active"
                  : "text-gray-400 [&_svg]:stroke-gray-400"
              }`}
              onClick={() => {
                return handleNavigation(
                  "/admin/domainManagement",
                  ESidebarSection.DOMAIN_MANAGEMENT,
                );
              }}
            >
              <UserGroupIcon className="ml-3 h-6 w-6" />
              <span className="title_t3">مدیریت دامنه</span>
            </Button>
          ) : null}
          {(enableBranch ?? true) ? (
            <Button
              variant="ghost"
              className={`flex h-auto w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 font-normal hover:bg-gray-100 ${
                sidebarSection === ESidebarSection.BRANCH_MANAGEMENT
                  ? "bg-gray-100 text-primary_normal [&_svg]:stroke-icon-active"
                  : "text-gray-400 [&_svg]:stroke-gray-400"
              }`}
              onClick={() => {
                if (activeTab === ESidebarTab.BRANCH_LIST) {
                  setShowList(!showList);
                } else {
                  setActiveTab(ESidebarTab.BRANCH_LIST);
                  setShowList(true);
                }
              }}
            >
              <UserGroupIcon className="ml-3 h-6 w-6" />
              <span className="title_t3">مدیریت سازمانی</span>
            </Button>
          ) : null}
        </div>
      </div>
    );
  };

  const renderBranchListContent = () => {
    return (
      <div className="fixed bottom-16 left-0 right-0 top-[108px] z-40 overflow-auto bg-white pb-4 xs:hidden">
        <Branch />
      </div>
    );
  };

  const renderBottomNavigation = () => {
    return (
      <div className="flex h-full items-center justify-between">
        <div
          className={`flex cursor-pointer flex-col items-center ${
            sidebarSection === ESidebarSection.DASHBOARD && activeTab !== "repos"
              ? "text-primary_normal [&_svg]:stroke-icon-active"
              : "text-gray-400 [&_svg]:stroke-gray-400"
          }`}
          onClick={() => {
            return handleNavigation("/admin/dashboard", ESidebarSection.DASHBOARD);
          }}
        >
          <DashboardIcon className="h-6 w-6" />
          <span className="title_t4">داشبورد</span>
        </div>
        {(enablePersonalDocs ?? true) ? (
          <div
            className={`flex cursor-pointer flex-col items-center ${
              activeTab === ESidebarTab.DOCUMENT
                ? "text-primary_normal [&_svg]:stroke-icon-active"
                : "text-gray-400 [&_svg]:stroke-gray-400"
            }`}
            onClick={() => {
              if (activeTab === ESidebarTab.DOCUMENT) {
                setShowList(!showList);
              } else {
                setActiveTab(ESidebarTab.DOCUMENT);
                setShowList(true);
              }
            }}
          >
            <MyDocumentsIcon className="h-6 w-6" />
            <span className="title_t4">اسناد</span>
          </div>
        ) : null}
        <div
          className={`flex cursor-pointer flex-col items-center ${
            activeTab === ESidebarTab.REPOS
              ? "text-primary_normal [&_svg]:stroke-icon-active"
              : "text-gray-400 [&_svg]:stroke-gray-400"
          }`}
          onClick={() => {
            if (activeTab === ESidebarTab.REPOS) {
              setShowList(!showList);
            } else {
              setActiveTab(ESidebarTab.REPOS);
              setShowList(true);
            }
          }}
        >
          <MyFolderIcon className="h-6 w-6" />
          <span className="title_t4">مخزن‌ها</span>
        </div>
        <div
          className={`flex cursor-pointer flex-col items-center ${
            activeTab === ESidebarTab.DOMAIN
              ? "text-primary_normal [&_svg]:stroke-icon-active"
              : "text-gray-400 [&_svg]:stroke-gray-400"
          }`}
          onClick={() => {
            if (activeTab === ESidebarTab.DOMAIN) {
              setShowList(!showList);
            } else {
              setActiveTab(ESidebarTab.DOMAIN);
              setShowList(true);
            }
          }}
        >
          <UserGroupIcon className="h-6 w-6" />
          <span className="title_t4">مدیریت دامنه</span>
        </div>
      </div>
    );
  };

  return (
    <>
      {activeTab === "documents" && showList ? renderDocumentsContent() : null}
      {activeTab === "repos" && showList ? renderReposContent() : null}
      {activeTab === "domain" && showList ? renderDomainContent() : null}
      {activeTab === "branchList" && showList ? renderBranchListContent() : null}
      <div className="sidebar-mobile-view z-50 h-16 min-h-16 w-full border-normal bg-primary px-4 xs:hidden">
        {renderBottomNavigation()}
      </div>
    </>
  );
};

export default SidebarMobileView;
