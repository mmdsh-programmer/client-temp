"use client";

import React, { useEffect, useState } from "react";
import { useRepositoryStore } from "@store/repository";
import { useRouter, useSearchParams } from "next/navigation";

import Error from "@components/organisms/error";
import { IRepo } from "interface/repo.interface";
import { Spinner } from "@components/atoms/spinner";
import useGetRepo from "@hooks/repository/useGetRepo";
import useHandleRepoChange from "@hooks/repository/useHandleRepoChange";

interface IProps {
  children: React.ReactNode;
}

const CheckRepoInfo = ({ children }: IProps) => {
  useHandleRepoChange();

  const [loading, setLoading] = useState(true);
  const repositoryId = useRepositoryStore((state) => state.repositoryId);
  const setRepositoryId = useRepositoryStore((state) => state.setRepositoryId);
  const setRepository = useRepositoryStore((state) => state.setRepo);

  const router = useRouter();
  const searchParams = useSearchParams();
  const repoId = searchParams?.get("repoId");

  const { error, refetch, isFetching } = useGetRepo(
    repositoryId ? +repositoryId : null,
    setRepository,
    setRepositoryId,
    true
  );

  useEffect(() => {
    const lastRepo = window.localStorage.getItem("CLASOR:SELECTED_REPO");
    if (
      !lastRepo &&
      !repoId &&
      window.location.pathname !== "/panel-admin-clasor"
    ) {
      router.push("/admin/dashboard");
    }

    if (repoId) {
      setRepositoryId(+repoId);
    } else if (lastRepo) {
      const repository = JSON.parse(lastRepo) as IRepo;
      setRepositoryId(repository.id);
    }
    setLoading(false);
  }, []);

  if (error) {
    return (
      <Error
        error={{ message: "خطا در دریافت اطلاعات مخزن" }}
        retry={refetch}
      />
    );
  }

  if (loading || isFetching) {
    return (
      <div className="w-full h-full flex-col flex justify-center items-center">
        <Spinner className="h-10 w-10 text-primary" />
      </div>
    );
  }

  return <div className="check-repo-info h-[calc(100%-20px)] flex gap-3">{children}</div>;
};

export default CheckRepoInfo;
