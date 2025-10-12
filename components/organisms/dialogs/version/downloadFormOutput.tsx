import React, { useRef, useState } from "react";
import { IResponse } from "@interface/version.interface";
import useGetUser from "@hooks/auth/useGetUser";
import useRepoId from "@hooks/custom/useRepoId";
import { useDocumentStore } from "@store/document";
import { useVersionStore } from "@store/version";
import { toast } from "react-toastify";
import { DownloadIcon } from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";
import { Spinner } from "@components/atoms/spinner";

interface IProps {
  response: IResponse;
}

const DownloadFormOutput = ({ response }: IProps) => {
  const [loading, setLoading] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const repoId = useRepoId();
  const getDocument = useDocumentStore((s) => {
    return s.selectedDocument;
  });
  const getVersion = useVersionStore((s) => {
    return s.selectedVersion;
  });

  const { data: userInfo, refetch } = useGetUser();

  const handleDownloadPDF = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    refetch();

    if (!getDocument || !getVersion || !userInfo) {
      toast.error("اطلاعات لازم برای ایجاد pdf وجود ندارد.");
      return;
    }

    const link = `${process.env.NEXT_PUBLIC_BACKEND_URL}/repositories/${repoId}/documents/${getDocument!.id}/versions/${getVersion!.id}/responses/${response.id}/pdf`;
    try {
      setLoading(true);
      const result = await fetch(link, {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${userInfo.access_token}`,
          "Content-Type": "application/pdf",
        },
      });

      if (!result.ok) {
        throw new Error("دانلود فایل با خطا مواجه شد.");
      }

      const blob = await result.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      if (!linkRef.current) {
        return;
      }
      linkRef.current.href = url;
      linkRef.current.setAttribute("download", `${getDocument?.name}.pdf`);
      linkRef.current.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error("خطا در دانلود فایل");
    } finally {
      setLoading(false);
    }
  };
  return loading ? (
    <Spinner className="h-5 w-5" />
  ) : (
    <Button
      placeholder=""
      className="!w-fit bg-transparent p-0"
      onClick={(e) => {
        return handleDownloadPDF(e);
      }}
      {...({} as Omit<React.ComponentProps<typeof Button>, "placeholder">)}
    >
      <DownloadIcon className="h-5 w-5" />
    </Button>
  );
};

export default DownloadFormOutput;
