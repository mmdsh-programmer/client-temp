"use client";

import React, { useState } from "react";
import HamburgerButton from "../hamburgerButton";
import SidebarTreeViewWrapper from "./sidebarTreeViewWrapper";

interface IProps {
  repoId: number;
  repoName: string;
}

const PublishSidebar = ({ repoId, repoName }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return repoId ? (
    <>
      <div className="fixed top-5 md:hidden">
        <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden z-[49]
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => {
          return setIsOpen(false);
        }}
      />
      <aside
        className={`transition-all duration-300 px-4 flex flex-col bg-white w-64 border-l-2 border-l-gray-100 z-50 
          fixed md:relative h-full md:h-[calc(100vh-156px)] top-0
          md:right-0 ${isOpen ? "right-0" : "-right-64"}`}
      >
        <SidebarTreeViewWrapper repoId={repoId} repoName={repoName} />
      </aside>
    </>
  ) : null;
};

export default PublishSidebar;
