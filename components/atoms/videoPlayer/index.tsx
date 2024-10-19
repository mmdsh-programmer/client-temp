import React from "react";

interface IProps {
  src: string;
  name: string;
  extension: string;
}

const VideoPlayer = ({ src, name, extension }: IProps) => {
  return (
    <div className="w-full flex-col h-full flex justify-center">
      <video preload="none" controls className="h-[calc(100dvh-410px)] mx-auto">
        <source
          id={name.concat(extension)}
          title={name.concat(extension)}
          src={src}
          type="video/mp4"
        />
        <track
          src="captions_es.vtt"
          kind="captions"
          srcLang="en"
          label="english_captions"
        />
      </video>
    </div>
  );
};

export default VideoPlayer;
