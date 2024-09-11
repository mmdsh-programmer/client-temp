import { IActionError } from "@interface/app.interface";

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
    public originalError?: any,
  ) {
    super(errorCode in ERRORS ? ERRORS[errorCode].MSG : "");
    Error.captureStackTrace(this, this.constructor);
  }

  createResponseError() {
    return {
      error: ERRORS[this.errorCode].MSG as string,
      message: this.errorList,
    };
  }
}

export class InputError extends BasicError {
  constructor(errorList?: string[], originalError?: any) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[400].MSG as string);
    super(400, defaultMessage, errorList, originalError);
  }
}

export class AuthorizationError extends BasicError {
  constructor(errorList?: string[], originalError?: any) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[401].MSG as string);
    super(401, defaultMessage, errorList, originalError);
  }
}

export class ForbiddenError extends BasicError {
  constructor(errorList?: string[], originalError?: any) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[403].MSG as string);
    super(403, defaultMessage, errorList, originalError);
  }
}

export class NotFoundError extends BasicError {
  constructor(errorList?: string[], originalError?: any) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[404].MSG as string);
    super(404, defaultMessage, errorList, originalError);
  }
}

export class ServerError extends BasicError {
  constructor(errorList?: string[], originalError?: any) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[500].MSG as string);
    super(500, defaultMessage, errorList, originalError);
  }
}

export class DuplicateError extends BasicError {
  constructor(errorList?: string[], originalError?: any) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[409].MSG as string);
    super(409, defaultMessage, errorList, originalError);
  }
}

export class UnprocessableError extends BasicError {
  constructor(errorList?: string[], originalError?: any) {
    const defaultMessage = errorList?.[0] ?? (ERRORS[422].MSG as string);
    super(422, defaultMessage, errorList, originalError);
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
