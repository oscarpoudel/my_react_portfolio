# ImageKit media

The gallery and all project carousels use ImageKit. The initial migration
contains 127 moments, 147 project images, and 563 uploaded assets when
previews, video playback copies, posters, and full-resolution files are included.
The original local files are archived in the sibling folder
`../portfolio-media-backup/<timestamp>/`, outside this Git repository. The
ImageKit-backed folders are excluded from Git, so new local staging files
cannot accidentally be included in a push.

## Add photos or videos directly in ImageKit

Upload new gallery media into `/portfolio/gallery`.

Upload project images into `/portfolio/projects/<project-id>`, for example
`/portfolio/projects/33` for Talk, See, Support. The project ID is the number
in its website URL (`/#/projects/33`) and in `src/data/projects.json`.

Put new showcase images directly in those folders. The `previews`, `originals`,
and `index` subfolders support delivery and are excluded from automatic discovery.

The filename supplies a default caption. ImageKit's custom fields
**Portfolio title** and **Portfolio caption** let you refine the text. User tags
on gallery files become gallery filters. After migration, ImageKit is the
source for caption edits; edit those fields there to update existing content.

The **Sync ImageKit media** GitHub Actions workflow refreshes the public index
about every 15 minutes. GitHub can delay scheduled jobs. The website checks
the index on page entry and every five minutes while open. No website rebuild
is required for new media once this frontend integration is deployed.

For an immediate refresh, run the workflow manually from GitHub Actions or:

```powershell
npm run media:sync
```

## Upload from this computer

For local gallery additions, add files to `public/gallery`, then run:

```powershell
npm run gallery:sync
npm run media:upload
```

For paper-project additions, first refresh the project metadata and optimized
images with `scripts/sync-project-showcase.py`, then run `npm run media:upload`.
For older case studies, use `scripts/sync-legacy-project-media.py` first.

Uploads are resumable. Previously uploaded assets can be reused from the
cloud index even when the local media has been archived. Existing content
hashes are reused; changed files get
new cloud copies. Previously managed copies are retained and excluded from
the visible collection when superseded. The commands never delete cloud files.
Exceptionally large JPEGs are prepared as high-quality, at-most-8000-pixel
cloud copies; their archived original files stay unchanged.

## Credentials

Local commands read `.env.local`, which is excluded from Git:

```dotenv
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/YOUR_ID
IMAGEKIT_PRIVATE_KEY=YOUR_PRIVATE_KEY
IMAGEKIT_ROOT_FOLDER=/portfolio
```

The scheduled workflow uses encrypted repository Actions secrets with those
same names. If you rotate the private key, update both `.env.local` and the
repository secret. The frontend contains only public URLs and media metadata;
the private key is used exclusively by the Node sync script.

## Delivery and deployment

`src/data/media-config.json` identifies the public index URL.
`src/data/imagekit-manifest.json` is a bundled last-known-good snapshot.
The browser uses that snapshot if an index refresh is unavailable.

ImageKit generates appropriately sized thumbnails and display images without
cropping. Captions and natural image dimensions are retained, so the adaptive
carousel arrangement and image borders continue to work.

The gallery sync command preserves the current catalog when local media
folders are absent. New staging files merge into that catalog instead of
replacing it. Local import helpers may need their source files restored from
the archive; direct uploads in ImageKit do not require local copies.

`npm run build` removes generated `build/gallery` and
`build/images/project-showcase` copies after compilation. Those files are
served by ImageKit instead of being bundled into the deployed site. PDF reports
and other site assets stay in the build. Backups remain outside the repository.
