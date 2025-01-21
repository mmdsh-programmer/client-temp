import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { IRepo } from "@interface/repo.interface";
import RepoMenu from "@components/molecules/repoMenu";
import RepoCardMoreInfo from "./repoCardMoreInfo";
import { useRecoilValue } from "recoil";
import { repoInfoAtom } from "@atom/repository";
import RepoDefaultImage from "../repoDefaultImage";
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
      className="flex flex-col cursor-pointer h-auto max-h-[85px] rounded-lg bg-white border-[1px] border-normal shadow-small"
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
          <Typography className="title_t2 max-w-[70%] truncate font-[450]">
            {repo.name}
          </Typography>
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
