"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import BackButton from "@components/atoms/button/backButton";
import CloseButton from "@components/atoms/button/closeButton";
import { cn } from "@/utils/cn";

export interface IProps {
  isPending?: boolean;
  children: React.ReactNode;
  trigger: React.ReactNode;
  dialogHeader: string;
  className?: string;
  contentClassName?: string;
  dialogCloseClassName?: string;
  dialogBackButtonClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  backToMain?: boolean;
}

const InfoDialog = ({
  children,
  trigger,
  dialogHeader,
  className,
  contentClassName,
  open,
  onOpenChange,
  backToMain,
  isPending = false,
  dialogCloseClassName,
  dialogBackButtonClassName,
}: IProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={cn(
          "[&>button]:hidden",
          "m-0 flex h-dvh w-full max-w-full flex-col gap-0 rounded-none border-none bg-white p-0",
          "xs:h-auto xs:min-w-[400px] xs:max-w-[400px] xs:rounded-lg xs:border xs:border-normal",
          "grid-rows-[auto_auto_1fr]",
          className,
        )}
        onInteractOutside={(e) => {
          if (isPending) e.preventDefault();
        }}
      >
        <DialogHeader
          className={cn(
            "dialog-header border-b-none flex flex-row items-center gap-[10px] space-y-0 border-normal px-[6px] py-[6px]",
            "xs:justify-between xs:gap-0 xs:border-b-[0.5px] xs:px-6 xs:py-5",
            "shrink-0",
          )}
        >
          <div className="flex items-center">
            {backToMain ? (
              <div className={cn("block xs:hidden", dialogBackButtonClassName)}>
                <DialogClose asChild>
                  <BackButton variant="ghost" size="icon" disabled={isPending} />
                </DialogClose>
              </div>
            ) : null}
            <DialogTitle className="form__title m-0 text-right text-base font-semibold">
              {dialogHeader}
            </DialogTitle>
          </div>
          <div className={cn("hidden xs:block", dialogCloseClassName)}>
            <DialogClose asChild>
              <CloseButton variant="clasorPrimary" size="icon" disabled={isPending} />
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="block h-2 w-full shrink-0 bg-secondary xs:hidden" />
        <div className={cn("min-h-0 flex-1 overflow-auto px-5 py-3 xs:p-6", contentClassName)}>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
