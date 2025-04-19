import { Card, Typography } from "@material-tailwind/react";
import { FaDateFromTimestamp, translateRoles } from "@utils/index";

import { CircleIcon } from "@components/atoms/icons";
import { IRepo } from "@interface/repo.interface";
import React from "react";
import RepoCardMoreInfo from "./repoCardMoreInfo";
import RepoDefaultImage from "../repoDefaultImage";
import RepoMenu from "@components/molecules/repoMenu";
import { repoInfoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

interface IProps {
  repo: IRepo;
}

const RepoCardMode = ({ repo }: IProps) => {
  const router = useRouter();
  const getRepoInfo = useRecoilValue(repoInfoAtom);

  return (
    <Card
      placeholder="card"
      key={`repo-card-item-${repo.id}`}
      className={`repo-card flex flex-col h-auto max-h-[85px] rounded-lg bg-white border-[1px] border-normal shadow-small cursor-pointer
        ${getRepoInfo?.id === repo.id ? "mb-14" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        if (!repo.isArchived) {
          router.push(`/admin/repositories?repoId=${repo.id}`);
        }
      }}
    >
      <div className="flex p-4 justify-between items-center">
        <div className="flex items-center gap-3 max-w-[70%]">
          <div className="repo__image h-12 w-12">
            <RepoDefaultImage imageHash={repo.imageFileHash} />
          </div>
          <div className="repo__info flex flex-col max-w-[80%] flex-grow">
            <Typography className="repo__name title_t1 !text-primary_normal max-w-full truncate font-[450]">
              {repo.name}
            </Typography>
            <div className="repo__info-details flex items-center gap-2 ">
              <Typography className="repo__info-details-date caption_c2 text-hint">
                {repo ? FaDateFromTimestamp(+new Date(repo.createDate)) : null}
              </Typography>
              <CircleIcon className="h-2 w-2" />
              <Typography className="repo__info-details-role caption_c2 text-hint">
                {translateRoles(repo?.roleName)}
              </Typography>
              <CircleIcon className="h-2 w-2" />
              <Typography className="repo__info-details-status caption_c2 text-hint">
                {repo.isArchived ? "غیرفعال" : "فعال"}
              </Typography>
            </div>
          </div>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <RepoMenu repo={repo} />
        </div>
      </div>
      {getRepoInfo?.id === repo.id ? <RepoCardMoreInfo repo={repo} /> : null}
    </Card>
  );
};

export default RepoCardMode;
