import React from "react";
import DesktopMenu from "./desktopMenu";
import MobileMenu from "./mobileMenu";

interface IProps {
  setOpenDrawer: () => void;
  menuList: {
    text: string;
    icon?: React.JSX.Element;
    onClick: () => void;
  }[];
  icon?: React.ReactNode;
  className?: string
}

const MenuTemplate = ({
  menuList,
  setOpenDrawer,
  icon,
  className
}: IProps) => {
  return (
    <>
      <div className="hidden xs:flex">
        <DesktopMenu menuList={menuList} icon={icon} className={className} />
      </div>
      <div className="xs:hidden flex">
        <MobileMenu
          setOpenDrawer={setOpenDrawer} icon={icon} className={className}
        />
      </div>
    </>
  );
};

export default MenuTemplate;
