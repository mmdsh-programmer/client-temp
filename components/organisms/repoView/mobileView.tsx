import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { FaDateFromTimestamp, translateRoles } from "@utils/index";
import { IRepoView } from "@interface/repo.interface";
import LoadMore from "@components/molecules/loadMore";
import MobileCard from "@components/molecules/mobileCard";
import RenderIf from "@components/atoms/renderIf";
import RepoMenu from "@components/molecules/repoMenu";
import { Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

const MobileView = ({
  isLoading,
  getRepoList,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  type,
}: IRepoView) => {
  const router = useRouter();

  const listLength = getRepoList?.pages[0].total ?? 0;

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      ) : listLength ? (
        getRepoList?.pages.map((page) => {
          return page.list.map((repo) => {
            return (
              <MobileCard
                key={repo.id}
                name={repo.name}
                description={[
                  {
                    title: "تاریخ ایجاد",
                    value:
                      FaDateFromTimestamp(+new Date(repo.createDate)) || "--",
                  },
                  { title: "سازنده", value: repo.owner?.userName || "--" },
                  {
                    title: "نقش من",
                    value: translateRoles(repo.roleName) || "--",
                  },
                ]}
                cardAction={<RepoMenu repo={repo} />}
                onClick={() => {
                  return (
                    !repo.isArchived &&
                    router.push(`/admin/repositories?repoId=${repo.id}`)
                  );
                }}
              />
            );
          });
        })
      ) : (
        <EmptyList type={type as EEmptyList} />
      )}
      <RenderIf isTrue={!!hasNextPage}>
        <div className="m-auto">
          <LoadMore
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        </div>
      </RenderIf>
    </>
  );
};

export default MobileView;
