import React, { useRef, useState } from "react";
import { PDFIcon } from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";
import { selectedVersionAtom } from "@atom/version";
import { selectedDocumentAtom } from "@atom/document";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import useGetUser from "@hooks/auth/useGetUser";

const DownloadPDF = () => {
  const [loading, setLoading] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const getRepo = useRecoilValue(repoAtom);
  const getSelectedDocument = useRecoilValue(selectedDocumentAtom);
  const getSelectedVersion = useRecoilValue(selectedVersionAtom);

 const {data: userInfo } = useGetUser();

  const handleDownloadFile = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    
    let versionPath = "";
    if (getSelectedVersion?.state === "draft") {
      versionPath = "/draft";
    } else if (getSelectedVersion?.state === "public") {
      versionPath = "/publicVersion";
    }
    
    const link = `${process.env.NEXT_PUBLIC_BACKEND_URL}/repositories/${getRepo!.id}/documents/${getSelectedDocument!.id}/versions/${getSelectedVersion!.id}${versionPath}?innerDocument=true&format=pdf`;
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
      `${getSelectedDocument?.name}(${getSelectedVersion?.versionNumber}).pdf`
    );
    setLoading(false);
    linkRef.current.click();
  };

  return (
    <>
      <Button
        className="bg-transparent p-0 mt-1"
        title="دانلود pdf"
        onClick={handleDownloadFile}
        disabled={loading}
      >
        {loading ? (
          <div className="spinner" />
        ) : (
          <PDFIcon className="w-4 h-4" />
        )}
      </Button>
      <a hidden ref={linkRef} download>
        downloadLInk
      </a>
    </>
  );
};

export default DownloadPDF;
