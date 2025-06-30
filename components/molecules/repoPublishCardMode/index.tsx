import { Card, Typography } from "@material-tailwind/react";

import { IRepo } from "@interface/repo.interface";
import Link from "next/link";
import React from "react";
import RepoDefaultImage from "../repoDefaultImage";
import { toPersianDigit } from "@utils/index";

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
        key={`repo-link-${toPersianDigit(repo.id)}`}
        href={`/publish/${toPersianDigit(
          `${repo.name.replaceAll(/\s+/g, "-")}`
        )}/${toPersianDigit(repo.id)}`}
        prefetch={false}
      >
        <div className="flex flex-col items-center justify-between w-full h-full rounded-md">
          <div className="default-repo-image h-40 w-full flex-1 bg-primary-normal relative flex items-center justify-center rounded-t-md">
            <RepoDefaultImage className="!w-32 !h-32" imageHash={repo.imageFileHash} />
          </div>
          <Typography className="title_t2 w-full pb-8 pt-4 text-center sm:w-[70px] md:w-[30px] lg:w-full truncate font-[450]">
            {repo.name}
          </Typography>
        </div>
      </Link>
    </Card>
  );
};

export default RepoPublishCardMode;
