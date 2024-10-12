import React, { useState } from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import CardItemRow from "@components/molecules/mobileCard/cardItemRow";
import { IFeedbackView } from "./adminPanelFeedback";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@material-tailwind/react";
import { IOffer } from "@interface/offer.interface";
import AdminFeedbackDialog from "../dialogs/admin/adminFeedbackDialog";

const renderFeedbackSection = (
  isLoading,
  listLength,
  getFeedback,
  setSelectedFeedback,
  setOpenFeedbackDialog
) => {
  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner className="h-8 w-8" color="deep-purple" />
      </div>
    );
  }
  if (listLength) {
    return getFeedback?.pages.map((page) => {
      return page.list.map((feedback) => {
        return (
          <div
            key={feedback.id}
            className=" flex flex-col w-full shadow-xSmall bg-primary rounded-lg p-4 gap-4"
            onClick={() => {
              setOpenFeedbackDialog(true);
              setSelectedFeedback(feedback);
            }}
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
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<IOffer>();

  const listLength = getFeedback?.pages[0].total;

  return (
    <>
      {renderFeedbackSection(
        isLoading,
        listLength,
        getFeedback,
        setSelectedFeedback,
        setOpenFeedbackDialog
      )}
      <RenderIf isTrue={!!hasNextPage}>
        <div className="m-auto">
          <LoadMore
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        </div>
      </RenderIf>
      {openFeedbackDialog ? (
        <AdminFeedbackDialog
          setOpen={() => {
            return setOpenFeedbackDialog(false);
          }}
          feedback={selectedFeedback}
        />
      ) : null}
    </>
  );
};

export default AdminMobileView;
