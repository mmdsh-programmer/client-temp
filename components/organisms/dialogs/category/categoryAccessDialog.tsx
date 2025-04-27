import {
 DialogBody,
 Typography
} from "@material-tailwind/react";
import React, { useState } from "react";

import CategoryBlockList from "@components/organisms/category/categoryBlocklist";
import InfoDialog from "@components/templates/dialog/infoDialog";
import LoadingButton from "@components/molecules/loadingButton";
import SearchableDropdown from "@components/molecules/searchableDropdown";
import { categoryAtom } from "@atom/category";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useBlockCategory from "@hooks/category/useBlockCategory";
import useGetRepoUsers from "@hooks/user/useGetRepoUsers";
import { useRecoilValue } from "recoil";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CategoryAccessDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const category = useRecoilValue(categoryAtom);

  const [value, setValue] = useState("");

  const {data: getRepoUsers} = useGetRepoUsers(getRepo!.id, 20, true);
  const blockCatgory = useBlockCategory();

  const filteredUsers = getRepoUsers?.pages[0].list
    .filter((item) => {
      return item.userRole !== "owner";
    })
    .map((user) => {
      return { label: user.userInfo.userName, value: user.userInfo.userName };
    });

  const handleClose = () => {
    setOpen(false);
  };

  const handleBlock = () => {
    if (!getRepo || !category) return;
    if (!value) return;
    blockCatgory.mutate({
      repoId: getRepo.id,
      categoryId: category.id,
      username: value,
      type: "block",
      callBack: () => {
        toast.success(`کاربر ${value} با موفقیت از دسته‌بندی بلاک شد.`);
      },
    });
  };

  return (
    <InfoDialog
      dialogHeader="محدودیت دسترسی روی پنل"
      setOpen={handleClose}
      className="category-access-dialog min-h-[350px] "
    >
      <DialogBody>
        <form className="flex flex-col gap-6">
          <div className="flex gap-2">
            <div className="searchable-dropdown flex-grow">
              <SearchableDropdown
                options={filteredUsers}
                handleSelect={(val) => {
                  return setValue(`${val.value}`);
                }}
                showInput
              />
            </div>
            <LoadingButton
              className="add-button !h-10 bg-primary-normal hover:bg-primary-normal active:bg-primary-normal"
              onClick={handleBlock}
              loading={blockCatgory.isPending}
              disabled={!value}
            >
              <Typography className="text__label__button text-white">
                افزودن
              </Typography>
            </LoadingButton>
          </div>
          <CategoryBlockList />
        </form>
      </DialogBody>
    </InfoDialog>
  );
};

export default CategoryAccessDialog;
