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
import Text from "@components/atoms/typograghy/text";
import BackButton from "@components/atoms/button/backButton";

interface IProps {
  isPending: boolean;
  children: React.ReactNode;
  dialogHeader?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => Promise<void>;
  className?: string;
  backToMain?: boolean;
}

const EditDialog = ({
  isPending,
  children,
  dialogHeader,
  setOpen,
  onSubmit,
  className,
  backToMain
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
      className={`${className} flex flex-col shrink-0 !h-full w-full max-w-full xs:!h-auto xs:min-w-[400px] xs:max-w-[400px] bg-primary rounded-none xs:rounded-lg `}
    >
      <DialogHeader
        placeholder="dialog header"
        className="flex items-center xs:justify-between gap-[10px] xs:gap-0 px-[6px] xs:px-6 py-[6px] xs:py-5 border-b-none xs:border-b-[0.5px] border-normal"
      >
        <div className="block xs:hidden">
          <BackButton onClick={handleClose} disabled={isPending} />
        </div>
        <div className="hidden xs:block">
          {backToMain ? (
            <BackButton onClick={handleClose} disabled={isPending} />
          ) : null}
        </div>
        <Title>{dialogHeader}</Title>
        <div className="hidden xs:block">
          <CloseButton onClose={handleClose} disabled={isPending} />
        </div>
      </DialogHeader>
      <div className="block xs:hidden h-2 w-full bg-secondary" />
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-6"
      >
        {children}
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
            ویرایش
          </Text>
        </LoadingButton>
      </DialogFooter>
    </Dialog>
  );
};

export default EditDialog;
