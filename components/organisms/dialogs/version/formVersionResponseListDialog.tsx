import React, { useRef, useState } from "react";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { DialogBody } from "@material-tailwind/react";
import { useDocumentStore } from "@store/document";
import useRepoId from "@hooks/custom/useRepoId";
import { useVersionStore } from "@store/version";
import useGetVersionResponse from "@hooks/formVersion/useGetVersionResponse";
import { Spinner } from "@components/atoms/spinner";
import TableHead from "@components/molecules/tableHead";
import TableCell from "@components/molecules/tableCell";
import { FaDate } from "@utils/index";
import FormOutput from "./formOutput";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import DownloadFormOutput from "./downloadFormOutput";

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

  const { data: getVersionResponse, isLoading: versionResponseLoading } = useGetVersionResponse(
    repoId!,
    getDocument!.id,
    getVersion!.id,
    20,
  );

  const listLength = getVersionResponse?.pages[0].total;

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
          {listLength ? (
            <div className="self-end">
              <FormOutput />
            </div>
          ) : null}
          {versionResponseLoading ? (
            <div className="flex justify-center">
              <Spinner className="h-8 w-8" />
            </div>
          ) : listLength ? (
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
                              data: <DownloadFormOutput response={response} />,
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
          ) : (
            <EmptyList type={EEmptyList.FORM_OUTPUT} />
          )}
        </div>
      </DialogBody>
    </InfoDialog>
  );
};

export default FormVersionResponseListDialog;
