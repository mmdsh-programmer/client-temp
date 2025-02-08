import Advantages from "./advantages";
import AttributeWrapper from "./attributeWrapper";
import ClientSideProvider from "provider/clientSideProvider";
import Customers from "./customers";
import Footer from "./footer";
import Hero from "./hero";
import React from "react";
import Supporters from "./supporters";

const Landing = () => {


  return (
    <main className="clasor-landing h-[200vh]">
      <ClientSideProvider>
        <Hero />
        <AttributeWrapper />
        <Advantages />
        <Customers />
        <Supporters />
        <Footer />
      </ClientSideProvider>
    </main>
  );
};

export default Landing;
