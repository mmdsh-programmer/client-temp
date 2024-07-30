import { IPublicKey } from "@interface/repo.interface";
import React from "react";

interface IProps {
  keyItem: IPublicKey;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoKeyDeleteDialog = ({ keyItem, setOpen }: IProps) => {
  return <div>repositoryKeyDeleteDialog</div>;
};

export default RepoKeyDeleteDialog;
