"use client";

import React, { useState } from "react";

import HamburgerButton from "../hamburgerButton";
import PublishRepositoryLink from "@components/molecules/publishRepositoryLink";

interface IProps {
  id?: number;
  name?: string;
}

const PublishSidebar = ({ name, id }: IProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className="fixed top-5">
        <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } md:hidden z-[49]`}
        onClick={() => {
          setIsOpen(false);
        }}
      />
      <aside
        className={`transition-all duration-300 md:flex flex-col bg-white w-64 border-l-2 border-l-gray-100 z-50 
          ${isOpen ? "right-0" : "right-[-256px]"}
          fixed md:relative h-full md:h-[calc(100vh-156px)] top-0
        `}
      >
        {id && name ? (
          <PublishRepositoryLink
            link={`/admin/repositories?repoId=${id}`}
            title={decodeURIComponent(name).replaceAll("-", " ")}
          />
        ) : null}
      </aside>
    </>
  );
};

export default PublishSidebar;
