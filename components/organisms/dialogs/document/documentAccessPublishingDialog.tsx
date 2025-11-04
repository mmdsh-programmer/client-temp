import React, { useEffect, useState } from "react";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import DocumentBlackList from "@components/organisms/document/documentBlackList";
import DocumentWhiteList from "@components/organisms/document/documentWhiteList";
import WhiteBlackAlertDialog from "./whiteBlackAlertDialog";
import { toast } from "react-toastify";
import useAddBlackList from "@hooks/document/useAddBlackList";
import useAddWhiteList from "@hooks/document/useAddWhiteList";
import useGetWhiteBlackList from "@hooks/document/useGetWhiteBlackList";
import Radio from "@components/atoms/radio";
import { useRepositoryStore } from "@store/repository";
import { useDocumentStore } from "@store/document";
import { Spinner } from "@components/atoms/spinner";

export interface IUserList {
  username: string;
  name?: string;
  picture?: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentAccessPublishingDialog = ({ setOpen }: IProps) => {
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const document = useDocumentStore((state) => {
    return state.selectedDocument;
  });
  const [type, setType] = useState<string>("white-list");
  const [alert, setAlert] = useState(false);
  const [selectedUserList, setSelectedUserList] = useState<IUserList[]>([]);

  const { data: userList, isLoading } = useGetWhiteBlackList(getRepo!.id, document!.id);

  const whiteListHook = useAddWhiteList();
  const blackListHook = useAddBlackList();

  const listHook = type === "black-list" ? blackListHook : whiteListHook;
  const users = userList?.blackList.length ? userList.blackList : userList?.whiteList;

  const handleClose = () => {
    setOpen(false);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (
      (userList?.blackList.length && value === "white-list") ||
      (userList?.whiteList.length && value === "black-list")
    ) {
      setAlert(true);
    } else {
      setType(value);
    }
  };

  const handleSubmit = async () => {
    if (!getRepo || !document) return;
    if (!selectedUserList.length && !users?.length) {
      toast.warn("لیست کاربران خالی است");
      return;
    }

    const serverUsernameArray = selectedUserList?.length
      ? selectedUserList.map((userItem) => {
          return userItem.username;
        })
      : [];

    listHook.mutate({
      repoId: getRepo.id,
      documentId: document?.id,
      usernameList: serverUsernameArray,
      callBack: () => {
        toast.success("تغییرات با موفقیت اعمال شد");
        setSelectedUserList([]);
      },
    });
  };

  useEffect(() => {
    if (userList?.blackList.length) {
      setType("black-list");
    } else {
      setType("white-list");
    }
  }, [userList]);

  const renderList = () => {
    if (type === "white-list") {
      return (
        <DocumentWhiteList
          whiteList={users}
          selectedUserList={selectedUserList}
          setSelectedUserList={setSelectedUserList}
        />
      );
    }
    return (
      <DocumentBlackList
        blackList={users}
        selectedUserList={selectedUserList}
        setSelectedUserList={setSelectedUserList}
      />
    );
  };

  return alert ? (
    <WhiteBlackAlertDialog
      type={type}
      onClose={() => {
        return setAlert(false);
      }}
    />
  ) : (
    <ConfirmFullHeightDialog
      isPending={listHook.isPending}
      onSubmit={handleSubmit}
      setOpen={handleClose}
      dialogHeader="محدودیت کاربران در پابلیش سند"
      className="document-limitation-dialog !min-h-[500px]"
    >
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <Radio
            className="document-white-list__radio-button radio !hover:shadow-none"
            name="type"
            label="لیست سفید"
            onChange={handleTypeChange}
            checked={type === "white-list"}
            value="white-list"
          />
          <Radio
            className="document-black-list__radio-button !hover:shadow-none"
            name="type"
            label="لیست سیاه"
            checked={type === "black-list"}
            onChange={handleTypeChange}
            value="black-list"
          />
        </div>
        {isLoading ? (
          <div className="w-full flex justify-center mt-4">
            <Spinner className="h-8 w-8" />
          </div>
        ) : (
          renderList()
        )}
      </div>
    </ConfirmFullHeightDialog>
  );
};

export default DocumentAccessPublishingDialog;
