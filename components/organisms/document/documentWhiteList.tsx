import React, { useEffect, useState } from "react";
import { selectedDocumentAtom } from "@atom/document";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import useAddWhiteList from "@hooks/document/useAddWhiteList";
import { IWhiteListItem } from "@interface/document.interface";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { Button, Typography } from "@material-tailwind/react";
import ImageComponent from "@components/atoms/image";
import { UserIcon, XIcon } from "@components/atoms/icons";
import { toast } from "react-toastify";
import FormInput from "@components/atoms/input/formInput";
import ChipMolecule from "@components/molecules/chip";
import { IUserList } from "../dialogs/document/documentAccessPublishingDialog";

interface IProps {
  whiteList?: IWhiteListItem[];
  selectedUserList: IUserList[];
  setSelectedUserList: React.Dispatch<React.SetStateAction<IUserList[]>>;
}

const DocumentWhiteList = ({
  whiteList,
  selectedUserList,
  setSelectedUserList,
}: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);
  const [inputValue, setInputValue] = useState("");
  const [selectedUser, setSelectedUser] = useState<IWhiteListItem | null>(null);
  const whiteListHook = useAddWhiteList();

  const handleSpaceClick = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      event.code === "Space" ||
      event.code === "Enter" ||
      event.code === "NumpadEnter"
    ) {
      event.preventDefault();
      if (inputValue.length) {
        setSelectedUserList((oldValue) => {
          return [...oldValue, { username: inputValue }];
        });
        setInputValue("");
      }
    }
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const removeUser = (username: string) => {
    const updatedUserList = selectedUserList.filter((item) => {
      return username !== item.username;
    });
    setSelectedUserList(updatedUserList);
  };

  const handleRemoveUser = () => {
    if (!whiteList?.length) return;
    if (!getRepo || !document) return;

    const updatedUserList = whiteList.filter((userItem) => {
      return userItem.id !== selectedUser?.id;
    });

    whiteListHook.mutate({
      repoId: getRepo.id,
      documentId: document.id,
      usernameList: updatedUserList.map((userItem) => {
        return userItem.preferred_username;
      }),
      callBack: () => {
        toast.success("کاربر با موفقیت حذف شد");
        setSelectedUserList([]);
      },
    });
  };

  useEffect(() => {
    whiteList?.map((user) => {
      return setSelectedUserList([
        {
          username: user.preferred_username,
          name: `${user.given_name} %${user.family_name}`,
          picture: user.picture,
        },
      ]);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5">
        <FormInput
          placeholder="نام کاربری را وارد کنید..."
          onKeyDown={handleSpaceClick}
          value={inputValue}
          onChange={handleInputChange}
        />
        <Typography className="title_t4 text-secondary ">
          لیست سفید سند
        </Typography>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {selectedUserList?.length ? (
              selectedUserList.map((item) => {
                return (
                  <ChipMolecule
                    key={item.username}
                    value={item.name || item.username}
                    className={`${item.name ? "bg-white !text-primary" : "bg-gray-50 !text-hint"} 
                         w-auto pl-2 border-[1px] border-normal`}
                    icon={
                      item.picture ? (
                        <ImageComponent
                          className="w-full h-full rounded-full overflow-hidden"
                          src={item.picture}
                          alt={item.picture}
                        />
                      ) : (
                        <UserIcon className="w-full h-full p-1 border-[1px] border-normal rounded-full overflow-hidden fill-icon-hover" />
                      )
                    }
                    actionIcon={
                      <Button
                        className="bg-transparent p-0"
                        onClick={() => {
                          removeUser(item.username);
                        }}
                      >
                        <XIcon className={`${item.name ? "fill-icon-active" : "fill-icon-hover"} h-4 w-4`} />
                      </Button>
                    }
                  />
                );
              })
            ) : (
              <EmptyList type={EEmptyList.WHITE_LIST} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentWhiteList;
