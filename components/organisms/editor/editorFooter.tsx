import React, { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Typography } from "@material-tailwind/react";
import {
  editorDataAtom,
  editorModalAtom,
  editorModeAtom,
  editorPublicKeyAtom,
} from "@atom/editor";
import { selectedVersionAtom, versionModalListAtom } from "@atom/version";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import CancelButton from "@components/atoms/button/cancelButton";
import { ChevronLeftIcon } from "@components/atoms/icons";
import { EDocumentTypes } from "@interface/enums";
import { IRemoteEditorRef } from "clasor-remote-editor";
import { IVersion } from "@interface/version.interface";
import LoadingButton from "@components/molecules/loadingButton";
import forge from "node-forge";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import { translateVersionStatus } from "@utils/index";
import useSaveEditor from "@hooks/editor/useSaveEditor";
import EditorFileFooter from "./editorFileFooter";

export interface IProps {
  editorRef: React.RefObject<IRemoteEditorRef>;
}

const EditorFooter = ({ editorRef }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const selectedDocument = useRecoilValue(selectedDocumentAtom);
  const [editorMode, setEditorMode] = useRecoilState(editorModeAtom);
  const [getVersionData, setVersionData] = useRecoilState(editorDataAtom);
  const setVersion = useSetRecoilState(selectedVersionAtom);
  const setVersionModalList = useSetRecoilState(versionModalListAtom);
  const key = useRecoilValue(editorPublicKeyAtom);
  const setEditorModal = useSetRecoilState(editorModalAtom);

  const [checked, setChecked] = useState(false);
  const autoSaveRef = useRef<Worker>();
  const saveBtnRef = useRef<HTMLButtonElement | null>(null);

  const timeout = 5 * 60; // seconds
  const saveEditorHook = useSaveEditor();

  const renderTitle = () => {
    if (!getVersionData) {
      return "_";
    }
    if (editorMode === "preview") {
      return `${getVersionData.versionNumber}
      ${` (${
        translateVersionStatus(getVersionData.status, getVersionData.state)
          .translated
      } ${getVersionData.status === "accepted" ? "-عمومی" : ""})`}`;
    }

    return `${getVersionData.versionNumber} (پیش نویس)`;
  };

  const handleChangeEditorMode = () => {
    if (getVersionData?.id) {
      const item = {
        ...getVersionData,
        id: getVersionData.draftId ?? getVersionData.id,
        state: "draft",
      } as IVersion;
      setVersionData(item);
      setVersion(item);
    }
    setEditorMode(editorMode === "edit" ? "preview" : "edit");
    if (
      selectedDocument?.contentType === EDocumentTypes.word ||
      selectedDocument?.contentType === EDocumentTypes.flowchart ||
      selectedDocument?.contentType === EDocumentTypes.classic ||
      selectedDocument?.contentType === EDocumentTypes.latex
    ) {
      editorRef.current?.setMode(editorMode === "edit" ? "preview" : "edit");
    }
  };

  const encryptData = (content: string) => {
    if (!key) return;

    const publicKey = forge.pki.publicKeyFromPem(key);

    return forge.util.encode64(
      publicKey.encrypt(forge.util.encodeUtf8(content), "RSA-OAEP", {
        md: forge.md.sha256.create(),
      })
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = (data: any) => {
    let encryptedContent: string | null = null;
    const content: string =
      selectedDocument?.contentType === EDocumentTypes.classic
        ? data?.content
        : data;

    if (selectedDocument?.publicKeyId) {
      encryptedContent = encryptData(content) as string;
    }

    if (getVersionData && selectedDocument && getRepo) {
      saveEditorHook.mutate({
        content: selectedDocument?.publicKeyId
          ? (encryptedContent as string)
          : content,
        outline:
          selectedDocument?.contentType === EDocumentTypes.classic
            ? data?.outline
            : "[]",
        repoId: getRepo.id,
        documentId: selectedDocument.id,
        versionId: getVersionData.id,
        versionNumber: getVersionData.versionNumber,
        callBack: () => {
          toast.success("تغییرات با موفقیت ذخیره شد.");
        },
      });
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
          if (action[0] === "WORKER_SAVE_DATA" && !saveEditorHook.isPending) {
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

  if (selectedDocument?.contentType === EDocumentTypes.file) {
    return <EditorFileFooter />;
  }

  return editorMode === "preview" ? (
    <div className="w-full flex justify-between items-center gap-2">
      <Button
        className="w-full xs:w-[208px] lowercase rounded-lg pr-3 pl-2 border-[1px] border-normal bg-transparent flex justify-between items-center"
        title={renderTitle()}
        onClick={() => {
          setVersionModalList(true);
          setEditorModal(false);
        }}
      >
        <Typography className="label_l3 text-primary">
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
            setEditorModal(false);
          }}
        >
          <Typography className="label_l3 text-primary">
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
            editorRef.current?.setMode(
              editorMode === "edit" ? "temporaryPreview" : "edit"
            );
            setEditorMode(editorMode === "edit" ? "temporaryPreview" : "edit");
          }}
          className="!h-12 md:!h-8 !w-[50%] md:!w-[100px]"
          disabled={saveEditorHook.isPending}
        >
          {editorMode === "temporaryPreview" ? "ویرایش" : "پیش نمایش"}
        </CancelButton>
        <LoadingButton
          className="!h-12 md:!h-8 !w-[50%] md:!w-[100px] bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
          onClick={async () => {
            const value = await editorRef.current?.getData();
            if (value) {
              handleSave(value);
            }
          }}
          disabled={saveEditorHook.isPending}
        >
          <Typography className="text__label__button text-white">
            ذخیره
          </Typography>
        </LoadingButton>
      </div>
    </div>
  );
};

export default EditorFooter;
