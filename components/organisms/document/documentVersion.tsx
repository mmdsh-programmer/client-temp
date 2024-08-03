import React from "react";
import { EDocumentTypes } from "@interface/enums";
import { DialogBody, DialogFooter } from "@material-tailwind/react";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";
import { useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import { category } from "@atom/category";
import {
  documentInfo,
  documentKey,
  documentTemplate,
  documentType,
} from "@atom/document";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useCreateDocument from "@hooks/document/useCreateDocument";
import useCreateVersion from "@hooks/useCreateVersion";
import useCreateFileVersion from "@hooks/useCreateFileVersion";
import useCreateDocumentTemplate from "@hooks/document/useCreateDocumentTemplate";
import { IDocument } from "@interface/document.interface";
import Label from "@components/atoms/typograghy/label";
import FormInput from "@components/atoms/input/formInput";
import WarningText from "@components/atoms/typograghy/warningText";
import CancelButton from "@components/atoms/button/cancelButton";
import LoadingButton from "@components/molecules/loadingButton";
import Text from "@components/atoms/typograghy/text";

interface IProps {
  isTemplate: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IForm {
  versionNumber: string;
}

const DocumentVersion = ({ isTemplate, setOpen }: IProps) => {
  const { handlePrevStep, close } = useStepperNavigate();
  const getDocumentType = useRecoilValue(documentType);
  const getDocumentInfo = useRecoilValue(documentInfo);
  const getDocumentTemplate = useRecoilValue(documentTemplate);
  const getDocumentKey = useRecoilValue(documentKey);
  const getCategory = useRecoilValue(category);
  const getRepo = useRecoilValue(repoAtom);
  const createDocumentHook = useCreateDocument();
  const createVersionHook = useCreateVersion();
  const createFileVersionHook = useCreateFileVersion();
  const createDocFromTemplateHook = useCreateDocumentTemplate();

  const form = useForm<IForm>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (dataForm: IForm) => {
    if (!getDocumentType || !getDocumentInfo) {
      toast.error("نام و اطلاعات سند را وارد کنید");
      return;
    }

    if (!getRepo?.id) {
      toast.error("اطلاعات مخزن یافت نشد");
      return;
    }

    if (getDocumentTemplate) {
      createDocFromTemplateHook.mutate({
        repoId: getRepo.id,
        categoryId: getCategory?.id,
        title: getDocumentInfo.title,
        contentType: getDocumentType,
        description: getDocumentInfo.description,
        order: getDocumentInfo.order,
        versionNumber: dataForm.versionNumber,
        templateId: getDocumentTemplate.id,
        callBack: () => {
          toast.success("سند مورد نظر با موفقیت ایجاد گردید.");
          close();
          setOpen(false);
        },
      });
    } else {
      createDocumentHook.mutate({
        repoId: getRepo.id,
        categoryId: getCategory?.id,
        title: getDocumentInfo.title,
        description: getDocumentInfo.description,
        contentType: getDocumentType,
        isTemplate,
        order: getDocumentInfo.order,
        publicKeyId: getDocumentKey?.id ? String(getDocumentKey.id) : undefined,
        successCallBack: (result: IDocument) => {
          close();
          setOpen(false);
          if (getDocumentType !== EDocumentTypes.file) {
            createVersionHook.mutate({
              repoId: getRepo.id,
              documentId: result.id,
              content: "",
              outline: "",
              versionNumber: dataForm.versionNumber,
              callBack: () => {
                close();
                setOpen(false);
                toast.success("سند مورد نظر با موفقیت ایجاد گردید.");
              },
            });
          } else if (getDocumentType === EDocumentTypes.file) {
            createFileVersionHook.mutate({
              repoId: getRepo.id,
              documentId: result.id,
              versionNumber: dataForm.versionNumber,
              callBack: () => {
                close();
                setOpen(false);
                toast.success("سند مورد نظر با موفقیت ایجاد گردید.");
              },
            });
          }
        },
        errorCallBack: () => {
          close();
          setOpen(false);
        },
      });
    }
  };

  return (
    <>
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-6"
      >
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <Label>نام نسخه</Label>
            <FormInput
              className="w-full"
              placeholder="نام نسخه"
              register={{
                ...register("versionNumber", { required: true }),
              }}
            />
            {errors.versionNumber && (
              <WarningText>{errors.versionNumber?.message}</WarningText>
            )}
          </div>
        </form>
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <CancelButton onClick={handlePrevStep}>انصراف</CancelButton>
        <LoadingButton
          className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
          onClick={handleSubmit(onSubmit)}
        >
          <Text className="text-[12px] font-medium leading-[18px] -tracking-[0.12px] text-white">
            ایجاد
          </Text>
        </LoadingButton>
      </DialogFooter>
    </>
  );
};

export default DocumentVersion;
