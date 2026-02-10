import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class", '[data-mode="dark"]'],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/clasor-content-preview/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/notFound.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-gray-50",
    "bg-gray-100",
    "bg-info",
    "bg-primary-light",
    "bg-error",
    "text-primary_normal",
    "!text-success",
    "!text-secondary",
    "!text-hint",
    "text-primary",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "300px",
        xs: "480px",
        sm: "600px",
        md: "768px",
        lg: "920px",
        xl: "1214px",
        "2xl": "1536px",
      },
      colors: {
        "landing-text-color": "#3D3456",
        orange: {
          "100": "var(--orange-100)",
        },
        "blue-green": {
          "100": "var(--blue-green)",
        },
        gray: {
          "50": "var(--gray-50)",
          "100": "var(--gray-100)",
          "200": "var(--gray-200)",
          "300": "var(--gray-300)",
          "400": "var(--gray-400)",
          "500": "var(--gray-500)",
          "700": "var(--gray-700)",
          "800": "var(--gray-800)",
          "900": "var(--gray-900)",
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        marker: {
          yellow: "#fdfd77",
          green: "#62f962",
          pink: "#fc7899",
          blue: "#72ccfd",
          "pen-red": "#e71313",
          "pen-green": "#128a00",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundColor: {
        primary: "var(--bg-primary-color)",
        "primary-light": "var(--primary-light)",
        "primary-normal": "var(--primary-normal)",
        secondary: "var(--bg-secondary-color)",
        tertiary: "var(--bg-tertiary-color)",
        error: "var(--error)",
      },
      borderColor: {
        normal: "var(--border-normal)",
      },
      iconColor: {
        active: "var(--icon-active)",
        hover: "var(--icon-hover)",
      },
      textColor: {
        primary: "var(--primary-normal)",
        secondary: "var(--text-secondary)",
        hint: "var(--text-hint)",
        placeholder: "var(--text-placeholder)",
        primary_normal: "var(--text-primary-normal)",
        link: "var(--text-link)",
        success: "var(--success-normal)",
        error: "var(--error)",
      },
      fontFamily: {
        iranYekan: ["var(--font-iran-yekan)", ...fontFamily.sans],
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
        loading: "loading 2s 2.5s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        floatBubble: {
          "0%, 100%": {
            transform: "translate(0, 0)",
          },
          "50%": {
            transform: "translate(var(--randomX), var(--randomY))",
          },
        },
        marquee: {
          "0%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        loading: {
          "0%": {
            "background-size": "400% 100%",
            "background-position": "100% 0",
          },
          "50%": {
            "background-size": "200% 100%",
          },
          "100%": {
            "background-size": "400% 100%",
            "background-position": "-100% 0",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-rtl"), require("tailwindcss-animate")],
};

export default config;
