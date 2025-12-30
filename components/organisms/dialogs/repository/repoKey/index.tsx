import { Button, Typography } from "@material-tailwind/react";
import { ERoles } from "@interface/enums";
import { AddIcon } from "@components/atoms/icons";
import InfoDialog from "@components/templates/dialog/infoDialog";
import React from "react";
import RepoKeyCreateDialog from "./repoKeyCreateDialog";
import RepoKeyDeleteDialog from "./repoKeyDeleteDialog";
import RepoKeyList from "./repoKeyList";
import {
  useRepositoryStore,
  useDeleteRepoKeyStore,
  useCreateRepoKeyStore,
} from "@store/repository";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoKeyDialog = ({ setOpen }: IProps) => {
  const { repo: getRepo } = useRepositoryStore();
  const { deleteRepoKey, setDeleteRepoKey } = useDeleteRepoKeyStore();
  const { createRepoKey, setCreateRepoKey } = useCreateRepoKeyStore();

  const handleClose = () => {
    setOpen(false);
  };

  // eslint-disable-next-line no-nested-ternary
  return createRepoKey && getRepo ? (
    <RepoKeyCreateDialog
      repoId={getRepo.id}
      setOpen={() => {
        return setCreateRepoKey(false);
      }}
    />
  ) : deleteRepoKey && getRepo ? (
    <RepoKeyDeleteDialog
      repoId={getRepo.id}
      setOpen={() => {
        return setDeleteRepoKey(null);
      }}
    />
  ) : (
    <InfoDialog dialogHeader="لیست کلید های مخزن" setOpen={handleClose}>
      <div className="flex flex-grow flex-col p-4">
        {getRepo?.roleName === ERoles.owner || getRepo?.roleName === ERoles.admin ? (
          <Button
            {...({} as React.ComponentProps<typeof Button>)}
            className="repo-key-dialog__create-button mr-auto flex h-8 items-center justify-between border-[1px] border-normal bg-white px-1 shadow-none hover:bg-transparent hover:shadow-none"
            onClick={() => {
              setCreateRepoKey(true);
            }}
          >
            <AddIcon className="h-5 w-5 stroke-icon-active" />
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="text__label__button px-2 text-primary_normal">
              ایجاد کلید
            </Typography>
          </Button>
        ) : null}
        <div className="mt-4 max-h-[calc(100dvh-200px)] w-full flex-grow overflow-auto rounded-lg border-[0.5px] border-normal">
          {getRepo && <RepoKeyList repoId={getRepo.id} hasAction />}
        </div>
      </div>
    </InfoDialog>
  );
};

export default RepoKeyDialog;
