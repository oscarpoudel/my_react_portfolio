# Getting Started with Create React App

The personal gallery is available at `/#/gallery`, with links from the home page
and navigation. Gallery media and project showcases are delivered by ImageKit.
See [ImageKit instructions](docs/imagekit.md) for automatic cloud updates,
captions, folders, and local uploads. Media backups are kept outside this repo
in the sibling `portfolio-media-backup` folder. Only required branding and
interface images remain bundled with the website.
For local staging, add files to `public/gallery`, then run `npm run gallery:sync`
and `npm run media:upload`. Filenames supply the initial captions.

Project collections are maintained in `src/data/projects.json`. Each project
has expertise `categories`, robot/environment `platforms`, `tags`, and an
`origin` (`build` or `research`). Research-derived cards describe systems and
experiments; their `publications` are supporting references. The Research page
still reads its separate, unchanged `src/data/research.json`.

Add `overview` (an array of paragraphs), `highlights` (an array of bullet points),
or an `image` to expand a new project's overview page later. Existing custom
case studies keep `detailComponent: true`; leave it false for new cards to use
the automatic overview instead of requiring a new React component. `links`
contains objects with a `label` and `url`. Under-review work is excluded from
the Projects showcase. Only expertise/topic pills filter the collection, and
the selected topic is retained in the URL.
The All areas collection shuffles once on each visit to Projects; topic filters
keep their usual ordering and the current visit's shuffled order stays stable.

All project details share the same overview layout and image carousel, with
one page scrollbar and common resource actions. Embedded-report projects
(IDs 2, 9, 10, and 11) retain their existing PDF viewers below the overview.

Older project image metadata lives in `src/data/projectMedia.json`. Run
`python scripts/sync-legacy-project-media.py` to refresh images from their
existing covers and case-study components; remote images are cached locally.
This helper requires Pillow. It preserves the case-study text and PDF files.

Paper-project diagrams and concise engineering/skills summaries are maintained
in `src/data/projectShowcases.json`, keyed by project ID. `papers` records the
numbered local source papers; `sourceFile` identifies each supplied visual.
The card cover starts a captioned carousel beside the detail-page title. All
project images are available through thumbnails, arrows, swipe, or an
eight-second slideshow that pauses during interaction. Images also open in
a larger viewer with full-resolution links. Frames follow the image's native
proportions, with side thumbnails for portraits and a bottom strip for wider
images. Frames and controls have square corners and slide-specific border
colors. To import new visuals, run:

```powershell
python scripts/sync-project-showcase.py "C:\Users\oscar poudel\OneDrive - NJIT\Ra_papers\OTHERS\ALL MY PAPERS"
```

This importer requires Pillow (`python -m pip install Pillow`). It copies
originals into `public/images/project-showcase/<project-id>/originals`, corrects
photo orientation, and generates optimized WebP previews without cropping
diagrams; SVG charts retain their vector format. Every image whose filename
starts with one of the project's paper numbers is included automatically.
Existing captions are preserved; refine new captions in the JSON file.
Run `npm run build` afterward to refresh the production preview.
Each showcase also has an `implementation` array of short technology and
integration notes. Related publications remain visible below the project.

The contact form uses EmailJS. Configure `REACT_APP_EMAILJS_PUBLIC_KEY` in
`.env.local` for local development; GitHub deployment reads the encrypted
`EMAILJS_PUBLIC_KEY` repository secret. Service and template IDs can be
overridden with `REACT_APP_EMAILJS_SERVICE_ID` and
`REACT_APP_EMAILJS_TEMPLATE_ID`. Successful sends show an inline confirmation;
failed sends retain the message and offer a direct email link.
If EmailJS reports `Gmail_API: Invalid grant` (HTTP 412), reconnect the Gmail
account in EmailJS → Email Services. The form only confirms success after
EmailJS returns HTTP 200.

In the gallery's All moments view, a smaller featured image sits beside a
larger scrollable thumbnail grid. The grid keeps usable thumbnail sizes as
the archive grows and pauses slide changes while visitors browse it.

Paper filters use `categories` (the same expertise IDs as Projects) and `type`
(`journal` or `conference`) on each entry in `src/data/research.json`. A paper
can belong to multiple topics. Keep its existing citation, link, and ID when
updating this metadata.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
