import React from "react";

interface IProps {
  src: string;
  name: string;
  extension: string;
}

const AudioPlayer = ({ src, name, extension }: IProps) => {
  return (
    <div className="w-full flex-col h-full flex justify-center">
      <audio controls className="m-auto" preload="none">
        <source
          id={name.concat(extension)}
          title={name.concat(extension)}
          src={src}
          type="audio/aac"
        />
        <track
          src="captions_es.vtt"
          kind="captions"
          srcLang="en"
          label="english_captions"
        />
      </audio>
    </div>
  );
};

export default AudioPlayer;
