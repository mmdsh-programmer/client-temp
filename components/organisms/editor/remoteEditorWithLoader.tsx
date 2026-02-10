import React, { useRef, useState } from "react";
import RemoteEditor, { IRemoteEditorRef } from "clasor-remote-editor";
import { Spinner } from "@components/atoms/spinner";
import { IClassicData } from "clasor-remote-editor/dist/interface";

interface Props {
  url: string;
  editorMode: "edit" | "preview" | "temporaryPreview";
  refObj: React.RefObject<IRemoteEditorRef>;
  loadData: string | IClassicData | null | undefined;
  onGetConfig: (config: string) => void;
  onChange: (value: { content: string; outline: string }) => void;
  loadHtml: () => void;
}

const RemoteEditorWithLoader = ({
  url,
  editorMode,
  refObj,
  loadData,
  onGetConfig,
  onChange,
  loadHtml,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className="relative h-full w-full" ref={containerRef}>
      {!iframeLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
          <Spinner className="h-5 w-5 text-primary" />
        </div>
      )}
      <RemoteEditor
        url={url}
        editorMode={editorMode}
        ref={refObj}
        loadData={loadData}
        onGetConfig={onGetConfig}
        onChange={onChange}
        loadHtml={loadHtml}
        onEditorLoad={() => { setIframeLoaded(true); }}
      />
    </div>
  );
};

export default RemoteEditorWithLoader;
