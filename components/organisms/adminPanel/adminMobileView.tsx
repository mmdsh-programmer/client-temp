import React from "react";
import { Spinner } from "@material-tailwind/react";
import LoadMore from "@components/molecules/loadMore";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import RenderIf from "@components/atoms/renderIf";
import { IFeedbackView } from "./adminPanelFeedback";
import CardItemRow from "@components/molecules/mobileCard/cardItemRow";

const AdminMobileView = ({
  isLoading,
  getFeedback,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  isFetching,
}: IFeedbackView) => {
  const listLength = getFeedback?.pages[0].total;
  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="h-8 w-8" color="deep-purple" />
        </div>
      ) : listLength ? (
        getFeedback?.pages.map((page) => {
          return page.list.map((feedback) => {
            return (
              <div
                key={feedback.id}
                className={` flex flex-col w-full shadow-xSmall bg-primary rounded-lg p-4 gap-4`}
              >
                <div className="flex flex-col gap-3">
                  <CardItemRow title="شناسه" value={feedback.id.toString()} />
                  <CardItemRow title="entityId" value={feedback.entityId.toString()} />
                </div>
              </div>
            );
          });
        })
      ) : (
        <EmptyList type={EEmptyList.FEEDBACK} />
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

export default AdminMobileView;
