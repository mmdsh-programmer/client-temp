import React from "react";
import { MoreLineIcon, TreeIcon } from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";
import { categoryListModeAtom } from "@atom/app";
import { useRecoilState } from "recoil";

const CategoryListMode: React.FC = () => {
  const [getListMode, setListMode] = useRecoilState(categoryListModeAtom);
  return (
    <div className="category-list-mode flex gap-2">
      <Button
        className={`table-mode rounded-lg p-1 flex justify-center items-center h-9 w-9
    ${getListMode === "table" ? "bg-white !shadow-lg" : "bg-transparent"}`}
        onClick={() => {
          setListMode("table");
        }}
      >
        <MoreLineIcon className="h-4 w-4 stroke-icon-active" />
      </Button>
      <Button
        className={`tree-mode rounded-lg p-1  flex justify-center items-center h-9 w-9
    ${getListMode === "tree" ? "bg-white !shadow-lg" : "bg-transparent"}`}
        onClick={() => {
          setListMode("tree");
        }}
      >
        <TreeIcon className="h-4 w-4 stroke-icon-active fill-white" />
      </Button>
    </div>
  );
};

export default CategoryListMode;
