import {
 DialogBody,
 Typography
} from "@material-tailwind/react";
import React, { useState } from "react";

import DocumentBlockList from "@components/organisms/document/documentBlockList";
import InfoDialog from "@components/templates/dialog/infoDialog";
import LoadingButton from "@components/molecules/loadingButton";
import SearchableDropdown from "@components/molecules/searchableDropdown";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import useBlockDocument from "@hooks/document/useBlockDocument";
import useGetRepoUsers from "@hooks/user/useGetRepoUsers";
import { useRecoilValue } from "recoil";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentAccessDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);

  const [value, setValue] = useState("");

  const repoId = getRepo!.id;
  const { data: getRepoUsers } = useGetRepoUsers(repoId, 20, true);

  const blockDocument = useBlockDocument();

  const filteredUsers = getRepoUsers?.pages[0].list
    .filter((item) => {
      return item.userRole !== "owner";
    })
    .map((user) => {
      return {
        label: user.userInfo.userName,
        value: user.userInfo.userName,
      };
    });

  const handleClose = () => {
    setOpen(false);
  };

  const handleBlock = async () => {
    if (!getRepo || !document) return;
    if (!value) return;
    blockDocument.mutate({
      repoId: getRepo.id,
      documentId: document.id,
      username: value,
      type: "block",
      callBack: () => {
        toast.success(`کاربر ${value} با موفقیت از سند بلاک شد.`);
      },
    });
  };

  return (
    <InfoDialog
      dialogHeader="محدودیت دسترسی در پنل"
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
              loading={blockDocument.isPending}
              disabled={!value}
            >
              <Typography className="text__label__button text-white">
                افزودن
              </Typography>
            </LoadingButton>
          </div>
          <DocumentBlockList />
        </form>
      </DialogBody>
    </InfoDialog>
  );
};

export default DocumentAccessDialog;
