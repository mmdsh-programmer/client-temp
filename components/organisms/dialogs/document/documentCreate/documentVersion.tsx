import React from "react";
import { DialogBody, Typography } from "@material-tailwind/react";
import { categoryAtom, categoryShowAtom } from "@atom/category";
import {
  documentInfoAtom,
  documentKeyAtom,
  documentTemplateAtom,
  documentTypeAtom,
} from "@atom/document";
import DialogStepperFooter from "@components/molecules/stepperDialogFooter";
import { EDocumentTypes } from "@interface/enums";
import FormInput from "@components/atoms/input/formInput";
import { IDocument } from "@interface/document.interface";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useCreateDocument from "@hooks/document/useCreateDocument";
import useCreateDocumentTemplate from "@hooks/document/useCreateDocumentTemplate";
import useCreateFileVersion from "@hooks/version/useCreateFileVersion";
import useCreateVersion from "@hooks/version/useCreateVersion";
import { useForm } from "react-hook-form";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";
import { useRecoilValue } from "recoil";
import useStepperNavigate from "@hooks/custom/useStepperNavigate";
import forge from "node-forge";

interface IProps {
  isTemplate: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IForm {
  versionNumber: string;
}

const DocumentVersion = ({ isTemplate, setOpen }: IProps) => {
  const { handlePrevStep, close } = useStepperNavigate();
  const getDocumentType = useRecoilValue(documentTypeAtom);
  const getDocumentInfo = useRecoilValue(documentInfoAtom);
  const getDocumentTemplate = useRecoilValue(documentTemplateAtom);
  const getDocumentKey = useRecoilValue(documentKeyAtom);
  const getCategory = useRecoilValue(categoryAtom);
  const getCategoryShow = useRecoilValue(categoryShowAtom);
  const getRepo = useRecoilValue(repoAtom);
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const createDocumentHook = useCreateDocument();
  const createVersionHook = useCreateVersion();
  const createFileVersionHook = useCreateFileVersion();
  const createDocFromTemplateHook = useCreateDocumentTemplate();

  const form = useForm<IForm>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const repoId = currentPath === "/admin/myDocuments" ? userInfo!.repository.id : getRepo!.id;

  const onSubmit = (dataForm: IForm) => {
    if (!getDocumentType || !getDocumentInfo) {
      toast.error("نام و اطلاعات سند را وارد کنید");
      return;
    }

    if (!repoId) {
      toast.error("اطلاعات مخزن یافت نشد");
      return;
    }

    // eslint-disable-next-line no-useless-escape
    const forbiddenRegex = /^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$/;
    if (forbiddenRegex.test(getDocumentInfo.title)) {
      toast.error("نام سند شامل کاراکتر غیرمجاز است.");
      return;
    }

    if (getDocumentTemplate) {
      if (getDocumentType !== EDocumentTypes.classic) {
        toast.error("ساخت سند از روی نمونه سند فقط برای محتوای کلاسور امکان‌پذیر است.");
        return;
      }
      createDocFromTemplateHook.mutate({
        repoId,
        categoryId: getCategory?.id || getCategoryShow?.id || null,
        title: getDocumentInfo.title,
        contentType: getDocumentType,
        description: getDocumentInfo.description,
        order: getDocumentInfo.order || null,
        versionNumber: dataForm.versionNumber,
        templateId: getDocumentTemplate.id,
        publicKeyId: getDocumentKey?.id ? String(getDocumentKey.id) : undefined,
        callBack: () => {
          toast.success("سند مورد نظر با موفقیت ایجاد گردید.");
          setOpen(false);
          close();
        },
      });
    } else {
      const order = getDocumentInfo.order ? getDocumentInfo.order : null;
      createDocumentHook.mutate({
        repoId,
        categoryId: getCategory?.id || getCategoryShow?.id || null,
        title: getDocumentInfo.title,
        description: getDocumentInfo.description,
        contentType: getDocumentType,
        isTemplate,
        order,
        publicKeyId: getDocumentKey?.id ? String(getDocumentKey.id) : undefined,
        successCallBack: (result: IDocument) => {
          // eslint-disable-next-line no-useless-escape
          const invalidChar = /^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$/;
          if (invalidChar.test(dataForm.versionNumber)) {
            toast.error("نام نسخه شامل کاراکتر غیرمجاز است.");
            return;
          }
          if (getDocumentType !== EDocumentTypes.file) {
            const defaultContent = "<article class='clasor-editor-content'></article>";
            const encryptWithPublicKey = (content: string, publicKeyPem?: string) => {
              if (!publicKeyPem) return content;
              try {
                const aesKey = forge.random.getBytesSync(32);
                const cipher = forge.cipher.createCipher("AES-CBC", aesKey);
                const iv = forge.random.getBytesSync(16);
                cipher.start({ iv });
                cipher.update(forge.util.createBuffer(content, "utf8"));
                cipher.finish();
                const encryptedContent = cipher.output.getBytes();

                const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
                const encryptedKey = publicKey.encrypt(aesKey, "RSA-OAEP", {
                  md: forge.md.sha256.create(),
                });

                return JSON.stringify({
                  iv: forge.util.encode64(iv),
                  key: forge.util.encode64(encryptedKey),
                  content: forge.util.encode64(encryptedContent),
                });
              } catch (e) {
                console.error("Encrypt default content error:", e);
                return content;
              }
            };

            const initialContent = encryptWithPublicKey(defaultContent, getDocumentKey?.key);
            createVersionHook.mutate({
              repoId,
              documentId: result.id,
              content: initialContent,
              outline: "",
              versionNumber: dataForm.versionNumber,
              onSuccessHandler: () => {
                close();
                setOpen(false);
                toast.success("نسخه مورد نظر با موفقیت ایجاد گردید.");
              },
              onErrorHandler:() => {
                close();
                setOpen(false);
              },
            });
          } else {
            createFileVersionHook.mutate({
              repoId,
              documentId: result.id,
              versionNumber: dataForm.versionNumber,
              callBack: () => {
                close();
                setOpen(false);
                toast.success("نسخه مورد نظر با موفقیت ایجاد گردید.");
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

  const isLoading =
    createDocFromTemplateHook.isPending ||
    createDocumentHook.isPending ||
    createVersionHook.isPending ||
    createFileVersionHook.isPending;

  return (
    <>
      <DialogBody placeholder="dialog body" className="dialog-body flex-grow px-5 py-3 xs:p-6">
        <form
          className="document-version-form flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <Typography className="form_label">نام نسخه</Typography>
            <FormInput
              className="document-version-form__name w-full"
              placeholder="نام نسخه"
              register={{
                ...register("versionNumber", { required: true }),
              }}
            />
            {errors.versionNumber && (
              <Typography className="warning_text">{errors.versionNumber?.message}</Typography>
            )}
          </div>
        </form>
      </DialogBody>
      <DialogStepperFooter
        hasNextStep={false}
        hasPreviousStep
        handleNextStep={handleSubmit(onSubmit)}
        handlePreviousStep={handlePrevStep}
        loading={isLoading}
      />
    </>
  );
};

export default DocumentVersion;
