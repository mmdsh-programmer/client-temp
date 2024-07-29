"use client";

import React from "react";

interface IProps {
  error: any;
  reset: () => void;
}

const Error = ({ error, reset }: IProps) => {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center p-4 md:p-6 lg:p-8">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm max-w-md w-full text-center">
        <div className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
              خطایی رخ داد
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {error.message || "خطای نامشخصی رخ داد"}
            </p>
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-dashboard-primary text-white font-bold py-2 px-4 rounded"
                onClick={reset}
              >
                تلاش مجدد
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
