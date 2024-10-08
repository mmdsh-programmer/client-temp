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
export default class BasicError extends Error {
  constructor(
    public errorCode: number,
    public message: string,
    public errorList?: string[],
    public referenceNumber?: string,
    public originalError?: any
  ) {
    super(errorCode in ERRORS ? ERRORS[errorCode].MSG : "");
    Error.captureStackTrace(this, this.constructor);
  }

  createResponseError() {
    return {
      error: ERRORS[this.errorCode].MSG as string,
      message: this.errorList,
      referenceNumber: this.referenceNumber ? this.referenceNumber : "",
    };
  }
}

export class InputError extends BasicError {
  constructor(errorList?: string[], originalError?: any) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[400].MSG as string);
    const referenceNumber = originalError?.data?.referenceNumber;
    super(400, defaultMessage, errorList, referenceNumber, originalError);
  }
}

export class AuthorizationError extends BasicError {
  constructor(errorList?: string[], originalError?: any) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[401].MSG as string);
    const referenceNumber = originalError?.data?.referenceNumber;
    super(401, defaultMessage, errorList, referenceNumber, originalError);
  }
}

export class ForbiddenError extends BasicError {
  constructor(errorList?: string[], originalError?: any) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[403].MSG as string);
    const referenceNumber = originalError?.data?.referenceNumber;
    super(403, defaultMessage, errorList, referenceNumber, originalError);
  }
}

export class NotFoundError extends BasicError {
  constructor(errorList?: string[], originalError?: any) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[404].MSG as string);
    const referenceNumber = originalError?.data?.referenceNumber;
    super(404, defaultMessage, errorList, referenceNumber, originalError);
  }
}

export class ServerError extends BasicError {
  constructor(errorList?: string[], originalError?: any) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[500].MSG as string);
    const referenceNumber = originalError?.data?.referenceNumber;
    super(500, defaultMessage, errorList, referenceNumber, originalError);
  }
}

export class DuplicateError extends BasicError {
  constructor(errorList?: string[], originalError?: any) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[409].MSG as string);
    const referenceNumber = originalError?.data?.referenceNumber;
    super(409, defaultMessage, errorList, referenceNumber, originalError);
  }
}

export class UnprocessableError extends BasicError {
  constructor(errorList?: string[], originalError?: any) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[422].MSG as string);
    const referenceNumber = originalError?.data?.referenceNumber;
    super(422, defaultMessage, errorList, referenceNumber, originalError);
  }
}

export const handleActionError = (error: IActionError) => {
  const messages = [...(error.errorList ?? "")];
  switch (error.errorCode) {
    case 401:
      throw new AuthorizationError(messages);
    case 403:
      throw new ForbiddenError(messages);
    case 400:
      throw new InputError(messages);
    case 409:
      throw new DuplicateError(messages);
    default:
      throw new ServerError(messages);
  }
};

export const handleRouteError = (error: IActionError) => {
  const message = error.errorList?.[0] ?? "";
  return NextResponse.json({ message }, { status: error.errorCode ?? 500 });
};
