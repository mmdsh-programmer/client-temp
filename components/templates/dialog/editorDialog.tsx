import React from "react";
import {
  Dialog,
  DialogFooter,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import { IRemoteEditorRef } from "clasor-remote-editor";
import EditorFooter from "@components/organisms/editor/editorFooter";
import EditorHeader from "@components/organisms/editor/editorHeader";

export interface IProps {
  children: React.ReactNode;
  dialogHeader?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editorRef: React.RefObject<IRemoteEditorRef>;
  className?: string;
}

const EditorDialog = ({
  children,
  dialogHeader,
  setOpen,
  className,
  editorRef,
}: IProps) => {

  const handleClose = () => {
    setOpen(false);
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
        <EditorHeader dialogHeader={dialogHeader} setOpen={handleClose} />
      </DialogHeader>
      <div className="block xs:hidden h-2 w-full bg-secondary" />
      <DialogBody
        placeholder="dialog body"
        className="flex-grow p-0 overflow-auto"
      >
        {children}
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="flex p-5 xs:px-6 xs:py-4 gap-2 xs:gap-3 border-t-gray-200 border-t-[0.5px] "
      >
        <EditorFooter editorRef={editorRef} />
      </DialogFooter>
    </Dialog>
  );
};

export default EditorDialog;
