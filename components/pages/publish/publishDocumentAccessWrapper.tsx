"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";
import useAddToWhiteListRequest from "@hooks/publish/useAddToWhiteListRequest";
import LoadingButton from "@components/molecules/loadingButton";
import { toast } from "react-toastify";

interface IProps {
  repoId: number;
  docId: number;
}

const PublishDocumentAccessWrapper = ({ repoId, docId }: IProps) => {
  const addToDocumentWhiteList = useAddToWhiteListRequest();

  const handleRequest = () => {
    addToDocumentWhiteList.mutate({
      repoId,
      docId,
      callBack: () => {
        toast.success("درخواست دسترسی به سند با موفقیت برای مدیر ارسال شد.");
      },
    });
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Typography
          {...({} as React.ComponentProps<typeof Typography>)}
          className="title_t2 text-primary_normal"
        >
          شما به این سند دسترسی ندارید. لطفا درخواست دسترسی دهید.
        </Typography>
        <LoadingButton
          className="!w-max whitespace-nowrap rounded-md bg-primary-normal !px-5 text-white shadow-lg hover:bg-primary-normal"
          onClick={handleRequest}
          loading={addToDocumentWhiteList.isPending}
          disabled={addToDocumentWhiteList.isPending}
        >
          درخواست دسترسی
        </LoadingButton>
      </div>
    </div>
  );
};

export default PublishDocumentAccessWrapper;
