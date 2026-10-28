import json
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

from build_public import build


class PublicExportTest(unittest.TestCase):
    def fixture(self, root, entries):
        (root / 'scripts').mkdir()
        (root / 'scripts/public-files.json').write_text(json.dumps(entries), encoding='utf-8')
        (root / 'index.html').write_text('<h1>Test</h1>', encoding='utf-8')

    def test_only_manifest_is_exported_and_existing_exports_are_preserved(self):
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.fixture(root, ['index.html'])
            (root / '.env').write_text('TEST_ONLY', encoding='utf-8')
            (root / '_briefe').mkdir()
            (root / '_briefe/private.txt').write_text('TEST_ONLY', encoding='utf-8')
            first, second = build(root), build(root)
            self.assertNotEqual(first, second)
            self.assertEqual([p.name for p in first.iterdir()], ['index.html'])
            self.assertEqual((first / 'index.html').read_bytes(), (root / 'index.html').read_bytes())
            self.assertTrue((root / '_briefe/private.txt').exists())

    def test_unsafe_or_missing_paths_fail_before_export(self):
        for path in ['../outside.txt', '/outside.txt', 'C:/outside.txt', '.git/HEAD',
                     'docs/internal.md', 'scripts/private.py', '_briefe/private.txt',
                     'assets/../../outside.txt', 'missing.png', '.', 'Docs/internal.md',
                     '_BRIEFE/private.txt', 'CLAUDE.md']:
            with self.subTest(path=path), TemporaryDirectory() as tmp:
                root = Path(tmp)
                self.fixture(root, [path])
                with self.assertRaises(ValueError):
                    build(root)
                self.assertFalse((root / 'dist').exists())


if __name__ == '__main__':
    unittest.main()
