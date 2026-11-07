"""Import paper-project visuals: python scripts/sync-project-showcase.py SOURCE_FOLDER.

Requires Pillow. Captions, methods, skills, and source filenames live in
src/data/projectShowcases.json. Original files are retained for the image viewer.
"""
import json
import re
import shutil
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'src/data/projectShowcases.json'


def sync(source):
    entries = json.loads(DATA.read_text(encoding='utf-8'))
    count = 0
    # Include every supplied image for each project's numbered source papers.
    for entry in entries.values():
        known = {entry['cover']['sourceFile']}
        unique_figures = []
        for asset in entry['figures']:
            if asset['sourceFile'] not in known:
                unique_figures.append(asset)
                known.add(asset['sourceFile'])
        entry['figures'] = unique_figures
        for incoming in sorted(source.iterdir(), key=lambda path: path.name.lower()):
            match = re.match(r'^(\d+)[_. ]', incoming.name)
            if (not match or int(match[1]) not in entry['papers']
                    or incoming.suffix.lower() not in ('.png', '.jpg', '.jpeg', '.webp', '.svg')
                    or incoming.name in known):
                continue
            title = re.sub(r'^\d+[_. ]+', '', incoming.stem).replace('_', ' ').strip()
            entry['figures'].append({'sourceFile': incoming.name, 'title': title[:1].upper() + title[1:],
                                     'caption': 'Project diagram or prototype from the supporting research.'})
            known.add(incoming.name)
    # Validate all inputs before writing assets.
    for entry in entries.values():
        for asset in [entry['cover'], *entry['figures']]:
            if not (source / asset['sourceFile']).is_file():
                raise FileNotFoundError(source / asset['sourceFile'])
    for project_id, entry in entries.items():
        folder = ROOT / 'public/images/project-showcase' / project_id
        (folder / 'originals').mkdir(parents=True, exist_ok=True)
        for index, asset in enumerate([entry['cover'], *entry['figures']]):
            incoming = source / asset['sourceFile']
            stem = 'cover' if index == 0 else f'figure-{index}'
            original = folder / 'originals' / f'{stem}{incoming.suffix.lower()}'
            expected_original = f'images/project-showcase/{project_id}/originals/{original.name}'
            changed = asset.get('original') != expected_original or not original.exists() or original.stat().st_mtime < incoming.stat().st_mtime or original.stat().st_size != incoming.stat().st_size
            if changed:
                shutil.copy2(incoming, original)
            if incoming.suffix.lower() == '.svg':
                preview = folder / f'{stem}.svg'
                shutil.copy2(incoming, preview)
                asset.update(src=f'images/project-showcase/{project_id}/{preview.name}',
                             original=f'images/project-showcase/{project_id}/originals/{original.name}')
                count += 1
                continue
            with Image.open(incoming) as raw:
                picture = ImageOps.exif_transpose(raw)
                # Composite transparent diagrams onto white, retaining fine labels.
                if picture.mode in ('RGBA', 'LA') or 'transparency' in picture.info:
                    rgba = picture.convert('RGBA')
                    picture = Image.new('RGB', rgba.size, 'white')
                    picture.paste(rgba, mask=rgba.getchannel('A'))
                else:
                    picture = picture.convert('RGB')
                picture.thumbnail((1600, 1600) if index == 0 else (2600, 2600))
                preview = folder / f'{stem}.webp'
                if changed or not preview.exists():
                    picture.save(preview, 'WEBP', quality=91, method=6)
                asset.update(width=picture.width, height=picture.height)
            asset['src'] = f'images/project-showcase/{project_id}/{stem}.webp'
            asset['original'] = f'images/project-showcase/{project_id}/originals/{original.name}'
            count += 1
    DATA.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Imported {count} visuals for {len(entries)} projects.')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        raise SystemExit('Usage: python scripts/sync-project-showcase.py SOURCE_FOLDER')
    sync(Path(sys.argv[1]).resolve())
