import React from "react";
import {
  DocIcon,
  DocumentClassicIcon,
  DocumentExcelIcon,
  DocumentFileIcon,
  DocumentFlowchartIcon,
  DocumentWordIcon,
  TemplateClassicIcon,
  TemplateExcelIcon,
  TemplateFileIcon,
  TemplateFlowchartIcon,
  TemplateWordIcon,
} from "@components/atoms/icons";
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
import { EDocumentTypes } from "@interface/enums";
import { usePathname } from "next/navigation";

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

  const renderIcon = () => {
    switch (document.contentType) {
      case EDocumentTypes.classic:
        return document.isTemplate ? (
          <TemplateClassicIcon className="fill-icon-hover w-5 h-5" />
        ) : (
          <DocumentClassicIcon className="fill-icon-hover w-5 h-5" />
        );
      case EDocumentTypes.word:
        return document.isTemplate ? (
          <TemplateWordIcon className="fill-icon-hover w-5 h-5" />
        ) : (
          <DocumentWordIcon className="fill-icon-hover w-5 h-5" />
        );
      case EDocumentTypes.excel:
        return document.isTemplate ? (
          <TemplateExcelIcon className="fill-icon-hover w-5 h-5" />
        ) : (
          <DocumentExcelIcon className="fill-icon-hover w-5 h-5" />
        );
      case EDocumentTypes.flowchart:
        return document.isTemplate ? (
          <TemplateFlowchartIcon className="fill-icon-hover w-5 h-5" />
        ) : (
          <DocumentFlowchartIcon className="fill-icon-hover w-5 h-5" />
        );
      case EDocumentTypes.file:
        return document.isTemplate ? (
          <TemplateFileIcon className="fill-icon-hover w-5 h-5" />
        ) : (
          <DocumentFileIcon className="fill-icon-hover w-5 h-5" />
        );
      default:
        return <DocIcon className="fill-icon-hover w-5 h-5" />;
    }
  };

  const handleRowClick = () => {
    const path = selectedCat
      ? `edit?repoId=${document.repoId}&categoryId=${
          selectedCat.id
        }&documentId=${document.id}&repoGroupHash=${
          getRepo?.userGroupHash
        }&catGroupHash=${selectedCat.userGroupHash}&type=${
          document?.contentType
        }${
          document.chatThreadId ? `&chatThreadId=${document.chatThreadId}` : ""
        }`
      : `edit?repoId=${document.repoId}&documentId=${
          document.id
        }&repoGroupHash=${getRepo?.userGroupHash}&type=${
          document?.contentType
        }${
          document.chatThreadId ? `&chatThreadId=${document.chatThreadId}` : ""
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
                {renderIcon()}
                <span
                  className="flex gap-2 mr-2 text-ellipsis overflow-hidden w-12 sm:w-20 md:w-auto"
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
