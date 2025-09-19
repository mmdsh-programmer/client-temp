"use client";

import { Button } from "@material-tailwind/react";
import React from "react";

const ErrorToast = ({
  message,
  referenceNumber,
}: {
  message: string;
  referenceNumber?: string;
}) => {
  const handleCopyToClipboard = async () => {
    // it will work only in https protocol
    try {
      await navigator.clipboard.writeText(referenceNumber ?? "NOT_FOUND");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="error-toast flex justify-between">
      <span>{message}</span>{" "}
      {referenceNumber ? (
        <Button
          placeholder="cancel button"
          variant="text"
          onClick={handleCopyToClipboard}
          className="px-2 py-1"
          {...({} as Omit<React.ComponentProps<typeof Button>, "placeholder">)}
        >
          کپی
        </Button>
      ) : null}
    </div>
  );
};

export default ErrorToast;
