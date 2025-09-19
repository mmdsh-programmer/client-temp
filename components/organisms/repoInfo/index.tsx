"use client";

import React, { useCallback, useState } from "react";
import { FaDateFromTimestamp, translateRoles } from "@utils/index";
import ChipMolecule from "@components/molecules/chip";
import RepoImage from "@components/molecules/repoDefaultImage";
import RepoMenu from "@components/molecules/repoMenu";
import TagList from "../tagList";
import { Typography } from "@material-tailwind/react";
import { useRepoActionDrawerStore, useRepositoryStore } from "@store/repository";
import DrawerTemplate from "@components/templates/drawerTemplate";
import RepoDialogs from "@components/molecules/repoDialogs";
import useRepoMenuList from "@components/molecules/repoMenu/useRepoMenuList";

const RepoInfo = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { repo: getRepo, setRepo } = useRepositoryStore();
  const { openRepoActionDrawer, setOpenRepoActionDrawer } = useRepoActionDrawerStore();

  const handleSetModal = useCallback(
    (modalName: string) => {
      if (getRepo) {
        setRepo(getRepo);
        setActiveModal(modalName);
      }
    },
    [getRepo, setRepo],
  );

  const menuList = useRepoMenuList(getRepo, handleSetModal, {
    showLog: true,
  });

  return (
    <div className="repo-info flex rounded-none bg-primary bg-white p-4 shadow-small xs:rounded-lg">
      <div className="w-full">
        <div className="float-right ml-2 h-[40px] w-[54px] shrink-0 overflow-hidden rounded-lg p-0 sm:h-[130px] sm:w-[160px] sm:p-4 md:h-[40px] md:w-[54px] md:p-0 lg:h-[130px] lg:w-[160px] lg:p-4 xs:ml-4">
          <RepoImage imageHash={getRepo?.imageFileHash} />
        </div>
        <div className="block flex-grow flex-col py-0 sm:flex sm:py-2 md:block md:py-0 lg:flex lg:py-2">
          <div className="flex max-w-full items-baseline justify-between">
            <div className="flex w-[70%] flex-grow flex-col">
              <div className="repoCreationDate flex items-center gap-1">
                <Typography
                  {...({} as React.ComponentProps<typeof Typography>)}
                  className="title_t1 max-w-[50%] truncate !font-[450] !text-primary_normal"
                  title={getRepo?.name}
                >
                  {getRepo?.name}
                </Typography>
                <ChipMolecule
                  value={translateRoles(getRepo?.roleName)}
                  className="border-[1px] border-normal bg-primary-light px-2 py-[2px] text-primary"
                />
              </div>
              <Typography {...({} as React.ComponentProps<typeof Typography>)} className="caption_c2 text-hint">
                {getRepo && FaDateFromTimestamp(+new Date(getRepo.createDate))}
              </Typography>
            </div>
            {getRepo ? <RepoMenu repo={getRepo} showLog /> : null}
          </div>
          <div className="mt-2 sm:mt-0 md:mt-2 lg:mt-0">
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="body_b3 h-[26px] truncate">{getRepo?.description}</Typography>
            <div className="mt-2 sm:mt-4 md:mt-2 lg:mt-4">
              {getRepo ? <TagList repoId={getRepo.id} /> : null}
            </div>
          </div>
        </div>
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

export default RepoInfo;
