"use client";

import { FaDateFromTimestamp } from "@utils/index";
import React from "react";
import RepoImage from "@components/molecules/repoDefaultImage";
import RepoMenu from "@components/molecules/repoMenu";
import TagList from "../tagList";
import { Typography } from "@material-tailwind/react";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";

const RepoInfo = () => {
  const getRepo = useRecoilValue(repoAtom);

  return (
    <div className="repo-info rounded-none xs:rounded-lg bg-primary flex p-4 shadow-small">
      <div className="w-full">
        <div className="float-right p-0 sm:p-4 md:p-0 lg:p-4 ml-2 xs:ml-4 w-[54px] h-[40px] sm:w-[160px] sm:h-[130px] md:w-[54px] md:h-[40px] lg:w-[160px] lg:h-[130px] rounded-lg overflow-hidden shrink-0">
          <RepoImage repo={getRepo} />
        </div>
        <div className="block py-0 sm:py-2 md:py-0 lg:py-2 sm:flex md:block lg:flex flex-col flex-grow">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <Typography className="title_t1">{getRepo?.name}</Typography>
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
              {getRepo ? <TagList repoId={getRepo.id}/> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoInfo;
