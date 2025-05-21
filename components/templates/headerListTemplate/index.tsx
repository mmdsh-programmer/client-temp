import { AddIcon, InfoIcon } from "@components/atoms/icons";
import { Button, Typography } from "@material-tailwind/react";
import { ETourSection, activeTourAtom } from "@atom/tour";
import React, { useState } from "react";

import IconTextButton from "@components/molecules/iconTextButton/iconTextButton";
import { useSetRecoilState } from "recoil";
import useGetUser from "@hooks/auth/useGetUser";

export interface IProps {
  header: string;
  buttonText: string;
  renderList?: () => React.ReactNode;
  renderDialog?: (close: () => void) => React.ReactNode;
  renderSearch?: React.ReactNode;
  className?: string;
}

const HeaderListTemplate = ({
  header,
  buttonText,
  renderList,
  renderDialog,
  renderSearch,
  className,
}: IProps) => {
  const [openCreateRepo, setOpenCreateRepo] = useState(false);
  const setActiveTour = useSetRecoilState(activeTourAtom);
  const { data: userInfo } = useGetUser();

  return (
    <header className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-1">
        <Typography className="title_t1 version-list text-primary_normal">{header}</Typography>
        <Button
          className="flex items-center justify-center rounded-lg bg-transparent p-0 shadow-none"
          onClick={() => {
            setActiveTour(header === "مخزن‌ها" ? ETourSection.DASHBOARD : ETourSection.VERSION);
          }}
        >
          <InfoIcon className="h-5 w-5 stroke-primary-normal" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="max-w-[300px]">{renderSearch}</div>
        <div className="createNewRepo version-create flex gap-2">
          <div className="hidden md:flex">
            <IconTextButton
              text={buttonText}
              icon={<AddIcon className="h-5 w-5 stroke-white pr-1" />}
              classNameText="text-white text-[13px] leading-[19.5px] -tracking-[0.13px] font-medium !px-2  font-iranYekan"
              classNameButton=" rounded-lg h-9 !px-[6px] bg-primary-normal "
              onClick={() => {
                setOpenCreateRepo(true);
              }}
            />
          </div>
          <div className="hidden md:!hidden xs:flex">
            <Button
              className="h-9 w-9 rounded-lg bg-primary-normal p-0 "
              onClick={() => {
                setOpenCreateRepo(true);
              }}
              disabled={
                userInfo?.domainRole !== "owner" &&
                !userInfo?.domainConfig?.accessToCreateRepo &&
                header === "مخزن‌ها"
              }
            >
              <AddIcon className="h-5 w-5 stroke-white" />
            </Button>
          </div>
          <div className="absolute bottom-20 left-6 z-[999] xs:hidden">
            <Button
              className=" z-[99] h-[54px] w-[54px] rounded-full bg-primary-normal p-0 "
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
      </div>
    </header>
  );
};

export default HeaderListTemplate;
