import Error from "@components/organisms/error";
import { HeroIcon } from "@components/atoms/icons";
import ImageComponent from "@components/atoms/image";
import PublishFooter from "@components/organisms/footer/publishFooter";
import PublishHeader from "@components/organisms/header/publishHeader";
import PublishRepositories from "@components/organisms/publishRepositoreis";
import React from "react";
import { getThemeAction } from "@actions/theme";

const PublishHomePage = async () => {
  const data = await getThemeAction();
  if (data && "error" in data) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Error
          error={{ message: data.errorList?.[0] ?? "خطا در دریافت اطلاعات" }}
        />
      </div>
    );
  }
  return (
    <>
      <PublishHeader
        themeInfo={data}
      />
      <main className="px-0 xs:px-8 h-[calc(100vh-156px)] overflow-y-auto relative w-full">
        <div className="w-full mt-8 bg-primary px-4 py-8 rounded-md">
          <div className="flex w-full relative justify-center">
            {data.heroImage ? (
              <ImageComponent
                src={
                  data?.heroImage
                    ? `${process.env.NEXT_PUBLIC_PODSPACE_API}files/${data.heroImage}?&time=${Date.now()}`
                    : "/docs.png"
                }
                alt={data.projectName ?? "نام پروژه"}
                width={637}
                height={241}
              />
            ) : (
              <HeroIcon fill="purple" />
            )}
          </div>

          <h1 className="text-primary-normal text-[40px] text-center mt-8">
            {data.projectName ?? "نام پروژه"}
          </h1>
          <p className="gray-500 text-lg text-center mt-4">
            {data.projectDescription ?? "توضیحات پروژه"}
          </p>
        </div>
        <PublishRepositories />
      </main>
      <PublishFooter themeInfo={data} />
    </>
  );
};

export default PublishHomePage;
