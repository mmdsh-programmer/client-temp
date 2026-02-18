import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import BackButton from "@components/atoms/button/backButton";
import CancelButton from "@components/atoms/button/cancelButton";
import CloseButton from "@components/atoms/button/closeButton";
import LoadingButton from "@components/molecules/loadingButton";
import { cn } from "@/utils/cn";

export interface IProps {
  isPending?: boolean;
  children: React.ReactNode;
  trigger: React.ReactNode;
  dialogHeader: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit: () => Promise<void>;
  className?: string;
  disabled?: boolean;
  backToMain?: boolean;
  bodyClassName?: string;
}

const ConfirmFullHeightDialog = ({
  isPending,
  children,
  trigger,
  dialogHeader,
  open,
  onOpenChange,
  onSubmit,
  className,
  disabled,
  backToMain,
  bodyClassName,
}: IProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={cn(
          "[&>button]:hidden",
          "m-0 flex h-dvh w-full max-w-full flex-col gap-0 rounded-none border-none bg-white p-0",
          "xs:h-auto xs:min-w-[400px] xs:max-w-[400px] xs:rounded-lg xs:border xs:border-normal",
          "grid-rows-[auto_auto_1fr_auto]",
          className,
        )}
        onInteractOutside={(e) => {
          if (isPending) e.preventDefault();
        }}
      >
        <DialogHeader
          className={cn(
            "dialog-header flex flex-row items-center gap-[10px] space-y-0 border-b-0 border-normal px-[6px] py-[6px]",
            "xs:justify-between xs:gap-0 xs:border-b-[0.5px] xs:px-6 xs:py-5",
            "shrink-0",
          )}
        >
          <div className="block xs:hidden">
            <DialogClose asChild>
              <BackButton disabled={isPending} />
            </DialogClose>
          </div>
          <div className="flex items-center">
            {backToMain ? (
              <div className="hidden xs:block">
                <DialogClose asChild>
                  <BackButton className="!py-0 !pl-2 !pr-0" disabled={isPending} />
                </DialogClose>
              </div>
            ) : null}
            <DialogTitle className="form__title m-0 text-right text-base font-semibold">
              {dialogHeader}
            </DialogTitle>
          </div>
          <div className="hidden xs:block">
            <DialogClose asChild>
              <CloseButton disabled={isPending} />
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="block h-2 w-full shrink-0 bg-secondary xs:hidden" />

        <div
          className={cn("dialog-body min-h-0 flex-1 overflow-auto px-5 py-3 xs:p-6", bodyClassName)}
        >
          {children}
        </div>

        <DialogFooter
          className={cn(
            "dialog-footer gap-2 flex flex-row items-center border-t-0 border-normal p-5",
            "xs:justify-end xs:border-t-[0.5px] xs:px-6 xs:py-4",
            "shrink-0",
          )}
        >
          <DialogClose asChild>
            <CancelButton className="flex-1 xs:flex-none" disabled={isPending}>انصراف</CancelButton>
          </DialogClose>
          <LoadingButton
            className="dialog-footer__submit-button min-w-[100px] flex-1 xs:flex-none bg-primary-normal hover:bg-primary-normal active:bg-primary-normal"
            onClick={onSubmit}
            loading={isPending}
            disabled={disabled}
          >
            <span className="text__label__button text-white">تایید</span>
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmFullHeightDialog;
