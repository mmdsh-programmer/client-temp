import React from "react";
import { ICategoryMetadata } from "@interface/category.interface";
import { useRecoilState, useSetRecoilState } from "recoil";
import { categoryShow } from "@atom/category";
import { bulkItems } from "@atom/bulk";
import { toast } from "react-toastify";
import { Checkbox } from "@material-tailwind/react";
import { FaDateFromTimestamp } from "@utils/index";
import { FolderIcon, InvisibleIcon } from "@components/atoms/icons";
import TableCell from "@components/molecules/tableCell";
import CategoryMenu from "@components/molecules/categoryMenu/categoryMenu";

interface IProps {
  category: ICategoryMetadata;
}

const CategoryTableRow = ({ category: categoryProp }: IProps) => {
  const setCategoryParent = useSetRecoilState(categoryShow);
  const [getBulkItems, setBulkItems] = useRecoilState(bulkItems);

  const handleRowClick = (selectedCategory: ICategoryMetadata) => {
    setCategoryParent(selectedCategory);
    setBulkItems([]);
  };

  const handleCheckItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked && (getBulkItems as ICategoryMetadata[]).length + 1 > 10) {
      e.target.checked = false;
      toast.error("نمیتوانید بیش از 10 ایتم را انتخاب کنید");
      return;
    }
    setBulkItems((oldValue) => {
      return isChecked
        ? [...(oldValue as ICategoryMetadata[]), categoryProp]
        : [...(oldValue as ICategoryMetadata[])].filter((item) => {
            return item.id !== categoryProp.id;
          }) || [];
    });
  };
  return (
    <TableCell
      key={`category-table-item-${categoryProp.id}`}
      onClick={() => {
        handleRowClick(categoryProp);
      }}
      tableCell={[
        {
          data: (
            <Checkbox
              crossOrigin=""
              onChange={handleCheckItem}
              checked={getBulkItems.some((bulkItem) => {
                return bulkItem.id === categoryProp.id;
              })}
            />
          ),
        },
        {
          data:
            categoryProp.order || categoryProp.order === 0
              ? categoryProp.order
              : "--",
          title: String(categoryProp.order) || "--",
        },
        {
          data: (
            <div className="flex">
              <FolderIcon className="stroke-blue-gray-600 w-5 h-5 min-w-[20px] min-h-[20px]" />
              <span
                className="flex gap-2 mr-2 text-ellipsis overflow-hidden w-12 sm:w-20 md:w-auto"
                title={categoryProp.name}
              >
                {categoryProp.isHidden && (
                  <InvisibleIcon className="w-5 h-5 flex-none" />
                )}
                {categoryProp.name}
              </span>
            </div>
          ),
        },
        {
          data: categoryProp.createdAt
            ? FaDateFromTimestamp(+categoryProp.createdAt)
            : "--",
          title: categoryProp.createdAt
            ? FaDateFromTimestamp(+categoryProp.createdAt)
            : "--",
        },
        {
          data: categoryProp.updatedAt
            ? FaDateFromTimestamp(+categoryProp.updatedAt)
            : "--",
          title: categoryProp.updatedAt
            ? FaDateFromTimestamp(+categoryProp.updatedAt)
            : "--",
        },
        {
          data: categoryProp.creator?.userName || "--",
          title: categoryProp.creator?.userName || "--",
        },
        {
          data: <CategoryMenu category={categoryProp} />,
        },
      ]}
    />
  );
};

export default CategoryTableRow;
