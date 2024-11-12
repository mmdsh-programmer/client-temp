"use client";

import React, { useEffect } from "react";
import { Drawer, IconButton } from "@material-tailwind/react";
import { XIcon } from "@components/atoms/icons";
import { Outline } from "clasor-content-preview";
import { useRecoilState } from "recoil";
import { openPublishOutlineDrawer } from "@atom/publish";

interface IProps {
  outline: string;
}

const PublishOutlineDrawer = ({ outline }: IProps) => {
  const [getOpenPublishOutlineDrawer, setOpenPublishOutlineDrawer] =
    useRecoilState(openPublishOutlineDrawer);
  const outlineList = outline?.startsWith("{\"root\": {\"root\"") ? "[]" : outline;

  const closeDrawer = () => {
    setOpenPublishOutlineDrawer(false);
  };

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
  }, []);

  return (
    <Drawer
      open={getOpenPublishOutlineDrawer}
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
  );
};

export default PublishOutlineDrawer;
