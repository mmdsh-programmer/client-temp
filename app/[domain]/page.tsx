// import BasicError from "@utils/error";
// import Error from "@components/organisms/error";
// import { ICustomPostData } from "@interface/app.interface";
// import ImageComponent from "@components/atoms/image";
// import LandingPage from "@components/pages/landingPage";
// import PublishFooter from "@components/organisms/footer/publishFooter";
// import PublishHeader from "@components/organisms/header/publishHeader";
// import PublishRepositories from "@components/organisms/publishRepositoreis";
import React from "react";
// import { decodeKey } from "@utils/index";
// import { generateCachePageTag } from "@utils/redis";
// import { getCustomPostByDomain } from "@service/clasor";

// interface MainPageProps {
//   params: Promise<{
//     domain: string;
//   }>;
// }
// const MainPage = async ({ params }: MainPageProps) => {
//   try {
//     const awaitedParams = await params;

//     const isDev = process.env.NODE_ENV === "development";
//     let domain: string = "";

//     if (isDev) {
//       domain = process.env.DOMAIN || "";
//     } else {
//       domain = decodeKey(awaitedParams.domain);
//     }
//     const { content, enablePublishPage } = await getCustomPostByDomain(domain);
//     const domainInfo = JSON.parse(content ?? "{}") as ICustomPostData;
//     await generateCachePageTag([`i-${awaitedParams.domain}`], 900);
//     if (enablePublishPage) {
//       const { projectName, projectDescription, heroImage, logo } = domainInfo;
//       return (
//         <>
//           <PublishHeader projectName={projectName} logo={logo} domain={domain} />
//           <main className="relative h-[calc(100vh-156px)] w-full overflow-y-auto px-0 xs:px-8">
//             <div className="mb- mt-8 w-full rounded-md bg-primary-normal px-4 py-8">
//               <div className="relative flex w-full justify-center py-4">
//                 <ImageComponent
//                   src={
//                     heroImage
//                       ? `${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${heroImage}?&time=${Date.now()}`
//                       : "/docs.png"
//                   }
//                   alt={projectName ?? "نام پروژه"}
//                   width={637}
//                   height={241}
//                 />
//               </div>

//               <h1 className="mt-8 text-center text-[40px] text-white">
//                 {projectName ?? "نام پروژه"}
//               </h1>
//               <p className="mt-4 text-center text-lg text-white">
//                 {projectDescription ?? "توضیحات پروژه"}
//               </p>
//             </div>
//             <PublishRepositories />
//           </main>
//           <PublishFooter projectDescription={projectDescription} logo={logo} />
//         </>
//       );
//     }
//     return <LandingPage />;
//   } catch (error) {
//     return (
//       <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
//         <Error
//           error={{
//             message: (error as unknown as BasicError).message ?? "خطا در دریافت اطلاعات ",
//           }}
//         />
//       </div>
//     );
//   }
// };

const MainPage = (
  // { params }: MainPageProps
) => {
  return <h1>MainPage</h1>;
};



export default MainPage;
