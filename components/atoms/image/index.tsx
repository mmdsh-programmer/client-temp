import React from "react";
import Image from "next/image";

interface IProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageComponent = ({ alt, src, className }: IProps) => {
  return (
    <Image
      className={`h-full w-full overflow-hidden ${className || ""}`}
      src={src}
      alt={alt}
      width={100}
      height={100}
      priority
    />
  );
};

export default ImageComponent;
