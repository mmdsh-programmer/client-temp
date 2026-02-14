import React from "react";
import ClientSideProvider from "provider/clientSideProvider";
import LandingAdvantages from "@components/molecules/landingAdvantages";
import LandingAttributeWrapper from "@components/organisms/landingAttributeWrapper";
import LandingFooter from "@components/molecules/landingFooter";
import LandingHero from "@components/molecules/landingHero";
import LandingSupporters from "@components/molecules/landingSupporters";

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
