"use server";

import { IActionError } from "@interface/app.interface";
import Logger from "./logger";

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
    Logger.error(JSON.stringify(actionError));
  }

  return actionError;
};
