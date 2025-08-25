import React from "react";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import EditorFooter from "@components/organisms/editor/editorFooter";
import EditorHeader from "@components/organisms/editor/editorHeader";
import { IRemoteEditorRef } from "clasor-remote-editor";
import { EDocumentTypes } from "@interface/enums";
import EditorFileFooter from "@components/organisms/editor/editorFileFooter";
import { useDocumentStore } from "@store/document";

export interface IProps {
  children: React.ReactNode;
  dialogHeader?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editorRef: React.RefObject<IRemoteEditorRef>;
  className?: string;
  isEditorReady?: boolean;
}

const EditorDialog = ({
  children,
  dialogHeader,
  setOpen,
  className,
  editorRef,
  isEditorReady,
}: IProps) => {
  const getSelectedDocument = useDocumentStore((state) => {
    return state.selectedDocument;
  });
  const handleClose = () => {
    setOpen(false);
  };

  const renderFooter = () => {
    if (!isEditorReady) {
      return null;
    }
    if (getSelectedDocument?.contentType === EDocumentTypes.file) {
      return <EditorFileFooter />;
    }
    return <EditorFooter editorRef={editorRef} />;
  };

  return (
    <Dialog
      placeholder=""
      size="sm"
      open
      handler={handleClose}
      className={`${className} flex !h-full w-full max-w-full shrink-0 flex-col rounded-none bg-white xs:!h-[95%] xs:min-w-[95%] xs:max-w-[95%] xs:rounded-lg`}
      dismiss={{
        enabled: false,
      }}
    >
      <DialogHeader
        placeholder="dialog header"
        className="dialog-header border-b-none flex items-center gap-[10px] border-normal bg-white px-[6px] py-[6px] xs:justify-between xs:gap-0 xs:border-b-[0.5px] xs:px-6 xs:py-5"
      >
        <EditorHeader dialogHeader={dialogHeader} setOpen={handleClose} />
      </DialogHeader>
      <div className="block h-2 w-full bg-secondary xs:hidden" />
      <DialogBody placeholder="dialog body" className="dialog-body flex-grow overflow-auto p-0">
        {children}
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="dialog-footer flex gap-2 border-t-[0.5px] border-t-gray-200 p-5 xs:gap-3 xs:px-6 xs:py-4"
      >
        {renderFooter()}
      </DialogFooter>
    </Dialog>
  );
};

export default EditorDialog;
