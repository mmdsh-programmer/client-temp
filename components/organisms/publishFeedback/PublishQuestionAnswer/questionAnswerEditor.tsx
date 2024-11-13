/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import RemoteEditor, { IRemoteEditorRef } from "clasor-remote-editor";
import { config } from "@utils/clasorEditor";
import { IEditorValue } from "@interface/app.interface";

interface IProps {
  defaultValue?: string;
}

export interface IQaEditorRef {
  getData: () => Promise<IEditorValue>;
  setData: (value: any) => void;
}

const QuestionAnswerEditor = forwardRef<IQaEditorRef, IProps>(({ defaultValue }, ref) => {
  const timestampRef = useRef(Date.now());
  const classicEditorRef = useRef<IRemoteEditorRef>(null);

  const getData = async () => {
    if (classicEditorRef.current) {
      const data = (await classicEditorRef.current.getData()) as unknown as IEditorValue;
      return data;
    }

    return {
      content: "",
      outline: "",
    };
  };

  const setData = (value: string) => {
    if (classicEditorRef.current) {
      return classicEditorRef.current.setData(value);
    }
  };

  useImperativeHandle(ref, () => {
    return {
      getData,
      setData,
    };
  });

  return (
    <RemoteEditor
      url={`${process.env.NEXT_PUBLIC_CLASSIC_EDITOR as string}?timestamp=${
        timestampRef.current
      }`}
      editorMode="edit"
      ref={classicEditorRef}
      loadData={
        {
          content: defaultValue || " ",
          outline: [],
          config: { ...config },
        } as any
      }
    />
  );
});

export default QuestionAnswerEditor;
