/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import RemoteEditor, { IRemoteEditorRef } from "clasor-remote-editor";
import { editorConfig } from "@utils/clasorEditor";
import { IEditorValue } from "@interface/app.interface";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  defaultValue?: string;
}

export interface IQaEditorRef {
  getData: () => Promise<IEditorValue>;
  setData: (value: any) => void;
  on: (event: "getData", callback: (data: string) => void) => void;
}

const QuestionAnswerEditor = forwardRef<IQaEditorRef, IProps>(({ defaultValue }, ref) => {
  const timestampRef = useRef(Date.now());
  const classicEditorRef = useRef<IRemoteEditorRef>(null);

  const { data: userInfo } = useGetUser();

  const getData = async (): Promise<IEditorValue> => {
    return new Promise((resolve) => {
      if (!classicEditorRef.current) {
        resolve({ content: "", outline: "" });
        return;
      }
      classicEditorRef.current.on("getData", (data: any) => {
        resolve(data);
      });

      classicEditorRef.current.getData();
    });
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
      on: async (event: "getData", callback) => {
        await classicEditorRef.current?.on(event, (editorData) => {
          return callback(JSON.stringify(editorData));
        });
      },
    };
  });

  return (
    <RemoteEditor
      url={`${process.env.NEXT_PUBLIC_CLASSIC_EDITOR as string}?timestamp=${timestampRef.current}`}
      editorMode="edit"
      ref={classicEditorRef}
      loadData={
        {
          content: defaultValue || " ",
          outline: [],
          auth: {
            accessToken: userInfo?.access_token,
            refreshToken: userInfo?.refresh_token,
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/renewToken`,
          },
          config: { ...editorConfig },
        } as any
      }
    />
  );
});

export default QuestionAnswerEditor;
