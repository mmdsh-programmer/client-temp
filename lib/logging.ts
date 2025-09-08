/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { requestContext } from "./requestContext";
import { headers } from "next/headers";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

export enum EAction {
  "GetRequest" = "GET-request",
  "SendResponse" = "SEND-response",
  "DbRequest" = "DB-request",
  "DbResponse" = "DB-response",
}

export enum ETeamName {
  "Podlytics" = "Podlytics",
}

interface ILogObject {
  time: number;
  action: EAction;
  duration?: number;
  totalDuration?: number;
  uri: string;
  statusCode?: number;
  arn?: string;
  arnStep?: number;
  srcServerIp?: string;
  srcName: ETeamName;
  destName?: ETeamName;
  srcClientIp?: string;
  referenceNumber?: string;
  type?: "ERROR" | "LOG";
  req?: any;
  response?: any;
  requestData?: any;
  cause?: any;
  errorPoint?: string;
  "x-forwarded-for"?: any;
  "X-Real-Ip"?: any;
}

export async function logDbQuery(startTime: number, duration: number, params: any) {
  const store = requestContext.getStore();

  let arn = store?.arn;
  let referenceNumber = store?.referenceNumber;

  if (!arn || !referenceNumber) {
    try {
      const headersList = await headers();
      arn = arn || headersList.get("x-arn") || undefined;
      referenceNumber = referenceNumber || headersList.get("x-reference-number") || undefined;
    } catch (error) {
      console.log("Could not read headers in logDbQuery:", error);
    }
  }

  const logObject: ILogObject = {
    time: startTime,
    action: EAction.DbRequest,
    uri: "prisma",
    srcName: ETeamName.Podlytics,
    destName: ETeamName.Podlytics,
    arn,
    referenceNumber: referenceNumber ?? undefined,
    req: {
      model: params.model,
      action: params.action,
      args: params.args,
    },
  };
  console.log(JSON.stringify(logObject));

  const responseLogObject: ILogObject = {
    time: Date.now(),
    action: EAction.DbResponse,
    duration,
    uri: "prisma",
    srcName: ETeamName.Podlytics,
    destName: ETeamName.Podlytics,
    arn,
    referenceNumber: referenceNumber ?? undefined,
  };
  console.log(JSON.stringify(responseLogObject));
}

export async function logRequest(
  req: NextRequest,
  startTime: number,
  arn: string,
  referenceNumber: string | null,
  body: any,
) {
  const { searchParams } = new URL(req.url);
  const query = Object.fromEntries(searchParams.entries());

  const srcClientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("X-Real-Ip") ||
    "unknown";

  const logObject: ILogObject = {
    time: startTime,
    action: EAction.GetRequest,
    uri: req.nextUrl.pathname,
    srcName: ETeamName.Podlytics,
    srcClientIp,
    arn,
    arnStep: 1,
    referenceNumber: referenceNumber ?? undefined,
    type: "LOG",
    requestData: body,
    "x-forwarded-for": req.headers.get("x-forwarded-for"),
    "X-Real-Ip": req.headers.get("X-Real-Ip"),
    req: {
      url: req.nextUrl.pathname,
      headers: {
        "content-type": req.headers.get("content-type"),
        "user-agent": req.headers.get("user-agent"),
        accept: req.headers.get("accept"),
        host: req.headers.get("host"),
      },
      query,
      method: req.method,
    },
  };

  console.log(JSON.stringify(logObject));
}

export async function logResponse(
  req: NextRequest,
  res: NextResponse,
  startTime: number,
  arn: string,
  referenceNumber: string | null,
) {
  const totalDuration = Date.now() - startTime;
  const { searchParams } = new URL(req.url);
  const query = Object.fromEntries(searchParams.entries());

  const srcClientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("X-Real-Ip") ||
    "unknown";

  const logObject: ILogObject = {
    time: Date.now(),
    action: EAction.SendResponse,
    duration: totalDuration,
    totalDuration,
    uri: req.nextUrl.pathname,
    statusCode: res.status,
    srcName: ETeamName.Podlytics,
    srcClientIp,
    arn,
    arnStep: 2,
    referenceNumber: referenceNumber ?? undefined,
    type: "LOG",
    "x-forwarded-for": req.headers.get("x-forwarded-for"),
    "X-Real-Ip": req.headers.get("X-Real-Ip"),
    req: {
      url: req.nextUrl.pathname,
      headers: {
        "content-type": req.headers.get("content-type"),
        "user-agent": req.headers.get("user-agent"),
        accept: req.headers.get("accept"),
        host: req.headers.get("host"),
      },
      query,
      method: req.method,
    },
    response: {
      status: res.status,
      headers: Object.fromEntries(res.headers.entries()),
    },
  };

  console.log(JSON.stringify(logObject));
}

export async function logErrorResponse(
  req: NextRequest,
  startTime: number,
  arn: string,
  error: any,
  referenceNumber: string | null,
) {
  const totalDuration = Date.now() - startTime;
  const { searchParams } = new URL(req.url);
  const query = Object.fromEntries(searchParams.entries());

  const srcClientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("X-Real-Ip") ||
    "unknown";

  const logObject: ILogObject = {
    time: Date.now(),
    action: EAction.SendResponse,
    duration: totalDuration,
    totalDuration,
    uri: req.nextUrl.pathname,
    statusCode: error.statusCode || 500,
    srcName: ETeamName.Podlytics,
    srcClientIp,
    arn,
    arnStep: 2,
    referenceNumber: referenceNumber ?? undefined,
    type: "ERROR",
    "x-forwarded-for": req.headers.get("x-forwarded-for"),
    "X-Real-Ip": req.headers.get("X-Real-Ip"),
    req: {
      url: req.nextUrl.pathname,
      headers: {
        "content-type": req.headers.get("content-type"),
        "user-agent": req.headers.get("user-agent"),
        accept: req.headers.get("accept"),
        host: req.headers.get("host"),
      },
      query,
      method: req.method,
    },
    cause: error.cause || "Internal Server Error",
    errorPoint: error.message,
  };
  console.log(JSON.stringify(logObject));
}

export async function getTraceInfo() {
  const store = requestContext.getStore();

  let arn = store?.arn;
  let referenceNumber = store?.referenceNumber;

  if (!arn || !referenceNumber) {
    try {
      const headersList = await headers();
      arn = arn || headersList.get("x-arn") || undefined;
      referenceNumber = referenceNumber || headersList.get("x-reference-number") || undefined;
    } catch (error) {
      console.log("Could not read headers in getTraceInfo:", error);
    }
  }

  return { referenceNumber, arn };
}

const rewriteLogFile = path.join(process.cwd(), "logs", "rewrite.log");

async function writeLog(file: string, data: any) {
  try {
    const dir = path.dirname(file);
    await mkdir(dir, { recursive: true });

    const logLine = `${JSON.stringify(data)}`;

    await appendFile(file, logLine);
  } catch (err: any) {
    console.error(
      JSON.stringify({
        level: "error",
        message: "CRITICAL: Failed to write to log file.",
        error: err?.message || String(err),
        file,
      }),
    );
  }
}

export async function logRewrite({
  from,
  to,
  search,
  host,
  referenceNumber,
  arn,
  success,
  error,
}: {
  from: string;
  to?: string;
  search?: string;
  host?: string | null;
  referenceNumber: string;
  arn: string;
  success: boolean;
  error?: any;
}) {
  const logData = {
    level: success ? "info" : "error",
    type: "rewrite",
    timestamp: new Date().toISOString(),
    from,
    to: to || null,
    search: search || null,
    host: host || null,
    referenceNumber,
    traceId: arn,
    success,
    ...(error && { error: error instanceof Error ? error.message : String(error) }),
  };

  console.log(JSON.stringify(logData));

  await writeLog(rewriteLogFile, logData);
}
