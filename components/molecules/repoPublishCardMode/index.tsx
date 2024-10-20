import { Card, Typography } from "@material-tailwind/react";

import { IRepo } from "@interface/repo.interface";
import Link from "next/link";
import React from "react";
import RepoDefaultImage from "../repoDefaultImage";
import { toPersinaDigit } from "@utils/index";

interface IProps {
  repo: IRepo;
}

const RepoPublishCardMode = ({ repo }: IProps) => {
  return (
    <Card
      placeholder="card"
      key={`repo-card-item-${repo.id}`}
      className="repo-publish-card last:flex flex-col h-full rounded-lg bg-white border-[1px] border-normal shadow-small"
    >
      <Link
      className="h-full"
        key={`repo-link-${repo.id}`}
        href={`/publish/${toPersinaDigit(
          `${repo.name.replaceAll(/\s+/g, "-")}/${repo.id}`
        )}`}
        prefetch={false}
      >
        <div className="flex p-4 justify-between items-center w-full h-full">
          <div className="flex flex-col items-center justify-center gap-3 w-full">
            <div className="h-auto w-full max-h-[129px] max-w-40 flex justify-center items-center overflow-hidden">
              <RepoDefaultImage imageHash={repo.imageFileHash} />
            </div>
            <Typography className="title_t2 w-full mt-5 text-center sm:w-[70px] md:w-[30px] lg:w-full truncate font-[450]">
              {repo.name}
            </Typography>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default RepoPublishCardMode;
