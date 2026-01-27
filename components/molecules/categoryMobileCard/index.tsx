import React from "react";
import { Typography } from "@material-tailwind/react";
import CategoryMenu from "../categoryMenu/categoryMenu";
import { FaDateFromTimestamp } from "@utils/index";
import { FolderIcon } from "@components/atoms/icons";
import { ICategoryMetadata } from "@interface/category.interface";
import MobileCard from "../mobileCard";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import Checkbox from "@components/atoms/checkbox";
import { useCategoryStore } from "@store/category";
import { useBulkStore } from "@store/bulk";

interface IProps {
  category: ICategoryMetadata;
}

const CategoryMobileCard = ({ category }: IProps) => {
  const currentPath = usePathname();
  const { setCategoryShow: setCategoryParent } = useCategoryStore();
  const { bulkItems: getBulkItems, setBulkItems } = useBulkStore();

  const handleCardClick = (selectedCategory: ICategoryMetadata) => {
    window.metrics?.track("select-category");
    setCategoryParent(selectedCategory);
    setBulkItems([]);
  };

  const handleCheckItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    window.metrics?.track("select-bulk-item");
    const isChecked = e.target.checked;
    if (isChecked && getBulkItems.length + 1 > 10) {
      e.target.checked = false;
      toast.error("نمی‌توانید بیش از 10 آیتم را انتخاب کنید");
      return;
    }
    setBulkItems(
      isChecked
        ? [...getBulkItems, category]
        : getBulkItems.filter((item) => {
            return item.id !== category.id;
          }),
    );
  };

  return (
    <MobileCard
      className="category-mobile-card"
      name={
        <div className="flex w-full items-center gap-2">
          {currentPath === "/admin/dashboard" ? null : (
            <Checkbox
              onClick={(e) => {
                return e.stopPropagation();
              }}
              onChange={(e) => {
                handleCheckItem(e);
              }}
              checked={getBulkItems.some((bulkItem) => {
                return bulkItem.id === category.id;
              })}
            />
          )}
          <div className="flex max-w-full items-center gap-2">
            <FolderIcon className="h-5 min-h-5 w-5 min-w-5 stroke-blue-gray-600" />
            <Typography
              placeholder=""
              className="flex whitespace-nowrap max-w-[80%] flex-grow overflow-hidden truncate text-ellipsis text-primary_normal"
              title={category.name}
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {category.name}
            </Typography>
          </div>
        </div>
      }
      description={[
        {
          title: "تاریخ ایجاد",
          value: category.createdAt ? FaDateFromTimestamp(+category.createdAt) : "--",
        },
        { title: "سازنده", value: category.creator?.userName || "--" },
      ]}
      onClick={() => {
        return handleCardClick(category);
      }}
      cardAction={<CategoryMenu category={category} />}
    />
  );
};

export default CategoryMobileCard;
