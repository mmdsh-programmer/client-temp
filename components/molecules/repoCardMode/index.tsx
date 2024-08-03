import React from "react";
import { Card } from "@material-tailwind/react";
import { IRepo } from "@interface/repo.interface";
import RepoMenu from "@components/molecules/repoMenu";
import { RepoIcon } from "@components/atoms/icons";
import Text from "@components/atoms/typograghy/text";
import ImageComponent from "@components/atoms/image";
import RepoCardMoreInfo from "./repoCardMoreInfo";
import { useRecoilValue } from "recoil";
import { repoInfoAtom } from "@atom/repository";

interface IProps {
  repo: IRepo;
  archived?: boolean;
}

const RepoCardMode = ({ repo, archived }: IProps) => {
  const getRepoInfo = useRecoilValue(repoInfoAtom);

  return (
    <Card
      placeholder="card"
      key={`repo-card-item-${repo.id}`}
      className="flex flex-col h-auto rounded-lg bg-white border-[1px] border-normal shadow-small"
    >
      <div className="flex p-4 justify-between items-center">
        <div className="flex items-center gap-3 ">
          <div className="h-12 w-12">
            {repo.imageFileHash ? (
              <ImageComponent
                className="object-cover p-1"
                src={`${process.env.NEXT_PUBLIC_PODSPACE_API}files/${repo.imageFileHash}`}
                alt="repo-image"
              />
            ) : (
              <RepoIcon className="w-full h-full p-1" />
            )}
          </div>
          <Text className="text-[14px] w-full sm:w-[70px] md:w-[30px] lg:w-full truncate font-[450] leading-[21px] -tracking-[0.14px]">
            {repo.name}
          </Text>
        </div>
        <div className="block xs:hidden">
          <RepoMenu repo={repo} archived={archived} isList />
        </div>
        <div className="hidden xs:block">
          <RepoMenu repo={repo} archived={archived} />
        </div>
      </div>
      {getRepoInfo?.id === repo.id ? <RepoCardMoreInfo repo={repo} /> : null}
    </Card>
  );
};

export default RepoCardMode;
