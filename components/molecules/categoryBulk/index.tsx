import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { DeleteIcon, FileTransformIcon, InfoIcon, XIcon } from "@components/atoms/icons";
import BulkDeleteDialog from "@components/organisms/dialogs/bulk/bulkDeleteDialog";
import BulkMoveDialog from "@components/organisms/dialogs/bulk/bulkMoveDialog";
import { useBulkStore } from "@store/bulk";

const CategoryBulk = () => {
  const getBulkItems = useBulkStore((state) => {
    return state.bulkItems;
  });
  const setBulkItems = useBulkStore((state) => {
    return state.setBulkItems;
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openMoveDialog, setOpenMoveDialog] = useState<boolean | null>(null);
  return (
    <>
      <div className="category-bulk absolute bottom-[5%] right-[calc(50vw-180px)] z-[9999] hidden h-9 rounded-lg bg-gray-900 font-iranYekan xs:flex">
        <div className="flex h-full items-center justify-evenly">
          <div className="flex items-center justify-center gap-2 pl-4 pr-3">
            <InfoIcon className="h-6 w-6 stroke-white" />
            <Typography placeholder="" className="label_l2 whitespace-nowrap !text-white">
              {getBulkItems.length} مورد انتخاب شده
            </Typography>
          </div>
          <div className="h-full border-r-2 border-gray-500" />
          <Button
            className="move label_l2 h-full px-4"
            onClick={() => {
              setOpenMoveDialog(true);
            }}
          >
            انتقال
          </Button>
          <div className="h-full border-r-2 border-gray-500" />
          <Button
            className="delete label_l2 h-full px-4"
            onClick={() => {
              setOpenDeleteDialog(true);
            }}
          >
            حذف
          </Button>
          <div className="h-full border-r-2 border-gray-500" />
          <Button
            className="cancel label_l2 h-full px-2"
            onClick={() => {
              setBulkItems([]);
            }}
          >
            <XIcon className="h-5 w-5 fill-gray-50" />
          </Button>
        </div>
      </div>
      <div className="category-bulk absolute bottom-0 z-[9999] mt-4 flex w-full items-center justify-between gap-x-2 bg-white p-4 xs:hidden">
        <div
          className="move flex cursor-pointer flex-col items-center"
          onClick={() => {
            setOpenMoveDialog(true);
          }}
        >
          <FileTransformIcon className="h-3 w-3" />
          <p className="text-[10px]">انتقال</p>
        </div>
        <div
          className="delete flex cursor-pointer flex-col items-center"
          onClick={() => {
            setOpenDeleteDialog(true);
          }}
        >
          <DeleteIcon className="h-3 w-3" />
          <p className="text-[10px]">حذف</p>
        </div>
        <div
          className="cancel flex cursor-pointer flex-col items-center"
          onClick={() => {
            setBulkItems([]);
          }}
        >
          <XIcon className="h-3 w-3" />
          <p className="text-[10px]">انصراف</p>
        </div>
      </div>
      {openDeleteDialog && <BulkDeleteDialog setOpen={setOpenDeleteDialog} />}
      {openMoveDialog && <BulkMoveDialog setOpen={setOpenMoveDialog} />}
    </>
  );
};

export default CategoryBulk;
