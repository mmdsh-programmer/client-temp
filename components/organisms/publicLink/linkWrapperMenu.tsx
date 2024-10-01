import React from "react";
import { IRoles } from "@interface/users.interface";
import { useRecoilState } from "recoil";
import { repoAtom } from "@atom/repository";
import { DeleteIcon } from "@components/atoms/icons";
import { Button, Spinner } from "@material-tailwind/react";
import useDeletePublicLink from "@hooks/public/useDeletePublicLink";
import { toast } from "react-toastify";
import { IRepo } from "@interface/repo.interface";

interface IProps {
  role: IRoles;
}

const LinkWrapperMenu = ({ role }: IProps) => {
  const [getRepo, setRepo] = useRecoilState(repoAtom);
  const deletePublicLinkHook = useDeletePublicLink();

  const handleRemovePublicLink = () => {
    if (!getRepo) return;

    deletePublicLinkHook.mutate({repoId: getRepo?.id,
      roleId: role.id,
      callBack: (name?: string) => {
        setRepo({ ...(getRepo as IRepo), [`${name}PublicLink`]: null });

        toast.success("لینک مورد نظر با موفقیت حذف شد");
      },});
  };

  return (
    <Button
      className="p-0 !min-h-10 !min-w-10 border-[1px] border-normal bg-white"
      onClick={handleRemovePublicLink}
    >
      {deletePublicLinkHook.isPending ? (
        <Spinner color="deep-purple" />
      ) : (
        <DeleteIcon className="h-5 w-5" />
      )}
    </Button>
  );
};

export default LinkWrapperMenu;
