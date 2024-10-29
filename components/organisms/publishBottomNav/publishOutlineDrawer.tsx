import React, { useEffect, useState } from "react";
import { Button, Drawer, IconButton } from "@material-tailwind/react";
import { MoreLineIcon, XIcon } from "@components/atoms/icons";
import { Outline } from "clasor-content-preview";

interface IProps {
  outline: string;
}

const PublishOutlineDrawer = ({ outline }: IProps) => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    return setOpen(true);
  };
  const closeDrawer = () => {
    return setOpen(false);
  };

  const outlineList = outline?.startsWith("{\"root\": {\"root\"") ? "[]" : outline;

  useEffect(() => {
    const links = document.getElementsByClassName("clasor-link");

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");

      if (href) {
        const elementId = href.replace("#", "");
        const element = document.getElementById(elementId);

        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    Array.from(links).forEach((link) => {
      link.addEventListener("click", handleClick as EventListener);
    });

    return () => {
      Array.from(links).forEach((link) => {
        link.removeEventListener("click", handleClick as EventListener);
      });
    };
  }, [open]);

  return (
    <>
      <Button
        className="border-gray-400 w-fit min-w-fit p-2"
        onClick={openDrawer}
        variant="outlined"
      >
        <span className="hidden sm:block">نمای کلی</span>
        <MoreLineIcon className="w-4 h-4 block sm:hidden" />
      </Button>
      <Drawer
        open={open}
        onClose={closeDrawer}
        className="p-4"
        placement="left"
      >
        <IconButton
          onClick={closeDrawer}
          variant="outlined"
          className="!absolute right-3 top-4"
          size="sm"
        >
          <XIcon className="w-4 h-4" />
        </IconButton>
        <Outline outline={outlineList} />
      </Drawer>
    </>
  );
};

export default PublishOutlineDrawer;
