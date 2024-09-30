import EmptyList, { EEmptyList } from "@components/molecules/emptyList";

import CardItemRow from "@components/molecules/mobileCard/cardItemRow";
import { IFeedbackView } from "./adminPanelFeedback";
import LoadMore from "@components/molecules/loadMore";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@material-tailwind/react";

const renderFeedbackSection = (isLoading, listLength, getFeedback) => {
  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner className="h-8 w-8" color="deep-purple" />
      </div>
    );
  } if (listLength) {
    return getFeedback?.pages.map((page) => {
      return page.list.map((feedback) => {
        return (
          <div
            key={feedback.id}
            className=" flex flex-col w-full shadow-xSmall bg-primary rounded-lg p-4 gap-4"
          >
            <div className="flex flex-col gap-3">
              <CardItemRow title="شناسه" value={feedback.id.toString()} />
              <CardItemRow
                title="entityId"
                value={feedback.entityId.toString()}
              />
            </div>
          </div>
        );
      });
    });
  } 
    return <EmptyList type={EEmptyList.FEEDBACK} />;
};

const AdminMobileView = ({
  isLoading,
  getFeedback,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: IFeedbackView) => {
  const listLength = getFeedback?.pages[0].total;
  return (
    <>
      {renderFeedbackSection(isLoading, listLength, getFeedback)}
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
