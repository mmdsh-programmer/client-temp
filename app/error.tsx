"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface IProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: IProps) => {
  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-md rounded-lg border bg-card text-center text-card-foreground shadow-sm">
        <div className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">خطایی رخ داد</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {error.message || "خطای نامشخصی رخ داد"}
            </p>
            <div className="mt-4 flex space-x-4">
              <Button variant="outline" onClick={reset}>
                تلاش مجدد
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
