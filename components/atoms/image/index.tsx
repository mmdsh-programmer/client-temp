"use client";

import Image from "next/image";
import React from "react";

type IProps = React.ComponentProps<typeof Image> & {
  height?: number;
  width?: number;
  src: string;
}

const imageLoader = (src: string) => {
  return src;
};

const ImageComponent = (props: IProps) => {
  const { width, height, src, ...rest } = props;
  return (
    <Image
      {...rest}
      src={src}
      loader={() => { return imageLoader(src); }}
      width={width ?? 100}
      height={height ?? 100}
      priority
    />
  );
};

export default ImageComponent;
