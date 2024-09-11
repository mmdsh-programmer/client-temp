const withMT = require("@material-tailwind/react/utils/withMT");
import { fontFamily } from "tailwindcss/defaultTheme";

module.exports = withMT({
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#F6F7F8", // cancel background
          100: "#EEF0F2",
          200: "#ECECEE", // border-normel // menu-active
          300: "#CED4D9",
          400: "#9AA6B1", // text-hint // icon-normal
          500: "#71717A", // text-secondary //icon-hover
          700: "#414147",
          800: "#1B1B1D", // icon-active
          900: "#181C20", // text-primary
        },
        purple: {
          normal: "#7446B2",
          light: "#F1EDF7",
        },
        icon: {
          active: "#181C20",
          hover: "#667585",
        },
        critical: {
          normal: "#E03E1A",
        },
        error: "#E03E1A",
        success: {
          normal: "#1F7A37",
          secondary: "#F7FDF8",
        },
        info: "#0C8CE9",
        "info-secondary": "#E7F5FD",
      },
      backgroundColor: {
        primary: "#FFFFFF",
        secondary: "#F5F7FA",
        tertiary: "#F2F2F7",
      },

      borderColor: {
        normal: "#EEF0F2",
      },
      iconColor: {
        active: "#181C20",
      },
      textColor: {
        primary: "#0C0E10",
        secondary: "#667585",
        hint: "#9AA6B1",
        placeholder: "#98A2B3",
        disabled: "#9AA6B1",
        primary_normal: "#7446B2",
        link: "#0C8CE9",
      },
      fontFamily: {
        iranYekan: ["var(--font-iran-yekan)", ...fontFamily.sans],
      },
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
    },
  },
  plugins: [require("tailwindcss-rtl")],
});
