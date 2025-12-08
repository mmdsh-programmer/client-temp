"use client";

import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';

interface IProps {
  fileLink: string;
}


const LoadPdf = ({ fileLink }: IProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [workerLoaded, setWorkerLoaded] = useState(false);

  const onDocumentLoadSuccess = ({ numPages: documentNumPages }: any) => {
    setNumPages(documentNumPages);
  };

  useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined') {
      // Set workerSrc only once
      if (!pdfjs.GlobalWorkerOptions?.workerSrc) {
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
      }
      setWorkerLoaded(true);
    }
  }, []);

  if (!workerLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Document
      file={fileLink}
      onLoadSuccess={onDocumentLoadSuccess}
      className="mb-4 flex h-[calc(100vh-300px)] w-[100vw] flex-col items-center overflow-x-auto font-iranYekan md:w-[calc(100vw-300px)]"
      loading="در حال بارگیری نسخه..."
      error="در دانلود نسخه از سرور مشکلی بوجود آمد."
    >
      {Array.from({ length: numPages || 0 }, (_, index) => {
        return (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className="border-b-2"
          />
        );
      })}
    </Document>
  );
};

export default LoadPdf;
