"use client";

import React from "react";
import {
  Dialog,
  DialogFooter,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import LoadingButton from "@components/molecules/loadingButton";
import Title from "@components/atoms/typograghy/title";
import CloseButton from "@components/atoms/button/closeButton";
import CancelButton from "@components/atoms/button/cancelButton";

interface IProps {
  isPending: boolean;
  children: React.ReactNode;
  dialogHeader?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => Promise<void>;
  className?: string;
  isDelete?: boolean;
}

const DialogOrganism = ({
  isPending,
  children,
  dialogHeader,
  setOpen,
  onSubmit,
  className,
  isDelete,
}: IProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      placeholder=""
      size="sm"
      open={true}
      handler={handleClose}
      className={`${className} xs:max-h-[600px] xs:max-w-[66%] md-max-w-[40%] p-5 !rounded-none xs:!rounded-lg flex flex-col`}
    >
      <DialogHeader
        placeholder="dialog header"
        className="flex items-center justify-between p-0"
      >
        <Title>{dialogHeader}</Title>
        <CloseButton onClose={handleClose} disabled={isPending} />
      </DialogHeader>
      <DialogBody placeholder="dialog body" className="flex-grow p-0 mt-[30px]">
        {children}
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="p-0 flex gap-2.5 mt-[30px]"
      >
        <CancelButton onClick={handleClose} disabled={isPending}>
          انصراف
        </CancelButton>
        <LoadingButton
          className={`${isDelete ? "bg-error" : "bg-purple-normal"}  flex justify-center items-center rounded-lg px-4 py-3 text-[13px] text-white font-iranYekan w-[100px]`}
          onClick={onSubmit}
          loading={isPending}
        >
          تایید
        </LoadingButton>
      </DialogFooter>
    </Dialog>
  );
};

export default DialogOrganism;
