"use server";

import { cookies } from "next/headers";

export const saveDocumentPasswordInCookieAction = async (
  documentId: number,
  password: string
) => {
  const { SECURE } = process.env;
  (await cookies()).set(`document-${documentId}-password`, password, {
    httpOnly: true,
    secure: SECURE === "true",
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });
};

export const removeAllCookiesAction = async () => {
  for (const cookie of (await cookies()).getAll()) {
    (await cookies()).delete(cookie.name);
  }
};
