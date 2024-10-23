"use client";

import React from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void; // Add a function prop to handle closing
}

const PublishSidebar = ({ isOpen, onClose }: IProps) => {
  return (
    <>
      {/* Add a div for the overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } md:hidden z-[49]`}
        onClick={onClose} // Close the sidebar when clicked
       />
      <aside
        className={`transition-all duration-300 md:flex flex-col bg-white w-64 border-l-2 border-l-gray-100 z-50 
          ${isOpen ? "right-0" : "right-[-256px]"}
          fixed md:relative h-full md:h-[calc(100vh-156px)] top-0
        `}
      >
        PublishSidebar
      </aside>
    </>
  );
};

export default PublishSidebar;
