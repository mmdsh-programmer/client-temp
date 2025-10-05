import React, { useRef, useState } from "react";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { Button, DialogBody } from "@material-tailwind/react";
import { useDocumentStore } from "@store/document";
import useRepoId from "@hooks/custom/useRepoId";
import { useVersionStore } from "@store/version";
import useGetVersionResponse from "@hooks/formVersion/useGetVersionResponse";
import { Spinner } from "@components/atoms/spinner";
import TableHead from "@components/molecules/tableHead";
import TableCell from "@components/molecules/tableCell";
import { FaDate } from "@utils/index";
import { toast } from "react-toastify";
import useGetUser from "@hooks/auth/useGetUser";
import { DownloadIcon } from "@components/atoms/icons";
import FormOutput from "./formOutput";
import { IResponse } from "@interface/version.interface";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormVersionResponseListDialog = ({ setOpen }: IProps) => {
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
  const { data: getVersionResponse, isLoading: versionResponseLoading } = useGetVersionResponse(
    repoId!,
    getDocument!.id,
    getVersion!.id,
    20,
  );

  const handleDownloadPDF = async (event: React.MouseEvent<HTMLElement>, response: IResponse) => {
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
          // Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${userInfo.access_token}`,
          // "Content-Type": "application/pdf"
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <InfoDialog
      dialogHeader="لیست خروجی‌ها"
      setOpen={handleClose}
      className="repo-share-dialog flex !h-full w-full max-w-full flex-col rounded-none bg-primary xs:!h-[600px] xs:!min-w-[500px] xs:!max-w-[500px] xs:rounded-lg"
    >
      <DialogBody {...({} as React.ComponentProps<typeof DialogBody>)} className="h-full p-0">
        <div className="flex flex-col gap-4 p-4 xs:p-6">
          <div className="self-end">
            <FormOutput />
          </div>
          {versionResponseLoading ? (
            <div className="flex justify-center">
              <Spinner className="h-8 w-8" />
            </div>
          ) : (
            <div className="overflow-auto">
              <table className="w-full min-w-max overflow-hidden">
                <TableHead
                  tableHead={[
                    { key: "username", value: "نام کاربری ", className: "" },
                    {
                      key: "createDate",
                      value: "تاریخ تکمیل",
                      className: "",
                    },
                    {
                      key: "edited",
                      value: "ویرایش شده",
                      className: "",
                    },
                    {
                      key: "download",
                      value: "دانلود",
                      className: "",
                    },
                  ]}
                />
                <tbody>
                  {getVersionResponse?.pages.map((page) => {
                    return page.list.map((response) => {
                      return (
                        <TableCell
                          key={`version-response-table-item-${response.id}`}
                          tableCell={[
                            { data: response.username },
                            {
                              data: FaDate(response.created),
                              className: "",
                            },
                            {
                              data: response.edited ? "بله" : "خیر",
                              className: "",
                            },
                            {
                              data: (
                                <Button
                                  placeholder=""
                                  className="!w-fit bg-transparent"
                                  onClick={(e) => {
                                    return handleDownloadPDF(e, response);
                                  }}
                                  loading={loading}
                                  {...({} as Omit<
                                    React.ComponentProps<typeof Button>,
                                    "placeholder"
                                  >)}
                                >
                                  <DownloadIcon className="h-5 w-5" />
                                </Button>
                              ),
                              className: "",
                            },
                          ]}
                        />
                      );
                    });
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DialogBody>
    </InfoDialog>
  );
};

export default FormVersionResponseListDialog;
