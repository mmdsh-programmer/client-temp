import React from "react";
import CategoryMenu from "@components/molecules/categoryMenu/categoryMenu";
import { FaDateFromTimestamp } from "@utils/index";
import { FolderIcon } from "@components/atoms/icons";
import { ICategoryMetadata } from "@interface/category.interface";
import TableCell, { ITableCell } from "@components/molecules/tableCell";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import Checkbox from "@components/atoms/checkbox";
import { useCategoryStore } from "@store/category";
import { useBulkStore } from "@store/bulk";
import { useRepositoryStore } from "@store/repository";

interface IProps {
  category: ICategoryMetadata;
}

const CategoryTableRow = ({ category: categoryProp }: IProps) => {
  const currentPath = usePathname();
  const { setRepositoryId } = useRepositoryStore();
  const { setCategoryShow } = useCategoryStore();
  const { bulkItems: getBulkItems, setBulkItems } = useBulkStore();

  const handleRowClick = (selectedCategory: ICategoryMetadata) => {
    setCategoryShow(selectedCategory);
    setBulkItems([]);
    if (currentPath !== "/admin/repositories") {
      setRepositoryId(selectedCategory.repoId);
    }
  };

  const handleCheckItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked && (getBulkItems as ICategoryMetadata[]).length + 1 > 10) {
      e.target.checked = false;
      toast.error("نمی‌توانید بیش از 10 آیتم را انتخاب کنید");
      return;
    }
    setBulkItems(
      isChecked
        ? [...getBulkItems, categoryProp]
        : getBulkItems.filter((item) => {
            return item.id !== categoryProp.id;
          }),
    );
  };
  return (
    <TableCell
      active={!!categoryProp.newOne}
      key={`category-table-item-${categoryProp.id}`}
      onClick={() => {
        return handleRowClick(categoryProp);
      }}
      className="category-table-row"
      tableCell={
        [
          currentPath === "/admin/dashboard"
            ? null
            : {
                data: (
                  <Checkbox
                    onChange={handleCheckItem}
                    checked={getBulkItems.some((bulkItem) => {
                      return bulkItem.id === categoryProp.id;
                    })}
                  />
                ),
                className: "!pl-0 !pr-2",
                stopPropagation: true,
              },
          currentPath === "/admin/dashboard"
            ? null
            : {
                data: categoryProp.order || categoryProp.order === 0 ? categoryProp.order : "--",
                title: String(categoryProp.order) || "--",
                className: "hidden xl:table-cell text-center !px-0",
              },
          {
            data: (
              <div className="flex">
                <FolderIcon className="h-5 min-h-5 w-5 min-w-5 stroke-blue-gray-600" />
                <span
                  className="mr-2 flex gap-2 overflow-hidden truncate text-ellipsis"
                  title={categoryProp.name}
                >
                  {categoryProp.name}
                </span>
              </div>
            ),
            className:
              "!px-3 !max-w-[180px] !w-[180px] sm:!max-w-[300px] sm:!w-[300px] md:!max-w-[250px] md:!w-[250px] xl:!max-w-[300px] xl:!w-[300px]",
          },
          currentPath === "/admin/dashboard"
            ? null
            : {
                data: categoryProp.createdAt ? FaDateFromTimestamp(+categoryProp.createdAt) : "--",
                title: categoryProp.createdAt ? FaDateFromTimestamp(+categoryProp.createdAt) : "--",
                className: "!px-3",
              },
          currentPath === "/admin/dashboard"
            ? null
            : {
                data: categoryProp.updatedAt ? FaDateFromTimestamp(+categoryProp.updatedAt) : "--",
                title: categoryProp.updatedAt ? FaDateFromTimestamp(+categoryProp.updatedAt) : "--",
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
        ].filter(Boolean) as ITableCell[]
      }
    />
  );
};

export default CategoryTableRow;
