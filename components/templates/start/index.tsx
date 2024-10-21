"use client";

import React, { ReactNode } from "react";

import Error from "@app/error";
import PanelURl from "../panelUrl";
import SpinnerText from "@components/molecules/spinnerText";
import { redirect } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  children: ReactNode;
}

const Start = ({ children }: IProps) => {
  const {
 isLoading, isError, error, refetch,data
} = useGetUser();

    if (isError) {
      console.log(error);
      debugger;
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

    if(!data){
      return redirect("/signin");
    }
  
    return (
      <>
        <PanelURl />
        {children}
      </>
    ); 
};

export default Start;
