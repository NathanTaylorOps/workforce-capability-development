import assert from 'node:assert/strict';
import test from 'node:test';
import { overview } from '../src/overview.js';

test('overview explains the fictional management case and provides two entry points', () => {
  const html = overview();
  assert.match(html,/HAWTHORN PROJECTS \/ FICTIONAL OPERATING CASE/);
  assert.match(html,/Develop capability without leaving the work exposed/);
  assert.equal((html.match(/data-action="enter-scenario"/g) ?? []).length,2);
  assert.equal((html.match(/id="page-title"/g) ?? []).length,1);
  assert.equal((html.match(/class="overview-principle"/g) ?? []).length,3);
  assert.match(html,/3 hours \/ week/);
  assert.match(html,/4 hours/);
  assert.match(html,/does not contain real employee records/);
  assert.doesNotMatch(html,/recruiter|job.search|apply for a role/i);
});
