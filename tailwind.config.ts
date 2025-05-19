/* eslint-disable import/no-import-module-exports */

import { fontFamily } from "tailwindcss/defaultTheme";
import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/clasor-content-preview/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/not-found.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        "landing-text-color": "#3D3456",
        orange: {
          100: "var(--orange-100)",
        },
        "blue-green": {
          100: "var(--blue-green)",
        },
        gray: {
          50: "var(--gray-50)", // cancel background
          100: "var(--gray-100)",
          200: "var(--gray-200)", // border-normel // menu-active
          300: "var(--gray-300)",
          400: "var(--gray-400)", // text-hint // icon-normal
          500: "var(--gray-500)", // text-secondary //icon-hover
          700: "var(--gray-700)",
          800: "var(--gray-800)", // icon-active
          900: "var(--gray-900)", // text-primary
        },

        purple: {
          normal: "var(--primary-normal)",
          light: "var(--primary-light)",
        },
        icon: {
          active: "var(--icon-active)",
          hover: "var(--icon-hover)",
        },
        critical: {
          normal: "var(--critical-normal)",
        },
        error: "var(--error)",
        primary: {
          normal: "var(--primary-normal)",
          light: "var(--primary-light)",
        },
        success: {
          normal: "var(--success-normal)",
        },
        info: {
          normal: "var(--info)",
        },
        stroke: {
          primary: "var(--stroke-primary)",
        },
      },
      backgroundColor: {
        primary: "var(--bg-primary-color)",
        "primary-light": "var(--primary-light)",
        "primary-normal": "var(--primary-normal)",
        secondary: "var(--bg-secondary-color)",
        tertiary: "var(--bg-tertiary-color)",
      },
      borderColor: {
        normal: "var(--border-normal)",
      },
      iconColor: {
        active: "var(--icon-active)",
        hover: "var(--icon-hover)",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        hint: "var(--text-hint)",
        placeholder: "var(--text-placeholder)",
        primary_normal: "var(--text-primary-normal)",
        link: "var(--text-link)",
        success: "var(--success-normal)",
      },
      fontFamily: { iranYekan: ["var(--font-iran-yekan)", ...fontFamily.sans] },
      screens: {
        mobile: "300",
        xs: "480px",
        sm: "600px",
        md: "768px",
        lg: "920px",
        xl: "1214px",
        "2xl": "1536px",
      },
      boxShadow: {
        xSmall: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        small: "0px 1px 2px 0px rgba(145, 158, 171, 0.16)",
        menu: "0px 10px 20px 0px rgba(0, 0, 0, 0.10)",
      },
      flex: {
        "0": "0 0 auto",
        "1": "1 1 auto",
        "2": "2 2 auto",
      },
      letterSpacing: {
        tightest: "0.13px",
      },
      backdropBlur: {
        sm: "0",
      },
      animation: {
        marquee: "marquee 20s linear infinite",
        floatBubble: "floatBubble 4s ease-in-out infinite",
      },
      keyframes: {
        floatBubble: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(var(--randomX), var(--randomY))" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports, global-require, import/no-extraneous-dependencies
  plugins: [require("tailwindcss-rtl")],
});
