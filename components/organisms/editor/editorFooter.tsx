/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { editorDataAtom, editorModalAtom, editorModeAtom, editorPublicKeyAtom } from "@atom/editor";
import { selectedVersionAtom, versionModalListAtom } from "@atom/version";
import { usePathname, useSearchParams } from "next/navigation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import CancelButton from "@components/atoms/button/cancelButton";
import Checkbox from "@components/atoms/checkbox";
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
import { useDebouncedCallback } from "use-debounce";
import useGetUser from "@hooks/auth/useGetUser";
import useRepoId from "@hooks/custom/useRepoId";
import useSaveEditor from "@hooks/editor/useSaveEditor";
import { getMe } from "@actions/auth";
import axios from "axios";
import { IServerResult } from "@interface/app.interface";

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
    if (
      currentPath === "/admin/myDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id === selectedDocument?.repoId)
    ) {
      return false;
    }
    if (
      currentPath === "/admin/sharedDocuments" ||
      sharedDocuments === "true" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id !== selectedDocument?.repoId)
    ) {
      return (
        selectedDocument?.accesses?.[0] === "writer" || selectedDocument?.accesses?.[0] === "viewer"
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
        translateVersionStatus(getVersionData.status, getVersionData.state).translated
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
      cipher.start({ iv });

      // Encrypt content with AES
      cipher.update(forge.util.createBuffer(content, "utf8"));
      cipher.finish();
      const encryptedContent = cipher.output.getBytes();

      // Encrypt the AES key with RSA public key
      const publicKey = forge.pki.publicKeyFromPem(key);
      const encryptedKey = publicKey.encrypt(aesKey, "RSA-OAEP", {
        md: forge.md.sha256.create(),
      });

      // Combine IV, encrypted key and encrypted content
      const result = {
        iv: forge.util.encode64(iv),
        key: forge.util.encode64(encryptedKey),
        content: forge.util.encode64(encryptedContent),
      };

      return JSON.stringify(result);
    } catch (error) {
      console.error("Encryption error:", error);
      throw error;
    }
  };

  const handleSave = useDebouncedCallback((data: any) => {
    setIsLoading(true);
    let encryptedContent: string | null = null;
    const content: string =
      selectedDocument?.contentType === EDocumentTypes.classic ? data?.content : data;

    if (selectedDocument?.publicKeyId) {
      encryptedContent = encryptData(content) as string;
    }

    if (getVersionData && selectedDocument && repoId) {
      saveEditorHook.mutate({
        content: selectedDocument?.publicKeyId ? (encryptedContent as string) : content,
        outline: selectedDocument?.contentType === EDocumentTypes.classic ? data?.outline : "[]",
        repoId,
        documentId: selectedDocument.id,
        versionId: getVersionData.id,
        versionNumber: getVersionData.versionNumber,
        versionState: getVersionData.state,
        isDirectAccess:
          sharedDocuments === "true" ||
          currentPath === "/admin/sharedDocuments" ||
          (currentPath === "/admin/dashboard" &&
            userInfo?.repository.id !== selectedDocument?.repoId),
        successCallBack: () => {
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
  }, 100);

  const handleSaveData = useDebouncedCallback(async (data: any) => {
    setIsLoading(true);
    const userData = await getMe();

    let encryptedContent: string | null = null;
    const content: string =
      selectedDocument?.contentType === EDocumentTypes.classic ? data?.content : data;

    if (selectedDocument?.publicKeyId) {
      encryptedContent = encryptData(content) as string;
    }

    if (getVersionData && selectedDocument && repoId && userData) {
      try {
        const response = await axios.put<IServerResult<any>>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/repositories/${repoId}/documents/${selectedDocument.id}/versions/${getVersionData.id}`,
          {
            content: decodeURIComponent(
              selectedDocument?.publicKeyId ? (encryptedContent as string) : content,
            ),
            outline: decodeURIComponent(
              selectedDocument?.contentType === EDocumentTypes.classic ? data?.outline : "[]",
            ),
            versionNumber: decodeURIComponent(getVersionData.versionNumber),
          },
          {
            headers: {
              Authorization: `Bearer ${userData.access_token}`,
              "Content-Type": "application/json",
            },
            params: {
              isDirectAccess:
                sharedDocuments === "true" ||
                currentPath === "/admin/sharedDocuments" ||
                (currentPath === "/admin/dashboard" &&
                  userInfo?.repository.id !== selectedDocument?.repoId),
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
          },
        );
        setIsLoading(false);
        toast.success("تغییرات با موفقیت ذخیره شد.");

        return response.data;
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message || "خطای نامشخصی رخ داد");
      }
    } else {
      setIsLoading(false);
    }
  }, 100);

  const startWorker = (time?: number) => {
    if (!autoSaveRef.current) {
      autoSaveRef.current = new Worker(
        new URL("../../../hooks/worker/autoSave.worker.ts", import.meta.url),
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

  const handleAutoSaveCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      startWorker(timeout);
    } else {
      stopWorker();
    }
    setChecked(event.target.checked);
  };

  useEffect(() => {
    editorRef.current?.on("getData", handleSaveData);
    editorRef.current?.on("getData", handleSave);

    return () => {
      stopWorker();
    };
  }, []);

  return editorMode === "preview" ? (
    <div className="editor-footer__preview-mode flex w-full items-center justify-between gap-2">
      <Button
        className="editor-footer__version-number flex w-full items-center justify-between rounded-lg border-[1px] border-normal bg-transparent pl-2 pr-3 lowercase xs:w-[208px]"
        title={renderTitle()}
        onClick={() => {
          setVersionModalList(true);
          setEditorModal(false);
          setVersion(null);
          setVersionData(null);
        }}
      >
        <Typography className="label_l3 text-primary_normal">{renderTitle()}</Typography>
        <ChevronLeftIcon className="h-2.5 w-2.5 -rotate-90 stroke-icon-active" />
      </Button>

      <CancelButton
        onClick={handleChangeEditorMode}
        disabled={writerRole() && getVersionData?.creator?.userName !== userInfo?.username}
        className="editor-footer__edit-button"
      >
        ویرایش
      </CancelButton>
    </div>
  ) : (
    <div className="editor-footer__edit-mode flex w-full flex-col items-center justify-between gap-4 md:flex-row">
      <div className="flex w-full flex-col gap-5 md:w-auto xs:flex-row xs:gap-4">
        <Button
          className="editor-footer__version-number flex w-full items-center justify-between rounded-lg border-[1px] border-normal bg-transparent pl-2 pr-3 lowercase md:w-[208px] xs:w-[50%]"
          title={renderTitle()}
          onClick={() => {
            setVersionModalList(true);
            setEditorModal(false);
            setVersion(null);
            setVersionData(null);
          }}
        >
          <Typography className="label_l3 text-primary_normal">{renderTitle()}</Typography>
          <ChevronLeftIcon className="h-2.5 w-2.5 -rotate-90 stroke-icon-active" />
        </Button>
        <div className="!hidden border-r-[1px] border-r-normal xs:!block" />
        <Checkbox
          label="ذخیره‌سازی خودکار"
          className="editor-footer__auto-save-checkbox"
          checked={checked}
          onChange={handleAutoSaveCheckbox}
        />
      </div>
      <div className="flex w-full gap-2 md:w-auto xs:gap-3">
        <CancelButton
          onClick={() => {
            editorRef.current?.setMode(editorMode === "edit" ? "temporaryPreview" : "edit");
            setEditorMode(editorMode === "edit" ? "temporaryPreview" : "edit");
          }}
          className="editor-footer__change-mode-button !h-12 !w-[50%] md:!h-8 md:!w-[100px]"
          disabled={
            saveEditorHook.isPending ||
            (writerRole() && getVersionData?.creator?.userName !== userInfo?.username)
          }
        >
          {editorMode === "temporaryPreview" ? "ویرایش" : "پیش نمایش"}
        </CancelButton>
        <LoadingButton
          className="editor-footer__save-button !hidden !h-12 !w-[50%] bg-primary-normal hover:bg-primary-normal active:bg-primary-normal md:!h-8 md:!w-[100px]"
          onClick={() => {
            editorRef.current?.on("getData", handleSave);
            editorRef.current?.getData();
          }}
          disabled={saveEditorHook.isPending || isLoading}
          loading={isLoading || saveEditorHook.isPending}
        >
          <Typography className="text__label__button text-white">ذخیره</Typography>
        </LoadingButton>
        <LoadingButton
          className="editor-footer__save-button !h-12 !w-[50%] bg-primary-normal hover:bg-primary-normal active:bg-primary-normal md:!h-8 md:!w-[100px]"
          onClick={() => {
            editorRef.current?.on("getData", handleSaveData);
            editorRef.current?.getData();
          }}
          disabled={saveEditorHook.isPending || isLoading}
          loading={isLoading || saveEditorHook.isPending}
        >
          <Typography className="text__label__button text-white">ذخیره</Typography>
        </LoadingButton>
      </div>
    </div>
  );
};

export default EditorFooter;
