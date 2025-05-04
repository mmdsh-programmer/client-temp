import { Checkbox, Typography } from "@material-tailwind/react";
import { useRecoilState, useSetRecoilState } from "recoil";

import CategoryMenu from "../categoryMenu/categoryMenu";
import { FaDateFromTimestamp } from "@utils/index";
import { FolderIcon } from "@components/atoms/icons";
import { ICategoryMetadata } from "@interface/category.interface";
import MobileCard from "../mobileCard";
import React from "react";
import { bulkItemsAtom } from "@atom/bulk";
import { categoryShowAtom } from "@atom/category";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

interface IProps {
  category: ICategoryMetadata;
}

const CategoryMobileCard = ({ category }: IProps) => {
  const currentPath = usePathname();
  const setCategoryParent = useSetRecoilState(categoryShowAtom);
  const [getBulkItems, setBulkItems] = useRecoilState(bulkItemsAtom);

  const handleCardClick = (selectedCategory: ICategoryMetadata) => {
    setCategoryParent(selectedCategory);
    setBulkItems([]);
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
        ? [...oldValue, category]
        : [...oldValue].filter((item) => {
            return item.id !== category.id;
          }) || [];
    });
  };

  return (
    <MobileCard
      className="category-mobile-card"
      name={
        <div className="flex w-full items-center gap-2">
          {currentPath === "/admin/dashboard" ? null : (
            <Checkbox
              color="purple"
              containerProps={{
                className: "p-[2px]",
              }}
              onClick={(e) => {
                return e.stopPropagation();
              }}
              crossOrigin=""
              onChange={(e) => {
                handleCheckItem(e);
              }}
              checked={getBulkItems.some((bulkItem) => {
                return bulkItem.id === category.id;
              })}
            />
          )}
          <div className="flex max-w-full gap-2">
            <FolderIcon className="h-5 min-h-5 w-5 min-w-5 stroke-blue-gray-600" />
            <Typography
              className="flex max-w-[80%] flex-grow overflow-hidden truncate text-ellipsis"
              title={category.name}
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
