import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Spinner } from "@components/atoms/spinner";
import { toast } from "react-toastify";
import { IDocumentWhiteListRequest } from "@interface/document.interface";
import useAcceptWhiteListRequest from "@hooks/document/useAcceptWhiteListRequest";
import useRejectWhiteListRequest from "@hooks/document/useRejectWhiteListRequest";

interface IProps {
  request: IDocumentWhiteListRequest;
}

const DocumentWhiteListMenu = ({ request }: IProps) => {
  const acceptRequest = useAcceptWhiteListRequest();
  const rejectRequest = useRejectWhiteListRequest();

  const handleAcceptRequest = () => {
    acceptRequest.mutate({
      repoId: request.repoId,
      documentId: request.documentId,
      requestId: request.id,
      callBack: () => {
        toast.success(`با موفقیت به سند ${request.documentName} اضافه شدید.`);
      },
    });
  };
  const handleRejectRequest = () => {
    rejectRequest.mutate({
      repoId: request.repoId,
      documentId: request.documentId,
      requestId: request.id,
      callBack: () => {
        toast.success(`درخواست دسترسی به سند ${request.documentName} رد شد`);
      },
    });
  };

  return (
    <div className="request-menu flex gap-3">
      {acceptRequest.isPending || rejectRequest.isPending ? (
        <Spinner className="h-5 w-5 text-primary" />
      ) : (
        <>
          <Button
            placeholder=""
            className="request-menu__reject-button h-8 w-16 bg-gray-50 hover:bg-gray-50 xs:w-20"
            onClick={handleRejectRequest}
            {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
          >
            <Typography
              placeholder=""
              className="text__label__button text-primary_normal"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              ردکردن
            </Typography>
          </Button>
          <Button
            placeholder=""
            className="request-menu__accept-button h-8 w-16 bg-primary-normal hover:bg-primary-normal active:bg-primary-normal xs:w-20"
            onClick={handleAcceptRequest}
            {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
          >
            <Typography
              placeholder=""
              className="text__label__button text-white"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              تایید
            </Typography>
          </Button>
        </>
      )}
    </div>
  );
};

export default DocumentWhiteListMenu;
