type DirtyData = string;

export const sanitizeHtmlOnServer = async (dirtyData: DirtyData): Promise<DirtyData> => {
  try {
    const { JSDOM } = await import("jsdom");
    const DOMPurify = (await import("dompurify")).default;

    const { window } = new JSDOM("");
    const sanitizer = DOMPurify(window);

    const cleanHtml = sanitizer.sanitize(dirtyData);

    if (typeof dirtyData === "string") {
      return cleanHtml;
    }
    return cleanHtml;
  } catch (error) {
    console.error("Error during HTML sanitization:", error);
    return dirtyData;
  }
};
