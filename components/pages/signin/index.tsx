"use client";

import React, { useEffect, useState } from "react";
import { Spinner, Typography } from "@material-tailwind/react";
import { getUserToken, login } from "@actions/auth";
import { useRouter, useSearchParams } from "next/navigation";

import ImageComponent from "@components/atoms/image";
import { InfoIcon } from "@components/atoms/icons";
import LoadingButton from "@components/molecules/loadingButton";
import { useDebouncedCallback } from "use-debounce";

interface IProps{
  projectName: string;
  logo: string;
  projectDescription: string;
}
const SignInComponent = ({ projectName, logo, projectDescription }: IProps) => {
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
        const selectedrepoString = window.localStorage.getItem(
          "CLASOR:SELECTED_REPO"
        );
        const selectedRepo = selectedrepoString
          ? JSON.parse(selectedrepoString)
          : null;
        if (selectedRepo) {
          router.push("/admin/repositories");
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
        <Spinner className="h-8 w-8" color="deep-purple" />
        <Typography className="font-bold mr-2 title_t1">
          در حال دریافت اطلاعات کاربری
        </Typography>
      </div>
    );
  }
  return (
    <main className="w-screen min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col lg:flex-row rounded-2xl shadow-xl bg-gradient-to-l to-deep-purple-50 from-deep-purple-300">
        <div className="flex justify-center items-center">
          <figure className="flex sm:w-[400px] sm:h-[400px] w-full h-auto items-center justify-center">
            {logo ? (
              <ImageComponent
                alt="repo-image"
                src={`${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${logo}`}
                className="h-48 w-48"
              />
            ) : (
              <div className="w-8 h-8 flex items-center justify-center">
                <InfoIcon className="h-8 w-8" stroke="#000" />
              </div>
            )}
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
                به {projectName} خوش آمدید!
              </h2>
              <p className="text-base mt-4 flex-grow text-sm">
                {projectDescription}
              </p>
            </>
          )}

          <div className="flex justify-end items-center card-actions h-12">
            <LoadingButton
              className="flex justify-center items-center mt-4 px-10 py-2 rounded-lg lg:mt-0 bg-purple-normal  text-white font-iranYekan"
              onClick={() => {
                return login();
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
