"use client";

import React, { useState } from "react";

import { login } from "@actions/auth";

const LoginButton = () => {
  const [loading, setLoading] = useState(false);

  const handleRedirect = async () => {
    try {
      login();
    } catch {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleRedirect}
      className="btn btn-white"
      disabled={loading}
    >
      ورود
    </button>
  );
};

export default LoginButton;
