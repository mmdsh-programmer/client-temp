import React, { useState } from "react";
import {
  Dialog,
  DialogFooter,
  DialogBody,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import LoadingButton from "@components/molecules/loadingButton";
import CloseButton from "@components/atoms/button/closeButton";
import BackButton from "@components/atoms/button/backButton";
import CancelButton from "@components/atoms/button/cancelButton";
import { IRemoteEditorRef } from "clasor-remote-editor";
import {
  editorDataAtom,
  editorVersionAtom,
} from "@atom/editor";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedDocumentAtom } from "@atom/document";
import { repoAtom } from "@atom/repository";
import { EDocumentTypes } from "@interface/enums";
import useSaveEditor from "@hooks/editor/useSaveEditor";

export interface IProps {
  isPending: boolean;
  children: React.ReactNode;
  dialogHeader?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editorRef: React.RefObject<IRemoteEditorRef>;
  onSubmit?: () => Promise<void>;
  className?: string;
}

const EditorDialog = ({
  isPending,
  children,
  dialogHeader,
  setOpen,
  onSubmit,
  className,
  editorRef,
}: IProps) => {
  //   const [editorMode, setEditorMode] = useRecoilState(editorModeAtom);
  const getRepo = useRecoilValue(repoAtom);
  const selectedDocument = useRecoilValue(selectedDocumentAtom);
  const version = useRecoilValue(editorVersionAtom);
  const editorData = useRecoilValue(editorDataAtom);
  const [editorMode, setEditorMode] = useState<"edit" | "temporaryPreview">(
    "edit"
  );
  const saveEditorHook = useSaveEditor();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (data: any) => {
    if (version && selectedDocument && getRepo) {
      try {
        saveEditorHook.mutate({
          content:
            selectedDocument?.contentType === EDocumentTypes.classic
              ? data?.content
              : data,
          outline:
            selectedDocument?.contentType === EDocumentTypes.classic
              ? data?.outline
              : "[]",
          repoId: getRepo.id,
          documentId: selectedDocument.id,
          versionId: version.id,
          versionNumber: version.versionNumber,
        });
      } catch {
        //
      }
    }
  };

  return (
    <Dialog
      placeholder=""
      size="sm"
      open={true}
      handler={handleClose}
      className={`${className} flex flex-col shrink-0 !h-full w-full max-w-full xs:!h-[95%] xs:min-w-[95%] xs:max-w-[95%] bg-primary rounded-none xs:rounded-lg `}
    >
      <DialogHeader
        placeholder="dialog header"
        className="flex items-center xs:justify-between gap-[10px] xs:gap-0 px-[6px] xs:px-6 py-[6px] xs:py-5 border-b-none xs:border-b-[0.5px] border-normal"
      >
        <div className="block xs:hidden">
          <BackButton onClick={handleClose} disabled={isPending} />
        </div>
        <div className="flex items-center">
          <Typography className="title_t1">{dialogHeader}</Typography>
        </div>
        <div className="hidden xs:block">
          <CloseButton onClose={handleClose} disabled={isPending} />
        </div>
      </DialogHeader>
      <div className="block xs:hidden h-2 w-full bg-secondary" />
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-6 overflow-auto"
      >
        {children}
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="flex p-5 xs:px-6 xs:py-4 gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
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
            disabled={isPending}
          >
            {editorMode === "temporaryPreview" ? "ویرایش" : "پیش نمایش"}
          </CancelButton>
          <LoadingButton
            className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
            onClick={() => {}}
            loading={isPending}
          >
            <Typography className="text__label__button text-white">
              ذخیره
            </Typography>
          </LoadingButton>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default EditorDialog;
