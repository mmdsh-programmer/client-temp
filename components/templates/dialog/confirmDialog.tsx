import React from "react";
import {
  Dialog,
  DialogFooter,
  DialogBody,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import LoadingButton from "@components/molecules/loadingButton";
import Title from "@components/atoms/typograghy/title";
import CloseButton from "@components/atoms/button/closeButton";
import CancelButton from "@components/atoms/button/cancelButton";
import Text from "@components/atoms/typograghy/text";

interface IProps {
  isPending: boolean;
  children: React.ReactNode;
  dialogHeader?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => Promise<void>;
  className?: string;
}

const ConfirmDialog = ({
  isPending,
  children,
  dialogHeader,
  setOpen,
  onSubmit,
  className,
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
      className={`${className} rounded-lg flex flex-col shrink-0 bg-primary w-auto xs:min-w-[400px] xs:max-w-[400px] `}
    >
      <DialogHeader
        placeholder="dialog header"
        className="flex items-center justify-between px-5 pt-5 pb-4 xs:py-5 xs:px-6 border-b-none xs:border-b-[0.5px] border-normal"
      >
        <Title>{dialogHeader}</Title>
        <CloseButton onClose={handleClose} disabled={isPending} />
      </DialogHeader>
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-6"
      >
        <Text className="flex text-primary font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
          {children}
        </Text>
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <CancelButton onClick={handleClose} disabled={isPending}>
          انصراف
        </CancelButton>
        <LoadingButton
          className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
          onClick={onSubmit}
          loading={isPending}
        >
          <Text className="text-[12px] font-medium leading-[18px] -tracking-[0.12px] text-white">
            تایید
          </Text>
        </LoadingButton>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmDialog;
