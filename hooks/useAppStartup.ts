"use client";

import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "react-toastify";
import useGetUser from "@hooks/auth/useGetUser";
import { useRouter } from "next/navigation";

const useAppStartup = () => {
  const router = useRouter();
  const { data: userInfo, isLoading, isError, error, refetch } = useGetUser();

  const handleToast = useDebouncedCallback(() => {
    toast.info("لطفا وارد حساب کاربری خود شوید.");
    router.push("/");
  }, 100);

  useEffect(() => {
    if (userInfo === null) {
      handleToast();
    }
  }, [userInfo, handleToast]);

  return { userInfo, isLoading, isError, error, refetch };
};

export default useAppStartup;
