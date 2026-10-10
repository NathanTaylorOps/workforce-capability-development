import test from 'node:test';
import assert from 'node:assert/strict';
import { initialState, hearEmployee, recordWeeklyReview, skillStatus, chooseCoveragePlan, confirmCoveragePlan, chooseSuccessionPlan, confirmSuccessionPlan, successionImpact, workforceImpact, choosePath, addSampleObservation, reviewEvidence, decisionChoices, decide, rescheduleTraining, recordMentoring, memoText, supportSummary, selectSkill, updateStep, observationsFor } from '../src/engine.js';

const withMentor = state => recordMentoring(state);
const withWeeklyReview = state => recordWeeklyReview(hearEmployee(state), 'handover');
const withContinuity = (state, option = 'jordan') => confirmSuccessionPlan(chooseSuccessionPlan(state, option));
const withCoverage = (state, option = 'stage') => withContinuity(confirmCoveragePlan(chooseCoveragePlan(state, option)));
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
  assert.equal(decisionChoices(reviewed).find(x => x.id === 'scope').available, false);
  assert.match(decisionChoices(reviewed).find(x => x.id === 'scope').reason, /coverage response/);
  const covered = withCoverage(reviewed);
  assert.equal(decisionChoices(covered).find(x => x.id === 'scope').available, true);
  assert.equal(decisionChoices(reviewed).find(x => x.id === 'appoint').available, false);
  assert.throws(() => decide(reviewed, 'appoint'), /not permitted/);
  const assigned = decide(covered, 'scope');
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
  const make = () => decide(rescheduleTraining(withCoverage(withReviewedPlanning(choosePath(initialState(), 'site')))), 'scope');
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
  assert.equal(decisionChoices(reviewed).find(x => x.id === 'scope').available, false);
  assert.equal(decisionChoices(withCoverage(reviewed)).find(x => x.id === 'scope').available, true);
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


test('field coverage choice is a separate prerequisite from competence and weekly coaching', () => {
  const reviewed = withReviewedPlanning(initialState());
  assert.equal(reviewed.coverage.option, null);
  assert.equal(decisionChoices(reviewed).find(x => x.id === 'scope').available, false);
  assert.throws(() => confirmCoveragePlan(reviewed), /Select a valid/);
  const selected = chooseCoveragePlan(reviewed, 'stage');
  assert.equal(selected.coverage.confirmed, false);
  assert.equal(decisionChoices(selected).find(x => x.id === 'scope').available, false);
  assert.match(decisionChoices(selected).find(x => x.id === 'scope').reason, /GM coverage review/);
  const ready = confirmCoveragePlan(selected);
  assert.equal(decisionChoices(ready).find(x => x.id === 'scope').available, false);
  assert.match(decisionChoices(ready).find(x => x.id === 'scope').reason, /succession and knowledge-handover/);
  assert.equal(decisionChoices(withContinuity(ready)).find(x => x.id === 'scope').available, true);
  assert.equal(confirmCoveragePlan(ready), ready);
  assert.throws(() => decide(selected, 'scope'), /not permitted/);
});

test('staged reassignment explicitly moves work instead of counting it as eliminated', () => {
  const planned = withCoverage(withReviewedPlanning(initialState()), 'stage');
  const impact = workforceImpact(planned);
  assert.equal(impact.baselineFieldHours, 32);
  assert.equal(impact.releasedFieldHours, 4);
  assert.equal(impact.alexFieldHours, 28);
  assert.equal(impact.deferredHours, 4);
  assert.equal(impact.reliefHours, 0);
  assert.equal(impact.unaddressedHours, 0);
  assert.equal(impact.mentorUnallocatedHours, 1);
  assert.match(impact.successorStatus, /independent supervisory succession/);
  const decision = decide(planned, 'scope');
  assert.equal(decision.decision.workforce.deferredHours, 4);
  assert.match(memoText(decision.decision), /Assigned field hours: 32; released: 4/);
  assert.match(memoText(decision.decision), /Succession status/);
});

test('qualified-relief option is an assumed scenario capacity, not real staffing verification', () => {
  const planned = withCoverage(withReviewedPlanning(initialState()), 'relief');
  const impact = workforceImpact(planned);
  assert.equal(impact.reliefHours, 4);
  assert.equal(impact.deferredHours, 0);
  assert.equal(impact.unaddressedHours, 0);
  assert.equal(impact.provisional, true);
  assert.match(impact.consequence, /real availability, scope and budget checks/);
});

test('deferring transition protects delivery and does not unlock the assignment', () => {
  const planned = withCoverage(withReviewedPlanning(initialState()), 'defer');
  const impact = workforceImpact(planned);
  assert.equal(impact.alexFieldHours, 32);
  assert.equal(impact.releasedFieldHours, 0);
  assert.equal(impact.unaddressedHours, 0);
  assert.equal(decisionChoices(planned).find(x => x.id === 'scope').available, false);
  assert.match(decisionChoices(planned).find(x => x.id === 'scope').reason, /defers this assignment/);
  const coaching = decide(planned, 'coach');
  assert.equal(coaching.decision.workforce.alexFieldHours, 32);
  assert.equal(coaching.decision.workforce.releasedFieldHours, 0);
});

test('changing a coverage decision clears confirmation and any previous decision', () => {
  const staged = withCoverage(withReviewedPlanning(initialState()), 'stage');
  const assigned = decide(staged, 'scope');
  const revised = chooseCoveragePlan(assigned, 'relief');
  assert.equal(revised.decision, null);
  assert.equal(revised.coverage.confirmed, false);
  assert.equal(decisionChoices(revised).find(x => x.id === 'scope').available, false);
  assert.equal(chooseCoveragePlan(revised, 'relief'), revised);
  assert.equal(decisionChoices(confirmCoveragePlan(revised)).find(x => x.id === 'scope').available, true);
});

test('alternative career direction resets coverage without erasing genuine work evidence', () => {
  const original = withCoverage(withReviewedPlanning(initialState()));
  const changed = choosePath(original, 'operations');
  assert.equal(changed.coverage.option, null);
  assert.equal(changed.coverage.confirmed, false);
  assert.equal(changed.observations.length, original.observations.length);
  assert.equal(decisionChoices(changed).find(x => x.id === 'scope').available, false);
  assert.throws(() => chooseCoveragePlan(changed, 'stage'), /site coordination pathway/);
});

test('invalid workforce options never become available or fabricate approved cover', () => {
  assert.throws(() => chooseCoveragePlan(initialState(), 'free-staff'), /Unknown workforce coverage/);
  const state = initialState();
  assert.equal(workforceImpact(state).unaddressedHours, 4);
  assert.equal(workforceImpact(state, 'coach').releasedFieldHours, 0);
  assert.equal(workforceImpact(state, 'redirect').releasedFieldHours, 0);
  assert.equal(decisionChoices(state).find(x => x.id === 'appoint').available, false);
});

test('succession planning starts unknown and never establishes a certified replacement', () => {
  const s = initialState();
  const impact = successionImpact(s);
  assert.equal(s.succession.option, null);
  assert.equal(impact.confirmed, false);
  assert.equal(impact.independentSupervisorReady, false);
  assert.equal(impact.verifiedReplacementAvailable, false);
  assert.match(impact.risk, /management knowledge/);
  assert.throws(() => confirmSuccessionPlan(s), /Select a succession/);
});

test('internal and external succession strategies preserve unresolved qualification and availability risk', () => {
  const reviewed = withWeeklyReview(initialState());
  for (const id of ['jordan', 'morgan', 'external']) {
    const planned = confirmSuccessionPlan(chooseSuccessionPlan(reviewed, id));
    const result = successionImpact(planned);
    assert.equal(result.option, id);
    assert.equal(result.confirmed, true);
    assert.equal(result.independentSupervisorReady, false);
    assert.equal(result.verifiedReplacementAvailable, false);
    assert.match(result.risk, /remain unresolved/);
    assert.ok(result.handover.length > 40);
    assert.equal(result.accountable, 'Casey · GM');
  }
});

test('planning a handover without employee development review cannot authorise even a bounded task', () => {
  const state = withReviewedPlanning(initialState());
  const planned = chooseSuccessionPlan(state, 'jordan');
  assert.equal(planned.succession.confirmed, false);
  const changed = confirmSuccessionPlan(planned);
  assert.equal(changed.succession.confirmed, true);
  assert.equal(decisionChoices(changed).find(x=>x.id==='scope').available,false); // field coverage still required
  const initial = chooseSuccessionPlan(initialState(), 'jordan');
  assert.throws(() => confirmSuccessionPlan(initial), /two-way development review/);
});

test('succession confirmation and coverage must be separately recorded before scoped practice', () => {
  const evidence = withReviewedPlanning(initialState());
  const covered = confirmCoveragePlan(chooseCoveragePlan(evidence, 'stage'));
  assert.match(decisionChoices(covered).find(x => x.id === 'scope').reason, /succession and knowledge-handover/);
  const nominated = chooseSuccessionPlan(covered, 'jordan');
  assert.match(decisionChoices(nominated).find(x => x.id === 'scope').reason, /GM succession handover review/);
  assert.throws(() => decide(nominated, 'scope'), /not permitted/);
  const confirmed = confirmSuccessionPlan(nominated);
  assert.equal(decisionChoices(confirmed).find(x => x.id === 'scope').available, true);
  assert.equal(decisionChoices(confirmed).find(x => x.id === 'appoint').available, false);
});

test('changing a succession approach invalidates its previous sign-off and management decision', () => {
  const state = withCoverage(withReviewedPlanning(initialState()));
  const decided = decide(state, 'scope');
  const changed = chooseSuccessionPlan(decided, 'external');
  assert.equal(changed.succession.option, 'external');
  assert.equal(changed.succession.confirmed, false);
  assert.equal(changed.decision, null);
  assert.equal(decisionChoices(changed).find(x=>x.id==='scope').available,false);
  assert.equal(chooseSuccessionPlan(changed, 'external'), changed);
  assert.equal(decisionChoices(confirmSuccessionPlan(changed)).find(x=>x.id==='scope').available,true);
});

test('invalid succession choices cannot create phantom candidates or role permissions', () => {
  assert.throws(() => chooseSuccessionPlan(initialState(), 'phantom'), /Unknown succession/);
  const alternate = choosePath(initialState(), 'specialist');
  assert.throws(() => chooseSuccessionPlan(alternate, 'jordan'), /site-coordination/);
  assert.throws(() => confirmSuccessionPlan(alternate), /Select a succession/);
});

test('switching pathways clears succession decisions and preserves actual observations', () => {
  const old = withCoverage(withReviewedPlanning(initialState()));
  const changed = choosePath(old, 'operations');
  assert.deepEqual(changed.succession, { option: null, confirmed: false });
  assert.equal(changed.coverage.option, null);
  assert.equal(changed.observations.length, old.observations.length);
});

test('succession choice and handover risks appear in decision export without implying readiness', () => {
  const state = withCoverage(withReviewedPlanning(initialState()));
  const decided = decide(state, 'scope');
  assert.equal(decided.decision.succession.approach, 'Develop Jordan as a possible successor');
  assert.equal(decided.decision.succession.independentSupervisorReady, false);
  assert.equal(decided.decision.succession.confirmed, true);
  const memo = memoText(decided.decision);
  for (const term of ['Succession approach:', 'Handover action:', 'Continuity owner:', 'Succession risk:', 'Next succession review:']) {
    assert.ok(memo.includes(term), `Missing ${term}`);
  }
  assert.match(memo, /independent supervisory succession and readiness remain unresolved/);
  assert.deepEqual(decide(withCoverage(withReviewedPlanning(initialState())), 'scope'), decided);
});
