const fs = require('node:fs');
const path = require('node:path');

// CRA copies public files unchanged. Reject LFS pointers before they can ship
// with a .pdf extension and cause the browser's PDF viewer to fail.
const publicDirectory = path.join(__dirname, '..', 'public');
let count = 0;
function verifyDirectory(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      verifyDirectory(filename);
    } else if (/\.pdf$/i.test(entry.name)) {
      const descriptor = fs.openSync(filename, 'r');
      const header = Buffer.alloc(5);
      try {
        fs.readSync(descriptor, header, 0, header.length, 0);
      } finally {
        fs.closeSync(descriptor);
      }
      if (header.toString('ascii') !== '%PDF-') {
        throw new Error(`${path.relative(publicDirectory, filename)} is not a PDF document. Run git lfs pull and rebuild; CI checkout must enable lfs: true.`);
      }
      count += 1;
    }
  }
}
verifyDirectory(publicDirectory);
console.log(`Verified ${count} PDF documents; no Git LFS pointers will be published.`);
