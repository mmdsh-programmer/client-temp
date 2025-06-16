import BasicError from "@utils/error";
import Error from "@components/organisms/error";
import { ICustomPostData } from "@interface/app.interface";
import ImageComponent from "@components/atoms/image";
import LandingPage from "@components/pages/landingPage";
import PublishFooter from "@components/organisms/footer/publishFooter";
import PublishHeader from "@components/organisms/header/publishHeader";
import PublishRepositories from "@components/organisms/publishRepositoreis";
import React from "react";
import { decodeKey } from "@utils/index";
import { generateCachePageTag } from "@utils/redis";
import { getCustomPostByDomain } from "@service/clasor";

interface MainPageProps {
  params: {
    domain: string;
  };
}
const MainPage = async ({ params }: MainPageProps) => {
  try {
    const domain = decodeKey(params.domain);
    const { content, enablePublishPage } = await getCustomPostByDomain(domain);
    const domainInfo = JSON.parse(content ?? "{}") as ICustomPostData;
    await generateCachePageTag([`i-${params.domain}`], 900);
    if (enablePublishPage) {
      const { projectName, projectDescription, heroImage, logo } = domainInfo;
      return (
        <>
          <PublishHeader projectName={projectName} logo={logo} domain={domain} />
          <main className="px-0 xs:px-8 h-[calc(100vh-156px)] overflow-y-auto relative w-full">
            <div className="w-full mb-16 mt-8 px-4 py-8 rounded-md bg-secondary">
              <div
                className="flex w-full py-4 relative justify-center"
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

              <h1 className="text-white text-[40px] text-center mt-8">
                {projectName ?? "نام پروژه"}
              </h1>
              <p className="text-white text-lg text-center mt-4">
                {projectDescription ?? "توضیحات پروژه"}
              </p>
            </div>
            <PublishRepositories />
          </main>
          <PublishFooter
            projectDescription={projectDescription}
            logo={logo}

          />
        </>
      );
    }
    return <LandingPage />;
  } catch (error) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Error
          error={{
            message:
              (error as unknown as BasicError).message ??
              "خطا در دریافت اطلاعات ",
          }}
        />
      </div>
    );
  }
};

export default MainPage;
