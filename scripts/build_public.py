"""Export only explicitly approved public files; never deploy or delete files."""
import argparse
import json
import shutil
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath
from uuid import uuid4


def build(root):
    root = Path(root).resolve()
    entries = json.loads((root / 'scripts/public-files.json').read_text(encoding='utf-8'))
    if not isinstance(entries, list) or not entries:
        raise ValueError('Public manifest must be a nonempty list.')
    approved = []
    seen = set()
    for name in entries:
        if not isinstance(name, str) or '\\' in name or ':' in name:
            raise ValueError('Invalid public path.')
        rel = PurePosixPath(name)
        if not rel.parts or rel.is_absolute() or '..' in rel.parts or str(rel) != name:
            raise ValueError('Public paths must be normalized and relative.')
        if any(part.startswith('.') for part in rel.parts) and name != '.nojekyll':
            raise ValueError('Hidden files are not public assets.')
        if rel.parts[0].casefold() in {'docs', 'scripts', '_briefe', 'referenz', 'obsidian-vault', 'dist', 'claude.md', 'readme.md', 'agents.md'}:
            raise ValueError('Internal path in public manifest.')
        if name.casefold() in seen:
            raise ValueError('Duplicate public path.')
        seen.add(name.casefold())
        source = root.joinpath(*rel.parts)
        for ancestor in [source, *source.parents]:
            if ancestor == root:
                break
            if ancestor.is_symlink() or (hasattr(ancestor, 'is_junction') and ancestor.is_junction()):
                raise ValueError('Links and junctions are not exported.')
        if not source.resolve().is_relative_to(root) or not source.is_file():
            raise ValueError('Public source missing or outside workspace: ' + name)
        approved.append((source, rel))
    dist = root / 'dist'
    if dist.is_symlink() or (hasattr(dist, 'is_junction') and dist.is_junction()):
        raise ValueError('Output directory must not be a link.')
    if not dist.resolve().is_relative_to(root):
        raise ValueError('Output must remain inside workspace.')
    target = dist / ('site-' + datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S') + '-' + uuid4().hex[:8])
    target.mkdir(parents=True, exist_ok=False)
    for source, rel in approved:
        dest = target.joinpath(*rel.parts)
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, dest)
    return target


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    print(build(args.root))
