import test from 'node:test';
import assert from 'node:assert/strict';

// A trivial smoke test to demonstrate Node's built-in test runner.
// This does not depend on project build configuration.

test('math still works', () => {
  assert.equal(2 + 2, 4);
});
