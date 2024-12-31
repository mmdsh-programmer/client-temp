import React, { useState } from "react";
import TableHead from "@components/molecules/tableHead";
import { IFeedbackView } from "./adminPanelFeedback";
import { Spinner } from "@material-tailwind/react";
import TableCell from "@components/molecules/tableCell";
import RenderIf from "@components/atoms/renderIf";
import LoadMore from "@components/molecules/loadMore";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import AdminFeedbackDialog from "../dialogs/admin/adminFeedbackDialog";
import { IOffer } from "@interface/offer.interface";

const AdminTableView = ({
  isLoading,
  getFeedback,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  isFetching,
}: IFeedbackView) => {
  const listLength = getFeedback?.pages[0].total;
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<IOffer>();

  return (
    <>
      <div className="p-5 flex flex-col bg-primary min-h-[calc(100vh-340px)] h-full flex-grow flex-shrink-0 rounded-lg shadow-small">
        {/* eslint-disable-next-line no-nested-ternary */}
        {isLoading || isFetching ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner className="h-8 w-8" color="deep-purple" />
          </div>
        ) : listLength ? (
          <div className="w-full overflow-auto border-[0.5px] border-normal rounded-lg">
            <table className="w-full overflow-hidden min-w-max ">
              <TableHead
                tableHead={[
                  {
                    key: "id",
                    value: "شناسه",
                    isSorted: true,
                  },
                  {
                    key: "entityId",
                    value: "entityId",
                    isSorted: true,
                  },
                  {
                    key: "content",
                    value: "توضیحات",
                    className: "flex ml-4",
                  },
                ]}
              />
              <tbody>
                {getFeedback?.pages.map((page) => {
                  return page.list.map((feedback) => {
                    return (
                      <TableCell
                        key={`feedback-table-item-${feedback.id}`}
                        onClick={() => {
                          setOpenFeedbackDialog(true);
                          setSelectedFeedback(feedback);
                        }}
                        tableCell={[
                          { data: feedback.id },
                          {
                            data: feedback.entityId,
                          },
                          {
                            data: feedback.data.message,
                            className: "flex ml-4 max-w-[500px] truncate",
                            title: feedback.data.message,
                          },
                        ]}
                      />
                    );
                  });
                })}
                <RenderIf isTrue={!!hasNextPage}>
                  <tr>
                    <td colSpan={3} className="!text-center py-4">
                      <div className="flex justify-center items-center">
                        <LoadMore
                          className="self-center !shadow-none underline text-[10px] text-primary !font-normal"
                          isFetchingNextPage={isFetchingNextPage}
                          fetchNextPage={fetchNextPage}
                        />
                      </div>
                    </td>
                  </tr>
                </RenderIf>
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyList type={EEmptyList.FEEDBACK} />
        )}
      </div>
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

export default AdminTableView;
