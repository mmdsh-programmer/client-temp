import React, { Suspense } from "react";

import { ICustomPostData } from "@interface/app.interface";
import SignInComponent from "@components/pages/signin";
import { decodeKey } from "@utils/index";
import { getCustomPostByDomain } from "@service/social";

interface IProps {
  params: {
    domain: string;
  };
}
const Signin = async ({ params }: IProps) => {
  const domainHash = decodeKey(params.domain);
  const { data } = await getCustomPostByDomain(domainHash);
  const { projectName, logo, projectDescription } = JSON.parse(data ?? "{}") as ICustomPostData;
  return (
    <Suspense>
      <SignInComponent projectName={projectName ?? "_"} logo={logo ?? "_"} projectDescription={projectDescription ?? "_"} />
    </Suspense>
  );
};

export default Signin;
