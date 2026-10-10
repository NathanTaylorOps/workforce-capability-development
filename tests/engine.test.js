import test from 'node:test';
import assert from 'node:assert/strict';
import { initialState, skillStatus, choosePath, addSampleObservation, reviewEvidence, decisionChoices, decide, rescheduleTraining, recordMentoring, memoText, supportSummary, selectSkill, updateStep, observationsFor } from '../src/engine.js';

const withMentor = state => recordMentoring(state);
const withPlanningPractice = state => addSampleObservation(addSampleObservation(withMentor(state), 'planning'), 'planning');
const withReviewedPlanning = state => reviewEvidence(withPlanningPractice(state), 'planning');

test('initial state is a deterministic independent synthetic fixture', () => {
  const first = initialState();
  const second = initialState();
  assert.deepEqual(first, second);
  assert.notEqual(first.observations, second.observations);
  assert.notEqual(first.reviews, second.reviews);
  assert.equal(first.decision, null);
});
test('prior independent verified capability counts regardless of title', () => {
  const state = initialState();
  assert.equal(skillStatus(state, 'quality'), 'supported');
  assert.equal(skillStatus(state, 'commercial'), 'supported');
  assert.equal(skillStatus(state, 'planning'), 'review');
  assert.equal(skillStatus(state, 'communication'), 'review');
  assert.equal(skillStatus(state, 'leadership'), 'unknown');
});
test('mentoring is needed before synthetic independent practice', () => {
  const state = initialState();
  assert.throws(() => addSampleObservation(state, 'planning'), /mentoring session/);
  const mentored = withMentor(state);
  assert.equal(mentored.mentoring, 2);
  assert.equal(skillStatus(mentored, 'planning'), 'review');
});
test('coached records and unreviewed work do not establish supported competence', () => {
  const start = withMentor(initialState());
  const once = addSampleObservation(start, 'planning');
  const twice = addSampleObservation(once, 'planning');
  assert.equal(observationsFor(twice, 'planning').length, 3); // one coached + two independent
  assert.equal(skillStatus(start, 'planning'), 'review');
  assert.equal(skillStatus(once, 'planning'), 'review');
  assert.equal(skillStatus(twice, 'planning'), 'review');
  assert.equal(decisionChoices(twice).find(x => x.id === 'scope').available, false);
  assert.throws(() => decide(twice, 'scope'), /not permitted/);
});
test('fictional GM review unlocks only bounded planning task consideration', () => {
  const prepared = withPlanningPractice(initialState());
  assert.throws(() => reviewEvidence(prepared, 'planning', 'morgan'), /authorised GM/);
  const reviewed = reviewEvidence(prepared, 'planning', 'casey');
  assert.equal(skillStatus(reviewed, 'planning'), 'supported');
  assert.equal(reviewEvidence(reviewed, 'planning'), reviewed);
  assert.equal(skillStatus(prepared, 'planning'), 'review');
  assert.equal(decisionChoices(reviewed).find(x => x.id === 'scope').available, true);
  assert.equal(decisionChoices(reviewed).find(x => x.id === 'appoint').available, false);
  assert.throws(() => decide(reviewed, 'appoint'), /not permitted/);
  const assigned = decide(reviewed, 'scope');
  assert.match(assigned.decision.summary, /not a site-supervisor appointment/);
  assert.match(assigned.decision.impact, /Casey retains site accountability/);
  assert.equal(assigned.decision.evidence.find(e => e.skill === 'Planning & sequencing').managerReviewed, true);
});
test('review refuses missing evidence, unknown competency and invalid reviewer', () => {
  assert.throws(() => reviewEvidence(initialState(), 'planning'), /Insufficient independent/);
  assert.throws(() => reviewEvidence(initialState(), 'safety'), /Insufficient independent/);
  assert.throws(() => reviewEvidence(initialState(), 'invalid'), /Unknown competency/);
  assert.throws(() => reviewEvidence(initialState(), 'quality', 'unapproved'), /authorised GM/);
});
test('finite fictional practice cannot manufacture limitless records', () => {
  const prepared = withPlanningPractice(initialState());
  assert.equal(addSampleObservation(prepared, 'planning'), prepared);
  assert.equal(observationsFor(prepared, 'planning').length, 3);
  assert.equal(skillStatus(prepared, 'planning'), 'review');
});
test('unknown requirement remains unknown rather than failure', () => {
  const state = initialState();
  assert.equal(skillStatus(state, 'safety'), 'unknown');
  assert.equal(skillStatus(state, 'leadership'), 'unknown');
  assert.throws(() => skillStatus(state, 'invalid'), /Unknown/);
});
test('alternate pathways respect career choice and never grant supervision', () => {
  for (const id of ['operations', 'specialist']) {
    const state = choosePath(withReviewedPlanning(initialState()), id);
    assert.equal(state.path, id);
    assert.equal(decisionChoices(state).find(x => x.id === 'coach').available, true);
    assert.equal(decisionChoices(state).find(x => x.id === 'scope').available, false);
    assert.equal(decisionChoices(state).find(x => x.id === 'appoint').available, false);
    assert.equal(decide(state, 'redirect').decision.synthetic, true);
  }
});
test('manager training commitments do not alter competence scores', () => {
  const state = initialState();
  const updated = rescheduleTraining(state);
  assert.equal(state.training, 'delayed');
  assert.equal(updated.training, 'rescheduled');
  assert.equal(skillStatus(state, 'planning'), skillStatus(updated, 'planning'));
  assert.equal(rescheduleTraining(updated), updated);
});
test('support changes invalidate a previously captured decision to avoid stale records', () => {
  const a = decide(initialState(), 'coach');
  assert.equal(rescheduleTraining(a).decision, null);
  assert.equal(recordMentoring(a).decision, null);
});
test('mentor time is bounded, independent of competence', () => {
  const a = initialState();
  const b = recordMentoring(a);
  assert.equal(b.mentoring, 2);
  assert.equal(recordMentoring(b), b);
  assert.equal(supportSummary(b).assignedMentorHours, 2);
  assert.equal(supportSummary(b).remainingMentorHours, 1);
  assert.equal(skillStatus(a, 'planning'), skillStatus(b, 'planning'));
});
test('decision memo retains uncertain evidence and fictional provenance', () => {
  const a = decide(initialState(), 'coach');
  const text = memoText(a.decision);
  for (const str of ['FICTIONAL', 'not an assessment of a real person', 'Next action:', 'Authority limit:', 'external training delayed', 'Evidence needing review:']) assert.ok(text.includes(str));
  assert.ok(a.decision.needsReview.includes('Planning & sequencing'));
});
test('actions produce identical results when replayed from initial fixture', () => {
  const make = () => decide(rescheduleTraining(withReviewedPlanning(choosePath(initialState(), 'site'))), 'scope');
  assert.deepEqual(make(), make());
});
test('navigation and invalid inputs handled safely', () => {
  const state = initialState();
  assert.equal(updateStep(state, 8), state);
  assert.equal(updateStep(state, 3).step, 3);
  assert.equal(selectSkill(state, 'commercial').selectedSkill, 'commercial');
  assert.throws(() => choosePath(state, 'invalid'), /Unknown/);
  assert.throws(() => selectSkill(state, 'invalid'), /Unknown/);
  assert.throws(() => decide(state, 'scope'), /not permitted/);
});
