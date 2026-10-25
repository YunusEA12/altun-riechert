"""Regression fixtures: run python -m unittest discover -s scripts -p 'test_*.py'."""
import contextlib
import io
import json
from pathlib import Path
import subprocess
import tempfile
import unittest

from security_check import Audit, main


class SecurityCheckTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)

    def write(self, path, text):
        target = self.root / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(text, encoding="utf-8")

    def audit(self):
        audit = Audit(self.root)
        audit.load_manifest()
        audit.scan()
        return audit

    def codes(self):
        return {item.code for item in self.audit().findings}

    def test_missing_resource_but_normal_external_links_allowed(self):
        self.write("index.html", '<a href="https://example.invalid/">Link</a><img src="missing.png">')
        self.assertEqual(self.codes(), {"MISSING_RESOURCE"})

    def test_external_resources_in_html_css_js_and_srcset(self):
        self.write("index.html", '<img srcset="//example.invalid/a.png 1x,https://example.invalid/b.png 2x">')
        self.write("style.css", '@import "https://example.invalid/a.css"; b{background:url(//example.invalid/a.png)}')
        self.write("site.js", 'fetch("https://example.invalid/api"); import("https://example.invalid/mod.js");')
        self.assertEqual(self.codes(), {"EXTERNAL_RESOURCE"})
        self.assertEqual({item.file for item in self.audit().findings}, {"index.html", "style.css", "site.js"})

    def test_nested_css_and_encoded_local_urls(self):
        self.write("index.html", '<link rel="stylesheet" href="assets/site.css"><img src="images/a%20b.svg?x=1#hi">')
        self.write("assets/site.css", 'a{background:url(../images/a%20b.svg)}')
        self.write("images/a b.svg", '<svg xmlns="http://www.w3.org/2000/svg"></svg>')
        self.assertEqual(self.codes(), set())

    def test_no_xss_claim_for_static_html_assignments(self):
        self.write("site.js", 'thumbs.innerHTML = ""; title.innerHTML = "<b>Fest</b>"; a.innerHTML = `Konstant`;')
        self.assertEqual(self.codes(), set())
        self.write("site.js", 'a.innerHTML = location.hash; b.innerHTML = `<p>${data}</p>`;')
        self.assertEqual(self.codes(), {"HTML_SINK"})
        self.assertTrue(all(item.level == "WARN" for item in self.audit().findings))

    def test_control_obfuscated_scheme_and_handlers(self):
        self.write("index.html", '<a href="java&#x09;script:alert(1)" onclick="run()">Link</a>')
        self.assertEqual(self.codes(), {"URL_SCHEME", "EVENT_HANDLER"})

    def test_no_secret_values_in_output(self):
        secret = "ghp_" + "z" * 36
        self.write("site.js", f'const access_token = "{secret}";')
        capture = io.StringIO()
        with contextlib.redirect_stdout(capture):
            result = main(["--root", str(self.root), "--strict", "--no-git"])
        self.assertEqual(result, 1)
        self.assertIn("SECRET_HINT", capture.getvalue())
        self.assertNotIn(secret, capture.getvalue())

    def test_internal_files_are_not_scanned(self):
        self.write("index.html", '<p>OK</p>')
        self.write("_briefe/list.html", '<script src="https://example.invalid/private"></script>')
        self.write("docs/private.html", '<img src="missing.png">')
        self.assertEqual(self.codes(), set())

    def test_traversal_outside_root(self):
        self.write("index.html", '<img src="../outside.png">')
        self.assertEqual(self.codes(), {"OUTSIDE_ROOT"})

    def test_export_manifest_coverage(self):
        self.write("scripts/public-files.json", json.dumps(["index.html"]))
        self.write("index.html", '<img src="picture.svg">')
        self.write("picture.svg", '<svg></svg>')
        self.assertEqual(self.codes(), {"NOT_IN_MANIFEST", "UNLISTED_ASSET"})

    def test_invalid_manifest_and_empty_root_fail(self):
        self.write("scripts/public-files.json", '["../outside.html"]')
        self.assertEqual(self.codes(), {"MANIFEST_INVALID"})
        with contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(main(["--root", str(self.root), "--no-git"]), 1)

    def test_git_index_and_history_are_reported_without_contents(self):
        try:
            subprocess.run(["git", "init", "-q", str(self.root)], check=True, capture_output=True)
        except (OSError, subprocess.CalledProcessError):
            self.skipTest("Git unavailable")
        self.write("_briefe/private.txt", "PRIVATE_CUSTOMER_VALUE")
        def git(*args):
            return subprocess.run(["git", "-C", str(self.root), *args], check=True, capture_output=True)
        git("add", "_briefe")
        git("-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid", "-c", "commit.gpgsign=false", "commit", "-qm", "fixture")
        audit = Audit(self.root)
        audit.git()
        self.assertEqual({item.code for item in audit.findings}, {"INTERNAL_TRACKED", "INTERNAL_HISTORY"})
        self.assertNotIn("PRIVATE_CUSTOMER_VALUE", str(audit.findings))


if __name__ == "__main__":
    unittest.main()
