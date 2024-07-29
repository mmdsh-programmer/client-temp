import React from "react";
import ImageAtom from "../../atoms/image/image";
import Typograghy from "../../atoms/typograghy/text";

interface IProps {
  classNameImage?: string;
  classNameText?: string;
  source?: string;
  alt?: string;
  text: string;
}

const ImageText = ({
  classNameImage,
  classNameText,
  source,
  alt,
  text,
}: IProps) => {
  return (
    <div className="flex items-center gap-x-6">
      <Typograghy className={classNameText} text={text} />
      <ImageAtom className={classNameImage} source={source} alt={alt} />
    </div>
  );
};

export default ImageText;
