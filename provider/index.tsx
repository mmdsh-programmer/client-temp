"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

interface IProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IProps) => {
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
        <RecoilRoot>{children}</RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer
        position="bottom-left"
        autoClose={50000}
        hideProgressBar
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
          display: "flex",
          alignItems: "center",
          color: "white",
          border: "0.5px solid rgba(0, 0, 0, 0.12)",
          boxShadow:
            "0px 2px 7px 0px rgba(16, 185, 129, 0.15), 0px 5px 17px 0px rgba(16, 185, 129, 0.20)",
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        toastClassName={({ type }: any) => {
          switch (type) {
            case "success":
              return "toast-success";
            case "error":
              return "toast-error";
            default:
              return "bg-[#00C853] text-white";
          }
        }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        closeButton
      />
    </ThemeProvider>
  );
};
export default Providers;
