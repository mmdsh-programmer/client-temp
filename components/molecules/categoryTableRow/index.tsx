import React from "react";
import { FolderIcon } from "@components/atoms/icons";
import { useRecoilState, useSetRecoilState } from "recoil";
import CategoryMenu from "@components/molecules/categoryMenu/categoryMenu";
import { Checkbox } from "@material-tailwind/react";
import { FaDateFromTimestamp } from "@utils/index";
import { ICategoryMetadata } from "@interface/category.interface";
import TableCell from "@components/molecules/tableCell";
import { bulkItemsAtom } from "@atom/bulk";
import { categoryShowAtom } from "@atom/category";
import { toast } from "react-toastify";

interface IProps {
  category: ICategoryMetadata;
}

const CategoryTableRow = ({ category: categoryProp }: IProps) => {
  const setCategoryParent = useSetRecoilState(categoryShowAtom);
  const [getBulkItems, setBulkItems] = useRecoilState(bulkItemsAtom);

  const handleRowClick = (selectedCategory: ICategoryMetadata) => {
    setCategoryParent(selectedCategory);
    setBulkItems([]);
  };

  const handleCheckItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked && (getBulkItems as ICategoryMetadata[]).length + 1 > 10) {
      e.target.checked = false;
      toast.error("نمی‌توانید بیش از 10 ایتم را انتخاب کنید");
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
      active={!!categoryProp.newOne}
      key={`category-table-item-${categoryProp.id}`}
      onClick={() => {
        return handleRowClick(categoryProp);
      }}
      className="category-table-row"
      tableCell={[
        {
          data: (
            <Checkbox
              color="deep-purple"
              crossOrigin=""
              onChange={handleCheckItem}
              checked={getBulkItems.some((bulkItem) => {
                return bulkItem.id === categoryProp.id;
              })}
            />
          ),
          className: "!px-0",
          stopPropagation: true,
        },
        {
          data:
            categoryProp.order || categoryProp.order === 0
              ? categoryProp.order
              : "--",

          title: String(categoryProp.order) || "--",
          className:
            "hidden xl:table-cell text-center !px-0",
        },
        {
          data: (
            <div className="flex">
              <FolderIcon className="stroke-blue-gray-600 w-5 h-5 min-w-5 min-h-5" />
              <span
                className="truncate flex gap-2 mr-2 text-ellipsis overflow-hidden"
                title={categoryProp.name}
              >
                {categoryProp.name}
              </span>
            </div>
          ),
          className:
            "!px-3 !max-w-[180px] !w-[180px] sm:!max-w-[300px] sm:!w-[300px] md:!max-w-[250px] md:!w-[250px] xl:!max-w-[50%] xl:!w-[40%]",
        },
        {
          data: categoryProp.createdAt
            ? FaDateFromTimestamp(+categoryProp.createdAt)
            : "--",
          title: categoryProp.createdAt
            ? FaDateFromTimestamp(+categoryProp.createdAt)
            : "--",
          className: "!px-3",
        },
        {
          data: categoryProp.updatedAt
            ? FaDateFromTimestamp(+categoryProp.updatedAt)
            : "--",
          title: categoryProp.updatedAt
            ? FaDateFromTimestamp(+categoryProp.updatedAt)
            : "--",
          className: "hidden xl:table-cell !px-3",
        },
        {
          data: categoryProp.creator?.name || "--",
          title: categoryProp.creator?.name || "--",
          className: "hidden lg:table-cell !px-3",
        },
        {
          data: <CategoryMenu category={categoryProp} />,
          stopPropagation: true,
          className: "!px-2",
        },
      ]}
    />
  );
};

export default CategoryTableRow;
