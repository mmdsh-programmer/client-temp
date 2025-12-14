import DOMPurify from "dompurify";
import sanitizeHtml from "sanitize-html";

const removeRealScriptsButKeepTextOnes = (html: string): string => {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
};

const ALLOWED_TAGS = [
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
  "iframe",
  "ul",
  "ol",
  "li",
  "section",
  "small",
  "hgroup",
  "defs",
  "symbol",
  "select",
  "option",
  "label",
  "noscript",
];

const ALLOWED_ATTRIBUTES = {
  "*": [
    "class",
    "id",
    "style",
    "title",
    "role",
    "dir",
    "width",
    "height",
    "rowspan",
    "colspan",
    "preload",
    "controls",
    "controlslist",
    "autoplay",
    "loop",
    "muted",
    "playsinline",
    "src",
    "alt",
    "curl",
    "audio",
    "video",
    "clasor-audio",
    "clasor-video",
    "clasor-image",
    "data-*",
    "aria-*",
    "file-management-*",
    "external-document-*",
    "curl-*",
    "clasor-image-*",
    "clasor-code-*",
    "chart-*",
    "swagger-*",
    "ckeditor-external-*",
    "data-clasor-*",
    "data-chart-*",
    "viewBox",
    "fill",
    "stroke",
    "xmlns",
    "stroke-width",
    "d",
    "cx",
    "cy",
    "r",
    "x",
    "y",
  ],
  a: ["href", "name", "target", "rel"],
  img: ["src", "alt", "width", "height", "data-clasor-hash"],
  iframe: ["src", "width", "height", "frameborder", "allowfullscreen"],
  video: ["src", "controls", "width", "height"],
  audio: ["src", "controls"],
  source: ["src", "type"],
  use: ["xlink:href", "href"],
  input: ["type", "value", "placeholder", "checked"],
  button: ["type", "aria-expanded", "aria-label", "tabindex"],
  h3: ["data-tag", "data-is-open"],
  span: ["data-path"],
};

export const sanitizeHtmlOnServer = (dirtyData: string): string => {
  try {
    const preSanitized = removeRealScriptsButKeepTextOnes(dirtyData);

    const clean = sanitizeHtml(preSanitized, {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: ALLOWED_ATTRIBUTES,
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
            } else if (
              typeof attribsCopy[key] === "string" &&
              /javascript:/i.test(attribsCopy[key])
            ) {
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

export function sanitizeHtmlOnClient(html: string): string {
  const domPurifyAllowedAttrs = [...new Set(Object.values(ALLOWED_ATTRIBUTES).flat())];

  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: domPurifyAllowedAttrs,
    KEEP_CONTENT: false,
  });

  return clean.replace(/<svg[^>]*>[\s\S]*?<\/svg>/g, (svg) => {
    return svg.replace(/<script[\s\S]*?<\/script>/gi, "");
  });
}
