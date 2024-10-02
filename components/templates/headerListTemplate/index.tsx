import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { AddIcon } from "@components/atoms/icons";
import IconTextButton from "@components/molecules/iconTextButton/iconTextButton";

export interface IProps {
  header: string;
  buttonText: string;
  renderList?: () => React.ReactNode;
  renderDialog?: (close: () => void) => React.ReactNode;
}

const HeaderListTemplate = ({
  header,
  buttonText,
  renderList,
  renderDialog,
}: IProps) => {
  const [openCreateRepo, setOpenCreateRepo] = useState(false);

  return (
    <header className="flex justify-between items-center">
      <Typography className="title_t1 text-primary">{header}</Typography>
      <div className="flex gap-2">
        <div className="hidden md:flex">
          <IconTextButton
            text={buttonText}
            icon={<AddIcon className="h-5 w-5 stroke-white pr-1" />}
            classNameText="text-white text-[13px] leading-[19.5px] -tracking-[0.13px] font-medium !px-2  font-iranYekan"
            classNameButton="rounded-lg h-9 !px-[6px] bg-purple-normal "
            onClick={() => {
              setOpenCreateRepo(true);
            }}
          />
        </div>
        <div className="hidden xs:flex md:!hidden">
          <Button
            className="rounded-lg h-9 w-9 p-0 bg-purple-normal "
            onClick={() => {
              setOpenCreateRepo(true);
            }}
          >
            <AddIcon className="h-5 w-5 stroke-white" />
          </Button>
        </div>
        <div className="absolute z-[999] bottom-20 left-6 xs:hidden">
          <Button
            className=" h-[54px] w-[54px] z-[99] p-0 bg-purple-normal rounded-full "
            onClick={() => {
              setOpenCreateRepo(true);
            }}
          >
            <AddIcon className="h-6 w-6 stroke-white" />
          </Button>
        </div>
        {renderList?.()}
        {openCreateRepo
          ? renderDialog?.(() => {
              return setOpenCreateRepo(false);
            })
          : null}
      </div>
    </header>
  );
};

export default HeaderListTemplate;
