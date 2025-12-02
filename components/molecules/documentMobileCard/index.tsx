import { Typography } from "@material-tailwind/react";
import DocumentIcon from "../documentIcon";
import DocumentMenu from "../documentMenu";
import { FaDateFromTimestamp } from "@utils/index";
import { IDocumentMetadata } from "@interface/document.interface";
import MobileCard from "../mobileCard";
import React from "react";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import Checkbox from "@components/atoms/checkbox";
import { useBulkStore } from "@store/bulk";
import { useCategoryStore } from "@store/category";
import { useEditorStore } from "@store/editor";
import { useRepositoryStore } from "@store/repository";
import { useDocumentStore } from "@store/document";

interface IProps {
  document: IDocumentMetadata;
}

const DocumentMobileCard = ({ document }: IProps) => {
  const currentPath = usePathname();
  const { repo: getRepo } = useRepositoryStore();
  const { bulkItems: getBulkItems, setBulkItems } = useBulkStore();
  const { category: selectedCat } = useCategoryStore();
  const { setSelectedDocument: setDocument } = useDocumentStore();
  const { setEditorMode } = useEditorStore();

  const handleCardClick = () => {
    window.metrics.track("select-document");
    window.metrics.track("select-document-new-tab");
    if (document.contentType === "file") {
      setDocument(document);
      setEditorMode("preview");
      return;
    }
    const path = selectedCat
      ? `edit?repoId=${document.repoId}&categoryId=${
          selectedCat.id
        }&documentId=${document.id}&repoGroupHash=${
          getRepo?.userGroupHash
        }&catGroupHash=${selectedCat.userGroupHash}&type=${document?.contentType}${
          document.chatThreadId ? `&chatThreadId=${document.chatThreadId}` : ""
        }`
      : `edit?repoId=${document.repoId}&documentId=${
          document.id
        }&repoGroupHash=${getRepo?.userGroupHash}&type=${document?.contentType}${
          document.chatThreadId ? `&chatThreadId=${document.chatThreadId}` : ""
        }`;

    window.open(path, "_blank");
  };

  const handleCheckItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    window.metrics.track("select-bulk-item");
    const isChecked = e.target.checked;
    if (isChecked && getBulkItems.length + 1 > 10) {
      e.target.checked = false;
      toast.error("نمی‌توانید بیش از 10 آیتم را انتخاب کنید");
      return;
    }
    if (isChecked) {
      setBulkItems([...getBulkItems, document]);
    } else {
      setBulkItems(
        [...getBulkItems].filter((item) => {
          return item.id !== document.id;
        }),
      );
    }
  };

  return (
    <MobileCard
      className="document-mobile-card"
      name={
        <div className="flex w-full items-center gap-2">
          {currentPath === "/admin/dashboard" || currentPath === "/admin/sharedDocuments" ? null : (
            <Checkbox
              onClick={(e) => {
                return e.stopPropagation();
              }}
              onChange={(e) => {
                handleCheckItem(e);
              }}
              checked={getBulkItems.some((bulkItem) => {
                return bulkItem.id === document.id;
              })}
            />
          )}
          <div className="flex max-w-full items-center gap-2">
            <DocumentIcon document={document} />
            <Typography
              placeholder=""
              className="flex max-w-[80%] flex-grow overflow-hidden truncate text-ellipsis text-primary_normal"
              title={document.name}
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {document.name}
            </Typography>
          </div>
        </div>
      }
      description={[
        {
          title: "تاریخ ایجاد",
          value: document.createdAt ? FaDateFromTimestamp(+document.createdAt) : "--",
        },
        { title: "سازنده", value: document.creator?.userName || "--" },
      ]}
      onClick={() => {
        return handleCardClick();
      }}
      cardAction={<DocumentMenu document={document} />}
    />
  );
};

export default DocumentMobileCard;
