import React from "react";
import RepoPage from "@components/pages/repository";
import { getMe } from "@actions/auth";
import { Metadata } from "next/types";
import { getRepository } from "@service/clasor";

export async function generateMetadata({ searchParams }): Promise<Metadata> {
  const { repoId } = searchParams;
  try {
    const userInfo = await getMe();
    const response = await getRepository(userInfo.access_token, repoId);

    return {
      title: response.name,
      description: "",
    };
  } catch {
    return {
      title: "مخزن",
      description: "",
    };
  }
}

const Repositories = async () => {

  return <RepoPage />;
};

export default Repositories;
