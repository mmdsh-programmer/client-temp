/* eslint-disable no-nested-ternary */
import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { Spinner } from "@components/atoms/spinner";
import { useRepositoryStore } from "@store/repository";
import { useDocumentStore } from "@store/document";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { DialogBody, Typography } from "@material-tailwind/react";
import DocumentWhiteListMenu from "@components/molecules/documentWhiteListMenu";
import RenderIf from "@components/atoms/renderIf";
import LoadMore from "@components/molecules/loadMore";
import useGetRepoWhiteListRequests from "@hooks/repository/useGetRepoWhiteListRequests";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const RepoWhiteListRequestsDialog = ({ setOpen }: IProps) => {
  const { repo } = useRepositoryStore();

  const {
    data: getWhiteListRequests,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetRepoWhiteListRequests(repo!.id, 10);

  const handleClose = () => {
    setOpen(false);
  };

  const listLength = getWhiteListRequests?.pages[0].total;

  return (
    <InfoDialog
      dialogHeader="درخواست‌های دسترسی به سند"
      setOpen={handleClose}
      className="document-white-list-requests-dialog flex !h-full w-full max-w-full flex-col rounded-none bg-primary xs:!h-[500px] xs:!min-w-[450px] xs:!max-w-[450px] xs:rounded-lg"
    >
      <DialogBody
        placeholder=""
        {...({} as Omit<React.ComponentProps<typeof DialogBody>, "placeholder">)}
      >
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <Spinner
              className="h-6 w-6 text-primary"
              {...({} as Omit<React.ComponentProps<typeof Spinner>, "className">)}
            />
          </div>
        ) : listLength ? (
          <>
            <div className="white-list-request-list overflow-h-auto flex flex-col gap-3">
              {getWhiteListRequests?.pages.map((page) => {
                return page.list.map((request) => {
                  return (
                    <div
                      key={request.id}
                      className="request-item flex items-center justify-between rounded-lg border-[1px] border-normal p-4"
                    >
                      <div className="flex flex-grow gap-1">
                        <Typography
                          placeholder=""
                          className="label_l2 w-auto cursor-pointer truncate text-primary_normal"
                          title={`${request.userFullName}-${request.documentName}`}
                          {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
                        >
                          {request.userFullName} _ {request.documentName}
                        </Typography>
                      </div>
                      <DocumentWhiteListMenu request={request} />
                    </div>
                  );
                });
              })}
            </div>
            <RenderIf isTrue={!!hasNextPage}>
              <div className="m-auto flex w-full items-center justify-center">
                <LoadMore isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
              </div>
            </RenderIf>
          </>
        ) : (
          <EmptyList type={EEmptyList.WHITE_LIST_REQUESTS} key={EEmptyList.WHITE_LIST_REQUESTS} />
        )}
      </DialogBody>
    </InfoDialog>
  );
};

export default RepoWhiteListRequestsDialog;
