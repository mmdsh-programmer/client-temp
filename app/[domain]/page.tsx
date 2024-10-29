import LandingPage from "@components/pages/landingPage";
import React from "react";

export default function SlugPage() {
    try {
     return (
      <main className="flex h-screen flex-col items-center justify-between">
        <LandingPage />
      </main>
     ); 
    } catch  {
      return (
       <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1>Error</h1>
       </div>
     );
    }
}
   