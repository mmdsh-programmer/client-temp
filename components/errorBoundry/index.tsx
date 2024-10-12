// "use client";

// import { IActionError } from "@interface/app.interface";
// import React from "react";

// class ErrorBoundary extends React.Component<
//   { children: React.ReactNode },
//   { errorCode: number; errorList: string[] }
// > {
//   constructor(props) {
//     super(props);
//     // Define a state variable to track whether is an error or not
//     this.state = { errorList: [], errorCode: 0 };
//   }

//   static getDerivedStateFromError(error: IActionError) {
//     // Update state so the next render will show the fallback UI
//     const { errorCode, errorList, originalError } = error;
//     return { errorCode, errorList, originalError };
//   }

//   componentDidCatch(error, errorInfo) {
//     // You can use your own error logging service here
//     console.log({ error, errorInfo });
//   }

//   render() {
//     const { children } = this.props;
//     const { errorList, errorCode } = this.state;
//     // Return children components in case of no error
//     return (
//       <>
//         {children}
//         {errorList[0] ? (
//           <div>
//             <h2>{errorList[0]}</h2>
//             <p>{errorCode}</p>
//           </div>
//         ) : null}
//       </>
//     );
//   }
// }

// export default ErrorBoundary;

"use client";

import React, { useState, useEffect } from "react";
import { IActionError } from "@interface/app.interface";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // Custom hook for catching the error
  console.log(
    "------------------- hiiiiiiiiii -------------------",
    
  );
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
