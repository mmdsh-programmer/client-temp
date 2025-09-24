/* eslint-disable camelcase */

"use client";

import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { getUserToken } from "@actions/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Error from "@components/organisms/error";
import BasicError from "@utils/error";
import { Spinner } from "@components/atoms/spinner";

const SignInComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const sendCode = async (code: string) => {
    const redirect_uri = `${window.location.origin}/signin`;

    try {
      setLoading(true);
      await getUserToken(code, redirect_uri);
      const lastPage = localStorage.getItem("CLASOR:LAST_PAGE") || null;

      if (lastPage === null) {
        const selectedRepoString = window.localStorage.getItem("CLASOR:SELECTED_REPO");
        const selectedRepo = selectedRepoString ? JSON.parse(selectedRepoString) : null;
        if (selectedRepo) {
          router.push(`/admin/repositories?repoId=${selectedRepo.id}`);
        } else if (window.localStorage.getItem("CLASOR:PANEL_URL")) {
          const redirectLink = `${
            window.location.origin
          }${window.localStorage.getItem("CLASOR:PANEL_URL")}`;
          window.localStorage.removeItem("CLASOR:PANEL_URL");
          router.push(redirectLink);
        } else {
          router.push("/admin/dashboard");
        }
      }
      if (lastPage) {
        localStorage.removeItem("CLASOR:LAST_PAGE");
        router.push(lastPage);
      }
    } catch {
      setLoading(false);
      setError("خطا در دریافت اطلاعات کاربری");
    }
  };

  const init = useDebouncedCallback(async () => {
    const code = searchParams?.get("code");
    const paramError = searchParams?.get("error");
    if (paramError) {
      const error_description = searchParams?.get("error_description");
      setError(error_description ?? "خطا در دریافت اطلاعات کاربری");
    } else if (code) {
      try {
        await sendCode(code);
      } catch {
        setError("خطا در دریافت اطلاعات کاربری");
      }
    }
    setLoading(false);
  }, 100);

  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return (
      <div className="get-user-info bg-slate-50 flex h-screen w-screen items-center justify-center">
        <Spinner className="h-8 w-8 text-primary" />
        <Typography
          {...({} as React.ComponentProps<typeof Typography>)}
          className="title_t1 mr-2 font-bold"
        >
          در حال دریافت اطلاعات کاربری
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <Error
        error={{
          message: (error as unknown as BasicError).message ?? "خطا در دریافت اطلاعات ",
        }}
      />
    );
  }
};

export default SignInComponent;
