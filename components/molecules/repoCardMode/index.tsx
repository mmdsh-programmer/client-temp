import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { IRepo } from "@interface/repo.interface";
import RepoMenu from "@components/molecules/repoMenu";
import RepoCardMoreInfo from "./repoCardMoreInfo";
import { useRecoilValue } from "recoil";
import { repoInfoAtom } from "@atom/repository";
import RepoDefaultImage from "../repoDefaultImage";
import { useRouter } from "next/navigation";
import { FaDateFromTimestamp, translateRoles } from "@utils/index";
import { CircleIcon } from "@components/atoms/icons";

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
      className={`flex flex-col h-auto max-h-[85px] rounded-lg bg-white border-[1px] border-normal shadow-small cursor-pointer
        ${getRepoInfo?.id === repo.id ? "mb-14" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!repo.isArchived) {
          router.push(`/admin/repositories?repoId=${repo.id}`);
        }
      }}
    >
      <div className="flex p-4 justify-between items-center">
        <div className="flex items-center gap-3 max-w-[70%]">
          <div className="h-12 w-12">
            <RepoDefaultImage imageHash={repo.imageFileHash} />
          </div>
          <div className="flex flex-col max-w-[80%] flex-grow">
            <Typography className="title_t1 !text-primary max-w-full truncate font-[450]">
              {repo.name}
            </Typography>
            <div className="flex items-center gap-2 ">
              <Typography className="caption_c2 text-hint">
                {repo ? FaDateFromTimestamp(+new Date(repo.createDate)) : null}
              </Typography>
              <CircleIcon className="h-2 w-2" />
              <Typography className="caption_c2 text-hint">
                {translateRoles(repo?.roleName)}
              </Typography>
              <CircleIcon className="h-2 w-2" />
              <Typography className="caption_c2 text-hint">
                {repo.isArchived ? "غیرفعال" : "فعال"}
              </Typography>
            </div>
          </div>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
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
