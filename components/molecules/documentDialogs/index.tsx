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
import DocumentDirectAccessDialog from "@components/organisms/dialogs/document/documentDirectAccessDialog";
import DocumentCreatePublishLinkDialog from "@components/organisms/dialogs/document/documentCreatePublishLinkDialog";
import DocumentDeletePublishLinkDialog from "@components/organisms/dialogs/document/documentDeletePublishLinkDialog";
import DocumentPublicVersionDialog from "@components/organisms/dialogs/document/documentPublicVersionDialog";
import DocumentWhiteListRequestsDialog from "@components/organisms/dialogs/document/documentWhiteListRequestsDialog";
import { useDocumentStore } from "@store/document";
import DocumentQaDialog from "@components/organisms/dialogs/document/documentQaDialog";

interface IDocumentDialogsProps {
  activeModal: string | null;
  closeModal: () => void;
}
const DocumentDialogs = ({ activeModal, closeModal }: IDocumentDialogsProps) => {
  const { selectedDocument } = useDocumentStore();

  if (!activeModal || !selectedDocument) return null;

  return (
    <>
      {activeModal === "deleteDocument" ? <DocumentDeleteDialog setOpen={closeModal} /> : null}
      {activeModal === "editDocument" ? <DocumentEditDialog setOpen={closeModal} /> : null}
      {activeModal === "hide" ? <DocumentHideDialog setOpen={closeModal} /> : null}
      {activeModal === "visible" ? <DocumentVisibleDialog setOpen={closeModal} /> : null}
      {activeModal === "move" ? <DocumentMoveDialog setOpen={closeModal} /> : null}
      {activeModal === "bookmarkDocument" ? <DocumentBookmarkDialog setOpen={closeModal} /> : null}
      {activeModal === "documentAccess" ? <DocumentAccessDialog setOpen={closeModal} /> : null}
      {activeModal === "documentTags" ? <DocumentTagsDialog setOpen={closeModal} /> : null}
      {activeModal === "documentAccessPublishing" ? (
        <DocumentAccessPublishingDialog setOpen={closeModal} />
      ) : null}
      {activeModal === "createPassword" ? (
        <DocumentCreatePasswordDialog setOpen={closeModal} />
      ) : null}
      {activeModal === "updatePassword" ? (
        <DocumentUpdatePasswordDialog setOpen={closeModal} />
      ) : null}
      {activeModal === "deletePassword" ? (
        <DocumentDeletePasswordDialog setOpen={closeModal} />
      ) : null}
      {activeModal === "documentDirectAccess" ? (
        <DocumentDirectAccessDialog setOpen={closeModal} />
      ) : null}
      {activeModal === "createPublishLink" ? (
        <DocumentCreatePublishLinkDialog setOpen={closeModal} />
      ) : null}
      {activeModal === "deletePublishLink" ? (
        <DocumentDeletePublishLinkDialog setOpen={closeModal} />
      ) : null}
      {activeModal === "documentPublicVersion" ? (
        <DocumentPublicVersionDialog setOpen={closeModal} />
      ) : null}
      {activeModal === "documentWhiteListRequests" ? (
        <DocumentWhiteListRequestsDialog setOpen={closeModal} />
      ) : null}
      {activeModal === "documentQA" ? (
        <DocumentQaDialog setOpen={closeModal} />
      ) : null}
    </>
  );
};

export default DocumentDialogs;
