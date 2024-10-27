import React, { useEffect } from "react";

import Error from "../error";
import SpinnerText from "@components/molecules/spinnerText";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useSubscribeRepo from "@hooks/public/useSubscribeRepo";

interface IProps {
  hash: string;
}

const SubscribeRequest = ({ hash }: IProps) => {
  const router = useRouter();
  const subscribeHook = useSubscribeRepo();

  const fetchSubscribe = () => {
    subscribeHook.mutate({
      hash: hash as string,
      callBack: () => {
        toast.success("با موفقیت به ریپو منصوب شدید");
        router.push("/admin/repositories");
      },
      errorCallBack: () => {
        localStorage.removeItem("CLASOR:LAST_PAGE");
        router.push("/admin/dashboard");
      },
    });
  };

  useEffect(() => {
    fetchSubscribe();
  }, []);

  if (subscribeHook.isPending) {
    return <SpinnerText text="در حال بررسی اطلاعات" />;
  }

  if (subscribeHook.isError) {
    return (
      <Error
        error={{ message: "مشکل در ارسال اطلاعات" }}
        retry={fetchSubscribe}
      />
    );
  }
  return null;
};

export default SubscribeRequest;
