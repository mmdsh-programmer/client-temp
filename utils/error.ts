import { IActionError } from "@interface/app.interface";
import { NextResponse } from "next/server";

export const ERRORS: Record<
  number,
  {
    MSG: string;
    CODE: number;
  }
> = {
  401: {
    MSG: "Not authenticated",
    CODE: 401,
  },
  403: {
    MSG: "Access denied",
    CODE: 403,
  },
  400: {
    MSG: "Invalid input data",
    CODE: 400,
  },
  500: {
    MSG: "Internal server error",
    CODE: 500,
  },
  409: {
    MSG: "Duplicate entry",
    CODE: 409,
  },
  404: {
    MSG: "Not found",
    CODE: 404,
  },
  422: {
    MSG: "Unprocessable entity",
    CODE: 422,
  },
};

export interface IOriginalError {
  data?: { referenceNumber?: string };
}
export default class BasicError extends Error {
  constructor(
    public errorCode: number,
    public message: string,
    public errorList?: string[],
    public referenceNumber?: string,
    public originalError?: IOriginalError,
  ) {
    super(errorCode in ERRORS ? ERRORS[errorCode]?.MSG : "");
    Error.captureStackTrace?.(this, this.constructor);
  }

  createResponseError() {
    return {
      error: ERRORS[this.errorCode]?.MSG as string,
      message: this.errorList,
      referenceNumber: this.referenceNumber ? this.referenceNumber : "",
    };
  }
}

export class InputError extends BasicError {
  constructor(errorList?: string[], originalError?: IOriginalError) {
    const defaultMessage = errorList?.[0] || (ERRORS[400].MSG as string);
    const referenceNumber = originalError?.data?.referenceNumber;
    super(400, defaultMessage, errorList, referenceNumber, originalError);
  }
}

export class AuthorizationError extends BasicError {
  constructor(errorList?: string[], originalError?: IOriginalError) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[401].MSG as string);
    const referenceNumber = originalError?.data?.referenceNumber;
    super(401, defaultMessage, errorList, referenceNumber, originalError);
  }
}

export class ForbiddenError extends BasicError {
  constructor(errorList?: string[], originalError?: IOriginalError) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[403].MSG as string);
    const referenceNumber = originalError?.data?.referenceNumber;
    super(403, defaultMessage, errorList, referenceNumber, originalError);
  }
}

export class NotFoundError extends BasicError {
  constructor(errorList?: string[], originalError?: IOriginalError) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[404].MSG as string);
    const referenceNumber = originalError?.data?.referenceNumber;
    super(404, defaultMessage, errorList, referenceNumber, originalError);
  }
}

export class ServerError extends BasicError {
  constructor(errorList?: string[], originalError?: IOriginalError) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[500].MSG as string);
    const referenceNumber = originalError?.data?.referenceNumber;
    super(500, defaultMessage, errorList, referenceNumber, originalError);
  }
}

export class DuplicateError extends BasicError {
  constructor(errorList?: string[], originalError?: IOriginalError) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[409].MSG as string);
    const referenceNumber = originalError?.data?.referenceNumber;
    super(409, defaultMessage, errorList, referenceNumber, originalError);
  }
}

export class UnprocessableError extends BasicError {
  constructor(errorList?: string[], originalError?: IOriginalError) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[422].MSG as string);
    const referenceNumber = originalError?.data?.referenceNumber;
    super(422, defaultMessage, errorList, referenceNumber, originalError);
  }
}

export const handleActionError = (errorObject: IActionError) => {
  const messages = [...(errorObject?.errorList ?? "خطای ناشناخته ای رخ داده است")];

  switch (errorObject?.errorCode) {
    case 401:
      throw new AuthorizationError(messages, errorObject?.originalError?.response);
    case 403:
      throw new ForbiddenError(messages, errorObject?.originalError?.response);
    case 404:
      throw new NotFoundError(messages, errorObject?.originalError?.response);
    case 400:
      throw new InputError(messages, errorObject?.originalError?.response);
    case 409:
      throw new DuplicateError(messages, errorObject?.originalError?.response);
    case 422:
      throw new UnprocessableError(messages, errorObject?.originalError?.response);
    default:
      throw new ServerError(messages, errorObject?.originalError?.response);
  }
};

export const handleClientSideHookError = (errorObject?: IActionError) => {
  if (errorObject?.error) {
    return handleActionError(errorObject);
  }
};

export const handleRouteError = (error: IActionError) => {
  // TODO: ADD LOGGER
  console.log({
    type: "Route Error",
    error: JSON.stringify(error),
  });
  const message = error.errorList?.[0] ?? "خطای ناشناخته ای رخ داده است";
  return NextResponse.json({ message }, { status: error.errorCode ?? 500 });
};
