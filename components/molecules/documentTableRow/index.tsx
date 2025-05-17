import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Checkbox } from "@material-tailwind/react";
import DocumentIcon from "../documentIcon";
import DocumentMenu from "../documentMenu";
import { FaDateFromTimestamp } from "@utils/index";
import { IDocumentMetadata } from "@interface/document.interface";
import TableCell, { ITableCell } from "../tableCell";
import { bulkItemsAtom } from "@atom/bulk";
import { categoryAtom } from "@atom/category";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";

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
    currentPath === "/admin/myDocuments" ||
    (currentPath === "/admin/dashboard" && document?.repoId === userInfo?.repository.id)
      ? userInfo?.repository.userGroupHash
      : getRepo?.userGroupHash;

  const handleRowClick = () => {
    const path = selectedCat
      ? `edit?repoId=${document.repoId}&categoryId=${
          selectedCat.id
        }&documentId=${document.id}&repoGroupHash=${
          repoUserGroupHash
        }&catGroupHash=${selectedCat.userGroupHash}&type=${document?.contentType}${
          document.chatThreadId ? `&chatThreadId=${document.chatThreadId}` : ""
        }`
      : `edit?repoId=${document.repoId}&documentId=${
          document.id
        }&repoGroupHash=${repoUserGroupHash}&type=${document?.contentType}${
          document.chatThreadId ? `&chatThreadId=${document.chatThreadId}` : ""
        }${
          currentPath === "/admin/sharedDocuments" ||
          (currentPath === "/admin/dashboard" && document?.repoId !== userInfo?.repository.id)
            ? "&sharedDocuments=true"
            : ""
        }`;

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
      className="document-table-row"
      tableCell={
        [
          currentPath === "/admin/sharedDocuments" || currentPath === "/admin/dashboard"
            ? null
            : {
                data: (
                  <Checkbox
                    color="purple"
                    crossOrigin=""
                    onChange={handleCheckItem}
                    checked={getBulkItems.some((bulkItem) => {
                      return bulkItem.id === document.id;
                    })}
                  />
                ),
                stopPropagation: true,
                className: "!px-0",
              },
          currentPath === "/admin/dashboard"
            ? null
            : {
                data: document.order || document.order === 0 ? document.order : "--",
                title: String(document.order) || "--",
                className: "hidden xl:table-cell text-center !px-0",
              },
          {
            data: (
              <div className="flex">
                <DocumentIcon document={document} />
                <span
                  className="mr-2 flex gap-2 overflow-hidden truncate text-ellipsis"
                  title={document.name}
                >
                  {document.name}
                </span>
              </div>
            ),
            className:
              "!px-3 !max-w-[180px] !w-[180px] sm:!max-w-[300px] sm:!w-[300px] md:!max-w-[250px] md:!w-[250px] xl:!max-w-[300px] xl:!w-[300px]",
          },
          currentPath === "/admin/dashboard"
            ? null
            : {
                data: document.createdAt ? FaDateFromTimestamp(+document.createdAt) : "--",
                title: document.createdAt ? FaDateFromTimestamp(+document.createdAt) : "--",
                className: "!px-3",
              },
          currentPath === "/admin/dashboard"
            ? null
            : {
                data: document.updatedAt ? FaDateFromTimestamp(+document.updatedAt) : "--",
                title: document.updatedAt ? FaDateFromTimestamp(+document.updatedAt) : "--",
                className: "hidden xl:table-cell !px-3",
              },
          {
            data: document.creator?.name || "--",
            title: document.creator?.name || "--",
            className: "hidden lg:table-cell !px-3 ",
          },
          {
            data: <DocumentMenu document={document} />,
            stopPropagation: true,
            className: "!px-2",
          },
        ].filter(Boolean) as ITableCell[]
      }
      active={!!document.newOne}
    />
  );
};

export default DocumentTableRow;
