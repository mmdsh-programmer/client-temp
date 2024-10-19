"use client";

import ErrorToast from "@components/atoms/errorToast";
import React from "react";
import { toast } from "react-toastify";
import useGetSampleError from "@hooks/sampleError/useGetSampleError";
import useSampleError from "@hooks/sampleError/useSampleError";

const SampleError = () => {
  const { mutate } = useSampleError();
  const { data, isError, error } = useGetSampleError();
  
  const handleClick = () => {
    mutate({
      onError: (errorResponse) => {
        toast.error(<ErrorToast message={errorResponse.errorList?.[0]} referenceNumber={errorResponse.referenceNumber} />);
      }
    });
  };
  
  return (
    <div>
      {isError ? <h1 className="text-red-500">{JSON.stringify(error)}</h1> : null}
      {JSON.stringify(data)}
      <button onClick={handleClick}>CREATE ERROR</button>
    </div>
  );
};

export default SampleError;
