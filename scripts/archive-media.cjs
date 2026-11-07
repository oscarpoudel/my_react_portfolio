// Archive migrated/unused image files outside this checkout, without deleting them.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'src/data/media-config.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'src/data/imagekit-manifest.json'), 'utf8'));
if (!config.enabled || !Object.keys(manifest.assets).length) throw new Error('Verify the ImageKit migration before archiving local media.');
const parent = path.resolve(root, '..');
const backup = path.resolve(parent, 'portfolio-media-backup', new Date().toISOString().replace(/[:.]/g, '-'));
if (backup === root || backup.startsWith(root + path.sep)) throw new Error('Backup must be outside the repository.');
const codeFiles = [];
function collect(dir) { for (const entry of fs.readdirSync(dir, { withFileTypes: true })) { const file = path.join(dir, entry.name); if (entry.isDirectory()) collect(file); else if (/\.(js|jsx|scss|css|html)$/.test(file)) codeFiles.push(fs.readFileSync(file, 'utf8')); } }
collect(path.join(root, 'src'));
const code = codeFiles.join('\n');
const candidates = ['public/gallery', 'public/images/project-showcase', 'public/images/research_images', 'src/assets/research_images', '.imagekit-cache'];
for (const dir of ['src/assets/images', 'src/assets/research_topics']) {
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    if (entry.isFile() && /\.(png|jpe?g|webp|svg)$/i.test(entry.name) && !code.includes(entry.name)) candidates.push(`${dir}/${entry.name}`);
  }
}
function stats(file) {
  const item = fs.lstatSync(file);
  if (item.isSymbolicLink()) throw new Error('Refusing to archive a symbolic link.');
  if (item.isFile()) return { files: 1, bytes: item.size };
  return fs.readdirSync(file).map((entry) => stats(path.join(file, entry))).reduce((sum, item) => ({ files: sum.files + item.files, bytes: sum.bytes + item.bytes }), { files: 0, bytes: 0 });
}
const records = [];
console.log(`Archive destination: ${backup}`);
function relocate(source, target) {
  if (!source.startsWith(root + path.sep) || !target.startsWith(backup + path.sep)) throw new Error('Archive path escaped its verified directory.');
  try { fs.renameSync(source, target); }
  catch (error) {
    // OneDrive/watchers can lock a directory rename while individual files
    // remain movable. Move those files without deleting any file contents.
    if (!['EPERM', 'EBUSY'].includes(error.code) || !fs.statSync(source).isDirectory()) throw error;
    fs.mkdirSync(target, { recursive: true });
    for (const name of fs.readdirSync(source)) relocate(path.join(source, name), path.join(target, name));
    try { fs.rmdirSync(source); } catch (remaining) { if (!['EPERM', 'EBUSY', 'ENOTEMPTY'].includes(remaining.code)) throw remaining; }
  }
}
for (const relative of candidates) {
  const source = path.resolve(root, relative);
  if (!source.startsWith(root + path.sep) || source === root) throw new Error('Invalid source path.');
  if (!fs.existsSync(source)) continue;
  const target = path.resolve(backup, relative);
  if (!target.startsWith(backup + path.sep)) throw new Error('Invalid archive target.');
  const size = stats(source);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  relocate(source, target);
  records.push({ path: relative, ...size });
}
fs.mkdirSync(backup, { recursive: true });
fs.writeFileSync(path.join(backup, 'archive-manifest.json'), JSON.stringify({ repository: root, createdAt: new Date().toISOString(), files: records }, null, 2));
const bytes = records.reduce((sum, record) => sum + record.bytes, 0);
console.log(`Archived ${records.reduce((sum, record) => sum + record.files, 0)} files (${(bytes / 1024 ** 3).toFixed(2)} GB).`);
console.log(`Backup: ${backup}`);
