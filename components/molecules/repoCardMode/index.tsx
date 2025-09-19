import React, { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { FaDateFromTimestamp, translateRoles } from "@utils/index";
import { CircleIcon } from "@components/atoms/icons";
import { IRepo } from "@interface/repo.interface";
import RepoCardMoreInfo from "./repoCardMoreInfo";
import RepoDefaultImage from "../repoDefaultImage";
import RepoMenu from "@components/molecules/repoMenu";
import { useRouter } from "next/navigation";

interface IProps {
  repo: IRepo;
}

const RepoCardMode = ({ repo }: IProps) => {
  const router = useRouter();
  const [repoInfo, setRepoInfo] = useState<IRepo | null>(null);

  return (
    <Card
      placeholder="card"
      key={`repo-card-item-${repo.id}`}
      className={`repo-card flex h-auto max-h-[85px] cursor-pointer flex-col rounded-lg border-[1px] border-normal bg-white shadow-small ${repoInfo?.id === repo.id ? "mb-14" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        if (!repo.isArchived) {
          router.push(`/admin/repositories?repoId=${repo.id}`);
        }
      }}
      {...({} as  Omit<React.ComponentProps<typeof Card>, "placeholder">)}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex max-w-[70%] items-center gap-3">
          <div className="repo__image h-12 w-12">
            <RepoDefaultImage imageHash={repo.imageFileHash} />
          </div>
          <div className="repo__info flex max-w-[80%] flex-grow flex-col">
            <Typography
              placeholder=""
              className="repo__name title_t1 max-w-full truncate font-[450] !text-primary_normal"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {repo.name}
            </Typography>
            <div className="repo__info-details flex items-center gap-2">
              <Typography
                placeholder=""
                className="repo__info-details-date caption_c2 text-hint"
                {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
              >
                {repo ? FaDateFromTimestamp(+new Date(repo.createDate)) : null}
              </Typography>
              <CircleIcon className="h-2 w-2" />
              <Typography
                placeholder=""
                className="repo__info-details-role caption_c2 text-hint"
                {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
              >
                {translateRoles(repo?.roleName)}
              </Typography>
              <CircleIcon className="h-2 w-2" />
              <Typography
                placeholder=""
                className="repo__info-details-status caption_c2 text-hint"
                {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
              >
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
          <RepoMenu repo={repo} setRepoInfo={setRepoInfo} />
        </div>
      </div>
      {repoInfo?.id === repo.id ? <RepoCardMoreInfo repo={repo} setRepoInfo={setRepoInfo} /> : null}
    </Card>
  );
};

export default RepoCardMode;
