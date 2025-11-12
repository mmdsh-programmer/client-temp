"use server";

import { cookies } from "next/headers";

export const saveDocumentPasswordInCookieAction = async (documentId: number, password: string) => {
  const { SECURE } = process.env;
  (await cookies()).set(`document-${documentId}-password`, password, {
    httpOnly: true,
    secure: SECURE === "true",
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });
};

export const removeDocumentPasswordCookiesAction = async (documentId: number) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(`document-${documentId}-password`);
  if (cookie) {
    cookieStore.delete(`document-${documentId}-password`);
  }
};

