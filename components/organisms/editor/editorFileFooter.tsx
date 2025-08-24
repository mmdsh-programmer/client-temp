import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEditorStore } from "@store/editor";
import { useVersionStore } from "@store/version";
import CancelButton from "@components/atoms/button/cancelButton";
import Checkbox from "@components/atoms/checkbox";
import { ChevronLeftIcon } from "@components/atoms/icons";
import { IVersion } from "@interface/version.interface";
import LoadingButton from "@components/molecules/loadingButton";
import { toast } from "react-toastify";
import { translateVersionStatus } from "@utils/index";
import useGetUser from "@hooks/auth/useGetUser";
import useRepoId from "@hooks/custom/useRepoId";
import useSaveFileEditor from "@hooks/editor/useSaveFileEditor";
import { useDocumentStore } from "@store/document";
import { useFileStore } from "@store/file";

const EditorFileFooter = () => {
  const repoId = useRepoId();
  const { selectedDocument } = useDocumentStore();
  const { editorMode, setEditorMode, editorData: getEditorData, setEditorData } = useEditorStore();
  const { setSelectedVersion: setVersion, setVersionModalList } = useVersionStore();
  const { selectedFile: getSelectedFile } = useFileStore();

  const [checked, setChecked] = useState(false);
  const autoSaveRef = useRef<Worker>();
  const saveBtnRef = useRef<HTMLButtonElement | null>(null);

  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const timeout = 5 * 60; // seconds

  const { data: userInfo } = useGetUser();
  const saveFileEditorHook = useSaveFileEditor();

  const renderTitle = () => {
    if (!getEditorData) {
      return "_";
    }
    if (editorMode === "preview") {
      return `${getEditorData.versionNumber}
      ${` (${translateVersionStatus(getEditorData.status, getEditorData.state).translated
        } ${getEditorData.status === "accepted" ? "-عمومی" : ""})`}`;
    }

    return `${getEditorData.versionNumber} (پیش نویس)`;
  };

  const handleChangeEditorMode = () => {
    if (getEditorData?.id) {
      const item = {
        ...getEditorData,
        id: getEditorData.draftId ?? getEditorData.id,
        state: "draft",
      } as IVersion;

      setVersion(item);
      setEditorData(item);
    }
    setEditorMode(editorMode === "edit" ? "preview" : "edit");
  };

  const handleSave = () => {
    if (getEditorData && selectedDocument && repoId) {
      if (getSelectedFile) {
        const { name, hash, extension } = getSelectedFile;
        const fileHash = {
          hash,
          fileName: name,
          fileExtension: extension,
        };
        saveFileEditorHook.mutate({
          fileHash,
          repoId,
          documentId: selectedDocument.id,
          versionId: getEditorData.id,
          versionNumber: getEditorData.versionNumber,
          isDirectAccess:
            currentPath === "/admin/sharedDocuments" ||
              (currentPath === "/admin/dashboard" &&
                userInfo?.repository.id !== selectedDocument?.repoId) ||
              sharedDocuments === "true"
              ? true
              : undefined,
          onSuccessHandler: () => { 
              toast.success("نسخه مورد نظر با موفقیت به روزرسانی شد.");
          },
        });
      } else {
        toast.error("تغییری در فایل وجود ندارد.");
      }
    }
  };

  const startWorker = (time?: number) => {
    if (!autoSaveRef.current) {
      autoSaveRef.current = new Worker(
        new URL("../../../hooks/worker/autoSave.worker.ts", import.meta.url),
      );

      autoSaveRef.current?.postMessage({ action: "START", time });
      if (autoSaveRef.current) {
        autoSaveRef.current.onmessage = (event) => {
          const action = (event.data as string[]) || [];
          if (action[0] === "WORKER_SAVE_DATA" && !saveFileEditorHook.isPending) {
            saveBtnRef.current?.click();
          }
        };
      }
    }
  };

  const stopWorker = () => {
    autoSaveRef.current?.postMessage({ action: "STOP" });
    autoSaveRef.current?.terminate();
    autoSaveRef.current = undefined;
  };

  const handleAutoSaveCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      startWorker(timeout);
    } else {
      stopWorker();
    }
    setChecked(event.target.checked);
  };

  useEffect(() => {
    return () => {
      stopWorker();
    };
  }, []);

  return editorMode === "preview" ? (
    <div className="flex w-full items-center justify-between gap-2">
      <Button
        className="flex w-full items-center justify-between rounded-lg border-[1px] border-normal bg-transparent pl-2 pr-3 lowercase xs:w-[208px]"
        title={renderTitle()}
        onClick={() => {
          setVersionModalList(true);
        }}
      >
        <Typography className="label_l3 text-primary_normal">{renderTitle()}</Typography>
        <ChevronLeftIcon className="h-2.5 w-2.5 -rotate-90 stroke-icon-active" />
      </Button>
      <CancelButton onClick={handleChangeEditorMode}>ویرایش</CancelButton>
    </div>
  ) : (
    <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
      <div className="flex w-full flex-col gap-5 md:w-auto xs:flex-row xs:gap-4">
        <Button
          className="flex w-full items-center justify-between rounded-lg border-[1px] border-normal bg-transparent pl-2 pr-3 lowercase md:w-[208px] xs:w-[50%]"
          title={renderTitle()}
          onClick={() => {
            setVersionModalList(true);
          }}
        >
          <Typography className="label_l3 text-primary_normal">{renderTitle()}</Typography>
          <ChevronLeftIcon className="h-2.5 w-2.5 -rotate-90 stroke-icon-active" />
        </Button>
        <div className="!hidden border-r-[1px] border-r-normal xs:!block" />
        <Checkbox
          label="ذخیره‌سازی خودکار"
          className=""
          checked={checked}
          onChange={handleAutoSaveCheckbox}
        />
      </div>
      <div className="flex w-full gap-2 md:w-auto xs:gap-3">
        <CancelButton
          onClick={() => {
            setEditorMode(editorMode === "edit" ? "temporaryPreview" : "edit");
          }}
          className="!h-12 !w-[50%] md:!h-8 md:!w-[100px]"
          disabled={saveFileEditorHook.isPending}
        >
          {editorMode === "temporaryPreview" ? "ویرایش" : "پیش نمایش"}
        </CancelButton>
        <LoadingButton
          className="!h-12 !w-[50%] bg-primary-normal hover:bg-primary-normal active:bg-primary-normal md:!h-8 md:!w-[100px]"
          onClick={async () => {
            return handleSave();
          }}
          disabled={saveFileEditorHook.isPending}
        >
          <Typography className="text__label__button text-white">ذخیره</Typography>
        </LoadingButton>
      </div>
    </div>
  );
};

export default EditorFileFooter;
