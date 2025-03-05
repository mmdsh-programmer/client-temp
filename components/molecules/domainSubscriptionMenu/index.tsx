import React from "react";
import { IDomainSubscription } from "@interface/domain.interface";
import LoadingButton from "../loadingButton";
import { Button, Typography } from "@material-tailwind/react";
import useRejectSubscription from "@hooks/domainSubscription/useRejectSubscription";
import useAcceptSubscription from "@hooks/domainSubscription/useAcceptSubscription";
import { toast } from "react-toastify";

interface IProps {
  request: IDomainSubscription;
}

const DomainSubscriptionMenu = ({ request }: IProps) => {
  const rejectRequest = useRejectSubscription();
  const acceptRequest = useAcceptSubscription();

  const handleReject = () => {
    rejectRequest.mutate({
      requestId: request.id,
      callBack: () => {
        toast.error("درخواست رد شد");
      },
    });
  };

  const handleAccept = () => {
    acceptRequest.mutate({
      requestId: request.id,
      callBack: () => {
        toast.success("درخواست تایید شد");
      },
    });
  };

  const renderContent = () => {
    if (request.status === "accepted") {
      return (
        <Button
          placeholder=""
          variant="text"
          className="bg-green-900 hover:bg-green-900 flex justify-center items-center gap-2 w-[50%] xs:w-[100px] h-12 xs:h-8 px-3 xs:px-1 rounded-lg"
          disabled
        >
          <Typography className="text__label__button text-white">
            تاییدشده
          </Typography>
        </Button>
      );
    }
    return (
      <Button
        placeholder=""
        variant="text"
        className="bg-red-300 hover:bg-red-300 flex justify-center items-center gap-2 w-[50%] xs:w-[100px] h-12 xs:h-8 px-3 xs:px-1 rounded-lg"
        disabled
      >
        <Typography className="text__label__button text-error">
          ردشده
        </Typography>
      </Button>
    );
  };

  return request.status === "pending" ? (
    <div className="flex gap-2 items-center">
      <LoadingButton
        className="bg-error opacity-40 hover:bg-error hover:opacity-40 active:opacity-40 active:bg-error"
        onClick={handleReject}
        loading={rejectRequest.isPending}
      >
        <Typography className="text__label__button text-error">
          رد درخواست
        </Typography>
      </LoadingButton>
      <LoadingButton
        className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
        onClick={handleAccept}
        loading={acceptRequest.isPending}
      >
        <Typography className="text__label__button text-white">
          تایید
        </Typography>
      </LoadingButton>
    </div>
  ) : (
    renderContent()
  );
};

export default DomainSubscriptionMenu;
