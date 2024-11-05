"use client";

import { login } from "@actions/auth";
import { useEffect } from "react";

const PublishDocumentSignin = () => {
  useEffect(() => {
    window.localStorage.setItem("CLASOR:LAST_PAGE", window.location.href);
    login();
  }, []);

  return null;
};

export default PublishDocumentSignin;
