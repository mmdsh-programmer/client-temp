import { Button, Checkbox, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { editorDataAtom, editorModeAtom } from "@atom/editor";
import { selectedVersionAtom, versionModalListAtom } from "@atom/version";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import CancelButton from "@components/atoms/button/cancelButton";
import { ChevronLeftIcon } from "@components/atoms/icons";
import { IVersion } from "@interface/version.interface";
import LoadingButton from "@components/molecules/loadingButton";
import { selectedDocumentAtom } from "@atom/document";
import { selectedFileAtom } from "@atom/file";
import { toast } from "react-toastify";
import { translateVersionStatus } from "@utils/index";
import { usePathname } from "next/navigation";
import useRepoId from "@hooks/custom/useRepoId";
import useSaveFileEditor from "@hooks/editor/useSaveFileEditor";

const EditorFileFooter = () => {
  const repoId = useRepoId();
  const selectedDocument = useRecoilValue(selectedDocumentAtom);
  const [editorMode, setEditorMode] = useRecoilState(editorModeAtom);
  const [getEditorData, setEditorData] = useRecoilState(editorDataAtom);
  const setVersion = useSetRecoilState(selectedVersionAtom);
  const setVersionModalList = useSetRecoilState(versionModalListAtom);
  const getSelectedFile = useRecoilValue(selectedFileAtom);

  const [checked, setChecked] = useState(false);
  const autoSaveRef = useRef<Worker>();
  const saveBtnRef = useRef<HTMLButtonElement | null>(null);

  const currentPath = usePathname();

  const timeout = 5 * 60; // seconds

  const saveFileEditorHook = useSaveFileEditor();

  const renderTitle = () => {
    if (!getEditorData) {
      return "_";
    }
    if (editorMode === "preview") {
      return `${getEditorData.versionNumber}
      ${` (${
        translateVersionStatus(getEditorData.status, getEditorData.state)
          .translated
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
          currentPath === "/admin/sharedDocuments" ? true : undefined,    
          callBack: () => {},
        });
      } else {
        toast.error("تغییری در فایل وجود ندارد.");
      }
    }
  };

  const startWorker = (time?: number) => {
    if (!autoSaveRef.current) {
      autoSaveRef.current = new Worker(
        new URL("../../../hooks/worker/autoSave.worker.ts", import.meta.url)
      );

      autoSaveRef.current?.postMessage({ action: "START", time });
      if (autoSaveRef.current) {
        autoSaveRef.current.onmessage = (event) => {
          const action = (event.data as string[]) || [];
          if (
            action[0] === "WORKER_SAVE_DATA" &&
            !saveFileEditorHook.isPending
          ) {
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

  const handleAutoSaveCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    <div className="w-full flex justify-between items-center gap-2">
      <Button
        className="w-full xs:w-[208px] lowercase rounded-lg pr-3 pl-2 border-[1px] border-normal bg-transparent flex justify-between items-center"
        title={renderTitle()}
        onClick={() => {
          setVersionModalList(true);
        }}
      >
        <Typography className="label_l3 text-primary_normal">
          {renderTitle()}
        </Typography>
        <ChevronLeftIcon className="-rotate-90 w-2.5 h-2.5 stroke-icon-active" />
      </Button>
      <CancelButton onClick={handleChangeEditorMode}>ویرایش</CancelButton>
    </div>
  ) : (
    <div className="w-full flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="w-full md:w-auto flex flex-col xs:flex-row gap-5 xs:gap-4">
        <Button
          className="w-full xs:w-[50%] md:w-[208px] lowercase rounded-lg pr-3 pl-2 border-[1px] border-normal bg-transparent flex justify-between items-center"
          title={renderTitle()}
          onClick={() => {
            setVersionModalList(true);
          }}
        >
          <Typography className="label_l3 text-primary_normal">
            {renderTitle()}
          </Typography>
          <ChevronLeftIcon className="-rotate-90 w-2.5 h-2.5 stroke-icon-active" />
        </Button>
        <div className="!hidden xs:!block border-r-[1px] border-r-normal" />
        <Checkbox
          crossOrigin=""
          label={
            <Typography className="title_t3 truncate">
              ذخیره‌سازی خودکار
            </Typography>
          }
          className=""
          color="deep-purple"
          checked={checked}
          onChange={handleAutoSaveCheckbox}
          containerProps={{ className: "-mr-3 " }}
        />
      </div>
      <div className="flex w-full md:w-auto gap-2 xs:gap-3">
        <CancelButton
          onClick={() => {
            setEditorMode(editorMode === "edit" ? "temporaryPreview" : "edit");
          }}
          className="!h-12 md:!h-8 !w-[50%] md:!w-[100px]"
          disabled={saveFileEditorHook.isPending}
        >
          {editorMode === "temporaryPreview" ? "ویرایش" : "پیش نمایش"}
        </CancelButton>
        <LoadingButton
          className="!h-12 md:!h-8 !w-[50%] md:!w-[100px] bg-secondary hover:bg-secondary active:bg-secondary"
          onClick={async () => {
            return handleSave();
          }}
          disabled={saveFileEditorHook.isPending}
        >
          <Typography className="text__label__button text-white">
            ذخیره
          </Typography>
        </LoadingButton>
      </div>
    </div>
  );
};

export default EditorFileFooter;
