import React, { useCallback, useState } from "react";
import { BookmarkIcon, InfoIcon, MoreDotIcon } from "@components/atoms/icons";
import useRepoMenuList from "./useRepoMenuList";
import { Button } from "@material-tailwind/react";
import { IRepo } from "@interface/repo.interface";
import MenuTemplate from "@components/templates/menuTemplate";
import { usePathname } from "next/navigation";
import { useRepoActionDrawerStore, useRepositoryStore } from "@store/repository";
import { useTourStore } from "@store/tour";
import { ETourSection } from "@atom/tour";
import RepoDialogs from "../repoDialogs";

interface IProps {
  repo?: IRepo | null;
  showLog?: boolean;
  setRepoInfo?: React.Dispatch<React.SetStateAction<IRepo | null>>;
}

const RepoMenu = ({ repo, showLog = false, setRepoInfo }: IProps) => {
  const currentPath = usePathname();
  const setActiveTour = useTourStore((state) => {
    return state.setActiveTour;
  });
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const { repo: getRepo, setRepo } = useRepositoryStore();
  const { setOpenRepoActionDrawer } = useRepoActionDrawerStore();

  const handleSetModal = useCallback(
    (modalName: string) => {
      setActiveModal(modalName);
      setRepo(repo || getRepo);
    },
    [getRepo, setRepo],
  );

  const handleRepoInfo = useCallback(() => {
    setRepoInfo?.(repo || getRepo);
  }, [repo, setRepoInfo]);

  const menuList = useRepoMenuList(repo || getRepo, handleSetModal, {
    showLog,
    onInfoClick: handleRepoInfo,
  });

  const closeModal = () => {
    setActiveModal(null);
    if (window.location.pathname !== "/admin/repositories") {
      setRepo(null);
    }
  };

  return (
    <>
      <div className="repo-menu flex items-center justify-end gap-1">
        {currentPath === "/admin/repositories" ? (
          <Button
            placeholder="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-50 bg-white p-1 shadow-none"
            onClick={() => {
              setActiveTour(ETourSection.REPO);
              window.metrics?.track("repo-tour");
            }}
            {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
          >
            <InfoIcon className="h-4 w-4 stroke-primary-normal" />
          </Button>
        ) : null}
        <div
          className="repoInformationTab repoActions flex items-center justify-end gap-1"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {repo?.bookmark ? (
            <BookmarkIcon className="h-4 w-4 fill-amber-600 stroke-amber-600" />
          ) : null}
          <MenuTemplate
            menuList={menuList}
            onMobileClick={() => {
              setOpenRepoActionDrawer(true);
              setRepo(repo || getRepo);
              window.metrics?.track("repo-menu");
            }}
            icon={
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-50 bg-white p-1 shadow-none">
                <MoreDotIcon className="h-4 w-4" />
              </div>
            }
          />
        </div>
      </div>
      <RepoDialogs activeModal={activeModal} closeModal={closeModal} />
    </>
  );
};

export default RepoMenu;
