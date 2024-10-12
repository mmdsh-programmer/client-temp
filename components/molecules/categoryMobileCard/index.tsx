import React from "react";
import { bulkItemsAtom } from "@atom/bulk";
import { categoryShowAtom } from "@atom/category";
import { ICategoryMetadata } from "@interface/category.interface";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import MobileCard from "../mobileCard";
import { Checkbox, Typography } from "@material-tailwind/react";
import { FaDateFromTimestamp } from "@utils/index";
import CategoryMenu from "../categoryMenu/categoryMenu";

interface IProps {
  category: ICategoryMetadata;
}

const CategoryMobileCard = ({ category }: IProps) => {
  const setCategoryParent = useSetRecoilState(categoryShowAtom);
  const [getBulkItems, setBulkItems] = useRecoilState(bulkItemsAtom);

  const handleCardClick = (selectedCategory: ICategoryMetadata) => {
    setCategoryParent(selectedCategory);
    setBulkItems([]);
  };

  const handleCheckItem = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
      name={
        <div className="flex items-center gap-2">
          <Checkbox
            color="deep-purple"
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
          <Typography className="text-primary title_t2">
            {category.name}
          </Typography>
        </div>
      }
      description={[
        {
          title: "تاریخ ایجاد",
          value: category.createdAt
            ? FaDateFromTimestamp(+category.createdAt)
            : "--",
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
