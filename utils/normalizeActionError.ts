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
    referenceNumber: "NOT_DEFINED",
  };

  if (originalError?.response?.data?.referenceNumber) {
    actionError.referenceNumber = originalError.response.data.referenceNumber;
  } else if(!originalError?.response){
    console.log(JSON.stringify(actionError, null, 0));
  }

  return actionError;
};
