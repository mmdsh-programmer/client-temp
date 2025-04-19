import { Button, Typography } from "@material-tailwind/react";
import {
  createRepoKeyAtom,
  deleteRepoKeyAtom,
  repoAtom,
} from "@atom/repository";
import { useRecoilState, useRecoilValue } from "recoil";

import { AddIcon } from "@components/atoms/icons";
import { ERoles } from "@interface/enums";
import InfoDialog from "@components/templates/dialog/infoDialog";
import React from "react";
import RepoKeyCreateDialog from "./repoKeyCreateDialog";
import RepoKeyDeleteDialog from "./repoKeyDeleteDialog";
import RepoKeyList from "./repoKeyList";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoKeyDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);

  const [getDeleteRepoKey, setDeleteRepoKey] =
    useRecoilState(deleteRepoKeyAtom);
  const [getCreateRepoKey, setCreateRepoKey] =
    useRecoilState(createRepoKeyAtom);

  const handleClose = () => {
    setOpen(false);
  };

  // eslint-disable-next-line no-nested-ternary
  return getCreateRepoKey && getRepo ? (
    <RepoKeyCreateDialog repoId={getRepo.id} setOpen={setCreateRepoKey} />
  ) : getDeleteRepoKey && getRepo ? (
    <RepoKeyDeleteDialog repoId={getRepo.id} setOpen={setDeleteRepoKey} />
  ) : (
    <InfoDialog dialogHeader="لیست کلید های مخزن" setOpen={handleClose}>
      <div className="p-4">
        {getRepo?.roleName === ERoles.owner ? (
          <Button
            placeholder="create repo key"
            className="repo-key-dialog__create-button flex justify-between items-center shadow-none hover:shadow-none px-1 h-8 bg-white hover:bg-transparent border-[1px] border-normal mr-auto"
            onClick={() => {
              setCreateRepoKey(true);
            }}
          >
            <AddIcon className="h-5 w-5 stroke-icon-active" />
            <Typography className="text__label__button text-primary_normal px-2">
              ایجاد کلید
            </Typography>
          </Button>
        ) : null}
        <div className="w-full overflow-auto max-h-[calc(100dvh-200px)] border-[0.5px] border-normal rounded-lg mt-4">
          {getRepo && <RepoKeyList repoId={getRepo.id} hasAction />}
        </div>
      </div>
    </InfoDialog>
  );
};

export default RepoKeyDialog;
