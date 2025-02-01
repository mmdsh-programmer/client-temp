"use client";

import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";

import { IActionError } from "@interface/app.interface";
import { toast } from "react-toastify";

type ErrorBoundaryProps = { children: React.ReactNode};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [errorCodeState, setErrorCodeState] = useState<number | null>(null);
  const [errorListState, setErrorListState] = useState<string[]>([]);

  useEffect(() => {
    if (errorListState.length > 0) {
      // Show the error in a toast when there is an error
      toast.error(
        <div>
          <p>Error: {errorListState[0]}</p>
          <p>
            Reference Code:{" "}
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => {
                navigator.clipboard.writeText(errorCodeState?.toString() || "");
                toast.info("Reference Code copied!");
              }}
            >
              {errorCodeState}
            </span>
          </p>
        </div>,
        { autoClose: false }
      );
    }
  }, [errorCodeState, errorListState]);

  const handleError = (error: IActionError) => {
    const { errorCode: errorCodeData, errorList: errorListData } = error;
    setErrorCodeState(errorCodeData);
    setErrorListState(errorListData);
  };

  // Handle errors manually by wrapping children with error boundary logic
  try {
    return (
      <>
        {children}
        {errorListState[0] ? (
          <div>
            <p>{errorCodeState}</p>
          </div>
        ) : null}
      </>
    );
  } catch (error) {
    handleError(error as IActionError);
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>; // You can also return a fallback UI here
  }
};

export default ErrorBoundary;
