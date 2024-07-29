import React from "react";
import Text from "@components/atoms/typograghy/text";
import DesktopHeaderList from "./desktopHeaderList";
import TabletHeaderList from "./tabletHeaderList";
import MobileHeaderList from "./mobileHeaderList";

interface IProps {
  header: string;
  buttonText: string;
  onClick: () => void;
}

const HeaderListTemplate = ({ buttonText, header, onClick }: IProps) => {
  return (
    <header className="flex justify-between items-center">
      <Text className="text-primary text-base -tracking-[0.32px] font-medium ">
        {header}
      </Text>
      <div className="hidden md:flex">
        <DesktopHeaderList buttonText={buttonText} onClick={onClick} />
      </div>
      <div className="hidden xs:flex md:!hidden">
        <TabletHeaderList onClick={onClick} />
      </div>
      <div className="absolute bottom-20 left-6 xs:hidden">
        <MobileHeaderList onClick={onClick} />
      </div>
    </header>
  );
};

export default HeaderListTemplate;
