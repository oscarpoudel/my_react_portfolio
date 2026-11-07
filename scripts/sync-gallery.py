"""Import gallery media, derive captions from filenames, and generate previews."""
import argparse
import hashlib
import json
import shutil
import subprocess
import re
import tempfile
from pathlib import Path
from PIL import Image, ImageOps
try:
    import imageio_ffmpeg
except ImportError:
    imageio_ffmpeg = None

# Personal panoramas can exceed Pillow's default pixel limit.
Image.MAX_IMAGE_PIXELS = 250_000_000

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / 'public' / 'gallery'
MANIFEST = ROOT / 'src' / 'data' / 'gallery.json'
EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.webm', '.mov', '.m4v'}
VIDEOS = {'.mp4', '.webm', '.mov', '.m4v'}


def sync(source=None, replace=False):
    MEDIA.mkdir(parents=True, exist_ok=True)
    if source:
        source = Path(source).resolve()
        if not source.is_dir():
            raise SystemExit(f'Media folder does not exist: {source}')
        source_files = [file for file in source.iterdir() if file.is_file() and file.suffix.lower() in EXTENSIONS]
        if replace:
            if not source_files or source == MEDIA.resolve() or MEDIA.resolve() in source.parents:
                raise SystemExit('Replacement requires a nonempty source folder outside the repository gallery.')
            backup = Path(tempfile.mkdtemp(prefix='portfolio-gallery-backup-'))
            shutil.copytree(MEDIA, backup / 'gallery')
            if MANIFEST.exists():
                shutil.copy2(MANIFEST, backup / 'gallery.json')
            print(f'Previous gallery backed up to: {backup}')
            for file in MEDIA.iterdir():
                if file.is_file() and file.suffix.lower() in EXTENSIONS:
                    file.unlink()
            preview_dir = MEDIA / 'previews'
            if preview_dir.exists():
                if preview_dir.resolve().parent != MEDIA.resolve():
                    raise SystemExit('Preview directory resolves outside the gallery.')
                for preview in preview_dir.iterdir():
                    if preview.is_file() and preview.suffix.lower() in EXTENSIONS:
                        preview.unlink()
        for file in source_files:
            if file.is_file() and file.suffix.lower() in EXTENSIONS:
                target = MEDIA / file.name
                if file.resolve() != target.resolve() and not target.exists():
                    shutil.copy2(file, target)
    previous = json.loads(MANIFEST.read_text(encoding='utf-8')) if MANIFEST.exists() else []
    by_file = {item['file']: item for item in previous}
    previews = MEDIA / 'previews'
    previews.mkdir(exist_ok=True)
    items, seen = [], set()
    for file in sorted(MEDIA.iterdir()):
        if not file.is_file() or file.suffix.lower() not in EXTENSIONS:
            continue
        digest = hashlib.sha256(file.read_bytes()).hexdigest()
        if digest in seen:
            continue
        seen.add(digest)
        item = by_file.get(file.name, {'file': file.name, 'tags': []})
        item['title'] = re.sub(r'[_\s]+', ' ', file.stem).strip()
        item['type'] = 'video' if file.suffix.lower() in VIDEOS else 'image'
        if item['type'] == 'image':
            with Image.open(file) as original:
                original.draft('RGB', (1600, 1600))
                image = ImageOps.exif_transpose(original).convert('RGB')
                item['width'], item['height'] = image.size
                image.thumbnail((1600, 1600))
                preview_name = file.name + '.webp'
                image.save(previews / preview_name, 'WEBP', quality=83)
                item['preview'] = 'previews/' + preview_name
        elif imageio_ffmpeg:
            playback = previews / (file.stem + '-web.mp4')
            poster = previews / (file.stem + '-poster.jpg')
            ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
            if not playback.exists():
                subprocess.run([ffmpeg, '-y', '-loglevel', 'error', '-i', str(file),
                                '-vf', 'scale=1280:-2,fps=30,format=yuv420p',
                                '-c:v', 'libx264', '-preset', 'fast', '-crf', '23',
                                '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart',
                                '-map_metadata', '-1', str(playback)], check=True)
            if not poster.exists():
                subprocess.run([ffmpeg, '-y', '-loglevel', 'error', '-ss', '1', '-i', str(playback),
                                '-frames:v', '1', str(poster)], check=True)
            item['playback'] = 'previews/' + playback.name
            item['poster'] = 'previews/' + poster.name
            with Image.open(poster) as image:
                item['width'], item['height'] = image.size
        items.append(item)
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(items, indent=2) + '\n', encoding='utf-8')
    print(f'Gallery synced: {len(items)} unique moments. Captions derived from filenames; tags preserved.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', nargs='?', help='Optional folder to copy new media from')
    parser.add_argument('--replace', action='store_true', help='Back up and replace current media with the source folder')
    args = parser.parse_args()
    if args.replace and not args.source:
        parser.error('--replace requires a source folder')
    sync(args.source, args.replace)
