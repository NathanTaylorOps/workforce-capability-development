import test from 'node:test';
import assert from 'node:assert/strict';
import { initialState, hearEmployee, recordWeeklyReview, skillStatus, choosePath, addSampleObservation, reviewEvidence, decisionChoices, decide, rescheduleTraining, recordMentoring, memoText, supportSummary, selectSkill, updateStep, observationsFor } from '../src/engine.js';

const withMentor = state => recordMentoring(state);
const withWeeklyReview = state => recordWeeklyReview(hearEmployee(state), 'handover');
const withPlanningPractice = state => addSampleObservation(addSampleObservation(withMentor(state), 'planning'), 'planning');
const withReviewedPlanning = state => reviewEvidence(withPlanningPractice(withWeeklyReview(state)), 'planning');

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
  const prepared = withPlanningPractice(withWeeklyReview(initialState()));
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

test('two-way review requires employee perspective before management selects a response', () => {
  const state = initialState();
  assert.equal(state.weekly.heardEmployee, false);
  assert.throws(() => recordWeeklyReview(state, 'handover'), /Hear the employee/);
  const heard = hearEmployee(state);
  assert.equal(heard.weekly.heardEmployee, true);
  assert.match(heard.employeeFeedback, /estimating/);
  assert.equal(heard.weekly.record, null);
  assert.equal(hearEmployee(heard), heard);
  assert.equal(skillStatus(heard, 'planning'), 'review');
});

test('hybrid check-in stores KPI context and leading-hand feedback without granting competence', () => {
  const before = initialState();
  const review = withWeeklyReview(before);
  assert.equal(before.weekly.record, null);
  assert.equal(review.weekly.record.actionId, 'handover');
  assert.equal(review.weekly.record.indicators.length, 2);
  assert.match(review.weekly.record.mentorFeedback, /material dependency/);
  assert.match(review.weekly.record.owner, /Casey/);
  assert.match(review.weekly.record.nextReview, /Next weekly/);
  assert.match(review.weekly.record.authority, /No new competence/);
  assert.equal(skillStatus(before, 'planning'), skillStatus(review, 'planning'));
  assert.equal(review.mentoring, 1);
  assert.equal(review.training, 'delayed');
  assert.throws(() => recordWeeklyReview(review, 'handover'), /already been recorded/);
});

test('different follow-up choices respect employee goals and manager obligations', () => {
  const ready = hearEmployee(initialState());
  const training = recordWeeklyReview(ready, 'training');
  assert.equal(training.training, 'rescheduled');
  assert.equal(training.weekly.record.supportAtReview.training, 'delayed');
  assert.equal(training.mentoring, 1);
  assert.equal(skillStatus(training, 'planning'), 'review');
  const alternate = recordWeeklyReview(ready, 'explore');
  assert.match(alternate.weekly.record.action, /observe an estimating review/);
  assert.equal(alternate.path, 'site'); // manager cannot force an employee's role choice
  assert.throws(() => recordWeeklyReview(ready, 'unknown'), /Unknown review action/);
});

test('scoped planning requires both evidence verification and a two-way review', () => {
  const evidenceOnly = reviewEvidence(withPlanningPractice(initialState()), 'planning');
  assert.equal(skillStatus(evidenceOnly, 'planning'), 'supported');
  assert.equal(decisionChoices(evidenceOnly).find(x => x.id === 'scope').available, false);
  assert.match(decisionChoices(evidenceOnly).find(x => x.id === 'scope').reason, /two-way weekly/);
  const reviewed = withWeeklyReview(evidenceOnly);
  assert.equal(decisionChoices(reviewed).find(x => x.id === 'scope').available, true);
  assert.equal(decisionChoices(reviewed).find(x => x.id === 'appoint').available, false);
});

test('a weekly commitment unrelated to planning cannot unlock scoped coordination', () => {
  const evidence = reviewEvidence(withPlanningPractice(initialState()), 'planning');
  for (const action of ['training', 'explore']) {
    const other = recordWeeklyReview(hearEmployee(evidence), action);
    assert.equal(decisionChoices(other).find(x => x.id === 'scope').available, false);
    assert.match(decisionChoices(other).find(x => x.id === 'scope').reason, /was not coached handover/);
  }
});

test('changing development direction requires a fresh check-in and preserves work evidence', () => {
  const reviewed = withWeeklyReview(initialState());
  const newPath = choosePath(reviewed, 'operations');
  assert.equal(newPath.weekly.heardEmployee, false);
  assert.equal(newPath.weekly.record, null);
  assert.match(newPath.employeeFeedback, /fresh two-way/);
  assert.equal(newPath.observations.length, reviewed.observations.length);
  assert.equal(choosePath(reviewed, 'site'), reviewed);
});

test('weekly review is represented in the exported decision memo with limits on KPI interpretation', () => {
  const decided = decide(withWeeklyReview(initialState()), 'coach');
  assert.ok(decided.decision.weeklyReview);
  assert.equal(decided.decision.weeklyReview.indicators.length, 2);
  const memo = memoText(decided.decision);
  for (const term of ['Weekly review:', 'Mentor feedback:', 'Weekly owner:', 'KPI context', 'Limitation:']) {
    assert.ok(memo.includes(term), `missing ${term}`);
  }
  assert.match(memo, /Two accepted handovers/);
  assert.match(memo, /not proof of supervisory readiness/);
  assert.equal(decide(initialState(), 'coach').decision.weeklyReview, null);
});

test('conducting a check-in invalidates older simulated management decisions', () => {
  const decided = decide(initialState(), 'coach');
  const heard = hearEmployee(decided);
  assert.equal(heard.decision, null);
  const next = recordWeeklyReview(heard, 'handover');
  assert.equal(next.decision, null);
  assert.deepEqual(withWeeklyReview(initialState()), withWeeklyReview(initialState()));
});
