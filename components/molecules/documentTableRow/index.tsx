import React from "react";
import { Checkbox } from "@material-tailwind/react";
import DocumentMenu from "../documentMenu";
import { FaDateFromTimestamp } from "@utils/index";
import { IDocumentMetadata } from "@interface/document.interface";
import TableCell from "../tableCell";
import { bulkItemsAtom } from "@atom/bulk";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryAtom } from "@atom/category";
import { repoAtom } from "@atom/repository";
import { usePathname } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";
import DocumentIcon from "../documentIcon";

interface ITableCell {
  data: string | React.ReactNode;
  title?: string;
  className?: string;
  rowSpan?: number;
  colSpan?: number;
  onClick?: () => void;
  stopPropagation?: boolean;
}

interface IProps {
  document: IDocumentMetadata;
}

const DocumentTableRow = ({ document }: IProps) => {
  const currentPath = usePathname();

  const [getBulkItems, setBulkItems] = useRecoilState(bulkItemsAtom);
  const getRepo = useRecoilValue(repoAtom);
  const selectedCat = useRecoilValue(categoryAtom);

  const { data: userInfo } = useGetUser();

  const repoUserGroupHash =
    currentPath === "/admin/myDocuments"
      ? userInfo?.repository.userGroupHash
      : getRepo?.userGroupHash;

  const handleRowClick = () => {
    const path = selectedCat
      ? `edit?repoId=${document.repoId}&categoryId=${
          selectedCat.id
        }&documentId=${document.id}&repoGroupHash=${
          repoUserGroupHash
        }&catGroupHash=${selectedCat.userGroupHash}&type=${
          document?.contentType
        }${
          document.chatThreadId ? `&chatThreadId=${document.chatThreadId}` : ""
        }`
      : `edit?repoId=${document.repoId}&documentId=${
          document.id
        }&repoGroupHash=${repoUserGroupHash}&type=${document?.contentType}${
          document.chatThreadId ? `&chatThreadId=${document.chatThreadId}` : ""
        }${currentPath === "/admin/sharedDocuments" ? "&sharedDocuments=true" : ""}`;

    window.open(path, "_blank");
  };

  const handleCheckItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked && (getBulkItems as IDocumentMetadata[]).length + 1 > 10) {
      e.target.checked = false;
      toast.error("نمی‌توانید بیش از 10 ایتم را انتخاب کنید");
      return;
    }
    setBulkItems((oldValue) => {
      return isChecked
        ? [...(oldValue as IDocumentMetadata[]), document]
        : [...(oldValue as IDocumentMetadata[])].filter((item) => {
            return item.id !== document.id;
          }) || [];
    });
  };

  return (
    <TableCell
      key={`document-table-item-${document.id}`}
      onClick={handleRowClick}
      tableCell={
        [
          currentPath === "/admin/sharedDocuments"
            ? null
            : {
                data: (
                  <Checkbox
                    color="deep-purple"
                    crossOrigin=""
                    onChange={handleCheckItem}
                    checked={getBulkItems.some((bulkItem) => {
                      return bulkItem.id === document.id;
                    })}
                  />
                ),
                stopPropagation: true,
              },
          {
            data:
              document.order || document.order === 0 ? document.order : "--",
            title: String(document.order) || "--",
            className: "hidden xl:table-cell",
          },
          {
            data: (
              <div className="flex">
                <DocumentIcon document={document} />
                <span
                  className="max-w-[150px] truncate flex gap-2 mr-2 text-ellipsis overflow-hidden w-12 sm:w-20 md:w-auto"
                  title={document.name}
                >
                  {document.name}
                </span>
              </div>
            ),
          },
          {
            data: document.createdAt
              ? FaDateFromTimestamp(+document.createdAt)
              : "--",
            title: document.createdAt
              ? FaDateFromTimestamp(+document.createdAt)
              : "--",
          },
          {
            data: document.updatedAt
              ? FaDateFromTimestamp(+document.updatedAt)
              : "--",
            title: document.updatedAt
              ? FaDateFromTimestamp(+document.updatedAt)
              : "--",
            className: "hidden xl:table-cell",
          },
          {
            data: document.creator?.name || "--",
            title: document.creator?.name || "--",
            className: "hidden lg:table-cell",
          },
          { data: <DocumentMenu document={document} />, stopPropagation: true },
        ].filter(Boolean) as ITableCell[]
      }
      active={!!document.newOne}
    />
  );
};

export default DocumentTableRow;
