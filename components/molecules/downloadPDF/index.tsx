import React, { useRef, useState } from "react";

import { Button } from "@material-tailwind/react";
import { PDFIcon } from "@components/atoms/icons";
import { editorDataAtom } from "@atom/editor";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import useGetUser from "@hooks/auth/useGetUser";
import { useRecoilValue } from "recoil";

const DownloadPDF = () => {
  const [loading, setLoading] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const getSelectedDocument = useRecoilValue(selectedDocumentAtom);
  const getEditorVersion = useRecoilValue(editorDataAtom);

 const {data: userInfo } = useGetUser();

  const handleDownloadFile = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if(!getSelectedDocument || !getEditorVersion){
      toast.error("اطلاعات لازم برای ایجاد pdf وجود ندارد.");
      return;
    }
    
    let versionPath = "";
    if (getEditorVersion?.state === "draft") {
      versionPath = "/draft";
    } else if (getEditorVersion?.state === "public") {
      versionPath = "/publicVersion";
    }
    const link = `${process.env.NEXT_PUBLIC_BACKEND_URL}/repositories/
    ${getSelectedDocument?.repoId}/documents/${getSelectedDocument.id}/versions/
    ${getEditorVersion.id}${versionPath}?innerDocument=true&format=pdf`;
    
    setLoading(true);
    const result = await fetch(link, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        Authorization: `Bearer ${userInfo?.access_token}`,
      },
    });

    const blob = await result.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));

    if (!linkRef.current) {
      return;
    }
    linkRef.current.href = url;
    linkRef.current.setAttribute(
      "download",
      `${getSelectedDocument?.name}(${getEditorVersion?.versionNumber}).pdf`
    );
    setLoading(false);
    linkRef.current.click();
  };

  return (
    <>
      <Button
        className="download-pdf__button bg-transparent p-0"
        title="دانلود pdf"
        onClick={handleDownloadFile}
        disabled={loading || !getSelectedDocument}
      >
        {loading ? (
          <div className="spinner" />
        ) : (
          <PDFIcon className="w-5 h-5 fill-white" />
        )}
      </Button>
      <a hidden ref={linkRef} download>
        downloadLInk
      </a>
    </>
  );
};

export default DownloadPDF;
