// Dependency-free discovery runs before start/build. Filenames supply captions.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.resolve(__dirname, '..');
const media = path.join(root, 'public', 'gallery');
const manifest = path.join(root, 'src', 'data', 'gallery.json');
const configFile = path.join(root, 'src', 'data', 'media-config.json');
const cloudEnabled = fs.existsSync(configFile) && JSON.parse(fs.readFileSync(configFile, 'utf8')).enabled;
if (cloudEnabled && (!fs.existsSync(media) || !fs.readdirSync(media).some((file) => /\.(jpe?g|png|webp|gif|mp4|webm|mov|m4v)$/i.test(file)))) {
  console.log('ImageKit media is active; existing gallery metadata retained.');
  process.exit(0);
}
fs.mkdirSync(media, { recursive: true });
const previous = fs.existsSync(manifest) ? JSON.parse(fs.readFileSync(manifest, 'utf8')) : [];
const byFile = new Map(previous.map((item) => [item.file, item]));
const seen = new Set();
const items = fs.readdirSync(media).sort().filter((file) => /\.(jpe?g|png|webp|gif|mp4|webm|mov|m4v)$/i.test(file) && fs.statSync(path.join(media, file)).isFile()).flatMap((file) => {
  const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(media, file))).digest('hex');
  if (seen.has(hash)) return [];
  seen.add(hash);
  const title = path.parse(file).name.replace(/[_\s]+/g, ' ').trim();
  return [{ ...{ file, tags: [] }, ...byFile.get(file), title, type: /\.(mp4|webm|mov|m4v)$/i.test(file) ? 'video' : 'image' }];
});
const names = new Set(items.map((item) => item.file));
const merged = cloudEnabled ? [...previous.filter((item) => !names.has(item.file)), ...items] : items;
fs.writeFileSync(manifest, JSON.stringify(merged, null, 2) + '\n');
console.log(`Gallery synced: ${merged.length} unique moments. Captions derived from filenames; tags preserved.`);
