import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import DraftRequestMenu from "@components/molecules/draftRequestMenu";
import { FaDateFromTimestamp } from "@utils/index";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@material-tailwind/react";
import { repoAtom } from "@atom/repository";
import useGetPendingDraft from "@hooks/release/useGetPendingDraft";
import { useRecoilValue } from "recoil";
import RequestTableView from "../versionRequestsView/requestTableView";
import TableCell from "@components/molecules/tableCell";
import RequestMobileView from "../versionRequestsView/requestMobileView";

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

  const renderDraftRequests = () => {
    if (isLoading) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      );
    }
    if (listLength) {
      return (
        <>
          <div className="hidden xs:block h-full min-h-[calc(100vh-200px)] overflow-y-auto mt-4">
            <RequestTableView>
              {getDraftRequest?.pages.map((page) => {
                return page.list.map((request) => {
                  return (
                    <TableCell
                      key={`draft-request-table-item-${request.id}`}
                      tableCell={[
                        { data: request.versionNumber },
                        { data: request.documentTitle },
                        {
                          data: FaDateFromTimestamp(+request.createDate),
                          className: "hidden md:table-cell",
                        },
                        {
                          data: FaDateFromTimestamp(+request.updateDate),
                          className: "hidden xl:table-cell",
                        },
                        {
                          data: request.creator?.name,
                          className: "hidden sm:table-cell",
                        },

                        {
                          data: <DraftRequestMenu request={request} />,
                          stopPropagation: true,
                        },
                      ]}
                    />
                  );
                });
              })}
            </RequestTableView>
          </div>
          <div className="flex flex-col gap-3 rounded-lg h-[calc(100vh-20px)] overflow-auto">
            {getDraftRequest?.pages.map((page) => {
              return page.list.map((request) => {
                return <RequestMobileView request={request} />;
              });
            })}
          </div>
        </>
      );
    }
    return <EmptyList type={EEmptyList.DRAFT_REQUESTS} />;
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {renderDraftRequests()}
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
