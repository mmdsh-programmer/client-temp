"use client";

import { FaDateFromTimestamp, translateRoles } from "@utils/index";
import React from "react";
import RepoImage from "@components/molecules/repoDefaultImage";
import RepoMenu from "@components/molecules/repoMenu";
import TagList from "../tagList";
import { Typography } from "@material-tailwind/react";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import ChipMolecule from "@components/molecules/chip";

const RepoInfo = () => {
  const getRepo = useRecoilValue(repoAtom);

  return (
    <div className="repo-info rounded-none xs:rounded-lg bg-primary flex p-4 shadow-small">
      <div className="w-full">
        <div className="float-right p-0 sm:p-4 md:p-0 lg:p-4 ml-2 xs:ml-4 w-[54px] h-[40px] sm:w-[160px] sm:h-[130px] md:w-[54px] md:h-[40px] lg:w-[160px] lg:h-[130px] rounded-lg overflow-hidden shrink-0">
          <RepoImage imageHash={getRepo?.imageFileHash} />
        </div>
        <div className="block py-0 sm:py-2 md:py-0 lg:py-2 sm:flex md:block lg:flex flex-col flex-grow">
          <div className="flex justify-between items-baseline max-w-full">
            <div className="repoCreationDate flex flex-col flex-grow w-[70%]">
              <div className="flex items-center gap-1">
                <Typography
                  className="title_t1 !text-primary !font-[450] truncate max-w-[50%]"
                  title={getRepo?.name}
                >
                  {getRepo?.name}
                </Typography>
                <ChipMolecule
                  value={translateRoles(getRepo?.roleName)}
                  className="px-2 py-[2px] border-[1px] border-normal bg-purple-light text-purple-normal"
                />
              </div>
              <Typography className="caption_c2 text-hint">
                {getRepo && FaDateFromTimestamp(+new Date(getRepo.createDate))}
              </Typography>
            </div>
            {getRepo ? <RepoMenu repo={getRepo} /> : null}
          </div>
          <div className="mt-2 sm:mt-0 md:mt-2 lg:mt-0">
            <Typography className="body_b3 h-[26px] truncate">
              {getRepo?.description}
            </Typography>
            <div className="mt-2 sm:mt-4 md:mt-2 lg:mt-4">
              {getRepo ? <TagList repoId={getRepo.id} /> : null}
            </div>
          </div>
        </div>
      </div>
      <RepoMenu showDrawer />
    </div>
  );
};

export default RepoInfo;
