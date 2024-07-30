import React from "react";
import Start from "../start";
import Sidebar from "@components/organisms/sidebar";
import Header from "@components/organisms/header";

interface IProps {
  children: React.ReactNode;
}

const RepositoryTemplate = ({ children }: IProps) => {
  return (
    <Start>
      <div className="flex max-w-screen-2xl m-auto">
        <Sidebar />
        <main className="bg-secondary flex-grow h-screen overflow-y-auto">
          <Header />
          <div className="overflow-auto h-[calc(100vh-217px)] xs:h-[calc(100vh-81px)] flex flex-col px-0 py-0 xs:px-8 xs:pt-6 xs:pb-8">
            {children}
          </div>
        </main>
      </div>
    </Start>
  );
};

export default RepositoryTemplate;
