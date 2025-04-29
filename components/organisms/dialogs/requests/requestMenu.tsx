import React from "react";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import { IAccessRequest } from "@interface/accessRequest.interface";
import { toast } from "react-toastify";
import useAcceptJoinToRepoRequest from "@hooks/requests/useAcceptJoinToRepoRequest";
import useRejectJoinToRepoRequest from "@hooks/requests/useRejectJoinToRepoRequest";

interface IProps {
  request: IAccessRequest;
  setAcceptedRepo: React.Dispatch<React.SetStateAction<IAccessRequest | null>>;
}

const RequestMenu = ({ request, setAcceptedRepo }: IProps) => {
  const acceptRequest = useAcceptJoinToRepoRequest();
  const rejectRequest = useRejectJoinToRepoRequest();

  const handleAcceptRequest = () => {
    acceptRequest.mutate({
      requestId: request.id,
      callBack: () => {
        toast.success(`با موفقیت به مخزن ${request.repoName} اضافه شدید.`);
        setAcceptedRepo(request);
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
        <Spinner className="h-5 w-5" color="purple" />
      ) : (
        <>
          <Button
            className="request-menu__reject-button h-8 w-16 bg-gray-50 hover:bg-gray-50 xs:w-20 "
            onClick={handleRejectRequest}
          >
            <Typography className="text__label__button text-primary_normal">ردکردن</Typography>
          </Button>
          <Button
            className="request-menu__accept-button bg-primary-normal hover:bg-primary-normal active:bg-primary-normal h-8 w-16 xs:w-20"
            onClick={handleAcceptRequest}
          >
            <Typography className="text__label__button text-white">تایید</Typography>
          </Button>
        </>
      )}
    </div>
  );
};

export default RequestMenu;
