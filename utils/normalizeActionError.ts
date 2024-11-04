"use server";

import { IActionError } from "@interface/app.interface";

export const normalizeError = async (error: IActionError) => {
  // this handler will return an standard object of error
  const { originalError, errorCode, errorList } = error;
  // server side log original error and remove it form error object
  console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
  console.log(error);
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  const actionError = {
    errorList,
    errorCode,
    error: true,
    originalError: { data: { referenceNumber: "NOT_DEFINED" } },
  };

  if (originalError?.data?.referenceNumber) {
    actionError.originalError.data.referenceNumber =
      originalError.data.referenceNumber;
  }
  return actionError;
};
