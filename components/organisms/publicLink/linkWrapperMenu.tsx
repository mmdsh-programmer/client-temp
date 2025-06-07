import { Button } from "@material-tailwind/react";

import { DeleteIcon } from "@components/atoms/icons";
import { IRepo } from "@interface/repo.interface";
import { IRoles } from "@interface/users.interface";
import React from "react";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useDeletePublicLink from "@hooks/public/useDeletePublicLink";
import { useRecoilState } from "recoil";
import { Spinner } from "@components/atoms/spinner";

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
      className="public-link-delete-button p-0 !min-h-10 !min-w-10 border-[1px] border-normal bg-white"
      onClick={handleRemovePublicLink}
    >
      {deletePublicLinkHook.isPending ? (
        <Spinner className="text-primary h-6 w-6" />
      ) : (
        <DeleteIcon className="h-5 w-5" />
      )}
    </Button>
  );
};

export default LinkWrapperMenu;
