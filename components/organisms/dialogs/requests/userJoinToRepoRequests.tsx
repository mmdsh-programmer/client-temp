import React from "react";
import { DialogBody, Spinner, Typography } from "@material-tailwind/react";
import InfoDialog from "@components/templates/dialog/infoDialog";
import useGetUserJoinRepoRequests from "@hooks/requests/useGetUserJoinRepoRequests";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { translateRoles } from "@utils/index";
import RequestMenu from "./requestMenu";
import ChipMolecule from "@components/molecules/chip";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserJoinToRepoRequests = ({ setOpen }: IProps) => {
  const { data: requests, isLoading } = useGetUserJoinRepoRequests(10);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <InfoDialog
      setOpen={handleClose}
      dialogHeader="لیست درخواست‌ها"
      className="join-to-repo-requests__dialog xs:!min-w-[450px] xs:!max-w-[450px]"
    >
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-6 overflow-auto h-[450px]"
      >
        {isLoading ? (
          <div className="flex justify-center items-center w-full">
          <Spinner className="w-6 h-6" color="deep-purple" />
          </div>
        ) : (
          <div className="join-to-repo-request-list flex flex-col gap-3">
            {requests?.pages.map((page) => {
              return page.total ? (
                page.list.map((request) => {
                  return (
                    <div
                      key={request.id}
                      className="request-item flex justify-between items-center border-[1px] border-normal p-4 rounded-lg"
                    >
                      <div className="flex flex-grow gap-1">
                        <Typography
                          className="label_l2 text-primary truncate w-auto max-w-[50px] xs:max-w-[90px] cursor-pointer"
                          title={request.repoName}
                        >
                          {request.repoName}
                        </Typography>
                        <ChipMolecule
                          className="label_l4 !text-purple-normal h-5 px-2 bg-purple-light"
                          value={translateRoles(request.role)}
                        />
                      </div>
                      <RequestMenu request={request} />
                    </div>
                  );
                })
              ) : (
                <EmptyList
                  type={EEmptyList.JOIN_REPO_REQUESTS}
                  key={EEmptyList.JOIN_REPO_REQUESTS}
                />
              );
            })}
          </div>
        )}
      </DialogBody>
    </InfoDialog>
  );
};

export default UserJoinToRepoRequests;
