import React from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

const GlobalLoading = () => {
  const isFetching = useIsFetching();
  const isLoggingOut = useIsMutating({ mutationKey: ["logout"] });

  if (!isFetching && !isLoggingOut) return null;

  if (isLoggingOut) {
    return (
      <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
        <div
          className="h-16 w-16 animate-spin rounded-full border-8 border-solid border-white border-t-transparent"
          role="status"
        />
        <p className="mt-4 text-lg font-semibold text-white">در حال خروج...</p>
      </div>
    );
  }

  return (
    <div
      className="fixed left-0 top-0 z-[9999] h-2 w-full"
      style={{
        backgroundImage: "linear-gradient(to right, #454145, #7D777E, #A29DA4, #E3E1E6)",
        animation: "moveGradient 2.5s ease-in-out infinite",
      }}
    />
  );
};

export default GlobalLoading;
