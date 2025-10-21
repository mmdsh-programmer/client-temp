import DOMPurify from "dompurify";

const EXECUTABLE_EXTENSIONS = new Set([
  // Windows executables/scripts
  "exe",
  "msi",
  "msp",
  "bat",
  "cmd",
  "com",
  "scr",
  "pif",
  "lnk",
  "reg",
  // PowerShell
  "ps1",
  "ps1xml",
  "ps2",
  "ps2xml",
  "psc1",
  "psc2",
  // Unix-like
  "sh",
  "bash",
  "ksh",
  "csh",
  "zsh",
  "run",
  // Script engines
  "js",
  "jse",
  "vbs",
  "vbe",
  "wsf",
  "wsh",
  "sct",
  // Java and mobile packages
  "jar",
  "war",
  "ear",
  "apk",
  "ipa",
  // Native libraries/binaries
  "dll",
  "so",
  "dylib",
  "bin",
  // Disk images/installers
  "dmg",
  "pkg",
  "iso",
]);

const BLOCKED_MIME_PREFIXES = [
  "application/x-msdownload",
  "application/x-msdos-program",
  "application/x-msi",
  "application/x-sh",
  "application/x-bat",
  "application/x-executable",
  "application/x-dosexec",
  "application/java-archive",
];

const TEXTUAL_SVG_MIME = "image/svg+xml";
const TEXTUAL_HTML_MIMES = new Set(["text/html", "application/xhtml+xml"]);
const TEXTUAL_XML_MIMES = new Set(["text/xml", "application/xml"]);
const SVG_RELATED_EXTENSIONS = new Set(["svg", "svgz", "xml", "xhtml", "html", "htm"]);

function getExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex === -1) return "";
  return filename.slice(lastDotIndex + 1).toLowerCase();
}

function hasDoubleExecutableExtension(filename: string): boolean {
  // e.g., image.png.exe or docx.js
  const parts = filename.toLowerCase().split(".");
  if (parts.length < 2) return false;
  // Check any trailing part after the first extension
  for (let i = 1; i < parts.length; i += 1) {
    if (EXECUTABLE_EXTENSIONS.has(parts[i])) return true;
  }
  return false;
}

export type UploadBlockReason =
  | "executable-extension"
  | "executable-mime"
  | "double-extension"
  | "unsafe-svg"
  | "empty-file";

export function shouldBlockExecutable(file: File): { block: boolean; reason?: UploadBlockReason } {
  if (!file || file.size === 0) {
    return { block: true, reason: "empty-file" };
  }

  const ext = getExtension(file.name);
  if (EXECUTABLE_EXTENSIONS.has(ext)) {
    return { block: true, reason: "executable-extension" };
  }

  if (hasDoubleExecutableExtension(file.name)) {
    return { block: true, reason: "double-extension" };
  }

  const mime = (file.type || "").toLowerCase();
  if (
    BLOCKED_MIME_PREFIXES.some((prefix) => {
      return mime.startsWith(prefix);
    })
  ) {
    return { block: true, reason: "executable-mime" };
  }

  return { block: false };
}

// Heuristic detection for unsafe SVG content. Not a substitute for server-side SVG sanitization.
export async function isUnsafeSvg(file: File): Promise<boolean> {
  // We will analyze textual content for SVG patterns regardless of extension
  const text = await file.text();
  const lower = text.toLowerCase();

  // Disallow common dangerous constructs in SVGs
  const patterns: RegExp[] = [
    /<script\b[\s\S]*?>[\s\S]*?<\/script>/i,
    /<foreignobject\b/i,
    /on[a-z]+\s*=\s*"[^"]*"/i, // inline event handlers
    /on[a-z]+\s*=\s*'[^']*'/i,
    /on[a-z]+\s*=\s*[^\s>]+/i,
    /xlink:href\s*=\s*"javascript:[^"]*"/i,
    /xlink:href\s*=\s*'javascript:[^']*'/i,
    /href\s*=\s*"javascript:[^"]*"/i,
    /href\s*=\s*'javascript:[^']*'/i,
    /data:[^;]+;base64,/i, // data URLs embedded
    /<iframe\b/i,
    /<embed\b/i,
    /<object\b/i,
    /<style\b[\s\S]*?>[\s\S]*?<\/style>/i, // style tag blocks
    /url\(\s*['"]?javascript:/i, // CSS url(javascript:...)
    /expression\s*\(/i, // CSS expression()
    /<\?xml-stylesheet\b/i, // xml stylesheet PI
    /<!DOCTYPE\b/i, // DTD usage
    /<!ENTITY\b/i, // entities
  ];

  for (const re of patterns) {
    if (re.test(lower)) return true;
  }

  return false;
}

// Sanitize SVG content using DOMPurify
export async function sanitizeSvgFile(file: File): Promise<File> {
  const originalContent = await file.text();

  // Configure DOMPurify for SVG sanitization
  const cleanContent = DOMPurify.sanitize(originalContent, {
    USE_PROFILES: { svg: true, svgFilters: true },
    ALLOWED_TAGS: [
      "svg",
      "g",
      "path",
      "circle",
      "rect",
      "line",
      "polyline",
      "polygon",
      "ellipse",
      "text",
      "tspan",
      "defs",
      "clipPath",
      "mask",
      "pattern",
      "linearGradient",
      "radialGradient",
      "stop",
      "image",
      "use",
      "symbol",
      "marker",
      "title",
      "desc",
      "metadata",
    ],
    ALLOWED_ATTR: [
      "viewBox",
      "width",
      "height",
      "x",
      "y",
      "cx",
      "cy",
      "r",
      "rx",
      "ry",
      "d",
      "fill",
      "stroke",
      "stroke-width",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-dasharray",
      "stroke-dashoffset",
      "opacity",
      "fill-opacity",
      "stroke-opacity",
      "transform",
      "id",
      "class",
      "style",
      "href",
      "xlink:href",
      "gradientUnits",
      "gradientTransform",
      "spreadMethod",
      "offset",
      "stop-color",
      "stop-opacity",
      "patternUnits",
      "patternTransform",
      "markerUnits",
      "markerWidth",
      "markerHeight",
      "orient",
      "refX",
      "refY",
      "markerUnits",
      "preserveAspectRatio",
      "xmlns",
      "xmlns:xlink",
    ],
    ALLOW_DATA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false,
    SANITIZE_DOM: true,
    KEEP_CONTENT: true,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
  });

  // Create a new File object with sanitized content
  const sanitizedBlob = new Blob([cleanContent], { type: "image/svg+xml" });
  return new File([sanitizedBlob], file.name, {
    type: "image/svg+xml",
    lastModified: file.lastModified,
  });
}

export async function validateBeforeUpload(
  file: File,
): Promise<{ valid: boolean; message?: string; sanitizedFile?: File }> {
  const execCheck = shouldBlockExecutable(file);
  if (execCheck.block) {
    switch (execCheck.reason) {
      case "empty-file":
        return { valid: false, message: "فایل خالی قابل آپلود نیست." };
      case "double-extension":
        return { valid: false, message: "آپلود فایل با پسوند مشکوک (دو پسوند) مجاز نیست." };
      case "executable-extension":
      case "executable-mime":
        return { valid: false, message: "آپلود فایل اجرایی به دلایل امنیتی مجاز نیست." };
      default:
        return { valid: false, message: "آپلود این فایل مجاز نیست." };
    }
  }

  // SVG detection even when disguised as XML/HTML or unknown
  const mime = (file.type || "").toLowerCase();
  const ext = getExtension(file.name);
  // Block compressed SVG outright, as we can't safely inspect without decompressing client-side
  if (ext === "svgz") {
    return { valid: false, message: "آپلود فایل SVG فشرده (svgz) مجاز نیست." };
  }

  const shouldInspectTextForSvg =
    mime === TEXTUAL_SVG_MIME ||
    TEXTUAL_XML_MIMES.has(mime) ||
    TEXTUAL_HTML_MIMES.has(mime) ||
    SVG_RELATED_EXTENSIONS.has(ext) ||
    mime.startsWith("text/") ||
    ext === "xml" ||
    ext === "xhtml" ||
    ext === "html" ||
    ext === "htm";

  if (shouldInspectTextForSvg) {
    try {
      // Peek a small chunk first to decide if content is SVG
      const headChunk = await file.slice(0, Math.min(4096, file.size)).text();
      const headLower = headChunk.toLowerCase();
      const containsSvgMarker =
        headLower.includes("<svg") ||
        headLower.includes("xmlns=\"http://www.w3.org/2000/svg\"") ||
        headLower.includes("xmlns='http://www.w3.org/2000/svg'");

      if (containsSvgMarker || mime === TEXTUAL_SVG_MIME || ext === "svg") {
        if (await isUnsafeSvg(file)) {
          // Instead of blocking, sanitize the SVG file
          try {
            const sanitizedFile = await sanitizeSvgFile(file);
            return {
              valid: true,
              message: "فایل SVG پاک‌سازی شده و آماده آپلود است.",
              sanitizedFile,
            };
          } catch (error) {
            return { valid: false, message: "خطا در پاک‌سازی فایل SVG." };
          }
        }
      }
    } catch {
      // If inspection fails, do not block here; server must enforce
    }
  }

  return { valid: true };
}

// Try to normalize various inputs (File/Blob/wrappers) to a File for validation.
export async function extractFileFromUnknown(input: unknown): Promise<File | null> {
  try {
    if (typeof File !== "undefined" && input instanceof File) return input;
    const anyInput = input as {
      file?: unknown;
      originFileObj?: unknown;
      raw?: unknown;
      blob?: unknown;
      name?: unknown;
      type?: unknown;
    };
    if (anyInput?.file && typeof File !== "undefined" && anyInput.file instanceof File) {
      return anyInput.file as File;
    }
    if (anyInput?.originFileObj && anyInput.originFileObj instanceof File) {
      return anyInput.originFileObj as File;
    }
    if (anyInput?.raw && anyInput.raw instanceof File) {
      return anyInput.raw as File;
    }
    const blob: Blob | undefined =
      anyInput?.blob instanceof Blob ? (anyInput.blob as Blob) : undefined;
    if (blob) {
      const name: string =
        typeof anyInput?.name === "string" && anyInput.name ? (anyInput.name as string) : "upload";
      const type: string =
        (typeof anyInput?.type === "string" ? (anyInput.type as string) : "") || blob.type || "";
      return new File([blob], name, { type });
    }
    return null;
  } catch {
    return null;
  }
}
