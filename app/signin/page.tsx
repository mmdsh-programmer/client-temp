import React, { Suspense } from "react";

import SignInComponent from "@components/pages/signin";

const Signin = () => {
  return (
    <Suspense>
      <SignInComponent />
    </Suspense>
  );
};

export default Signin;
