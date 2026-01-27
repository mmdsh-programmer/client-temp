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
                className: "!pl-0 !pr-3",
                stopPropagation: true,
              },
          currentPath === "/admin/dashboard"
            ? null
            : {
                data: (
                  <div className="!h-full !w-[50px] !max-w-[50px] text-center">
                    {categoryProp.order || categoryProp.order === 0 ? categoryProp.order : "--"}
                  </div>
                ),
                title: String(categoryProp.order) || "--",
                className: "hidden xl:table-cell !w-[60px] !max-w-[60px] ",
              },
          {
            data: (
              <div className="flex gap-2">
                <FolderIcon className="!h-5 min-h-5 !w-5 min-w-5 stroke-blue-gray-600" />
                <span
                  className="w-auto overflow-hidden truncate text-ellipsis"
                  title={categoryProp.name}
                >
                  {categoryProp.name}
                </span>
              </div>
            ),
            className: "w-auto max-w-[100px] xs:max-w-[100px] sm:max-w-[150px] md:max-w-[200px] lg:max-w-[150px] xl:max-w-[200px] 2xl:max-w-[400px]",
          },
          currentPath === "/admin/dashboard"
            ? null
            : {
                data: (
                  <div className="!h-full !w-[150px] !max-w-[150px] text-center">
                    {categoryProp.createdAt ? FaDateFromTimestamp(+categoryProp.createdAt) : "--"}
                  </div>
                ),
                title: categoryProp.createdAt ? FaDateFromTimestamp(+categoryProp.createdAt) : "--",
                className: "!w-[160px] !max-w-[160px] px-0",
              },
          currentPath === "/admin/dashboard"
            ? null
            : {
                data: (
                  <div className="!h-full !w-[150px] !max-w-[150px] text-center">
                    {categoryProp.updatedAt ? FaDateFromTimestamp(+categoryProp.updatedAt) : "--"}
                  </div>
                ),
                title: categoryProp.updatedAt ? FaDateFromTimestamp(+categoryProp.updatedAt) : "--",
                className: "hidden xl:table-cell !w-[160px] !max-w-[160px] px-0",
              },
          {
            data: (
              <div className="!h-full !w-[150px] !max-w-[150px] text-center">
                {categoryProp.creator?.name || "--"}
              </div>
            ),
            title: categoryProp.creator?.name || "--",
            className: "hidden lg:table-cell !w-[160px] !max-w-[160px] !px-0 ",
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
