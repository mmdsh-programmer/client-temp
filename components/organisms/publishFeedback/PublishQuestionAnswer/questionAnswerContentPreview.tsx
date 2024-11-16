"use client";

import React from "react";
import { IsJsonString } from "@utils/index";
import QuestionAnswerCodeTabs from "./questionAnswerCodeTabs";
import DOMPurify from "dompurify";

interface IProps {
  content: string;
  className?: string;
}

const QuestionAnswerContentPreview = ({ content, className }: IProps) => {
  const getCodeSnippets = (): (JSX.Element | string)[] => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = content;
    const jsxElements: (JSX.Element | string)[] = [];
    for (const node of Array.from(tempElement.childNodes)) {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        (node as HTMLElement).classList.contains("clasor-code-snippet")
      ) {
        const docElement = node as HTMLElement;
        let codeContent = docElement.dataset.code;
        if (codeContent && IsJsonString(codeContent)) {
          codeContent = codeContent.replaceAll("<-h", "<h");
          const jsonLanguages = JSON.parse(codeContent);
          const link = docElement.dataset.link || "";
          jsxElements.push(
            <QuestionAnswerCodeTabs
              key={docElement.id}
              languages={jsonLanguages}
              link={link}
            />
          );
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        jsxElements.push(
          <div
            key={Math.random().toString()}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize((node as HTMLElement).outerHTML),
            }}
          />
        );
      } else {
        jsxElements.push(node.textContent || "");
      }
    }

    return jsxElements;
  };

  const jsxContent = getCodeSnippets();

  return <div className={`${className}`}>{jsxContent}</div>;
};

export default QuestionAnswerContentPreview;
