"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import BackButton from "@components/atoms/button/backButton";
import CloseButton from "@components/atoms/button/closeButton";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@components/ui/spinner";
import { cn } from "@utils/cn";

export interface IProps {
  isPending: boolean;
  children: React.ReactNode;
  dialogHeader: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: React.ReactNode;
  onSubmit: () => Promise<void> | void;
  className?: string;
  backToMain?: boolean;
  showFooter?: boolean;
  disabled?: boolean;
}

const CreateDialog = ({
  isPending,
  children,
  dialogHeader,
  open,
  onOpenChange,
  trigger,
  onSubmit,
  className,
  backToMain,
  showFooter = true,
  disabled,
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
            "dialog-header border-b-none flex flex-row items-center gap-[10px] space-y-0 border-normal px-[6px] py-[6px]",
            "xs:justify-between xs:gap-0 xs:border-b-[0.5px] xs:px-6 xs:py-5",
            "shrink-0",
          )}
        >
          <div className="flex items-center">
            {backToMain ? (
              <div className="block xs:hidden">
                <DialogClose asChild>
                  <BackButton variant="ghost" size="icon" disabled={isPending} />
                </DialogClose>
              </div>
            ) : null}
            <DialogTitle className="form__title m-0 text-right text-base font-semibold">
              {dialogHeader}
            </DialogTitle>
          </div>
          <div className="hidden xs:block">
            <DialogClose asChild>
              <CloseButton variant="clasorPrimary" size="icon" disabled={isPending} />
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="block h-2 w-full shrink-0 bg-secondary xs:hidden" />

        <div className="dialog-body min-h-0 flex-1 overflow-auto px-5 py-3 xs:p-6">{children}</div>

        <RenderIf isTrue={showFooter}>
          <DialogFooter
            className={cn(
              "dialog-footer border-t-none flex flex-row items-center gap-2 border-normal p-5",
              "xs:gap-3 xs:border-t-[0.5px] xs:px-6 xs:py-4",
              "shrink-0",
            )}
          >
            <DialogClose asChild>
              <Button
                variant="outline"
                className="hover:bg-primary/10 w-full border-primary text-primary hover:text-primary xs:w-auto"
                disabled={isPending}
              >
                انصراف
              </Button>
            </DialogClose>
            <Button
              className="hover:bg-primary-normal/90 w-full min-w-[80px] bg-primary-normal text-white xs:w-auto"
              onClick={onSubmit}
              disabled={isPending || disabled}
            >
              {isPending ? <Spinner className="h-4 w-4 text-white" /> : "ایجاد"}
            </Button>
          </DialogFooter>
        </RenderIf>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
