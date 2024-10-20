import FileIconAtom from "@components/atoms/fileIcon";
import RenderPreview from "@components/organisms/editor/renderPreview";
import React from "react";

interface IProps {
  file: { name: string; extension: string; hash: string; size?: number };
  showIcon?: boolean;
}

const FilePreviewWrapper = ({ file, showIcon }: IProps) => {
  return (
    <div className="flex-col items-center w-full justify-center">
      {showIcon ? (
        <FileIconAtom extension={file.extension} />
      ) : (
        <div className="preview-wrapper w-full h-[calc(100dvh-300px)] bg-gray-200 relative flex items-center">
          <RenderPreview file={file} isPublic={false} displayLabel={false} />
        </div>
      )}
    </div>
  );
};

export default FilePreviewWrapper;
