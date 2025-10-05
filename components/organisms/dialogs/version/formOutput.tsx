import React, { useRef, useState } from "react";
import useGetUser from "@hooks/auth/useGetUser";
import { Button, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useRepoId from "@hooks/custom/useRepoId";
import { useDocumentStore } from "@store/document";
import { useVersionStore } from "@store/version";

const FormOutput = () => {
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

  const handleDownloadOutput = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    refetch();

    if (!getDocument || !getVersion || !userInfo) {
      toast.error("اطلاعات لازم برای ایجاد pdf وجود ندارد.");
      return;
    }

    const link = `${process.env.NEXT_PUBLIC_BACKEND_URL}/repositories/${repoId}/documents/${getDocument!.id}/versions/${getVersion!.id}/exportResult?fileType=XLSX&dataType=RAW`;
    try {
      setLoading(true);
      const result = await fetch(link, {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${userInfo.access_token}`,
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
      linkRef.current.setAttribute("download", `${getDocument?.name}.xlsx`);
      linkRef.current.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error("خطا در دانلود فایل");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      placeholder=""
      className="!w-fit bg-primary-normal !px-5 hover:bg-primary-normal active:bg-primary-normal"
      onClick={handleDownloadOutput}
      loading={loading}
      {...({} as Omit<React.ComponentProps<typeof Button>, "placeholder">)}
    >
      <a hidden ref={linkRef} download>
        downloadLInk
      </a>
      <Typography
        {...({} as React.ComponentProps<typeof Typography>)}
        className="text__label__button text-white"
      >
        نتایج داده‌ها
      </Typography>
    </Button>
  );
};

export default FormOutput;
