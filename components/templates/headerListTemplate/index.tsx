import { AddIcon, InfoIcon } from "@components/atoms/icons";
import { Button, Typography } from "@material-tailwind/react";
import { ETourSection, activeTourAtom } from "@atom/tour";
import React, { useState } from "react";

import IconTextButton from "@components/molecules/iconTextButton/iconTextButton";
import { useSetRecoilState } from "recoil";

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

  return (
    <header className={`flex justify-between items-center ${className}`}>
      <div className="flex items-center gap-1">
        <Typography className="title_t1 text-primary_normal version-list">
          {header}
        </Typography>
        <Button
          className="rounded-lg p-0 bg-transparent shadow-none flex justify-center items-center"
          onClick={() => {
            setActiveTour(
              header === "مخزن‌ها"
                ? ETourSection.DASHBOARD
                : ETourSection.VERSION
            );
          }}
        >
          <InfoIcon className="w-5 h-5 stroke-primary-normal" />
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
              classNameButton=" rounded-lg h-9 !px-[6px] bg-secondary "
              onClick={() => {
                setOpenCreateRepo(true);
              }}
            />
          </div>
          <div className="hidden xs:flex md:!hidden">
            <Button
              className="rounded-lg h-9 w-9 p-0 bg-secondary "
              onClick={() => {
                setOpenCreateRepo(true);
              }}
            >
              <AddIcon className="h-5 w-5 stroke-white" />
            </Button>
          </div>
          <div className="absolute z-[999] bottom-20 left-6 xs:hidden">
            <Button
              className=" h-[54px] w-[54px] z-[99] p-0 bg-secondary rounded-full "
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
