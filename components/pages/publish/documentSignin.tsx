"use client";

import { login } from "@actions/auth";
import { useEffect } from "react";

const DocumentSignin = () => {
  useEffect(() => {
    window.localStorage.setItem("CLASOR:LAST_PAGE", window.location.href);
    login();
  }, []);

  return null;
};

export default DocumentSignin;
