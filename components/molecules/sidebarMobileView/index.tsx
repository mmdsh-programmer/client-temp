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
import { Button, Typography } from "@material-tailwind/react";
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
            className={`flex w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 ${
              sidebarSection === ESidebarSection.MY_DOCUMENTS
                ? "bg-gray-100 stroke-icon-active text-primary_normal"
                : "stroke-gray-400 text-gray-400"
            }`}
            onClick={() => {
              return handleDocumentNavigation("/admin/myDocuments", ESidebarSection.MY_DOCUMENTS);
            }}
            placeholder=""
            {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
          >
            <MyDocumentsIcon className="ml-3 h-6 w-6" />
            <Typography
              placeholder=""
              className="title_t3"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              سندهای من
            </Typography>
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
            placeholder=""
            {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
          >
            <SharedDocumentsIcon className="ml-3 h-6 w-6" />
            <Typography
              placeholder=""
              className="title_t3"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              سندهای اشتراکی
            </Typography>
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
              repoGrouping === ERepoGrouping.MY_REPO
                ? "bg-gray-100 stroke-icon-active text-primary_normal"
                : "stroke-gray-400 text-gray-400"
            }`}
            onClick={() => {
              handleRepoSelection(ERepoGrouping.MY_REPO);
              setSidebarSection(ESidebarSection.MY_REPOS);
              router.push("/admin/myRepoList");
            }}
            placeholder=""
            {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
          >
            <MyFolderIcon className="ml-3 h-6 w-6" />
            <Typography
              placeholder=""
              className="title_t3"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              مخزن‌های من
            </Typography>
          </Button>
          <Button
            className={`flex w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 ${
              repoGrouping === ERepoGrouping.ACCESS_REPO
                ? "bg-gray-100 text-primary_normal"
                : "text-gray-400"
            }`}
            onClick={() => {
              handleRepoSelection(ERepoGrouping.ACCESS_REPO);
              setSidebarSection(ESidebarSection.SHARED_REPOS);
              router.push("/admin/accessRepoList");
            }}
            placeholder=""
            {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
          >
            <FolderShareIcon
              className={`ml-3 h-6 w-6 ${
                repoGrouping === ERepoGrouping.ACCESS_REPO ? "fill-icon-active" : "fill-gray-400"
              }`}
            />
            <Typography
              placeholder=""
              className="title_t3"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              مخزن‌های اشتراکی
            </Typography>
          </Button>

          <Button
            className={`flex w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 ${
              repoGrouping === ERepoGrouping.BOOKMARK_REPO
                ? "bg-gray-100 text-primary_normal"
                : "text-gray-400"
            }`}
            onClick={() => {
              handleRepoSelection(ERepoGrouping.BOOKMARK_REPO);
              setSidebarSection(ESidebarSection.BOOKMARK_REPOS);
              router.push("/admin/bookmarkRepoList");
            }}
            placeholder=""
            {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
          >
            <BookmarkRepoIcon
              className={`ml-3 h-6 w-6 ${
                repoGrouping === ERepoGrouping.BOOKMARK_REPO ? "fill-icon-active" : "fill-gray-400"
              }`}
            />
            <Typography
              placeholder=""
              className="title_t3"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              مخزن‌های نشان شده 
            </Typography>
          </Button>

          <Button
            className={`flex w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 ${
              repoGrouping === ERepoGrouping.ARCHIVE_REPO
                ? "bg-gray-100 text-primary_normal"
                : "text-gray-400"
            }`}
            onClick={() => {
              handleRepoSelection(ERepoGrouping.ARCHIVE_REPO);
              setSidebarSection(ESidebarSection.ARCHIVE_REPOS);
              router.push("/admin/archiveRepoList");
            }}
            placeholder=""
            {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
          >
            <ArchiveIcon
              className={`ml-3 h-6 w-6 ${
                repoGrouping === ERepoGrouping.ARCHIVE_REPO ? "fill-icon-active" : "fill-gray-400"
              }`}
            />
            <Typography
              placeholder=""
              className="title_t3"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              مخزن‌های بایگانی 
            </Typography>
          </Button>
          <Button
            className={`flex w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 ${
              repoGrouping === ERepoGrouping.PUBLISHED_REPO
                ? "bg-gray-100 text-primary_normal"
                : "text-gray-400"
            }`}
            onClick={() => {
              handleRepoSelection(ERepoGrouping.PUBLISHED_REPO);
              setSidebarSection(ESidebarSection.PUBLISHED_REPOS);
              router.push("/admin/publishedRepoList");
            }}
            placeholder=""
            {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
          >
            <PublishIcon
              className={`ml-3 h-6 w-6 ${
                repoGrouping === ERepoGrouping.PUBLISHED_REPO ? "fill-icon-active" : "fill-gray-400"
              }`}
            />
            <Typography
              placeholder=""
              className="title_t3"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
               مخزن‌های منتشرشده 
            </Typography>
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
              className={`flex w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 ${
                sidebarSection === ESidebarSection.DOMAIN_MANAGEMENT
                  ? "bg-gray-100 stroke-icon-active text-primary_normal"
                  : "stroke-gray-400 text-gray-400"
              }`}
              onClick={() => {
                return handleNavigation(
                  "/admin/domainManagement",
                  ESidebarSection.DOMAIN_MANAGEMENT,
                );
              }}
              placeholder=""
              {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
            >
              <UserGroupIcon className="ml-3 h-6 w-6" />
              <Typography
                placeholder=""
                className="title_t3"
                {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
              >
                مدیریت دامنه
              </Typography>
            </Button>
          ) : null}
          {(enableBranch ?? true) ? (
            <Button
              className={`flex w-full cursor-pointer flex-row items-center justify-start bg-transparent px-4 py-3 ${
                sidebarSection === ESidebarSection.BRANCH_MANAGEMENT
                  ? "bg-gray-100 stroke-icon-active text-primary_normal"
                  : "stroke-gray-400 text-gray-400"
              }`}
              onClick={() => {
                if (activeTab === ESidebarTab.BRANCH_LIST) {
                  setShowList(!showList);
                } else {
                  setActiveTab(ESidebarTab.BRANCH_LIST);
                  setShowList(true);
                }
              }}
              placeholder=""
              {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
            >
              <UserGroupIcon className="ml-3 h-6 w-6" />
              <Typography
                placeholder=""
                className="title_t3"
                {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
              >
                مدیریت سازمانی
              </Typography>
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
              ? "stroke-icon-active text-primary_normal"
              : "stroke-gray-400 text-gray-400"
          }`}
          onClick={() => {
            return handleNavigation("/admin/dashboard", ESidebarSection.DASHBOARD);
          }}
        >
          <DashboardIcon className="h-6 w-6" />
          <Typography
            placeholder=""
            className="title_t4"
            {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            داشبورد
          </Typography>
        </div>
        {(enablePersonalDocs ?? true) ? (
          <div
            className={`flex cursor-pointer flex-col items-center ${
              activeTab === ESidebarTab.DOCUMENT
                ? "stroke-icon-active text-primary_normal"
                : "stroke-gray-400 text-gray-400"
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
            <Typography
              placeholder=""
              className="title_t4"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              اسناد
            </Typography>
          </div>
        ) : null}
        <div
          className={`flex cursor-pointer flex-col items-center ${
            activeTab === ESidebarTab.REPOS
              ? "stroke-icon-active text-primary_normal"
              : "stroke-gray-400 text-gray-400"
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
          <Typography
            placeholder=""
            className="title_t4"
            {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            مخزن‌ها
          </Typography>
        </div>
        <div
          className={`flex cursor-pointer flex-col items-center ${
            activeTab === ESidebarTab.DOMAIN
              ? "stroke-icon-active text-primary_normal"
              : "stroke-gray-400 text-gray-400"
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
          <Typography
            placeholder=""
            className="title_t4"
            {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            مدیریت دامنه
          </Typography>
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
