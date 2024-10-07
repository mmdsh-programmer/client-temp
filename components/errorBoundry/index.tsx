import { IActionError } from "@interface/app.interface";
import React from "react";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { errorCode: number; errorList: string[] }
> {
  constructor(props) {
    super(props);
    // Define a state variable to track whether is an error or not
    this.state = { errorList: [], errorCode: 0 };
  }

  static getDerivedStateFromError(error: IActionError) {
    // Update state so the next render will show the fallback UI
    const { errorCode, errorList, originalError } = error;
    return { errorCode, errorList, originalError };
  }

  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }

  render() {
    const { children } = this.props;
    const { errorList, errorCode } = this.state;
    // Return children components in case of no error
    return (
      <>
        {children}
        {errorList[0] ? (
          <div>
            <h2>{errorList[0]}</h2>
            <p>{errorCode}</p>
          </div>
        ) : null}
      </>
    );
  }
}

export default ErrorBoundary;
