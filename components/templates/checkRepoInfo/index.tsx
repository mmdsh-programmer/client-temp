"use client";

import React, { useEffect, useState } from "react";
import { repoAtom, repositoryIdAtom } from "atom/repository";
import { useRecoilState, useSetRecoilState } from "recoil";
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
  const [repositoryAtomId, setRepositoryAtomId] =
    useRecoilState(repositoryIdAtom);

  const router = useRouter();
  const searchParams = useSearchParams();
  const repoId = searchParams?.get("repoId");

  const setRepository = useSetRecoilState(repoAtom);

  const { error, refetch, isFetching } = useGetRepo(
    repositoryAtomId ? +repositoryAtomId : null,
    setRepository,
    setRepositoryAtomId,
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
      setRepositoryAtomId(+repoId);
    } else if (lastRepo) {
      const repository = JSON.parse(lastRepo) as IRepo;
      setRepositoryAtomId(repository.id);
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
