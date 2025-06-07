import { Typography } from "@material-tailwind/react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import DocumentIcon from "../documentIcon";
import DocumentMenu from "../documentMenu";
import { FaDateFromTimestamp } from "@utils/index";
import { IDocumentMetadata } from "@interface/document.interface";
import MobileCard from "../mobileCard";
import React from "react";
import { bulkItemsAtom } from "@atom/bulk";
import { categoryAtom } from "@atom/category";
import { editorModeAtom } from "@atom/editor";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import Checkbox from "@components/atoms/checkbox";

interface IProps {
  document: IDocumentMetadata;
}

const DocumentMobileCard = ({ document }: IProps) => {
  const currentPath = usePathname();
  const [getBulkItems, setBulkItems] = useRecoilState(bulkItemsAtom);
  const getRepo = useRecoilValue(repoAtom);
  const selectedCat = useRecoilValue(categoryAtom);
  const setDocument = useSetRecoilState(selectedDocumentAtom);
  const setEditorMode = useSetRecoilState(editorModeAtom);

  const handleCardClick = () => {
    if (document.contentType === "file") {
      setDocument(document);
      setEditorMode("preview");
      return;
    }
    const path = selectedCat
      ? `edit?repoId=${document.repoId}&categoryId=${selectedCat.id
      }&documentId=${document.id}&repoGroupHash=${getRepo?.userGroupHash
      }&catGroupHash=${selectedCat.userGroupHash}&type=${document?.contentType}${document.chatThreadId ? `&chatThreadId=${document.chatThreadId}` : ""
      }`
      : `edit?repoId=${document.repoId}&documentId=${document.id
      }&repoGroupHash=${getRepo?.userGroupHash}&type=${document?.contentType}${document.chatThreadId ? `&chatThreadId=${document.chatThreadId}` : ""
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
    setBulkItems((oldValue) => {
      return isChecked
        ? [...oldValue, document]
        : [...oldValue].filter((item) => {
          return item.id !== document.id;
        }) || [];
    });
  };

  return (
    <MobileCard
      className="document-mobile-card"
      name={
        <div className="flex w-full items-center gap-2">
          {currentPath === "/admin/dashboard" ||
            currentPath === "/admin/sharedDocuments" ? null : (
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
          <div className="flex max-w-full gap-2">
            <DocumentIcon document={document} />
            <Typography
              className="flex max-w-[80%] flex-grow overflow-hidden truncate text-ellipsis"
              title={document.name}
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
