import { Button, Checkbox, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import {
  editorDataAtom,
  editorModalAtom,
  editorModeAtom,
  editorPublicKeyAtom,
} from "@atom/editor";
import { selectedVersionAtom, versionModalListAtom } from "@atom/version";
import { usePathname, useSearchParams } from "next/navigation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import CancelButton from "@components/atoms/button/cancelButton";
import { ChevronLeftIcon } from "@components/atoms/icons";
import { EDocumentTypes } from "@interface/enums";
import EditorFileFooter from "./editorFileFooter";
import { IRemoteEditorRef } from "clasor-remote-editor";
import { IVersion } from "@interface/version.interface";
import LoadingButton from "@components/molecules/loadingButton";
import forge from "node-forge";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import { translateVersionStatus } from "@utils/index";
import useGetUser from "@hooks/auth/useGetUser";
import useRepoId from "@hooks/custom/useRepoId";
import useSaveEditor from "@hooks/editor/useSaveEditor";

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
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const timeout = 5 * 60; // seconds
  
  const repoId = useRepoId();
  const { data: userInfo } = useGetUser();
  const saveEditorHook = useSaveEditor();

  const [isLoading, setIsLoading] = useState(false);

  const writerRole = () => {
    if (currentPath === "/admin/myDocuments") {
      return false;
    }
    if (currentPath === "/admin/sharedDocuments" || sharedDocuments === "true") {
      return (
        selectedDocument?.accesses?.[0] === "writer" ||
        selectedDocument?.accesses?.[0] === "viewer"
      );
    }
    if (getRepo) {
      return getRepo?.roleName === "writer" || getRepo?.roleName === "viewer";
    }
  };

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

    try {
      // Generate a random AES key
      const aesKey = forge.random.getBytesSync(32); // 256 bits
      
      // Create cipher for AES encryption
      const cipher = forge.cipher.createCipher("AES-CBC", aesKey);
      const iv = forge.random.getBytesSync(16);
      cipher.start({iv});
      
      // Encrypt content with AES
      cipher.update(forge.util.createBuffer(content, "utf8"));
      cipher.finish();
      const encryptedContent = cipher.output.getBytes();
      
      // Encrypt the AES key with RSA public key
      const publicKey = forge.pki.publicKeyFromPem(key);
      const encryptedKey = publicKey.encrypt(aesKey, "RSA-OAEP", {
        md: forge.md.sha256.create()
      });

      // Combine IV, encrypted key and encrypted content
      const result = {
        iv: forge.util.encode64(iv),
        key: forge.util.encode64(encryptedKey),
        content: forge.util.encode64(encryptedContent)
      };

      return JSON.stringify(result);
    } catch (error) {
      console.error("Encryption error:", error);
      throw error;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = (data: any) => {
    setIsLoading(true);

    let encryptedContent: string | null = null;
    const content: string =
      selectedDocument?.contentType === EDocumentTypes.classic
        ? data?.content
        : data;

    if (selectedDocument?.publicKeyId) {
      encryptedContent = encryptData(content) as string;
      console.log("-------------------- save data -------------------", data);
      console.log("----------------- encrypted -----------------", encryptedContent);
    }

    if (getVersionData && selectedDocument && repoId) {
      saveEditorHook.mutate({
        content: selectedDocument?.publicKeyId
          ? (encryptedContent as string)
          : content,
        outline:
          selectedDocument?.contentType === EDocumentTypes.classic
            ? data?.outline
            : "[]",
        repoId,
        documentId: selectedDocument.id,
        versionId: getVersionData.id,
        versionNumber: getVersionData.versionNumber,
        versionState: getVersionData.state,
        isDirectAccess:
          sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
        callBack: () => {
          toast.success("تغییرات با موفقیت ذخیره شد.");
          setIsLoading(false);
        },
        errorCallback: () => {
          setIsLoading(false);
        },
      });
    } else {
      setIsLoading(false);
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
    editorRef.current?.on("getData", handleSave);
  
    return () => {
      stopWorker();
    };
  }, []);

  if (selectedDocument?.contentType === EDocumentTypes.file) {
    return <EditorFileFooter />;
  }

  return editorMode === "preview" ? (
    <div className="editor-footer__preview-mode w-full flex justify-between items-center gap-2">
      <Button
        className="editor-footer__version-number w-full xs:w-[208px] lowercase rounded-lg pr-3 pl-2 border-[1px] border-normal bg-transparent flex justify-between items-center"
        title={renderTitle()}
        onClick={() => {
          setVersionModalList(true);
          setEditorModal(false);
          setVersion(null);
          setVersionData(null);
        }}
      >
        <Typography className="label_l3 text-primary">
          {renderTitle()}
        </Typography>
        <ChevronLeftIcon className="-rotate-90 w-2.5 h-2.5 stroke-icon-active" />
      </Button>

      <CancelButton
        onClick={handleChangeEditorMode}
        disabled={
          writerRole() &&
          getVersionData?.creator?.userName !== userInfo?.username
        }
        className="editor-footer__edit-button"
      >
        ویرایش
      </CancelButton>
    </div>
  ) : (
    <div className="editor-footer__edit-mode w-full flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="w-full md:w-auto flex flex-col xs:flex-row gap-5 xs:gap-4">
        <Button
          className="editor-footer__version-number w-full xs:w-[50%] md:w-[208px] lowercase rounded-lg pr-3 pl-2 border-[1px] border-normal bg-transparent flex justify-between items-center"
          title={renderTitle()}
          onClick={() => {
            setVersionModalList(true);
            setEditorModal(false);
            setVersion(null);
            setVersionData(null);
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
          className="editor-footer__auto-save-checkbox"
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
          className="editor-footer__change-mode-button !h-12 md:!h-8 !w-[50%] md:!w-[100px]"
          disabled={
            saveEditorHook.isPending ||
            (writerRole() &&
              getVersionData?.creator?.userName !== userInfo?.username)
          }
        >
          {editorMode === "temporaryPreview" ? "ویرایش" : "پیش نمایش"}
        </CancelButton>
        <LoadingButton
          className="editor-footer__save-button !h-12 md:!h-8 !w-[50%] md:!w-[100px] bg-secondary hover:bg-secondary active:bg-secondary"
          onClick={() => {
            editorRef.current?.getData();
          }}
          disabled={saveEditorHook.isPending || isLoading}
          loading={isLoading || saveEditorHook.isPending}
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
