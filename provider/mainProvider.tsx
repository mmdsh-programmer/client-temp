"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ToastCloseButton from "@components/atoms/button/toastCloseButton";

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
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
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
          zIndex: 99_999,
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
    </ThemeProvider>
  );
};

export default MainProvider;
