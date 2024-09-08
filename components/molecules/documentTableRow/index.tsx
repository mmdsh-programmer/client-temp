import React from "react";
import { IDocumentMetadata } from "@interface/document.interface";
import { bulkItems } from "@atom/bulk";
import { useRecoilState } from "recoil";
import { FaDateFromTimestamp } from "@utils/index";
import { DocIcon, InvisibleIcon } from "@components/atoms/icons";
import { Checkbox } from "@material-tailwind/react";
import { toast } from "react-toastify";
import TableCell from "../tableCell";
import DocumentMenu from "../documentMenu";

interface IProps {
  document: IDocumentMetadata;
}

const DocumentTableRow = ({ document }: IProps) => {
  const [getBulkItems, setBulkItems] = useRecoilState(bulkItems);

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
      tableCell={[
        {
          data: (
            <Checkbox
              crossOrigin=""
              onChange={handleCheckItem}
              checked={getBulkItems.some((bulkItem) => {
                return bulkItem.id === document.id;
              })}
            />
          ),
        },
        {
          data: document.order || document.order === 0 ? document.order : "--",
          title: String(document.order) || "--",
          className: "hidden xl:table-cell",
        },
        {
          data: (
            <div className="flex">
              <DocIcon className="fill-icon-hover w-5 h-5" />
              <span
                className="flex gap-2 mr-2 text-ellipsis overflow-hidden w-12 sm:w-20 md:w-auto"
                title={document.name}
              >
                {document.isHidden && (
                  <InvisibleIcon className="w-5 h-5 flex-none" />
                )}
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
        { data: <DocumentMenu document={document} /> },
      ]}
    />
  );
};

export default DocumentTableRow;
