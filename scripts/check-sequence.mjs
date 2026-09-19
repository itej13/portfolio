import assert from 'node:assert/strict';
import { FRAME_COUNT, sequenceState } from '../app/sequence.ts';
assert.equal(FRAME_COUNT, 96);
assert.deepEqual(sequenceState(-100, 0, 3400, 1000), {progress: 0, frame: 0, chapter: 0});
assert.deepEqual(sequenceState(2400, 0, 3400, 1000), {progress: 1, frame: 95, chapter: 2});
assert.equal(sequenceState(1200, 0, 3400, 1000).frame, 48);
assert.equal(sequenceState(1200, 0, 3400, 1000).chapter, 1);
assert.equal(sequenceState(1200, 1200, 3400, 1000).frame, 0);
assert.equal(sequenceState(0, 0, 600, 800).frame, 0);
let previous = -1;
for (let scroll = 0; scroll <= 5000; scroll += 10) {
  const {frame} = sequenceState(scroll, 200, 3400, 1000);
  assert.ok(frame >= previous && frame >= 0 && frame < FRAME_COUNT);
  previous = frame;
}
console.log('Scroll bounds, chapter transitions, resize and monotonic frame progression pass.');
