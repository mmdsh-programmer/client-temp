"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import HamburgerButton from "../hamburgerButton";
import SidebarTreeViewWrapper from "./sidebarTreeViewWrapper";

interface IProps {
  repoId: number;
  repoName: string;
}

const PublishSidebar = ({ repoId, repoName }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        if (window.innerWidth >= 768) {
          const newWidth = window.innerWidth - mouseMoveEvent.clientX;
          setSidebarWidth(Math.min(Math.max(newWidth, 200), 600));
        }
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  useEffect(() => {
    const handleResize = () => {
      return window.innerWidth < 768 ? setSidebarWidth(256) : null;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      return window.removeEventListener("resize", handleResize);
    };
  }, []);

  return repoId ? (
    <>
      <div className="fixed top-4 xs:top-6 md:hidden">
        <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden z-[51]
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => {
          return setIsOpen(false);
        }}
      />
      <aside
        ref={sidebarRef}
        className={`${
          !isResizing ? "transition-all duration-300" : ""
        } app-sidebar px-4 flex flex-col bg-white border-l-2 border-l-gray-100 z-[51] 
          fixed md:relative h-full top-0
          md:right-0 ${isOpen ? "right-0" : "-right-64"}`}
        style={{
          width: window.innerWidth < 768 ? "256px" : `${sidebarWidth}px`,
        }}
        onMouseDown={(e) => {
          return e.preventDefault();
        }}
      >
        <div className="app-sidebar-content">
          <SidebarTreeViewWrapper repoId={repoId} repoName={repoName} />
        </div>
        <div
          className="app-sidebar-resizer absolute left-0 top-0 h-full w-1 cursor-ew-resize hover:bg-gray-200 transition-colors md:block hidden"
          onMouseDown={startResizing}
        />
      </aside>
    </>
  ) : null;
};

export default PublishSidebar;
