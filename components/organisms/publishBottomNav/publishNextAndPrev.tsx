/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback, memo } from "react";
import { ChevronLeftIcon } from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";
import { IDocumentMetadata } from "@interface/document.interface";

interface IProps {
  selectedDocument: IDocumentMetadata;
}

interface INavigation {
  prevChild?: HTMLAnchorElement;
  nextChild?: HTMLAnchorElement;
}

const CLASS_NAMES = {
  DOCUMENT: "collapse-document",
  SELECTED: "selected",
  DISABLED: "disabled",
  COLLAPSE_BUTTON: "collapse-button",
} as const;

const PublishNextAndPrev = ({ selectedDocument }: IProps) => {
  const [navigation, setNavigation] = useState<INavigation>({
    prevChild: undefined,
    nextChild: undefined,
  });

  const findDocument = useCallback(
    (
      child: HTMLAnchorElement,
      target: "next" | "prev"
    ): HTMLAnchorElement | undefined => {
      const getClickableDocuments = (
        nodes: NodeListOf<ChildNode>
      ): ChildNode[] => {
        return Array.from(nodes).filter((node: any) => {
          const element = node.classList ? node : node.children[0]?.children[0];
          return (
            element &&
            !element.classList.contains(CLASS_NAMES.DISABLED) &&
            !element.classList.contains(CLASS_NAMES.COLLAPSE_BUTTON) &&
            element.classList.contains(CLASS_NAMES.DOCUMENT)
          );
        });
      };

      const parentNodes = child.parentNode?.childNodes;
      if (!parentNodes) return undefined;

      const clickableDocuments =
        parentNodes.length > 1
          ? getClickableDocuments(parentNodes as NodeListOf<ChildNode>)
          : getClickableDocuments(
              (child.parentNode?.parentNode?.parentNode?.childNodes as NodeListOf<ChildNode>) ||
                new NodeList() as NodeListOf<ChildNode>
            );

      const activeDocumentIndex = clickableDocuments.findIndex(
        (document: ChildNode) => {
          const element = (document as HTMLElement).classList?.contains(
            CLASS_NAMES.DOCUMENT
          )
            ? (document as HTMLElement)
            : ((document as HTMLElement).children?.[0]?.children?.[0] as HTMLElement);
          return element?.classList?.contains(CLASS_NAMES.SELECTED);
        }
      );

      if (activeDocumentIndex === -1) return undefined;

      return clickableDocuments[
        target === "prev" ? activeDocumentIndex - 1 : activeDocumentIndex + 1
      ] as HTMLAnchorElement;
    },
    []
  );

  const updateNavigation = useCallback(() => {
    const child = document.querySelector(
      `.${CLASS_NAMES.DOCUMENT}.${CLASS_NAMES.SELECTED}`
    );
    if (!child?.parentNode) return;

    setNavigation({
      prevChild: findDocument(child as HTMLAnchorElement, "prev"),
      nextChild: findDocument(child as HTMLAnchorElement, "next"),
    });
  }, [findDocument]);

  const handleClick = useCallback((element: HTMLAnchorElement | undefined) => {
    if (!element) return;

    const targetElement = element.classList.contains(CLASS_NAMES.DOCUMENT)
      ? element
      : element.children[0]?.children[0] as HTMLElement;

    targetElement?.click();
  }, []);

  useEffect(() => {
    updateNavigation();
  }, [selectedDocument, updateNavigation]);

  return (
    <>
      <Button
        className="w-fit min-w-fit p-2.5 border-none"
        variant="outlined"
        onClick={() => {
          return handleClick(navigation.nextChild);
        }}
        disabled={!navigation.nextChild}
      >
        <ChevronLeftIcon className="w-5 h-5 block stroke-white -rotate-180 scale-75" />
      </Button>

      <Button
        className="w-fit min-w-fit p-2.5 border-none"
        variant="outlined"
        onClick={() => {
          return handleClick(navigation.prevChild);
        }}
        disabled={!navigation.prevChild}
      >
        <ChevronLeftIcon className="w-5 h-5 block stroke-white scale-75" />
      </Button>
    </>
  );
};

export default memo(PublishNextAndPrev);
