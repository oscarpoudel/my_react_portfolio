import { useSyncExternalStore } from 'react';
import config from '../data/media-config.json';
import snapshot from '../data/imagekit-manifest.json';
import localGallery from '../data/gallery.json';
import showcases from '../data/projectShowcases.json';
import legacy from '../data/projectMedia.json';

const localProjects = { ...legacy, ...Object.fromEntries(Object.entries(showcases).map(([id, entry]) => [id, [entry.cover, ...entry.figures]])) };
let library = { ...snapshot, gallery: snapshot.gallery || localGallery, projects: { ...localProjects, ...snapshot.projects } };
const listeners = new Set();
let timer;
let inFlight;

export async function refreshMediaLibrary() {
  if (!config.enabled || !config.manifestUrl) return;
  if (inFlight) return inFlight;
  inFlight = (async () => {
    try {
      const url = new URL(config.manifestUrl);
      url.searchParams.set('updatedAt', String(Date.now()));
      const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(15000) });
      if (!response.ok) return;
      const next = await response.json();
      if (next.schema !== 1 || !Array.isArray(next.gallery) || !next.assets || !next.projects) return;
      if (next.updatedAt && next.updatedAt === library.updatedAt) return;
      library = next;
      listeners.forEach((listener) => listener());
    } catch {
      // Keep the bundled last-known-good index when offline or during CDN refresh.
    } finally { inFlight = undefined; }
  })();
  return inFlight;
}

function subscribe(listener) {
  listeners.add(listener);
  if (listeners.size === 1) {
    refreshMediaLibrary();
    timer = setInterval(refreshMediaLibrary, config.refreshIntervalMs || 300000);
  }
  return () => { listeners.delete(listener); if (!listeners.size) clearInterval(timer); };
}

export function useMediaLibrary() { return useSyncExternalStore(subscribe, () => library); }

export function resolveMedia(source, width) {
  if (!source) return undefined;
  const remote = library.assets[source.replace(/^\//, '')]?.url || library.assets[source]?.url;
  const resolved = remote || (/^https?:/.test(source) ? source : `${process.env.PUBLIC_URL || ''}/${source.replace(/^\//, '')}`);
  if (!width || (!remote && (!config.manifestUrl || !resolved.startsWith(new URL(config.manifestUrl).origin)))) return resolved;
  const url = new URL(resolved);
  url.searchParams.set('tr', `w-${width},c-at_max,q-85,f-auto`);
  return url.toString();
}

export function resolveGalleryMedia(file, width) { return resolveMedia(/^https?:/.test(file) ? file : `gallery/${file}`, width); }
