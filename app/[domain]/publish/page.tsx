import { ICustomPostData } from "@interface/app.interface";
import ImageComponent from "@components/atoms/image";
import PublishFooter from "@components/organisms/footer/publishFooter";
import PublishHeader from "@components/organisms/header/publishHeader";
import PublishRepositories from "@components/organisms/publishRepositoreis";
import React from "react";
import { decodeKey } from "@utils/index";
import { getCustomPostByDomain } from "@service/social";

export const generateStaticParams = async () => {
  return [];
};


const PublishHomePage = async ({
 params
}: {
  params:{
    domain: string;
  }
}) => {
  const { data } = await getCustomPostByDomain(decodeKey(params.domain));
  
  const { projectName, projectDescription, heroImage, theme } = JSON.parse(data ?? "{}") as ICustomPostData;

  const time = Date.now();
  return (
    <>
      <h1 className="fixed top-0 left-0 font-bold text-red-500 z-50">{time}</h1>
      <PublishHeader projectName={projectName} logo={heroImage} />
      <main className="px-0 xs:px-8 h-[calc(100vh-156px)] overflow-y-auto relative w-full">
        <div className="w-full mt-8 bg-primary px-4 py-8 rounded-md">
          <div
            className={`flex w-full ${!heroImage ? "bg-gray-500 py-4" : ""} relative justify-center`}
          >
            <ImageComponent
              src={
                heroImage
                  ? `${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${heroImage}?&time=${Date.now()}`
                  : "/docs.png"
              }
              alt={projectName ?? "نام پروژه"}
              width={637}
              height={241}
            />
          </div>

          <h1 className="text-primary-normal text-[40px] text-center mt-8">
            {projectName ?? "نام پروژه"}
          </h1>
          <p className="gray-500 text-lg text-center mt-4">
            {projectDescription ?? "توضیحات پروژه"}
          </p>
        </div>
        <PublishRepositories />
      </main>
      <PublishFooter projectDescription={projectDescription} themeInfo={theme} />
    </>
  );
};

export default PublishHomePage;
