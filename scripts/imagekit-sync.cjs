// Server/local command only. Private credentials never enter the React build.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const { openAsBlob } = require('node:fs');

const root = path.resolve(__dirname, '..');
const readJson = (file, fallback) => fs.existsSync(path.join(root, file)) ? JSON.parse(fs.readFileSync(path.join(root, file), 'utf8').replace(/^\uFEFF/, '')) : fallback;
const writeJson = (file, value) => fs.writeFileSync(path.join(root, file), JSON.stringify(value, null, 2) + '\n');
const environment = { ...process.env };
if (fs.existsSync(path.join(root, '.env.local'))) {
  for (const line of fs.readFileSync(path.join(root, '.env.local'), 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (match && !environment[match[1]]) environment[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}
const privateKey = environment.IMAGEKIT_PRIVATE_KEY;
const endpoint = (environment.IMAGEKIT_URL_ENDPOINT || '').replace(/\/$/, '');
const folder = (environment.IMAGEKIT_ROOT_FOLDER || '/portfolio').replace(/\/$/, '');
const snapshotFile = 'src/data/imagekit-manifest.json';
const configFile = 'src/data/media-config.json';
const checkpointFile = '.imagekit-state.json';
const mimeTypes = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.webm': 'video/webm', '.json': 'application/json' };
const manifestPath = `${folder}/index/media.json`;
const manifestUrl = `${endpoint}${manifestPath}`;
const titleFromName = (name) => path.posix.parse(name).name.replace(/--[a-f0-9]{12}$/, '').replace(/[_\s]+/g, ' ').trim();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let uploaded = 0;

async function request(url, options = {}) {
  for (let attempt = 0; attempt < 4; attempt++) {
    let response;
    try {
      response = await fetch(url, { ...options, signal: AbortSignal.timeout(180000), headers: { ...options.headers, Authorization: `Basic ${Buffer.from(`${privateKey}:`).toString('base64')}` } });
    } catch {
      if (attempt === 3) throw new Error('ImageKit network request failed after retries. Run the same command to resume.');
      await sleep(1500 * (attempt + 1)); continue;
    }
    const data = await response.json();
    if (response.ok) return data;
    if ((response.status === 429 || response.status >= 500) && attempt < 3) { await sleep(2000 * (attempt + 1)); continue; }
    // API messages contain no request headers. Never print request objects.
    throw new Error(`ImageKit ${response.status}: ${String(data.message || 'Request rejected').replaceAll(privateKey, '[redacted]')}`);
  }
}
const api = (resource, options) => request(`https://api.imagekit.io/v1/${resource}`, options);

async function listFiles() {
  const files = [];
  for (let skip = 0; ; skip += 1000) {
    const params = new URLSearchParams({ searchQuery: `type = "file" AND path : "${folder}/"`, limit: '1000', skip: String(skip) });
    const batch = await api(`files?${params}`);
    files.push(...batch);
    if (batch.length < 1000) return files;
  }
}

async function setupFields() {
  const existing = await api('customMetadataFields');
  for (const field of [
    { name: 'portfolioTitle', label: 'Portfolio title', schema: { type: 'Text', maxLength: 1000 } },
    { name: 'portfolioCaption', label: 'Portfolio caption', schema: { type: 'Textarea', maxLength: 5000 } },
  ]) if (!existing.some((item) => item.name === field.name)) await api('customMetadataFields', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(field) });
}

async function upload(file, fileName, targetFolder, tags, metadata = {}, overwrite = false) {
  const data = new FormData();
  data.set('file', typeof file === 'string' ? await openAsBlob(file, { type: mimeTypes[path.extname(file).toLowerCase()] || 'application/octet-stream' }) : new Blob([file], { type: 'application/json' }), fileName);
  data.set('fileName', fileName); data.set('folder', targetFolder);
  data.set('useUniqueFileName', 'false'); data.set('overwriteFile', String(overwrite));
  data.set('isPrivateFile', 'false'); data.set('isPublished', 'true');
  data.set('tags', tags.join(','));
  if (metadata.title || metadata.caption) data.set('customMetadata', JSON.stringify({ portfolioTitle: (metadata.title || '').slice(0, 1000), portfolioCaption: (metadata.caption || '').slice(0, 5000) }));
  return request('https://upload.imagekit.io/api/v1/files/upload', { method: 'POST', body: data });
}

function localCollection() {
  const gallery = readJson('src/data/gallery.json', []);
  const showcases = readJson('src/data/projectShowcases.json', {});
  const legacy = readJson('src/data/projectMedia.json', {});
  const projects = { ...legacy, ...Object.fromEntries(Object.entries(showcases).map(([id, entry]) => [id, [entry.cover, ...entry.figures]])) };
  const tasks = new Map();
  const add = (key, tags, metadata) => {
    if (/^https?:/.test(key)) return;
    const full = path.resolve(root, 'public', key);
    if (!full.startsWith(path.join(root, 'public') + path.sep) || !fs.existsSync(full)) throw new Error(`Missing local media: ${key}`);
    if (!tasks.has(key)) tasks.set(key, { key, full, tags, metadata });
  };
  for (const item of gallery) {
    for (const field of ['file', 'preview', 'poster', 'playback']) if (item[field]) {
      add(`gallery/${item[field]}`, ['portfolio-managed', field === 'file' ? `gallery-${item.type}` : 'portfolio-auxiliary', ...(item.tags || [])], field === 'file' ? { title: item.title, caption: item.alt || item.title } : {});
    }
  }
  for (const [id, figures] of Object.entries(projects)) for (const figure of figures) {
    add(figure.src, ['portfolio-managed', 'project-slide', `project-${id}`], figure);
    add(figure.original, ['portfolio-managed', 'portfolio-original', `project-${id}`], {});
  }
  return { gallery, projects, tasks: [...tasks.values()] };
}

async function hashFile(file) {
  const hash = crypto.createHash('sha256');
  for await (const chunk of fs.createReadStream(file)) hash.update(chunk);
  return hash.digest('hex');
}

async function uploadLocal(files) {
  const collection = localCollection();
  const existing = new Map(files.map((file) => [file.filePath, file]));
  const checkpoint = readJson(checkpointFile, {});
  const assets = {};
  let cursor = 0;
  let failure;
  const worker = async () => {
    while (cursor < collection.tasks.length && !failure) {
      const task = collection.tasks[cursor++];
      const hash = await hashFile(task.full);
      const extension = path.posix.extname(task.key);
      const stem = path.posix.basename(task.key, extension).replace(/[^a-zA-Z0-9._-]+/g, '_').slice(0, 140);
      const storageName = `${stem}--${hash.slice(0, 12)}${extension.toLowerCase()}`;
      const relative = task.key.replace(/^images\/project-showcase\//, 'projects/');
      const targetFolder = `${folder}/${path.posix.dirname(relative)}`;
      const storagePath = `${targetFolder}/${storageName}`;
      let remote = existing.get(storagePath);
      if (!remote && checkpoint[task.key]?.hash === hash && checkpoint[task.key]?.filePath === storagePath) remote = checkpoint[task.key];
      if (!remote) {
        let payload = task.full;
        // Keep the original untouched locally; re-encode unusually large JPEGs.
        if (fs.statSync(payload).size > 20 * 1024 * 1024 && /\.jpe?g$/i.test(payload)) {
          const cache = path.join(root, '.imagekit-cache'); fs.mkdirSync(cache, { recursive: true });
          payload = path.join(cache, `${hash}.jpg`);
          if (!fs.existsSync(payload)) {
            const converted = spawnSync('python', ['-c', 'from PIL import Image,ImageOps;import sys;Image.MAX_IMAGE_PIXELS=None;im=Image.open(sys.argv[1]);im.draft("RGB",(8000,8000));im=ImageOps.exif_transpose(im).convert("RGB");im.thumbnail((8000,8000));im.save(sys.argv[2],quality=92,optimize=True,progressive=True)', task.full, payload], { stdio: ['ignore', 'ignore', 'pipe'] });
            if (converted.status !== 0) throw new Error(`Could not prepare large image: ${task.key}`);
          }
        }
        remote = await upload(payload, storageName, targetFolder, task.tags, task.metadata);
        uploaded++;
      }
      assets[task.key] = { url: remote.url, fileId: remote.fileId, filePath: remote.filePath || storagePath, hash, width: remote.width, height: remote.height };
      checkpoint[task.key] = assets[task.key];
      writeJson(checkpointFile, checkpoint);
      const completed = Object.keys(assets).length;
      if (completed % 20 === 0 || completed === collection.tasks.length) console.log(`ImageKit assets ready: ${completed}/${collection.tasks.length} (${uploaded} newly uploaded)`);
    }
  };
  await Promise.all([0, 1, 2].map(() => worker().catch((error) => { failure ||= error; })));
  if (failure) throw failure;
  return { schema: 1, gallery: collection.gallery, projects: collection.projects, assets };
}

function publicTags(tags = []) { return tags.filter((tag) => !/^(portfolio-|gallery-|project-)/.test(tag)); }

function refresh(manifest, files) {
  const byId = new Map(files.map((file) => [file.fileId, file]));
  const assetFor = (key) => {
    const asset = manifest.assets[key];
    const file = asset && byId.get(asset.fileId);
    if (file) Object.assign(asset, { url: file.url, filePath: file.filePath, width: file.width, height: file.height });
    return file;
  };
  const used = new Set();
  manifest.gallery = manifest.gallery.filter((item) => {
    const file = assetFor(/^https?:/.test(item.file) ? item.file : `gallery/${item.file}`);
    if (!file) return false;
    used.add(file.fileId);
    item.title = file.customMetadata?.portfolioTitle || item.title || titleFromName(file.name);
    item.alt = file.customMetadata?.portfolioCaption || item.alt || item.title;
    if (file.width && file.height) { item.width = file.width; item.height = file.height; }
    if (item.type === 'video') {
      item.playback ||= `${file.url}?tr=f-mp4,q-80`;
      item.poster ||= `${file.url}/ik-thumbnail.jpg`;
    }
    item.tags = publicTags(file.tags); return true;
  });
  for (const [id, figures] of Object.entries(manifest.projects)) manifest.projects[id] = figures.filter((figure) => {
    const file = assetFor(figure.src) || files.find((f) => f.url === figure.src);
    if (!file) return false;
    used.add(file.fileId);
    figure.title = file.customMetadata?.portfolioTitle || figure.title;
    figure.caption = file.customMetadata?.portfolioCaption || figure.caption;
    if (file.width && file.height) { figure.width = file.width; figure.height = file.height; }
    assetFor(figure.original); return true;
  });
  // Add dashboard uploads in collection folders; exclude previews and originals.
  const projectData = readJson('src/data/projects.json', { projects: [] });
  const knownProjects = new Set([...Object.keys(manifest.projects), ...(Array.isArray(projectData) ? projectData : projectData.projects || []).map((project) => String(project.id))]);
  for (const file of [...files].sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''))) {
    if (used.has(file.fileId) || !/\.(jpe?g|png|webp|gif|svg|mp4|webm|mov|m4v)$/i.test(file.name)) continue;
    const relative = file.filePath.slice(folder.length + 1);
    if (relative.startsWith('gallery/') && !relative.slice(8).includes('/')) {
      const isVideo = /\.(mp4|webm|mov|m4v)$/i.test(file.name);
      manifest.assets[file.url] = { url: file.url, fileId: file.fileId, filePath: file.filePath };
      manifest.gallery.push({ file: file.url, title: file.customMetadata?.portfolioTitle || titleFromName(file.name), alt: file.customMetadata?.portfolioCaption || titleFromName(file.name), tags: publicTags(file.tags), type: isVideo ? 'video' : 'image', width: file.width || 1200, height: file.height || 800, ...(isVideo ? { playback: `${file.url}?tr=f-mp4,q-80`, poster: `${file.url}/ik-thumbnail.jpg` } : { preview: `${file.url}?tr=w-1600,q-85` }) });
      used.add(file.fileId);
    }
    const match = relative.match(/^projects\/(\d+)\/[^/]+$/);
    if (match && knownProjects.has(match[1]) && /\.(jpe?g|png|webp|gif|svg)$/i.test(file.name)) {
      manifest.assets[file.url] = { url: file.url, fileId: file.fileId, filePath: file.filePath };
      const figures = manifest.projects[match[1]] || (manifest.projects[match[1]] = []);
      figures.push({ src: file.url, original: file.url, title: file.customMetadata?.portfolioTitle || titleFromName(file.name), caption: file.customMetadata?.portfolioCaption || '', width: file.width, height: file.height }); used.add(file.fileId);
    }
  }
  // New remote gallery records already contain URLs, not legacy logical paths.
  manifest.updatedAt = new Date().toISOString();
  return manifest;
}

async function main() {
  if (!privateKey || !endpoint.startsWith('https://') || !/^\/[a-zA-Z0-9_/-]+$/.test(folder) || folder.includes('..')) throw new Error('Set IMAGEKIT_PRIVATE_KEY and IMAGEKIT_URL_ENDPOINT in .env.local or server environment variables.');
  let files = await listFiles();
  let manifest;
  if (process.argv.includes('--upload')) {
    await setupFields(); manifest = await uploadLocal(files); files = await listFiles();
  } else {
    const index = files.find((file) => file.filePath === manifestPath);
    if (!index) throw new Error('No remote index exists yet. Run npm run media:upload first.');
    const response = await fetch(`${index.url}?updatedAt=${Date.now()}`, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error('Could not fetch the current public media index.');
    manifest = await response.json();
  }
  manifest = refresh(manifest, files);
  if (!manifest.gallery.length || !Object.keys(manifest.projects).length) throw new Error('Refusing to publish an unexpectedly empty media index.');
  const previousIndex = files.find((file) => file.filePath === manifestPath);
  if (previousIndex && !previousIndex.tags?.includes('portfolio-index')) throw new Error('The chosen index path is occupied by an unmanaged file. Choose a different IMAGEKIT_ROOT_FOLDER.');
  await upload(Buffer.from(JSON.stringify(manifest)), 'media.json', `${folder}/index`, ['portfolio-index'], {}, true);
  await api('files/purge', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: manifestUrl }) });
  writeJson(snapshotFile, manifest);
  writeJson(configFile, { enabled: true, manifestUrl, refreshIntervalMs: 300000 });
  console.log(`ImageKit sync complete: ${manifest.gallery.length} moments, ${Object.keys(manifest.projects).length} projects, ${Object.keys(manifest.assets).length} media assets.`);
}
module.exports = { refresh, titleFromName };
if (require.main === module) main().catch((error) => { console.error(privateKey ? error.message.replaceAll(privateKey, '[redacted]') : error.message); process.exitCode = 1; });
