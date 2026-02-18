"use client";

import React from "react";
import CreateDialog from "@components/templates/dialog/createDialog";
import { Input } from "@components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useCreateRootBranch from "@hooks/branch/useCreateRootBranch";
import useCreateSubBranch from "@hooks/branch/useCreateSubBranch";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBranchSchema } from "./validation.yup";
import { useBranchStore } from "@store/branch";

interface IForm {
  name: string;
  repoType: string;
  username: string;
}

interface IProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const BranchCreateDialog = ({ open, onOpenChange, trigger, setOpen }: IProps) => {
  const { branchId: getBranchId } = useBranchStore();

  const createRootBranch = useCreateRootBranch();
  const createSubBranch = useCreateSubBranch();

  const form = useForm<IForm>({
    resolver: yupResolver(createBranchSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = form;

  const handleClose = () => {
    reset();
    if (onOpenChange) onOpenChange(false);
    if (setOpen) setOpen(false);
  };

  const onSubmit = async (dataForm: IForm) => {
    const payload = {
      name: dataForm.name,
      repoType: dataForm.repoType,
      username: dataForm.username,
      callBack: () => {
        toast.success(
          getBranchId
            ? `زیرشعبه ${dataForm.name} با موفقیت ساخته شد.`
            : `شعبه ${dataForm.name} با موفقیت ساخته شد.`
        );
        handleClose();
      },
    };

    if (getBranchId) {
      createSubBranch.mutate({ ...payload, branchId: getBranchId });
    } else {
      createRootBranch.mutate(payload);
    }
  };

  return (
    <CreateDialog
      isPending={createRootBranch.isPending || createSubBranch.isPending}
      dialogHeader={getBranchId ? "ساخت زیرشعبه" : " ساخت شعبه"}
      onSubmit={handleSubmit(onSubmit)}
      open={open}
      onOpenChange={(val) => {
        if (!val) handleClose();
        else if (onOpenChange) onOpenChange(val);
      }}
      trigger={trigger}
      disabled={!isValid}
    >
      <Form {...form}>
        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="form_label">نام شعبه</FormLabel>
                <FormControl>
                  <Input placeholder="نام شعبه" {...field} />
                </FormControl>
                <FormMessage className="warning_text" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="repoType"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="form_label">نوع شعبه</FormLabel>
                <FormControl>
                  <Input placeholder="نوع شعبه" {...field} />
                </FormControl>
                <FormMessage className="warning_text" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="form_label">مالک</FormLabel>
                <FormControl>
                  <Input placeholder="مالک شعبه" {...field} />
                </FormControl>
                <FormMessage className="warning_text" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </CreateDialog>
  );
};

export default BranchCreateDialog;