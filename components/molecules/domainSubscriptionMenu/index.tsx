import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { IDomainSubscription } from "@interface/domain.interface";
import LoadingButton from "../loadingButton";
import { toast } from "react-toastify";
import useAcceptSubscription from "@hooks/domainSubscription/useAcceptSubscription";
import useRejectSubscription from "@hooks/domainSubscription/useRejectSubscription";

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
        toast.success("درخواست رد شد");
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
          className="flex h-12 w-[50%] items-center justify-center gap-2 rounded-lg bg-primary-normal px-3 hover:bg-primary-normal xs:h-8 xs:w-[100px] xs:px-1"
          disabled
          {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
        >
          <Typography
            placeholder=""
            className="text__label__button text-white"
            {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            تاییدشده
          </Typography>
        </Button>
      );
    }
    return (
      <Button
        placeholder=""
        variant="text"
        className="flex h-12 w-[50%] items-center justify-center gap-2 rounded-lg bg-red-300 px-3 hover:bg-red-300 xs:h-8 xs:w-[100px] xs:px-1"
        disabled
        {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
      >
        <Typography
          placeholder=""
          className="text__label__button text-error"
          {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
        >
          ردشده
        </Typography>
      </Button>
    );
  };

  return request.status === "pending" ? (
    <div className="flex items-center gap-2">
      <LoadingButton
        className="bg-gray-50 hover:bg-gray-50"
        onClick={handleReject}
        loading={rejectRequest.isPending}
      >
        <Typography
          placeholder=""
          className="text__label__button text-primary_normal"
          {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
        >
          ردکردن
        </Typography>
      </LoadingButton>
      <LoadingButton
        className="bg-primary-normal hover:bg-primary-normal active:bg-primary-normal"
        onClick={handleAccept}
        loading={acceptRequest.isPending}
      >
        <Typography
          placeholder=""
          className="text__label__button text-white"
          {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
        >
          تایید
        </Typography>
      </LoadingButton>
    </div>
  ) : (
    renderContent()
  );
};

export default DomainSubscriptionMenu;
