import { AsyncLocalStorage } from "node:async_hooks";

interface RequestContext {
  arn: string;
  referenceNumber: string | null;
}

export const requestContext = new AsyncLocalStorage<RequestContext>(); 