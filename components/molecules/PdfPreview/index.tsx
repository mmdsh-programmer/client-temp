/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

interface IProps {
  fileLink: string;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfPreview = ({ fileLink }: IProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages: documentNumPages }: any) => {
    setNumPages(documentNumPages);
  };

  return (
    <Document
      file={fileLink}
      onLoadSuccess={onDocumentLoadSuccess}
      className="flex flex-col items-center h-[calc(100vh-300px)] overflow-x-auto mb-4 w-[100vw] md:w-[calc(100vw-300px)] font-iranYekan"
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

export default PdfPreview;
