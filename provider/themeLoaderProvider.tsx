"use client";

import React, { useEffect } from "react";
import { IThemeInfo } from "@interface/app.interface";

interface IProps {
  children: React.ReactNode;
  theme?: IThemeInfo;
}

const ThemeLoaderProvider = ({ children, theme }: IProps) => {
  useEffect(() => {
    if (theme) {
      Object.entries(theme).forEach(([key, value]) => {
        if (value) {
          document.body.style.setProperty(key, String(value));
        }
      });
    }
  }, [theme]);
  
  return <div>{children}</div>;
};

export default ThemeLoaderProvider;
