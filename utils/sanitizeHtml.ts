import sanitizeHtml from "sanitize-html";

const removeRealScriptsButKeepTextOnes = (html: string): string => {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
};

export const sanitizeHtmlOnServer = (dirtyData: string): string => {
  try {
    const preSanitized = removeRealScriptsButKeepTextOnes(dirtyData);

    const clean = sanitizeHtml(preSanitized, {
      allowedTags: [
        ...sanitizeHtml.defaults.allowedTags,
        "img",
        "video",
        "audio",
        "source",
        "svg",
        "path",
        "circle",
        "rect",
        "line",
        "polyline",
        "polygon",
        "g",
        "use",
        "text",
        "table",
        "thead",
        "tbody",
        "tr",
        "td",
        "th",
        "figure",
        "figcaption",
        "pre",
        "code",
        "span",
        "strong",
        "em",
        "u",
        "i",
        "b",
        "hr",
        "br",
        "form",
        "input",
        "label",
        "button",
        "a",
        "div",
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
      ],
      allowedAttributes: {
        "*": ["class", "id", "style", "title", "data-*", "aria-*", "role", "dir"],
        a: ["href", "name", "target", "rel"],
        img: ["src", "alt", "width", "height", "data-clasor-hash"],
        video: ["src", "controls", "width", "height"],
        audio: ["src", "controls"],
        source: ["src", "type"],
        svg: ["width", "height", "viewBox", "fill", "stroke", "xmlns"],
        use: ["xlink:href", "href"],
        path: ["d", "fill", "stroke", "stroke-width"],
        circle: ["cx", "cy", "r", "fill"],
        rect: ["x", "y", "width", "height", "fill"],
        input: ["type", "value", "placeholder", "checked"],
        button: ["type"],
      },
      allowVulnerableTags: false,
      allowedSchemes: ["http", "https", "data", "mailto"],
      allowedSchemesByTag: {
        img: ["http", "https", "data"],
        a: ["http", "https", "mailto"],
      },
      transformTags: {
        "*": (tagName, attribs) => {
          const attribsCopy = { ...attribs };
          for (const key of Object.keys(attribsCopy)) {
            if (/^on/i.test(key)) {
              delete attribsCopy[key];
            } else if (typeof attribsCopy[key] === "string" && /javascript:/i.test(attribsCopy[key])) {
              delete attribsCopy[key];
            }
          }
          return { tagName, attribs: attribsCopy };
        },
      },
    });

    return clean;
  } catch (err) {
    console.error("sanitizeHtmlOnServer error:", err);
    return dirtyData;
  }
};
