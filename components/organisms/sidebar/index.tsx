import React, { useState } from "react";
import SidebarHeader from "@components/molecules/sidebarHeader";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Typography,
} from "@material-tailwind/react";
import SidebarRepoList from "@components/molecules/sidebarRepoList";
import { ChevronLeftIcon } from "@components/atoms/icons";
import SidebarDocuments from "@components/molecules/sidebarDocuments";

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

const Sidebar = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    return setOpen(open === value ? 0 : value);
  };

  return (
    <aside className="hidden w-[250px] md:flex h-screen flex-col max-w-fit border-l-2 border-l-gray-100 bg-white">
      <div className="p-4 h-[80px] flex items-center justify-center ">
        <SidebarHeader />
      </div>
      <hr className="" />
      <Accordion
        className="max-w-full w-full "
        open={open === 1}
        icon={
          <ChevronLeftIcon
            className={`h-2 w-2 stroke-icon-active ${open === 1 ? "rotate-90" : "-rotate-90"}`}
          />
        }
        animate={CUSTOM_ANIMATION}
      >
        <AccordionHeader
          className="px-3 flex-row-reverse justify-end"
          onClick={() => {
            return handleOpen(1);
          }}
        >
          <Typography className="title_t4">اسناد شخصی</Typography>
        </AccordionHeader>
        <AccordionBody>
          <div className="px-3">
            <SidebarDocuments />
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion
        className="max-w-full w-full "
        open={open === 2}
        icon={
          <ChevronLeftIcon
            className={`h-2 w-2 stroke-icon-active ${open === 2 ? "rotate-90" : "-rotate-90"}`}
          />
        }
        animate={CUSTOM_ANIMATION}
      >
        <AccordionHeader
          className="px-3 flex-row-reverse justify-end"
          onClick={() => {
            return handleOpen(2);
          }}
        >
          <Typography className="title_t4">مدیریت مخزن‌ها</Typography>
        </AccordionHeader>
        <AccordionBody>
          <div className="px-3">
            <SidebarRepoList />
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion
        className="max-w-full w-full "
        open={open === 3}
        icon={
          <ChevronLeftIcon
            className={`h-2 w-2 stroke-icon-active ${open === 3 ? "rotate-90" : "-rotate-90"}`}
          />
        }
        animate={CUSTOM_ANIMATION}
      >
        <AccordionHeader
          className="px-3 flex-row-reverse justify-end"
          onClick={() => {
            return handleOpen(3);
          }}
        >
          <Typography className="title_t4">مدیریت شعبات</Typography>
        </AccordionHeader>
      </Accordion>
    </aside>
  );
};

export default Sidebar;
