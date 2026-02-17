import React, { useState } from "react";
import { Spinner } from "@components/ui/spinner";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import ChipMolecule from "@components/molecules/chip";
import InfoDialog from "@components/templates/dialog/infoDialog";
import RequestMenu from "./requestMenu";
import { translateRoles } from "@utils/index";
import useGetUserJoinRepoRequests from "@hooks/requests/useGetUserJoinRepoRequests";
import JoinToRepoDialog from "./joinToRepoDialog";
import { IAccessRequest } from "@interface/accessRequest.interface";

interface IProps {
  trigger?: React.ReactNode;
}

const UserJoinToRepoRequests = ({ trigger }: IProps) => {
  const [open, setOpen] = useState(false);
  const [acceptedRepo, setAcceptedRepo] = useState<IAccessRequest | null>(null);
  const { data: requests, isLoading } = useGetUserJoinRepoRequests(10);

  if (acceptedRepo) {
    return (
      <JoinToRepoDialog
        repo={acceptedRepo}
        setAcceptedRepo={setAcceptedRepo}
        setOpen={setOpen}
      />
    );
  }

  return (
    <InfoDialog
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      dialogHeader="لیست درخواست‌ها"
      className="join-to-repo-requests__dialog xs:!min-w-[450px] xs:!max-w-[450px]"
      contentClassName="h-[450px] flex-grow overflow-auto px-5 py-3 xs:p-6"
    >
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="size-6 text-primary" />
        </div>
      ) : (
        <div className="join-to-repo-request-list flex flex-col gap-3">
          {requests?.pages.map((page) => {
            return page.total ? (
              page.list.map((request) => {
                return (
                  <div
                    key={request.id}
                    className="request-item flex items-center justify-between rounded-lg border-[1px] border-normal p-4"
                  >
                    <div className="flex flex-grow gap-1">
                      <span
                        className="label_l2 w-auto max-w-[50px] cursor-pointer truncate text-primary_normal xs:max-w-[90px]"
                        title={request.repoName}
                      >
                        {request.repoName}
                      </span>
                      <ChipMolecule
                        className="label_l4 h-5 bg-primary-light px-2 !text-primary"
                        value={translateRoles(request.role)}
                      />
                    </div>
                    <RequestMenu
                      request={request}
                      setAcceptedRepo={setAcceptedRepo}
                    />
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
    </InfoDialog>
  );
};

export default UserJoinToRepoRequests;