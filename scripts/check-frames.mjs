import assert from 'node:assert/strict';
import { createFrameLoader } from '../app/frames.ts';

const originalFetch = globalThis.fetch, originalDecode = globalThis.createImageBitmap;
const requests = [], decodes = [], counts = new Map(), live = new Set();
let ready = 0, peak = 0;
globalThis.fetch = (url, options) => new Promise((resolve) => {
  const index = Number(url.match(/frame-(\d+)/)[1]);
  assert.equal(options.cache, 'force-cache');
  counts.set(index, (counts.get(index) ?? 0) + 1);
  requests.push({ index, resolve, signal: options.signal });
  assert.ok(requests.length <= 4, 'downloads stay bounded');
});
globalThis.createImageBitmap = (blob) => new Promise((resolve) => {
  decodes.push({ blob, resolve });
  assert.ok(decodes.length <= 2, 'decodes stay bounded');
});
const tick = () => new Promise((resolve) => setImmediate(resolve));
async function finishDecodes() {
  for (const { blob, resolve } of decodes.splice(0)) {
    const bitmap = { index: Number(await blob.text()), close() { live.delete(this); } };
    live.add(bitmap); peak = Math.max(peak, live.size);
    resolve(bitmap);
    await tick();
  }
}
async function drain() {
  for (let turn = 0; turn < 150; turn++) {
    for (const { index, resolve } of requests.splice(0)) resolve(new Response(String(index)));
    await tick();
    await finishDecodes();
    await tick();
    if (!requests.length && !decodes.length) return;
  }
  assert.fail('loader never settled (possible decode/eviction loop)');
}

try {
  const frames = createFrameLoader(540, () => ready++);
  frames.update(0, false);
  assert.equal(requests.length, 0, 'inactive animation does not load');
  frames.update(0, true);
  assert.equal(frames.nearest(), undefined, 'poster remains until a frame is ready');
  await drain();
  assert.equal(counts.size, 96, 'download entire compressed sequence ahead of scrolling');
  assert.equal(frames.nearest().index, 0);
  assert.equal(live.size, 12);
  for (const target of [43, 80, 95, 42, 0, 1, 2, 1, 0]) {
    frames.update(target, true);
    assert.ok(frames.nearest(), 'a ready neighbor is available while the exact frame decodes');
    await drain();
    assert.equal(frames.nearest().index, target);
    assert.equal(live.size, 12);
  }
  assert.ok([...counts.values()].every((count) => count === 1), 'reverse scroll never refetches downloaded frames');
  assert.ok(peak <= 14, 'decoded memory includes at most two in-flight images');
  frames.update(50, true);
  const callbacks = ready;
  frames.dispose();
  await finishDecodes();
  assert.equal(ready, callbacks, 'late decodes never paint after cleanup');
  assert.equal(live.size, 0, 'all bitmaps released including late decodes');

  const interrupted = createFrameLoader(900, () => ready++);
  interrupted.update(0, true);
  interrupted.update(0, false);
  for (const { resolve } of requests.splice(0)) resolve(new Response('unavailable', { status: 503 }));
  await tick(); await tick();
  assert.equal(requests.length, 0, 'paused loader starts no further downloads');
  assert.equal(decodes.length, 0, 'failed frames keep the poster fallback');
  interrupted.update(20, true);
  const signals = requests.map((request) => request.signal);
  interrupted.dispose();
  assert.ok(signals.every((signal) => signal.aborted), 'cleanup aborts downloads');
  await drain();
  assert.equal(live.size, 0);
  console.log('Frame preloading, reverse scroll reuse, memory/concurrency limits, pause, failures and cleanup pass.');
} finally {
  globalThis.fetch = originalFetch;
  globalThis.createImageBitmap = originalDecode;
}
