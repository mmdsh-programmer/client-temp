"use client";

import React, { ReactNode } from "react";

import Error from "@app/error";
import SpinnerText from "@components/molecules/spinnerText";
import useGetUser from "@hooks/auth/useGetUser";
import PanelUrl from "../panelUrl";

interface IProps {
  children: ReactNode;
}

const Start = ({ children }: IProps) => {
  const {
 isLoading, isError, error, refetch 
} = useGetUser();

    if (isError) {
      return (
        <div>
          <Error
            error={error}
            reset={() => {
              refetch();
            }}
          />
        </div>
      );
    }
  
    if (isLoading) {
      return <div className="flex items-center justify-center h-screen"><SpinnerText text="در حال دریافت اطلاعات" /></div>;
    }
  
    return (
      <>
        <PanelUrl />
        {children}
      </>
    ); 
};

export default Start;
