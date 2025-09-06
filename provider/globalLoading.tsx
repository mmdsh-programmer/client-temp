import React from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

const GlobalLoading = () => {
  const isFetching = useIsFetching();
  const isLoggingOut = useIsMutating({ mutationKey: ["logout"] });

  if (!isFetching && !isLoggingOut) return null;

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
