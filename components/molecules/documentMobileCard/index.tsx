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
  const getBulkItems = useBulkStore((state) => {
    return state.bulkItems;
  });
  const setBulkItems = useBulkStore((state) => {
    return state.setBulkItems;
  });
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const selectedCat = useCategoryStore((state) => {
    return state.category;
  });
  const setDocument = useDocumentStore((state) => {
    return state.setSelectedDocument;
  });
  const setEditorMode = useEditorStore((state) => {
    return state.setEditorMode;
  });

  const handleCardClick = () => {
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
    const isChecked = e.target.checked;
    if (isChecked && getBulkItems.length + 1 > 10) {
      e.target.checked = false;
      toast.error("نمی‌توانید بیش از 10 ایتم را انتخاب کنید");
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
          <div className="flex items-center max-w-full gap-2">
            <DocumentIcon document={document} />
            <Typography
              placeholder=""
              className="flex text-primary_normal max-w-[80%] flex-grow overflow-hidden truncate text-ellipsis"
              title={document.name}
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
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
