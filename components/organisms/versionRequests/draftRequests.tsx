import React from "react";
import { repoAtom } from "@atom/repository";
import useGetPendingDraft from "@hooks/release/useGetPendingDraft";
import { useRecoilValue } from "recoil";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import RenderIf from "@components/atoms/renderIf";
import LoadMore from "@components/molecules/loadMore";
import { Spinner } from "@material-tailwind/react";
import MobileCard from "@components/molecules/mobileCard";
import { FaDateFromTimestamp } from "@utils/index";
import DraftRequestMenu from "@components/molecules/draftRequestMenu";

const DraftRequests = () => {
  const getRepo = useRecoilValue(repoAtom);

  const {
    data: getDraftRequest,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPendingDraft(getRepo!.id, 10);

  const listLength = getDraftRequest?.pages[0].total;

  return (
    <div className="flex flex-col h-full gap-4 mt-4">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      ) : listLength ? (
        getDraftRequest?.pages.map((page) => {
          return page.list.map((request) => {
            return (
              <MobileCard
                key={request.id}
                className="!shadow-sm border-[1px] border-normal"
                name={request.versionNumber}
                description={[
                  {
                    title: " نام سند",
                    value: request.documentTitle,
                  },
                  {
                    title: "تاریخ ایجاد",
                    value: FaDateFromTimestamp(+request.createDate) || "--",
                  },
                  {
                    title: "تاریخ ویرایش",
                    value: FaDateFromTimestamp(+request.updateDate) || "--",
                  },
                  { title: "سازنده", value: request.creator?.name || "--" },
                ]}
                cardAction={<DraftRequestMenu request={request} />}
                onClick={() => {}}
              />
            );
          });
        })
      ) : (
        <EmptyList type={EEmptyList.DRAFT_REQUESTS} />
      )}
      <RenderIf isTrue={!!hasNextPage}>
        <div className="m-auto">
          <LoadMore
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        </div>
      </RenderIf>
    </div>
  );
};

export default DraftRequests;
