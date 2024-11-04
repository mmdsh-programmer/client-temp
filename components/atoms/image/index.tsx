"use client";

import Image from "next/image";
import React from "react";

interface IProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const ImageComponent = ({ alt, src, className, width, height }: IProps) => {
  return (
    <Image
      className={`${className}`}
      src={src}
      alt={alt}
      width={width ?? 100}
      height={height ?? 100}
      priority
    />
  );
};

export default ImageComponent;
