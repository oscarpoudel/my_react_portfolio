// Remove only generated build copies of media served by ImageKit.
// External media archives are never modified.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'src/data/media-config.json'), 'utf8'));
if (config.enabled) {
  const build = path.resolve(root, 'build');
  for (const relative of ['gallery', 'images/project-showcase']) {
    const target = path.resolve(build, relative);
    const checked = path.relative(build, target);
    if (!checked || checked.startsWith('..') || path.isAbsolute(checked)) throw new Error('Invalid generated-media target');
    fs.rmSync(target, { recursive: true, force: true });
  }
  console.log('Production media uses ImageKit; external media archives are unchanged.');
}
