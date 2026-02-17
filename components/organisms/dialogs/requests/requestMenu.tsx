import React from "react";
import { Button } from "@components/ui/button";
import { Spinner } from "@components/ui/spinner";
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
        <Spinner className="size-5 text-primary" />
      ) : (
        <>
          <Button
            className="request-menu__reject-button h-8 w-16 bg-gray-50 hover:bg-gray-50 xs:w-20"
            onClick={handleRejectRequest}
            variant="ghost"
          >
            <span className="text__label__button text-primary_normal">ردکردن</span>
          </Button>
          <Button
            className="request-menu__accept-button h-8 w-16 bg-primary-normal hover:bg-primary-normal active:bg-primary-normal xs:w-20"
            onClick={handleAcceptRequest}
          >
            <span className="text__label__button text-white">تایید</span>
          </Button>
        </>
      )}
    </div>
  );
};

export default RequestMenu;
