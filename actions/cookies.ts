"use server";

import { cookies } from "next/headers";

export const getDocumentPasswordAction = async (documentId: number) => {
  const documentPassword = cookies().get(`document-${documentId}-password`);

  return documentPassword?.value || null;
};

export const saveDocumentPasswordInCookieAction = async (
  documentId: number,
  password: string
) => {
  const { SECURE } = process.env;
  cookies().set(`document-${documentId}-password`, password, {
    httpOnly: true,
    secure: SECURE === "true",
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });
};

export const removeAllCookiesAction = async () => {
  for (const cookie of cookies().getAll()) {
    cookies().delete(cookie.name);
  }
};
