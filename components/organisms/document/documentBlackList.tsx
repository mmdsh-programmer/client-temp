import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import { UserIcon, XIcon } from "@components/atoms/icons";
import ChipMolecule from "@components/molecules/chip";
import FormInput from "@components/atoms/input/formInput";
import { IUserList } from "../dialogs/document/documentAccessPublishingDialog";
import { IWhiteListItem } from "@interface/document.interface";
import ImageComponent from "@components/atoms/image";

interface IProps {
  blackList?: IWhiteListItem[];
  selectedUserList: IUserList[];
  setSelectedUserList: React.Dispatch<React.SetStateAction<IUserList[]>>;
}

const DocumentBlackList = ({
  blackList,
  selectedUserList,
  setSelectedUserList,
}: IProps) => {
  const [inputValue, setInputValue] = useState("");

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const removeUser = (username: string) => {
    const updatedUserList = selectedUserList.filter((item) => {
      return username !== item.username;
    });
    setSelectedUserList(updatedUserList);
  };

  useEffect(() => {
    blackList?.map((item) => {
      return setSelectedUserList((preValue) => {
        return [
          ...preValue,
          {
            username: item.preferred_username,
            name: item.family_name,
            picture: item.picture,
          },
        ];
      });
    });
  }, [blackList]);

  return (
    <div className="flex flex-col gap-5">
      <FormInput
        placeholder="نام کاربری را وارد کنید..."
        onKeyDown={handleSpaceClick}
        value={inputValue}
        onChange={handleInputChange}
      />
      <Typography className="title_t4 text-secondary ">
        لیست سیاه سند
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
                      <XIcon
                        className={`${item.name ? "fill-icon-active" : "fill-icon-hover"} h-4 w-4`}
                      />
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
  );
};

export default DocumentBlackList;
