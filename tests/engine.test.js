import test from 'node:test';
import assert from 'node:assert/strict';
import { initialState, skillStatus, choosePath, addSampleObservation, decisionChoices, decide, rescheduleTraining, recordMentoring, memoText, supportSummary, selectSkill, updateStep } from '../src/engine.js';

test('fictional fixture is deterministic and distinct from exported mutated state', () => {
  const a = initialState();
  const b = initialState();
  assert.deepEqual(a, b);
  assert.notEqual(a.observations, b.observations);
  assert.equal(a.decision, null);
});
test('prior capability counts independent of a job title', () => {
  const state = initialState();
  assert.equal(skillStatus(state, 'quality'), 'supported');
  assert.equal(skillStatus(state, 'commercial'), 'supported');
  assert.equal(skillStatus(state, 'planning'), 'review');
  assert.equal(skillStatus(state, 'leadership'), 'unknown');
});
test('one simulated planning observation allows only narrowly scoped consideration', () => {
  const original = initialState();
  assert.equal(decisionChoices(original).find(x => x.id === 'scope').available, false);
  const changed = addSampleObservation(original, 'planning');
  assert.equal(skillStatus(changed, 'planning'), 'supported');
  assert.equal(skillStatus(original, 'planning'), 'review');
  assert.equal(decisionChoices(changed).find(x => x.id === 'scope').available, true);
  assert.equal(decisionChoices(changed).find(x => x.id === 'appoint').available, false);
  assert.throws(() => decide(changed, 'appoint'), /not permitted/);
  const assigned = decide(changed, 'scope');
  assert.match(assigned.decision.summary, /not a site-supervisor appointment/);
  assert.match(assigned.decision.impact, /Casey retains site accountability/);
});
test('cannot fabricate limitless observations', () => {
  let a = initialState();
  a = addSampleObservation(a, 'planning');
  const b = addSampleObservation(a, 'planning');
  assert.equal(b, a);
  assert.equal(a.observations.filter(o => o.skill === 'planning').length, 2);
});
test('missing evidence remains unknown, never penalised', () => {
  const a = initialState();
  assert.equal(skillStatus(a, 'safety'), 'unknown');
  assert.equal(skillStatus(a, 'leadership'), 'unknown');
  assert.throws(() => skillStatus(a, 'not-a-skill'), /Unknown/);
});
test('employee can choose lateral and technical paths without blocked promotion framing', () => {
  for (const id of ['operations', 'specialist']) {
    const a = choosePath(initialState(), id);
    assert.equal(a.path, id);
    assert.equal(decisionChoices(a).find(x => x.id === 'coach').available, true);
    assert.equal(decisionChoices(a).find(x => x.id === 'appoint').available, false);
    assert.equal(decide(a, 'redirect').decision.synthetic, true);
    assert.equal(decisionChoices(a).find(x => x.id === 'scope').available, false);
  }
});
test('missed company training is visible and manager rescheduling is not a worker rating', () => {
  const a = initialState();
  assert.equal(a.training, 'delayed');
  const b = rescheduleTraining(a);
  assert.equal(b.training, 'rescheduled');
  assert.equal(a.training, 'delayed');
  assert.equal(skillStatus(a, 'planning'), skillStatus(b, 'planning'));
  assert.equal(rescheduleTraining(b), b);
});
test('mentor session bounded by scenario and time accounting is explicit', () => {
  const a = initialState();
  const b = recordMentoring(a);
  assert.equal(b.mentoring, 2);
  assert.equal(recordMentoring(b), b);
  assert.equal(supportSummary(b).assignedMentorHours, 2);
  assert.equal(supportSummary(b).remainingMentorHours, 1);
});
test('decision memo labels fiction, support, limits and a next step', () => {
  const a = decide(initialState(), 'coach');
  const text = memoText(a.decision);
  for (const str of ['FICTIONAL', 'not an assessment of a real person', 'Next action:', 'Authority limit:', 'external training delayed']) assert.ok(text.includes(str));
});
test('same actions produce identical results after reset', () => {
  const make = () => decide(rescheduleTraining(addSampleObservation(choosePath(initialState(), 'site'), 'planning')), 'scope');
  assert.deepEqual(make(), make());
});
test('state navigation and invalid inputs handled safely', () => {
  const a = initialState();
  assert.equal(updateStep(a, 8), a);
  assert.equal(updateStep(a, 3).step, 3);
  assert.equal(selectSkill(a, 'commercial').selectedSkill, 'commercial');
  assert.throws(() => choosePath(a, 'invalid'), /Unknown/);
  assert.throws(() => selectSkill(a, 'invalid'), /Unknown/);
  assert.throws(() => decide(a, 'scope'), /not permitted/);
});
