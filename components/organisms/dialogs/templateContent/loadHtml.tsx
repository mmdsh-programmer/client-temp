import { IRemoteEditorRef } from "clasor-remote-editor";
import { useDocumentStore } from "@store/document";
import { useRepositoryStore } from "@store/repository";
import { toast } from "react-toastify";
import { useEffect } from "react";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import useGetVersion from "@hooks/version/useGetVersion";

interface IProps {
  editorRef: React.RefObject<IRemoteEditorRef>;
  handleClose: () => void;
}

const LoadHtml = ({ editorRef, handleClose }: IProps) => {
  const getRepo = useRepositoryStore((s) => {
    return s.repo;
  });
  const getDocumentTemplate = useDocumentStore((s) => {
    return s.documentTemplate;
  });
  
  const { data: getLastVersion, error: lastVersionError } = useGetLastVersion(
    getRepo!.id,
    getDocumentTemplate!.id,
    !!getDocumentTemplate?.id,
    !!getDocumentTemplate
  );

  const { data, error } = useGetVersion(
    getRepo!.id,
    getDocumentTemplate!.id,
    getLastVersion?.id,
    getLastVersion?.state, // state
    false, // innerDocument
    false, // innerOutline
    undefined,
    !!getDocumentTemplate?.id && !!getLastVersion?.id
  );

  useEffect(() => {
    if (!getDocumentTemplate) {
      toast.error("نمونه سند انتخاب نشده است.");
      return;
    }

    if (lastVersionError || error) {
      toast.error("خطا در دریافت اطلاعات آخرین نسخه.");
      return;
    }
    if (data) {
      editorRef.current?.setHtml(data.content);
      handleClose();
    }
  }, [getDocumentTemplate, getLastVersion, data, editorRef, handleClose, lastVersionError, error]);

  return null;
};

export default LoadHtml;
