import React, { Suspense } from "react";
import CheckRepoInfo from "@components/templates/checkRepoInfo";
import EditPage from "@components/pages/edit";
import { Metadata } from "next/types";
import { getMe } from "@actions/auth";
import { getDocument } from "@service/clasor";

interface IProps {
  searchParams: {
    repoId: number;
    documentId: number;
    sharedDocuments: boolean;
  };
}

export async function generateMetadata({ searchParams }): Promise<Metadata> {
  const { repoId, documentId, sharedDocuments } = searchParams;

  try {
    const userInfo = await getMe();
    const documentInfo = await getDocument(
      userInfo.access_token,
      repoId,
      documentId,
      !!sharedDocuments,
      0,
      1,
      true,
    );
    return {
      title: `ویرایش سند ${documentInfo.name}`,
      description: "ویرایش آخرین نسخه",
    };
  } catch {
    return {
      title: "ویرایش محتوا",
      description: "",
    };
  }
}

const Edit = ({ searchParams }: IProps) => {
  const { sharedDocuments } = searchParams;

  return (
    <Suspense>
      <div className="h-screen">
        {sharedDocuments ? (
          <EditPage />
        ) : (
          <CheckRepoInfo>
            <EditPage />
          </CheckRepoInfo>
        )}
      </div>
    </Suspense>
  );
};

export default Edit;
