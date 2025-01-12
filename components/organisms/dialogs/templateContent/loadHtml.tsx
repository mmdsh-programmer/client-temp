import { useEffect } from "react";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import useGetLastVersion from "@hooks/version/useGetLastVersion";
import useGetVersion from "@hooks/version/useGetVersion";
import { documentTemplateAtom } from "@atom/document";
import { toast } from "react-toastify";
import { IRemoteEditorRef } from "clasor-remote-editor";
import { usePathname } from "next/navigation";

interface IProps {
  editorRef: React.RefObject<IRemoteEditorRef>;
  handleClose: () => void;
}

const LoadHtml = ({ editorRef, handleClose }: IProps) => {
  const currentPath = usePathname();

  const getRepo = useRecoilValue(repoAtom);
  const getDocumentTemplate = useRecoilValue(documentTemplateAtom);

  const { data: getLastVersion, error: lastVersionError } = useGetLastVersion(
    getRepo!.id,
    getDocumentTemplate!.id,
    !!getDocumentTemplate?.id
  );

  const { data, error } = useGetVersion(
    getRepo!.id,
    getDocumentTemplate!.id,
    getLastVersion?.id,
    getLastVersion?.state, // state
    false, // innerDocument
    false, // innerOutline
    currentPath === "/admin/sharedDocuments" ? true : undefined,
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
  }, [getDocumentTemplate, getLastVersion, data]);

  return null;
};

export default LoadHtml;
