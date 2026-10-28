// Local regression checks: no browser, network, or third-party dependency required.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname, '../beispiel/index.html'), 'utf8');
assert.match(html, /http-equiv="Content-Security-Policy" content="form-action 'none'; base-uri 'self'; object-src 'none'"/);
assert.doesNotMatch(html, /type="submit"/);
for (const id of ['lead-demo', 'job-demo']) {
  assert.match(html, new RegExp('id="' + id + '" type="button"'));
}
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script); // Parse the complete inline script, including the canvas demo.
const localDemo = script.slice(script.indexOf('  /* Fotos als lokale, begrenzte Vorschau */'), script.lastIndexOf('})();'));

function setup() {
  const elements = new Map();
  function element(id) {
    if (!elements.has(id)) {
      let text = '';
      const el = { listeners: {}, children: [], value: '', files: [], hidden: true,
        addEventListener(event, fn) { this.listeners[event] = fn; },
        appendChild(child) { this.children.push(child); },
        get textContent() { return text; },
        set textContent(value) { text = value; this.children = []; }
      };
      elements.set(id, el);
    }
    return elements.get(id);
  }
  const readers = [], images = [];
  class Reader {
    constructor() { this.readyState = 0; readers.push(this); }
    readAsDataURL(file) { this.readyState = 1; this.file = file; }
    abort() { this.readyState = 2; this.aborted = true; }
    finish() { this.readyState = 2; this.result = 'data:image/png;base64,AA=='; this.onload(); }
  }
  class Image { constructor() { images.push(this); } }
  vm.runInNewContext(localDemo, {
    document: { getElementById: element, querySelectorAll: () => [{ value: 'Innenanstrich' }] },
    FileReader: Reader, Image
  });
  function choose(files) { element('f-fotos').files = files; element('f-fotos').listeners.change(); }
  return { element, readers, images, choose };
}
const png = (size = 100) => ({ type: 'image/png', size });
for (const invalid of [
  Array.from({ length: 7 }, () => png()),
  [png(5 * 1024 * 1024 + 1)],
  Array.from({ length: 5 }, () => png(5 * 1024 * 1024)),
  [{ type: 'image/svg+xml', size: 100 }],
  [{ type: 'text/html', size: 100 }]
]) {
  const test = setup();
  test.choose(invalid);
  assert.equal(test.readers.length, 0, 'Invalid selections must not be read');
  assert.ok(test.element('photo-state').textContent);
  assert.equal(test.element('f-fotos').value, '');
}
{
  const test = setup();
  test.choose([png()]);
  test.choose([png()]);
  assert.equal(test.readers[0].aborted, true);
  test.readers[0].finish(); // Even a late callback from the canceled reader is ignored.
  assert.equal(test.images.length, 0);
  test.readers[1].finish();
  test.choose([]);
  test.images[0].onload(); // A previously decoding image is also ignored.
  assert.equal(test.element('thumbs').children.length, 0);
}
{
  const test = setup();
  test.choose([png()]);
  test.readers[0].finish();
  test.images[0].onload();
  assert.equal(test.element('thumbs').children.length, 1);
  test.element('lead-demo').listeners.click();
  assert.match(test.element('done-text').textContent, /1 Foto/);
  test.element('job-demo').listeners.click();
  assert.equal(test.element('job-done').hidden, false);
  for (const id of ['lead-form', 'job-form']) {
    let prevented = false;
    test.element(id).listeners.submit({ preventDefault() { prevented = true; } });
    assert.equal(prevented, true);
  }
  test.choose([png()]);
  test.readers.at(-1).onerror();
  assert.match(test.element('photo-state').textContent, /nicht/);
}
console.log('PASS: demo submission guards, type/count/size limits, stale callbacks, error feedback, script syntax');
