import React, { useState } from "react";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import { Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { IUserList } from "../document/documentAccessPublishingDialog";
import { UserIcon, XIcon } from "@components/atoms/icons";
import ImageComponent from "next/image";
import ChipMolecule from "@components/molecules/chip";
import useAddPartyToDomain from "@hooks/domainParticipants/useAddPartyToDomain";

interface IForm {
  members: string[];
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddDomainParticipantDialog = ({ setOpen }: IProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedUserList, setSelectedUserList] = useState<IUserList[]>([]);

  const addPartyToDomain = useAddPartyToDomain();

  const form = useForm<IForm>();
  const {
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = form;

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

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

  const onSubmit = async () => {
    const usernameArray = selectedUserList?.length
      ? selectedUserList.map((userItem) => {
          return userItem.username;
        })
      : [];

    addPartyToDomain.mutate({
      userNameList: usernameArray,
      callBack: () => {
        handleClose();
      },
    });
  };

  return (
    <CreateDialog
      isPending={addPartyToDomain.isPending}
      dialogHeader="افزودن کاربر جدید"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-2">
        <Typography className="form_label">اعضای دامنه </Typography>
        <FormInput
          placeholder="نام کاربری را وارد کنید..."
          onKeyDown={handleSpaceClick}
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="flex flex-wrap gap-2">
          {selectedUserList.map((item) => {
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
                    className="bg-white p-1 rounded-full"
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
          })}
        </div>
        {errors.members && (
          <Typography className="warning_text">
            {errors.members?.message}
          </Typography>
        )}
      </form>
    </CreateDialog>
  );
};

export default AddDomainParticipantDialog;
