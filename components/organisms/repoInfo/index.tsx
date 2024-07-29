import React from "react";
import { useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import RepoMenu from "@components/molecules/repoMenu";
import { RepoIcon } from "@components/atoms/icons";
import { FaDateFromTimestamp } from "@utils/index";
import ImageComponent from "@components/atoms/image";
import Text from "@components/atoms/typograghy/text";
import useGetUser from "@hooks/auth/useGetUser";
import TagList from "../tagList";

const RepoInfo = () => {
  const getRepo = useRecoilValue(repoAtom);
  const { data: getUserInfo } = useGetUser();

  return (
    <div className="rounded-none xs:rounded-lg bg-primary flex p-4 shadow-small">
      <div className="w-full">
        <div className="float-right ml-2 xs:ml-4 w-[54px] h-[40px] sm:w-[160px] sm:h-[130px] md:w-[54px] md:h-[40px] lg:w-[160px] lg:h-[130px] rounded-lg overflow-hidden shrink-0">
          {getRepo?.imageFileHash ? (
            <ImageComponent
              alt="repo-image"
              src={`${process.env.NEXT_PUBLIC_PODSPACE_API}files/${getRepo?.imageFileHash.toLowerCase()}?&checkUserGroupAccess=true&Authorization=${getUserInfo?.access_token}&time=${Date.now()})`}
            />
          ) : (
            <RepoIcon className="w-full h-full" />
          )}
        </div>
        <div className="block py-0 sm:py-2 md:py-0 lg:py-2 sm:flex md:block lg:flex flex-col flex-grow">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <Text className="text-base font-[450] -tracking-[0.32px] leading-6">
                {getRepo?.name}
              </Text>
              <Text className="text-[11px] text-hint leading-[18px] -tracking-[0.11px] ">
                {getRepo && FaDateFromTimestamp(+new Date(getRepo.createDate))}
              </Text>
            </div>
            {getRepo ? <RepoMenu isList={true} repo={getRepo} /> : null}
          </div>
          <div className="mt-2 sm:mt-0 md:mt-2 lg:mt-0">
            <Text className="h-[26px] text-[13px] truncate leading-[26px] -tracking-[0.13px]">
              {getRepo?.description}
            </Text>
            <div className="mt-2 sm:mt-4 md:mt-2 lg:mt-4">
              <TagList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoInfo;
