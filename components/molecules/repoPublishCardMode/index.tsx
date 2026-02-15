import React from "react";
import Link from "next/link";
import RepoDefaultImage from "@components/molecules/repoDefaultImage";
import { Card } from "@/components/ui/card";
import { toPersianDigit } from "@utils/index";
import { IRepo } from "@interface/repo.interface";
import { cn } from "@/utils/cn";

interface IProps {
  repo: IRepo;
}

const RepoPublishCardMode = ({ repo }: IProps) => {
  return (
    <Card
      key={`repo-card-item-${repo.id}`}
      className={cn(
        "repo-publish-card last:flex flex-col h-full rounded-lg bg-white border-[1px] border-normal shadow-small"
      )}
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
            <RepoDefaultImage
              className="!w-32 !h-32"
              imageHash={repo.imageFileHash}
            />
          </div>
          <span
            className={cn(
              "title_t2 w-full pb-8 pt-4 text-center sm:w-[70px] md:w-[30px] lg:w-full truncate font-[450]"
            )}
          >
            {repo.name}
          </span>
        </div>
      </Link>
    </Card>
  );
};

export default RepoPublishCardMode;
