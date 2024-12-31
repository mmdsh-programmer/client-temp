import React from "react";
import { checkFormat } from "@utils/index";
import { IFile } from "cls-file-management";
import useGetUser from "@hooks/auth/useGetUser";
import ImageComponent from "@components/atoms/image";
import FileLabel from "@components/atoms/fileLabel";
import PdfPreview from "@components/molecules/PdfPreview";
import VideoPlayer from "@components/atoms/videoPlayer";
import AudioPlayer from "@components/atoms/audioPlayer";
import FileIconAtom from "@components/atoms/fileIcon";

interface IProps {
  file:
    | IFile
    | { name: string; extension: string; hash: string; size?: number };
  isPublic: boolean;
  displayLabel?: boolean;
}

const RenderPreview = ({ file, isPublic, displayLabel = true }: IProps) => {
  const { data: userInfo } = useGetUser();

  const token = userInfo?.access_token;

  let fileLink = `${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${file.hash}`;
  if (!isPublic) {
    fileLink += `?&checkUserGroupAccess=true&Authorization=${token}&time=${Date.now()}`;
  }

  switch (checkFormat(file.extension)) {
    case "image":
      return (
        <>
          <ImageComponent src={fileLink} alt={file.name} className="object-none" />
          {displayLabel && (
            <FileLabel name={file.name} extension={file.extension} />
          )}
        </>
      );
    case "pdf":
      return <PdfPreview fileLink={fileLink} />;
    case "video":
      return (
        <>
          <VideoPlayer
            src={fileLink}
            name={file.name}
            extension={file.extension}
          />
          {displayLabel && (
            <FileLabel name={file.name} extension={file.extension} />
          )}
        </>
      );
    case "audio":
      return (
        <>
          <AudioPlayer
            src={fileLink}
            name={file.name}
            extension={file.extension}
          />
          {displayLabel && (
            <FileLabel name={file.name} extension={file.extension} />
          )}
        </>
      );
    default:
      return <FileIconAtom extension={file.extension} />;
  }
};

export default RenderPreview;
