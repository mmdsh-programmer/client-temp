"use client";

import React, { useEffect, useState } from "react";
import { useRepositoryStore } from "@store/repository";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Error from "@components/organisms/error";
import { IRepo } from "interface/repo.interface";
import { Spinner } from "@components/atoms/spinner";
import useGetRepo from "@hooks/repository/useGetRepo";
import "react-toastify/dist/ReactToastify.min.css";


interface IProps {
  children: React.ReactNode;
}

const CheckRepoInfo = ({ children }: IProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const repositoryIdFromStore = useRepositoryStore((state) => {
    return state.repositoryId;
  });
  const setRepositoryId = useRepositoryStore((state) => {
    return state.setRepositoryId;
  });
  const setRepository = useRepositoryStore((state) => {
    return state.setRepo;
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlRepoId = searchParams.get("repoId");
    const localRepoRaw = localStorage.getItem("CLASOR:SELECTED_REPO");
    const localRepo: IRepo | null = localRepoRaw ? JSON.parse(localRepoRaw) : null;
    const localRepoId = localRepo?.id?.toString();

    if (urlRepoId) {
      setRepositoryId(+urlRepoId);
      if (urlRepoId !== localRepoId) {
        localStorage.setItem("CLASOR:SELECTED_REPO", JSON.stringify({ id: +urlRepoId }));
      }
      setIsInitialized(true);
      return;
    }

    if (!urlRepoId && localRepoId) {
      router.replace(`/admin/repositories?repoId=${localRepoId}`);
      return;
    }

    if (!urlRepoId && !localRepoId) {
      toast.error("مخزنی انتخاب نشده است. در حال انتقال به داشبورد.");
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 100);
    }
  }, [searchParams, router, setRepositoryId]);

  const { error, refetch, isFetching } = useGetRepo(
    repositoryIdFromStore ? +repositoryIdFromStore : null,
    setRepository,
    setRepositoryId,
    true,
  );

  if (!isInitialized || isFetching) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Spinner className="h-10 w-10 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Error error={{ message: "خطا در دریافت اطلاعات مخزن" }} retry={refetch} />
    );
  }

  return <div className="check-repo-info flex h-[calc(100%-20px)] gap-3">{children}</div>;
};

export default CheckRepoInfo;
