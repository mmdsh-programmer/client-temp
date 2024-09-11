import React, { useState } from "react";
import { bulkItems } from "@atom/bulk";
import { useRecoilState } from "recoil";
import { Button, Typography } from "@material-tailwind/react";
import {
  DeleteIcon,
  FileTransformIcon,
  InfoIcon,
  XIcon,
} from "@components/atoms/icons";
import BulkDeleteDialog from "@components/organisms/dialogs/bulk/bulkDeleteDialog";
import CategoryMoveDialog from "@components/organisms/dialogs/category/categoryMoveDialog";

const CategoryBulk = () => {
  const [getBulkItems, setBulkItems] = useRecoilState(bulkItems);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openMoveDialog, setOpenMoveDialog] = useState<boolean | null>(null);
  return (
    <>
      <div className="hidden xs:flex font-iranYekan z-[9999] h-9 absolute bottom-[5%] right-[calc(50vw-180px)] rounded-lg bg-gray-900 ">
        <div className="flex h-full items-center justify-evenly">
          <div className="flex items-center justify-center gap-2 pr-3 pl-4">
            <InfoIcon className="h-6 w-6 stroke-white " />
            <Typography
              placeholder=""
              className="label_l2 !text-white whitespace-nowrap"
            >
              {getBulkItems.length} مورد انتخاب شده
            </Typography>
          </div>
          <div className="border-r-2 border-gray-500 h-full" />
          <Button
            className="label_l2 px-4 h-full"
            onClick={() => {
              setOpenMoveDialog(true);
            }}
          >
            انتقال
          </Button>
          <div className="border-r-2 border-gray-500 h-full" />
          <Button
            className="label_l2 px-4 h-full"
            onClick={() => {
              setOpenDeleteDialog(true);
            }}
          >
            حذف
          </Button>
          <div className="border-r-2 border-gray-500 h-full" />
          <Button
            className="label_l2 px-2 h-full"
            onClick={() => {
              setBulkItems([]);
            }}
          >
            <XIcon className="h-5 w-5 fill-gray-50" />
          </Button>
        </div>
      </div>
      <div className="absolute w-full bottom-0 mt-4 p-4 flex gap-x-2 justify-between items-center xs:hidden bg-white">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            setOpenMoveDialog(true);
          }}
        >
          <FileTransformIcon className="h-3 w-3" />
          <p className="text-[10px]">انتقال</p>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            setOpenDeleteDialog(true);
          }}
        >
          <DeleteIcon className="h-3 w-3" />
          <p className="text-[10px]">حذف</p>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            setBulkItems([]);
          }}
        >
          <XIcon className="h-3 w-3" />
          <p className="text-[10px]">انصراف</p>
        </div>
      </div>
      {openDeleteDialog && <BulkDeleteDialog setOpen={setOpenDeleteDialog} />}
      {openMoveDialog && <CategoryMoveDialog setOpen={setOpenMoveDialog} />}
    </>
  );
};

export default CategoryBulk;
