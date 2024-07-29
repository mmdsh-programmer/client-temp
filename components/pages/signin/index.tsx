"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingButton from "@components/molecules/loadingButton";
import { getUserToken, login } from "@actions/auth";
import { ClasorLogo } from "@components/atoms/icons";
import { useDebouncedCallback } from "use-debounce";
import { Spinner } from "@material-tailwind/react";

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
      setLoading(false);
      router.push("/admin/dashboard");
    } catch {
      setError("خطا در دریافت اطلاعات کاربری");
    }
  };

  const init = useDebouncedCallback(async () => {
    const code = searchParams.get("code");
    const paramError = searchParams.get("error");
    if (paramError) {
      const error_description = searchParams.get("error_description");
      setError(error_description);
    } else if (code) {
      try {
        await sendCode(code);
      } catch {
        setError("خطا در دریافت اطلاعات کاربری");
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, 100);

  useEffect(() => {
    init();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="get-user-info w-screen h-screen flex items-center justify-center bg-slate-50">
        <Spinner className="h-8 w-8" color="purple" />
        <h1 className="font-bold mr-2">در حال دریافت اطلاعات کاربری</h1>
      </div>
    );
  }
  return (
    <main className="w-screen min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col lg:flex-row rounded-2xl shadow-xl bg-gradient-to-l to-deep-purple-50 from-deep-purple-300">
        <div className="flex justify-center items-center">
          <figure className="flex sm:w-[400px] sm:h-[400px] w-full h-auto items-center justify-center">
            <ClasorLogo className="h-48 w-48" fill="#7446B2" />
          </figure>
        </div>
        <div className="card-body flex flex-col flex-1 my-10 px-10">
          {error ? (
            <h4 className="text-dashboard-secondary flex-grow">
              خطایی به وجود آمده لطفا دوباره تلاش کنید.
            </h4>
          ) : (
            <>
              <h2 className="card-title text-xl font-bold text-primary">
                به کلاسور خوش آمدید!
              </h2>
              <p className="text-base mt-4 flex-grow text-primary">
                برای ورود به کلاسور باید از درگاه POD استفاده کنید
              </p>
            </>
          )}

          <div className="flex justify-end items-center card-actions h-12">
            <LoadingButton
              className="flex justify-center items-center mt-4 px-10 py-2 rounded-lg lg:mt-0 bg-purple-normal  text-white font-iranYekan"
              onClick={() => {
                return login(`${window.location.origin}/signin`);
              }}
            >
              ورود
            </LoadingButton>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignInComponent;
