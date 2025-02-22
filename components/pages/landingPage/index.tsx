import ClientSideProvider from "provider/clientSideProvider";
import LandingAdvantages from "@components/molecules/landingAdvantages";
import LandingAttributeWrapper from "@components/organisms/landingAttributeWrapper";
import LandingFooter from "@components/molecules/landingFooter";
import LandingHero from "../../molecules/landingHero";
import LandingSupporters from "@components/molecules/landingSupporters";
import React from "react";

const Landing = () => {


  return (
    <main className="clasor-landing h-[200vh]">
      <ClientSideProvider>
        <LandingHero />
        <LandingAttributeWrapper />
        <LandingAdvantages />
        <LandingSupporters />
        <LandingFooter />
      </ClientSideProvider>
    </main>
  );
};

export default Landing;
