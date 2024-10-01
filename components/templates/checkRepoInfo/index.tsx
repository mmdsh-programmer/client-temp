"use client";

import React, { useEffect, useState } from "react";
import { repoAtom, repositoryIdAtom } from "atom/repository";
import { useRecoilState } from "recoil";
import { useRouter, useSearchParams } from "next/navigation";
import Error from "@components/organisms/error";
import { IRepo } from "interface/repo.interface";
import { Spinner } from "@material-tailwind/react";
import useGetRepo from "@hooks/repository/useGetRepo";
import useHandleRepoChange from "@hooks/repository/useHandleRepoChange";

interface IProps {
  children: JSX.Element;
}

const CheckRepoInfo: React.FC<IProps> = ({ children }: IProps) => {
  useHandleRepoChange();

  const [loading, setLoading] = useState(true);
  const [repositoryAtomId, setRepositoryAtomId] =
    useRecoilState(repositoryIdAtom);

  const router = useRouter();
  const searchParams = useSearchParams();
  const repoId = searchParams.get("repoId");

  const [getRepo, setRepository] = useRecoilState(repoAtom);

  const { error, refetch } = useGetRepo(
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

  if (loading) {
    return (
      <div className="w-full h-full flex-col flex justify-center items-center">
        <Spinner className="h-10 w-10" color="deep-purple" />
      </div>
    );
  }

  if (getRepo) {
    return <div>{children}</div>;
  }
};

export default CheckRepoInfo;
