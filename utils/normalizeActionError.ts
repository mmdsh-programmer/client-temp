"use server";

import { IActionError } from "@interface/app.interface";

export const normalizeError = async (error: IActionError) => {
  // this handler will return an standard object of error
  const { originalError, errorCode, errorList } = error;
  // server side log original error and remove it form error object
  const actionError = {
    errorList,
    errorCode,
    error: true,
    originalError,
    referenceNumber: "NOT_DEFINED",
  };

  if (originalError?.data?.referenceNumber) {
    actionError.referenceNumber = originalError.data.referenceNumber;
  }
  return actionError;
};
