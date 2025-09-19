import React from "react";
import { MoreLineIcon, TreeIcon } from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";
import { useAppStore } from "@store/app";

const CategoryListMode: React.FC = () => {
  const { categoryListMode: getListMode, setCategoryListMode: setListMode } = useAppStore();

  return (
    <div className="category-list-mode flex gap-2">
      <Button
        placeholder=""
        className={`table-mode flex h-9 w-9 items-center justify-center rounded-lg p-1 ${getListMode === "table" ? "bg-white !shadow-lg" : "bg-transparent"}`}
        onClick={() => {
          setListMode("table");
        }}
        {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
      >
        <MoreLineIcon className="h-4 w-4 stroke-icon-active" />
      </Button>
      <Button
        placeholder=""
        className={`tree-mode flex h-9 w-9 items-center justify-center rounded-lg p-1 ${getListMode === "tree" ? "bg-white !shadow-lg" : "bg-transparent"}`}
        onClick={() => {
          setListMode("tree");
        }}
        {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
      >
        <TreeIcon className="h-4 w-4 fill-white stroke-icon-active" />
      </Button>
    </div>
  );
};

export default CategoryListMode;
