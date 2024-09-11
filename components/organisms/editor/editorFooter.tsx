import React, { useEffect, useRef, useState } from "react";
import {
  editorDataAtom,
  editorModeAtom,
  editorPublicKeyAtom,
  editorVersionAtom,
} from "@atom/editor";
import CancelButton from "@components/atoms/button/cancelButton";
import LoadingButton from "@components/molecules/loadingButton";
import useSaveEditor from "@hooks/editor/useSaveEditor";
import { Button, Checkbox, Typography } from "@material-tailwind/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { IRemoteEditorRef } from "clasor-remote-editor";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { translateVersionStatus } from "@utils/index";
import { ChevronLeftIcon } from "@components/atoms/icons";
import { versionModalListAtom } from "@atom/version";
import { EDocumentTypes } from "@interface/enums";
import forge from "node-forge";

export interface IProps {
  editorRef: React.RefObject<IRemoteEditorRef>;
}

const EditorFooter = ({ editorRef }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const selectedDocument = useRecoilValue(selectedDocumentAtom);
  const selectedVersion = useRecoilValue(editorVersionAtom);
  const editorData = useRecoilValue(editorDataAtom);
  const [editorMode, setEditorMode] = useRecoilState(editorModeAtom);
  const [versionModalList, setVersionModalList] =
    useRecoilState(versionModalListAtom);
  const key = useRecoilValue(editorPublicKeyAtom);

  const [checked, setChecked] = useState(false);
  const autoSaveRef = useRef<Worker>();
  const saveBtnRef = useRef<HTMLButtonElement | null>(null);

  const timeout = 5 * 60; // seconds
  const saveEditorHook = useSaveEditor();

  const renderTitle = () => {
    if (!selectedVersion) {
      return "_";
    } else {
      return `${selectedVersion.versionNumber}${`(${translateVersionStatus(selectedVersion.status, selectedVersion.state).translated}
           ${selectedVersion.status === "accepted" ? "-عمومی" : ""})`}`;
    }
  };

  const encryptData = (content: string) => {
    if (!key) return;

    const publicKey = forge.pki.publicKeyFromPem(key)

    return forge.util.encode64(
      publicKey.encrypt(forge.util.encodeUtf8(content), "RSA-OAEP", {
        md: forge.md.sha256.create(),
      })
    )
  };

  const handleSave = (data: any) => {
    let encryptedContent: string | null = null;
    const content: string =
      selectedDocument?.contentType === EDocumentTypes.classic
        ? data?.content
        : data;

    if (selectedDocument?.publicKeyId) {
      encryptedContent = encryptData(content) as string;
    }
  
    if (selectedVersion && selectedDocument && getRepo) {
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
        versionId: selectedVersion.id,
        versionNumber: selectedVersion.versionNumber,
      });
    }
  };

  const startWorker = (time?: number) => {
    if (!autoSaveRef.current) {
      autoSaveRef.current = new Worker(
        new URL("../../../hooks/worker/autoSave.worker.ts", import.meta.url)
      );

      autoSaveRef.current?.postMessage({
        action: "START",
        time,
      });
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
    autoSaveRef.current?.postMessage({
      action: "STOP",
    });
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

  return (
    <>
      {editorMode === "preview" ? (
        <CancelButton
          onClick={() => {
            editorRef.current?.setMode("edit");
            setEditorMode("edit");
          }}
        >
          ویرایش
        </CancelButton>
      ) : (
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-5 ">
            <Button
              className="w-[208px] lowercase rounded-lg pr-3 pl-2 border-[1px] border-normal bg-transparent flex justify-between items-center"
              title={renderTitle()}
              onClick={() => {
                setVersionModalList(true);
              }}
            >
              <Typography className="label_l3 text-primary">
                {renderTitle()}
              </Typography>
              <ChevronLeftIcon className="-rotate-90 w-2.5 h-2.5 stroke-icon-active" />
            </Button>
            <div className="border-r-[1px] border-r-normal" />
            <Checkbox
              crossOrigin=""
              label={
                <Typography className="title_t3">ذخیره‌سازی خودکار</Typography>
              }
              color="deep-purple"
              checked={checked}
              onChange={handleAutoSaveCheckbox}
              containerProps={{
                className: "-mr-3",
              }}
            />
          </div>
          <div className="flex w-full xs:w-auto gap-2 xs:gap-3">
            <CancelButton
              onClick={() => {
                editorRef.current?.setMode(
                  editorMode === "edit" ? "temporaryPreview" : "edit"
                );
                setEditorMode(
                  editorMode === "edit" ? "temporaryPreview" : "edit"
                );
              }}
              disabled={saveEditorHook.isPending}
            >
              {editorMode === "temporaryPreview" ? "ویرایش" : "پیش نمایش"}
            </CancelButton>
            <LoadingButton
              className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
              onClick={async () => {
                const value = await editorRef.current?.getData();
                if (value) {
                  handleSave(value);
                }
              }}
              disabled={saveEditorHook.isPending}
              // ref={saveBtnRef}
            >
              <Typography className="text__label__button text-white">
                ذخیره
              </Typography>
            </LoadingButton>
          </div>
        </div>
      )}
    </>
  );
};

export default EditorFooter;
