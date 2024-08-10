import React from "react";
import DesktopHeaderList from "./desktopHeaderList";
import TabletHeaderList from "./tabletHeaderList";
import MobileHeaderList from "./mobileHeaderList";
import ListMode from "@components/molecules/listMode";
import { Typography } from "@material-tailwind/react";

export interface IProps {
  header: string;
  buttonText: string;
  onClick: () => void;
  listModeHide: boolean;
}

const HeaderListTemplate = ({
  buttonText,
  header,
  onClick,
  listModeHide,
}: IProps) => {
  return (
    <header className="flex justify-between items-center">
      <Typography className="title_t1 text-primary">
        {header}
      </Typography>
      <div className="flex gap-2">
        <div className="hidden md:flex">
          <DesktopHeaderList buttonText={buttonText} onClick={onClick} />
        </div>
        <div className="hidden xs:flex md:!hidden">
          <TabletHeaderList onClick={onClick} />
        </div>
        <div className="absolute z-[999] bottom-20 left-6 xs:hidden">
          <MobileHeaderList onClick={onClick} />
        </div>
        {!!listModeHide ? null : <ListMode />}
      </div>
    </header>
  );
};

export default HeaderListTemplate;
