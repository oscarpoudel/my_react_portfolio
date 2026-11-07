const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

test('cloud gallery metadata survives archived media and merges new local staging files', () => {
  const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-gallery-test-'));
  try {
    fs.mkdirSync(path.join(sandbox, 'scripts'));
    fs.mkdirSync(path.join(sandbox, 'src/data'), { recursive: true });
    fs.copyFileSync(path.join(__dirname, 'sync-gallery.js'), path.join(sandbox, 'scripts/sync-gallery.js'));
    const catalog = path.join(sandbox, 'src/data/gallery.json');
    const original = [{ file: 'Archived photo.jpg', title: 'Archived photo', tags: ['phd'], alt: 'Existing description' }];
    fs.writeFileSync(catalog, JSON.stringify(original));
    fs.writeFileSync(path.join(sandbox, 'src/data/media-config.json'), JSON.stringify({ enabled: true }));
    const run = () => { const result = spawnSync(process.execPath, ['scripts/sync-gallery.js'], { cwd: sandbox }); assert.equal(result.status, 0, result.stderr.toString()); return JSON.parse(fs.readFileSync(catalog, 'utf8')); };
    assert.deepEqual(run(), original);
    fs.mkdirSync(path.join(sandbox, 'public/gallery'), { recursive: true });
    fs.writeFileSync(path.join(sandbox, 'public/gallery/New moment.jpg'), 'test fixture');
    const updated = run();
    assert.equal(updated.length, 2);
    assert.deepEqual(updated[0], original[0]);
    assert.equal(updated[1].title, 'New moment');
    assert.equal(run().length, 2);
  } finally {
    const checked = path.resolve(sandbox);
    if (!checked.startsWith(path.resolve(os.tmpdir()) + path.sep) || !path.basename(checked).startsWith('portfolio-gallery-test-')) throw new Error('Invalid test cleanup path');
    fs.rmSync(checked, { recursive: true, force: true });
  }
});
