import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { IRepo } from "@interface/repo.interface";
import RepoMenu from "@components/molecules/repoMenu";
import RepoCardMoreInfo from "./repoCardMoreInfo";
import { useRecoilValue } from "recoil";
import { repoInfoAtom } from "@atom/repository";
import RepoImage from "../repoImage";

interface IProps {
  repo: IRepo;
}

const RepoCardMode = ({ repo }: IProps) => {
  const getRepoInfo = useRecoilValue(repoInfoAtom);

  return (
    <Card
      placeholder="card"
      key={`repo-card-item-${repo.id}`}
      className="flex flex-col h-auto max-h-[85px] rounded-lg bg-white border-[1px] border-normal shadow-small"
    >
      <div className="flex p-4 justify-between items-center">
        <div className="flex items-center gap-3 ">
          <div className="h-12 w-12">
            <RepoImage repo={repo} />
          </div>
          <Typography className="title_t2 w-full sm:w-[70px] md:w-[30px] lg:w-full truncate font-[450]">
            {repo.name}
          </Typography>
        </div>
        <RepoMenu repo={repo} />
      </div>
      {getRepoInfo?.id === repo.id ? <RepoCardMoreInfo repo={repo} /> : null}
    </Card>
  );
};

export default RepoCardMode;
