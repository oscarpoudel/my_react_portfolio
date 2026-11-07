const test = require('node:test');
const assert = require('node:assert/strict');
const { refresh, titleFromName, indexContent } = require('./imagekit-sync.cjs');
const file = (id, filePath, extra = {}) => ({ fileId: id, filePath, name: filePath.split('/').pop(), url: `https://ik.imagekit.io/test${filePath}`, tags: [], width: 1200, height: 800, ...extra });
const base = () => ({ schema: 1, gallery: [], projects: { 18: [] }, assets: {} });

test('dashboard uploads retain captions and do not duplicate across refreshes', () => {
  const files = [file('gallery', '/portfolio/gallery/An_afternoon.jpg', { customMetadata: { portfolioTitle: 'An afternoon', portfolioCaption: 'On campus' }, tags: ['phd'] }), file('project', '/portfolio/projects/18/Prototype.png', { customMetadata: { portfolioCaption: 'New sensor assembly' } })];
  const manifest = refresh(base(), files);
  assert.equal(manifest.gallery.length, 1);
  assert.equal(manifest.projects[18].length, 1);
  assert.equal(manifest.gallery[0].alt, 'On campus');
  assert.equal(manifest.projects[18][0].caption, 'New sensor assembly');
  refresh(manifest, files);
  assert.equal(manifest.gallery.length, 1);
  assert.equal(manifest.projects[18].length, 1);
  assert.deepEqual(manifest.gallery[0].tags, ['phd']);
});

test('previews, retained managed versions, and originals are excluded from collections', () => {
  const manifest = refresh(base(), [file('a', '/portfolio/gallery/previews/thumb.jpg'), file('b', '/portfolio/projects/18/originals/full.png'), file('c', '/portfolio/index/media.json'), file('d', '/portfolio/gallery/old-version.jpg', { tags: ['portfolio-managed'] })]);
  assert.equal(manifest.gallery.length, 0);
  assert.equal(manifest.projects[18].length, 0);
});

test('existing local mappings receive remote edits and deleted slides disappear', () => {
  const manifest = base();
  manifest.gallery = [{ file: 'old.jpg', title: 'Old caption', tags: [] }];
  manifest.assets['gallery/old.jpg'] = { fileId: 'a' };
  refresh(manifest, [file('a', '/portfolio/gallery/Renamed.jpg', { customMetadata: { portfolioTitle: 'Edited on ImageKit' } })]);
  assert.equal(manifest.gallery[0].title, 'Edited on ImageKit');
  refresh(manifest, []);
  assert.equal(manifest.gallery.length, 0);
});

test('caption derivation removes migration hashes without damaging names', () => {
  assert.equal(titleFromName('Life_at_NJIT--abc123def456.jpg'), 'Life at NJIT');
  assert.equal(titleFromName('My_robot_build.png'), 'My robot build');
});

test('unchanged syncs do not require publishing a new manifest version', () => {
  const files = [file('a', '/portfolio/gallery/photo.jpg')];
  const manifest = refresh(base(), files);
  const before = indexContent(manifest);
  manifest.updatedAt = 'a different timestamp';
  refresh(manifest, files);
  assert.equal(indexContent(manifest), before);
});
