import React from "react";
import { IRepo } from "@interface/repo.interface";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { Button, Typography } from "@material-tailwind/react";
import { AddIcon } from "@components/atoms/icons";
import { useRecoilState } from "recoil";
import { createRepoKeyAtom, deleteRepoKeyAtom } from "@atom/repository";
import RepoKeyDeleteDialog from "./repoKeyDeleteDialog";
import RepoKeyCreateDialog from "./repoKeyCreateDialog";
import RepoKeyList from "./repoKeyList";

interface IProps {
  repo?: IRepo;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoKeyDialog = ({ repo, setOpen }: IProps) => {
  const [getDeleteRepoKey, setDeleteRepoKey] =
    useRecoilState(deleteRepoKeyAtom);
  const [getCreateRepoKey, setCreateRepoKey] =
    useRecoilState(createRepoKeyAtom);

  const handleClose = () => {
    setOpen(false);
  };

  return getCreateRepoKey && repo ? (
    <RepoKeyCreateDialog repoId={repo.id} setOpen={setCreateRepoKey} />
  ) : getDeleteRepoKey && repo ? (
    <RepoKeyDeleteDialog repoId={repo.id} setOpen={setDeleteRepoKey} />
  ) : (
    <InfoDialog dialogHeader="لیست کلید های مخزن" setOpen={handleClose}>
      <div className="p-4">
        <Button
          placeholder="create group"
          className="flex justify-between items-center shadow-none hover:shadow-none px-1 h-8 bg-white hover:bg-transparent border-[1px] border-normal mr-auto"
          onClick={() => {
            setCreateRepoKey(true);
          }}
        >
          <AddIcon className="h-5 w-5 stroke-icon-active" />
          <Typography className="text__label__button text-primary px-2">
            ایجاد کلید
          </Typography>
        </Button>

        <div className="w-full overflow-auto max-h-[calc(100dvh-200px)] border-[0.5px] border-normal rounded-lg mt-4">
          {repo && <RepoKeyList repoId={repo.id} hasAction />}
        </div>
      </div>
    </InfoDialog>
  );
};

export default RepoKeyDialog;
