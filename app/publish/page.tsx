import React from "react";
import Image from "next/image";
import PublishRepositories from "@components/organisms/publishRepositoreis";

const PublishHomePage = async () => {
  return (
    <>
      <div className="w-full mt-8 bg-blue-gray-400 px-4 py-8">
        <div className="flex w-full relative justify-center">
          <Image
            src="/docs.png"
            alt="راهنمای پلتفرم پایه"
            width={637}
            height={241}
          />
        </div>

        <h1 className="text-white text-[40px] text-center mt-8">
          راهنمای پلتفرم پایه
        </h1>
        <p className="text-white text-lg text-center mt-4">
          مستندات بصورت دسته‌بندی در زیر مشخص می‌باشد. با انتخاب یکی از دسته‌های
          زیر به اطلاعات آن بخش براحتی دسترسی داشته باشید
        </p>
      </div>
      <PublishRepositories />
    </>
  );
};

export default PublishHomePage;
