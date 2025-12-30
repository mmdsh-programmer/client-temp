"use client";

import React from "react";
import { Spinner } from "@components/atoms/spinner";
import dynamic from "next/dynamic";

interface IProps {
  fileLink: string;
}

const LoadPdfDynamic = dynamic(
  () => {
    return import("./loadPdf");
  },
  {
    loading: () => {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="h-4 w-4 text-primary" />
        </div>
      );
    },
    ssr: false,
  },
);

const PdfPreview = ({ fileLink }: IProps) => {
  return (
    <div className="mb-4 flex h-[calc(100vh-300px)] w-[100vw] flex-col items-center overflow-x-auto font-iranYekan md:w-[calc(100vw-300px)]">
      <LoadPdfDynamic fileLink={fileLink} />
    </div>
  );
};

export default PdfPreview;
