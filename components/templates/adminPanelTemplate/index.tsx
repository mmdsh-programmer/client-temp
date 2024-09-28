import React from "react";
import Start from "../start";
import Header from "@components/organisms/header";

interface IProps {
  children: React.ReactNode;
}

const AdminPanelTemplate = ({ children }: IProps) => {
  return (
    <Start>
      <div className="flex max-w-screen-2xl m-auto">
        <main className="bg-secondary flex-grow h-screen overflow-hidden">
          <Header />
          <div className="overflow-auto h-[calc(100vh-195px)] xs:h-[calc(100vh-80px)] flex flex-col px-0 py-0 xs:px-8 xs:pt-6 xs:pb-8">
            {children}
          </div>
        </main>
      </div>
    </Start>
  );
};

export default AdminPanelTemplate;
