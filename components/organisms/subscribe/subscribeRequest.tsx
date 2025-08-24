import React, { useEffect, useRef } from "react";
import Error from "../error";
import SpinnerText from "@components/molecules/spinnerText";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useSubscribeRepo from "@hooks/public/useSubscribeRepo";
import { ERepoGrouping } from "@interface/enums";
import { useRepositoryStore } from "@store/repository";

interface IProps {
  hash: string;
}

const SubscribeRequest = ({ hash }: IProps) => {
  const router = useRouter();
  const hasFetched = useRef(false);
  const setRepoGroup = useRepositoryStore((state) => {
    return state.setRepoGrouping;
  });
  const subscribeHook = useSubscribeRepo();

  const fetchSubscribe = () => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    subscribeHook.mutate({
      hash,
      callBack: (result) => {
        toast.success("با موفقیت به ریپو منصوب شدید");
        localStorage.removeItem("CLASOR:LAST_PAGE");
        router.push(`/admin/repositories?repoId=${result.data.repository.id}`);
        setRepoGroup(ERepoGrouping.ACCESS_REPO);
      },
      errorCallBack: (repoId?: number) => {
        localStorage.removeItem("CLASOR:LAST_PAGE");
        if (repoId) {
          router.push(`/admin/repositories?repoId=${repoId}`);
          setRepoGroup(ERepoGrouping.ACCESS_REPO);
        } else {
          router.push("/admin/dashboard");
        }
      },
    });
  };

  useEffect(() => {
    fetchSubscribe();
  }, []);

  if (subscribeHook.isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <SpinnerText text="در حال بررسی اطلاعات" />;
      </div>
    );
  }

  if (subscribeHook.isError) {
    return <Error error={{ message: "مشکل در ارسال اطلاعات" }} retry={fetchSubscribe} />;
  }
  return null;
};

export default SubscribeRequest;
