"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import ToastCloseButton from "@components/atoms/button/toastCloseButton";
import GlobalLoading from "./globalLoading";
import "react-toastify/dist/ReactToastify.min.css";

interface IProps {
  children: React.ReactNode;
}

const MainProvider = ({ children }: IProps) => {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1 * 1000,
        },
      },
    });
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalLoading />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          zIndex: 99999,
        }}
        toastStyle={{
          borderRadius: "8px",
          fontSize: "14px",
          fontFamily: "iranYekan !important",
          fontWeight: 400,
          lineHeight: "19.6px",
          letterSpacing: "-0.14px",
        }}
        theme="colored"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        closeButton={ToastCloseButton}
      />
    </>
  );
};

export default MainProvider;
