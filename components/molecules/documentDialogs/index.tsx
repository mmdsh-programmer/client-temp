import React from "react";
import DocumentDeleteDialog from "@components/organisms/dialogs/document/documentDeleteDialog";
import DocumentEditDialog from "@components/organisms/dialogs/document/documentEditDialog";
import DocumentHideDialog from "@components/organisms/dialogs/document/documentHideDialog";
import DocumentVisibleDialog from "@components/organisms/dialogs/document/documentVisibleDialog";
import DocumentMoveDialog from "@components/organisms/dialogs/document/documentMoveDialog";
import DocumentBookmarkDialog from "@components/organisms/dialogs/document/documentBookmarkDialog";
import DocumentAccessDialog from "@components/organisms/dialogs/document/documentAccessDialog";
import DocumentTagsDialog from "@components/organisms/dialogs/document/documentTagsDialog";
import DocumentAccessPublishingDialog from "@components/organisms/dialogs/document/documentAccessPublishingDialog";
import DocumentCreatePasswordDialog from "@components/organisms/dialogs/document/documentCreatePasswordDialog";
import DocumentUpdatePasswordDialog from "@components/organisms/dialogs/document/documentUpdatePasswordDialog";
import DocumentDeletePasswordDialog from "@components/organisms/dialogs/document/documentDeletePasswordDialog";

interface DocumentDialogsProps {
  modalsState: {
    deleteDocument: boolean;
    editDocument: boolean;
    move: boolean;
    hide: boolean;
    visible: boolean;
    bookmarkDocument: boolean;
    documentAccess: boolean;
    documentTags: boolean;
    documentAccessPublishing: boolean;
    createPassword: boolean;
    updatePassword: boolean;
    deletePassword: boolean;
    editContent: boolean;
    documentVersionList: boolean;
  };
  toggleModal: (
    modalName: keyof DocumentDialogsProps["modalsState"],
    value: boolean
  ) => void;
}

const DocumentDialogs: React.FC<DocumentDialogsProps> = ({
  modalsState,
  toggleModal,
}) => {

  return (
    <>
      {modalsState.deleteDocument ? (
        <DocumentDeleteDialog
          setOpen={() => {
            return toggleModal("deleteDocument", false);
          }}
        />
      ) : null}
      {modalsState.editDocument ? (
        <DocumentEditDialog
          setOpen={() => {
            return toggleModal("editDocument", false);
          }}
        />
      ) : null}
      {modalsState.hide ? (
        <DocumentHideDialog
          setOpen={() => {
            return toggleModal("hide", false);
          }}
        />
      ) : null}
      {modalsState.visible ? (
        <DocumentVisibleDialog
          setOpen={() => {
            return toggleModal("visible", false);
          }}
        />
      ) : null}
      {modalsState.move ? (
        <DocumentMoveDialog
          setOpen={() => {
            return toggleModal("move", false);
          }}
        />
      ) : null}
      {modalsState.bookmarkDocument ? (
        <DocumentBookmarkDialog
          setOpen={() => {
            return toggleModal("bookmarkDocument", false);
          }}
        />
      ) : null}
      {modalsState.documentAccess ? (
        <DocumentAccessDialog
          setOpen={() => {
            return toggleModal("documentAccess", false);
          }}
        />
      ) : null}
      {modalsState.documentTags ? (
        <DocumentTagsDialog
          setOpen={() => {
            return toggleModal("documentTags", false);
          }}
        />
      ) : null}
      {modalsState.documentAccessPublishing ? (
        <DocumentAccessPublishingDialog
          setOpen={() => {
            return toggleModal("documentAccessPublishing", false);
          }}
        />
      ) : null}
      {modalsState.createPassword ? (
        <DocumentCreatePasswordDialog
          setOpen={() => {
            return toggleModal("createPassword", false);
          }}
        />
      ) : null}
      {modalsState.updatePassword ? (
        <DocumentUpdatePasswordDialog
          setOpen={() => {
            return toggleModal("updatePassword", false);
          }}
        />
      ) : null}
      {modalsState.deletePassword ? (
        <DocumentDeletePasswordDialog
          setOpen={() => {
            return toggleModal("deletePassword", false);
          }}
        />
      ) : null}
 
    </>
  );
};

export default DocumentDialogs;
