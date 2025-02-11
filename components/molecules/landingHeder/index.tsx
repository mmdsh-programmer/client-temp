import LoginButton from "@components/molecules/loginButton";
import { Logo } from "@components/atoms/landingSvg/landingSvg";
import React from "react";

const LandingHeder = () => {
  return (
    <header className="landing-header">
      <div className="container max-w-[1220px]">
        <div className="flex flex-wrap pt-[30px] justify-between">
          <Logo />
          <div className="landing-header__actions flex gap-x-[15px] items-center xs:items-start">
              <LoginButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingHeder;
