import { useState, useEffect } from "react";

type Breakpoint = "mobile" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints = {
  mobile: "300",
  xs: "480px",
  sm: "600px",
  md: "768px",
  lg: "920px",
  xl: "1214px",
  "2xl": "1536px",
};

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("xs");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= parseInt(breakpoints["2xl"], 10)) setBreakpoint("2xl");
      else if (width >= parseInt(breakpoints.xl, 10)) setBreakpoint("xl");
      else if (width >= parseInt(breakpoints.lg, 10)) setBreakpoint("lg");
      else if (width >= parseInt(breakpoints.md, 10)) setBreakpoint("md");
      else if (width >= parseInt(breakpoints.sm, 10)) setBreakpoint("sm");
      else if (width >= parseInt(breakpoints.xs, 10)) setBreakpoint("xs");
      else setBreakpoint("mobile");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      return window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakpoint;
};

export default useBreakpoint;
