import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "./providers";
import "../styles/globals.css";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "کلاسور",
  description: "کلاسور",
};

// main font for the app
const iranYekanFont = localFont({
  src: [
    {
      path: "../assets/font/IRANYekanRegular.ttf",
      style: "light",
      weight: "100",
    },
    {
      path: "../assets/font/IRANYekanMedium.ttf",
      style: "medium",
      weight: "500",
    },
    {
      path: "../assets/font/IRANYekanBold.ttf",
      style: "bold",
      weight: "700",
    },
  ],
  variable: "--font-iran-yekan",
  display: "swap",
});

const RootLayout = ({ children }: IProps) => {
  return (
    <html lang="fa">
      <body
        className={`${iranYekanFont.variable} !font-iranYekan h-full w-full`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
