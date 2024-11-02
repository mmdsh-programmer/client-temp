/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";

// Constants
const CLASSNAMES = {
  DISABLED: "disabled",
  COLLAPSE_BUTTON: "collapse-button",
  COLLAPSE_DOCUMENT: "collapse-document",
  SELECTED: "selected",
} as const;

interface INavigation {
  prevChild: HTMLAnchorElement | null;
  nextChild: HTMLAnchorElement | null;
}

// Helper functions
const isClickableDocument = (element: Element): boolean => {
  return (
    !element.classList.contains(CLASSNAMES.DISABLED) &&
    !element.classList.contains(CLASSNAMES.COLLAPSE_BUTTON) &&
    element.classList.contains(CLASSNAMES.COLLAPSE_DOCUMENT)
  );
};

const getClickableDocuments = (parentNode: ParentNode): Element[] => {
  const children = Array.from(parentNode.childNodes) as Element[];

  if (children.length > 1) {
    return children.filter(isClickableDocument);
  }

  const grandParentChildren = Array.from(
    parentNode.parentElement?.parentElement?.childNodes || []
  ) as Element[];
  return grandParentChildren.filter((node) => {
    const targetElement = node.querySelector(
      `.${CLASSNAMES.COLLAPSE_DOCUMENT}`
    );
    return targetElement && isClickableDocument(targetElement);
  });
};

const PublishNextAndPrev: React.FC = () => {
  const [navigation, setNavigation] = useState<INavigation>({
    prevChild: null,
    nextChild: null,
  });

  const findDocument = (
    child: HTMLAnchorElement,
    target: "next" | "prev"
  ): HTMLAnchorElement | null => {
    if (!child.parentNode) return null;

    const clickableDocuments = getClickableDocuments(child.parentNode);
    const activeDocumentIndex = clickableDocuments.findIndex((document) => {
      return document.classList.contains(CLASSNAMES.COLLAPSE_DOCUMENT)
        ? document.classList.contains(CLASSNAMES.SELECTED)
        : document.querySelector(`.${CLASSNAMES.SELECTED}`) !== null;
    });

    if (activeDocumentIndex === -1) return null;

    const targetIndex =
      target === "prev" ? activeDocumentIndex - 1 : activeDocumentIndex + 1;

    return (clickableDocuments[targetIndex] as HTMLAnchorElement) || null;
  };

  const updateNavigation = () => {
    const selectedDocument = document.querySelector(
      `.${CLASSNAMES.COLLAPSE_DOCUMENT}.${CLASSNAMES.SELECTED}`
    ) as HTMLAnchorElement | null;

    if (!selectedDocument?.parentNode) return;

    setNavigation({
      prevChild: findDocument(selectedDocument, "prev"),
      nextChild: findDocument(selectedDocument, "next"),
    });
  };

  const handleNavigation = (element: HTMLAnchorElement | null) => {
    if (!element) return;

    const targetElement = element.classList.contains(
      CLASSNAMES.COLLAPSE_DOCUMENT
    )
      ? element
      : (element.querySelector(
          `.${CLASSNAMES.COLLAPSE_DOCUMENT}`
        ) as HTMLAnchorElement);

    targetElement?.click();
  };

  useEffect(() => {
    updateNavigation();
  }, []);

  return (
    <>
      <Button
        className="border-gray-400 w-fit min-w-fit p-2.5"
        variant="outlined"
        onClick={() => {
          return handleNavigation(navigation.nextChild);
        }}
        disabled={!navigation.nextChild}
      >
        <span className="hidden sm:block">سند بعدی</span>
        <ChevronLeftIcon className="w-4 h-4 block stroke-gray-700 sm:hidden -rotate-180 scale-75" />
      </Button>

      <Button
        className="border-gray-400 w-fit min-w-fit p-2.5"
        variant="outlined"
        onClick={() => {
          return handleNavigation(navigation.prevChild);
        }}
        disabled={!navigation.prevChild}
      >
        <span className="hidden sm:block">سند قبلی</span>
        <ChevronLeftIcon className="w-4 h-4 block stroke-gray-700 sm:hidden scale-75" />
      </Button>
    </>
  );
};

export default PublishNextAndPrev;
