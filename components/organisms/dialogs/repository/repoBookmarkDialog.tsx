import React from "react";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useBookmarkRepo from "@hooks/repository/useBookmarkRepo";
import { useRecoilState } from "recoil";
import { repoAtom } from "@atom/repository";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoBookmarkDialog = ({ setOpen }: IProps) => {
  const [getRepo, setRepo] = useRecoilState(repoAtom);
  const { isPending, mutate } = useBookmarkRepo();

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    if (!getRepo) return;
    if (!getRepo.bookmark) {
      mutate({
        repoId: getRepo.id,
        callBack: () => {
          toast.success("مخزن مورد نظر به نشان شده ها اضافه شد.");
          setRepo({
            ...getRepo,
            bookmark: true,
          });
          handleClose();
        },
      });
    } else {
      mutate({
        repoId: getRepo.id,
        detach: true,
        callBack: () => {
          toast.success("مخزن مورد نظر از نشان شده ها حذف شد.");
          setRepo({
            ...getRepo,
            bookmark: false,
          });
          handleClose();
        },
      });
    }
  };
  return (
    <ConfirmDialog
      isPending={isPending}
      dialogHeader={getRepo?.bookmark ? "حذف نشان مخزن" : "نشان‌دار کردن مخزن"}
      onSubmit={handleSubmit}
      setOpen={handleClose}
      className=""
    >
      آیا از {getRepo?.bookmark ? " حذف نشان   " : "  نشان‌دار کردن  "}"
      <Typography
        title={getRepo?.name}
        placeholder="name"
        className="text-primary max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]"
      >
        {getRepo?.name}
      </Typography>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default RepoBookmarkDialog;
