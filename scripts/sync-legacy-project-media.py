"""Collect existing project covers and case-study images for the shared carousel.

Run manually with Python + Pillow after adding images to older case studies.
Remote images are cached locally; existing case-study components stay intact.
"""
import ast
import hashlib
import io
import json
import re
import shutil
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PROJECTS = json.loads((ROOT / 'src/data/projects.json').read_text(encoding='utf-8'))['projects']


def discover(project):
    assets = [{'source': project['image'], 'title': project['title'], 'caption': ' / '.join(project['tags'][:3])}]
    component = ROOT / f"src/components/Detailslist/Project{project['id']}.jsx"
    if not component.exists():
        return assets
    text = re.sub(r'\{/\*.*?\*/\}', '', component.read_text(encoding='utf-8-sig'), flags=re.S)
    text = re.sub(r'^\s*//.*$', '', text, flags=re.M)
    variables = {name: (component.parent / path).resolve().relative_to(ROOT).as_posix()
                 for name, path in re.findall(r'import\s+(\w+)\s+from\s+[\'\"]([^\'\"]+\.(?:png|jpg|jpeg|webp|gif))[\'\"]', text)}
    variables.update(dict(re.findall(r'const\s+(\w+)\s*=\s*[\'\"]([^\'\"]+)[\'\"]', text)))
    images = list(re.finditer(r'<img\b([^>]+)>', text, re.S))
    for index, match in enumerate(images):
        attrs = match[1]
        src = re.search(r'src\s*=\s*(?:\{([^}]+)\}|[\'\"]([^\'\"]+)[\'\"])', attrs)
        if not src:
            continue
        expression = (src[1] or '').strip()
        if src[2]:
            source = src[2]
        elif expression in variables:
            source = variables[expression]
        elif '+' in expression:
            variable, literal = expression.split('+', 1)
            source = variables.get(variable.strip(), '') + ast.literal_eval(literal.strip())
        else:
            source = ast.literal_eval(expression)
        alt = re.search(r'alt\s*=\s*[\'\"]([^\'\"]+)[\'\"]', attrs)
        title = alt[1] if alt else 'Project image'
        end = images[index + 1].start() if index + 1 < len(images) else len(text)
        caption = re.search(r'className="caption">\s*([^<]+)</div>', text[match.end():end], re.S)
        assets.append({'source': source, 'title': title, 'caption': re.sub(r'\s+', ' ', caption[1]).strip() if caption else title})
    unique = {}
    for asset in assets:
        unique.setdefault(asset['source'], asset)
    return list(unique.values())


def import_asset(args):
    project_id, asset = args
    source = asset['source']
    folder = ROOT / 'public/images/project-showcase' / str(project_id)
    (folder / 'originals').mkdir(parents=True, exist_ok=True)
    key = hashlib.sha256(source.encode()).hexdigest()[:12]
    is_remote = source.startswith('https://')
    extension = Path(urllib.parse.urlparse(source).path).suffix.lower() or '.png'
    original = folder / 'originals' / f'{key}{extension}'
    try:
        if is_remote:
            if not original.exists():
                request = urllib.request.Request(source, headers={'User-Agent': 'Portfolio media import'})
                with urllib.request.urlopen(request, timeout=25) as response:
                    payload = response.read()
                with Image.open(io.BytesIO(payload)) as check:
                    check.verify()
                original.write_bytes(payload)
        else:
            incoming = ROOT / source if source.startswith('src/') else ROOT / 'public' / source
            if not original.exists() or incoming.stat().st_mtime > original.stat().st_mtime:
                shutil.copy2(incoming, original)
        preview = folder / f'{key}.webp'
        with Image.open(original) as raw:
            picture = ImageOps.exif_transpose(raw)
            if picture.mode in ('RGBA', 'LA') or 'transparency' in picture.info:
                rgba = picture.convert('RGBA')
                picture = Image.new('RGB', rgba.size, 'white')
                picture.paste(rgba, mask=rgba.getchannel('A'))
            else:
                picture = picture.convert('RGB')
            picture.thumbnail((2200, 2200))
            if not preview.exists():
                picture.save(preview, 'WEBP', quality=90, method=4)
            return {**asset, 'src': preview.relative_to(ROOT / 'public').as_posix(),
                    'original': original.relative_to(ROOT / 'public').as_posix(),
                    'width': picture.width, 'height': picture.height}
    except Exception as error:
        print(f'Skipped project {project_id}: {source}: {error}')
        return None


if __name__ == '__main__':
    result = {}
    for project in PROJECTS:
        if project['id'] >= 18 or not project.get('image'):
            continue
        with ThreadPoolExecutor(max_workers=4) as executor:
            imported = list(executor.map(import_asset, [(project['id'], asset) for asset in discover(project)]))
        result[str(project['id'])] = [asset for asset in imported if asset]
        if not result[str(project['id'])]:
            raise RuntimeError(f"No usable images for project {project['id']}")
        print(f"Project {project['id']}: {len(result[str(project['id'])])} images")
    (ROOT / 'src/data/projectMedia.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Imported {sum(map(len, result.values()))} images for {len(result)} older projects.')
