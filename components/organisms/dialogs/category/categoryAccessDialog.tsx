import React, { useState } from "react";
import {
 DialogBody,
 Typography
} from "@material-tailwind/react";
import { useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import SearchableDropdown from "@components/molecules/searchableDropdown";
import useGetRepoUsers from "@hooks/user/useGetRepoUsers";
import LoadingButton from "@components/molecules/loadingButton";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { categoryAtom } from "@atom/category";
import useBlockCategory from "@hooks/category/useBlockCategory";
import CategoryBlockList from "@components/organisms/category/categoryBlocklist";

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
      dialogHeader="محدودیت دسترسی روی دسته‌بندی"
      setOpen={handleClose}
      className="min-h-[350px]"
    >
      <DialogBody>
        <form className="flex flex-col gap-6">
          <div className="flex gap-2">
            <div className="flex-grow">
              <SearchableDropdown
                options={filteredUsers}
                handleChange={(val) => {
                  return setValue(`${val.value}`);
                }}
              />
            </div>
            <LoadingButton
              className="!h-10 bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
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
