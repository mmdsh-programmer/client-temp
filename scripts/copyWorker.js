/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

// The file to copy: pdf.worker.min.mjs
const sourcePath = "node_modules/react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs";

// The destination path and new name: public/pdf.worker.js
const destPath = "public/pdf.worker.min.js";

// Resolve paths relative to the current working directory (project root)
const source = path.resolve(sourcePath);
const destination = path.resolve(destPath);

try {
  if (fs.existsSync(source)) {
    // Copy the file
    fs.copyFileSync(source, destination);
    console.log(`✅ PDF worker script copied from ${sourcePath} to ${destPath}`);
  } else {
    console.error(`❌ Error: Source file not found at ${sourcePath}`);
    // This is a safety check: pdfjs-dist might be hoisted outside react-pdf's node_modules.
    // Check if it's in the top-level node_modules/pdfjs-dist
    const hoistedSource = path.resolve("node_modules/pdfjs-dist/build/pdf.worker.min.mjs");
    if (fs.existsSync(hoistedSource)) {
        fs.copyFileSync(hoistedSource, destination);
        console.log(`✅ PDF worker script copied from top-level node_modules/pdfjs-dist to ${destPath}`);
    } else {
        console.error("❌ Could not find pdf.worker.min.mjs in expected locations. Please run npm install/yarn install.");
        process.exit(1);
    }
  }
} catch (err) {
  console.error("❌ Error copying PDF worker script:", err);
  process.exit(1);
}