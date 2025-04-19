import { Button, Spinner, Typography } from "@material-tailwind/react";

import { IAccessRequest } from "@interface/accessRequest.interface";
import React from "react";
import { toast } from "react-toastify";
import useAcceptJoinToRepoRequest from "@hooks/requests/useAcceptJoinToRepoRequest";
import useRejectJoinToRepoRequest from "@hooks/requests/useRejectJoinToRepoRequest";

interface IProps {
  request: IAccessRequest;
}

const RequestMenu = ({ request }: IProps) => {
  const acceptRequest = useAcceptJoinToRepoRequest();
  const rejectRequest = useRejectJoinToRepoRequest();

  const handleAcceptRequest = () => {
    acceptRequest.mutate({
      requestId: request.id,
      callBack: () => {
        toast.success(`با موفقیت به مخزن ${request.repoName} اضافه شدید.`);
      },
    });
  };
  const handleRejectRequest = () => {
    rejectRequest.mutate({
      requestId: request.id,
      callBack: () => {
        toast.success(`درخواست پیوستن به مخزن ${request.repoName} رد شد`);
      },
    });
  };

  return (
    <div className="request-menu flex gap-3">
      {acceptRequest.isPending || rejectRequest.isPending ? (
        <Spinner className="h-5 w-5" color="deep-purple" />
      ) : (
        <>
          <Button
            className="request-menu__reject-button w-16 xs:w-20 h-8 hover:bg-gray-50 bg-gray-50 "
            onClick={handleRejectRequest}
          >
            <Typography className="text__label__button text-primary_normal">
              ردکردن
            </Typography>
          </Button>
          <Button
            className="request-menu__accept-button w-16 xs:w-20 h-8 bg-secondary hover:bg-secondary active:bg-secondary"
            onClick={handleAcceptRequest}
          >
            <Typography className="text__label__button text-white">
              تایید
            </Typography>
          </Button>
        </>
      )}
    </div>
  );
};

export default RequestMenu;
