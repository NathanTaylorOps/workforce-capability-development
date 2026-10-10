import { BASE_OBSERVATIONS, FIXTURE_VERSION, PATHWAYS, SKILLS, WEEKLY_CHECKIN } from './data.js';

/** Immutable, deterministic demo state: no real personal records, network or browser storage. */
export function initialState() {
  return {
    version: FIXTURE_VERSION,
    step: 0,
    path: 'site',
    selectedSkill: 'planning',
    observations: BASE_OBSERVATIONS.map(o => ({ ...o })),
    reviews: {},
    training: 'delayed',
    mentoring: 1,
    weekly: { heardEmployee: false, record: null },
    employeeFeedback: 'Interested in growing, but wants supported practice before leading alone.',
    events: [],
    decision: null
  };
}
export function skillById(id) { return SKILLS.find(x => x.id === id); }
export function observationsFor(state, id) { return state.observations.filter(x => x.skill === id); }
export function skillStatus(state, id) {
  const skill = skillById(id);
  if (!skill) throw new Error('Unknown competency');
  const observations = observationsFor(state, id);
  if (observations.length === 0) return 'unknown';
  // A coached observation records development, not independent mastery.
  // New independent records remain provisional until the fictional GM reviews them.
  const verified = observations.filter(o => o.practice === 'independent' && (o.assessment === 'verified' || state.reviews[id] === true)).length;
  return verified >= skill.required ? 'supported' : 'review';
}
export function skillStatusLabel(status) {
  return ({ supported: 'Evidence supports', review: 'Needs review', unknown: 'Unknown' })[status] ?? 'Unknown';
}
export function updateStep(state, index) {
  if (!Number.isInteger(index) || index < 0 || index > 5) return state;
  return { ...state, step: index };
}
export function choosePath(state, id) {
  if (!PATHWAYS[id]) throw new Error('Unknown development pathway');
  if (state.path === id) return state;
  return { ...state, path: id, weekly: { heardEmployee: false, record: null },
    employeeFeedback: 'Considering a different development direction; a fresh two-way check-in is needed.',
    decision: null, events: [...state.events, { type: 'path', detail: PATHWAYS[id].title }] };
}
export function selectSkill(state, id) {
  if (!skillById(id)) throw new Error('Unknown competency');
  return { ...state, selectedSkill: id };
}
/** Limited, pre-authored synthetic practice records. Coaching is required before independent practice. */
export function addSampleObservation(state, id) {
  const skill = skillById(id);
  if (!skill) throw new Error('Unknown competency');
  if (state.mentoring < 2) throw new Error('Record the next fictional mentoring session before simulated independent practice.');
  const existingSamples = observationsFor(state, id).filter(o => o.id.startsWith('sample-')).length;
  if (existingSamples >= skill.samples.length) return state;
  const observation = {
    id: `sample-${id}-${existingSamples + 1}`, skill: id,
    text: skill.samples[existingSamples], source: 'Simulated independent work observation',
    observer: 'Morgan · senior leading hand', phase: 'New practice · fictional',
    practice: 'independent', assessment: 'unreviewed'
  };
  const reviews = { ...state.reviews };
  delete reviews[id];
  return { ...state, observations: [...state.observations, observation], reviews, decision: null,
    events: [...state.events, { type: 'observation', detail: `${skill.name} · independent practice, not yet assessed` }] };
}
/** In this demo, only the fictional GM may record a scoped evidence review. No real access control. */
export function reviewEvidence(state, id, reviewer = 'casey') {
  const skill = skillById(id);
  if (!skill) throw new Error('Unknown competency');
  if (reviewer !== 'casey') throw new Error('Only the fictional authorised GM can record this evidence review.');
  const observations = observationsFor(state, id);
  const independent = observations.filter(o => o.practice === 'independent');
  if (independent.length < skill.required) throw new Error('Insufficient independent work evidence for this illustrative review.');
  if (state.reviews[id]) return state;
  return { ...state, reviews: { ...state.reviews, [id]: true }, decision: null,
    events: [...state.events, { type: 'review', detail: `${skill.name} · fictional GM evidence review` }] };
}
export function rescheduleTraining(state) {
  if (state.training !== 'delayed') return state;
  return { ...state, training: 'rescheduled', decision: null, events: [...state.events, { type: 'support', detail: 'External instruction rescheduled by manager' }] };
}
export function recordMentoring(state) {
  if (state.mentoring >= 2) return state;
  return { ...state, mentoring: state.mentoring + 1, decision: null, events: [...state.events, { type: 'support', detail: 'Mentoring session completed' }] };
}
/** Pre-authored employee input: the manager may listen, but cannot invent or score the response. */
export function hearEmployee(state) {
  if (state.weekly.heardEmployee) return state;
  return { ...state, weekly: { ...state.weekly, heardEmployee: true }, decision: null,
    employeeFeedback: WEEKLY_CHECKIN.employeePerspective,
    events: [...state.events, { type: 'conversation', detail: 'Alex shared a fictional career preference' }] };
}
/** One versioned weekly review per demo run; all outcomes are human-led planning actions. */
export function recordWeeklyReview(state, actionId) {
  const option = WEEKLY_CHECKIN.options.find(item => item.id === actionId);
  if (!option) throw new Error('Unknown review action');
  if (!state.weekly.heardEmployee) throw new Error('Hear the employee perspective before agreeing a review action.');
  if (state.weekly.record) throw new Error('This fictional weekly review has already been recorded. Reset to replay.');
  const record = {
    period: WEEKLY_CHECKIN.period, pathway: PATHWAYS[state.path].title,
    employeePerspective: WEEKLY_CHECKIN.employeePerspective,
    mentorFeedback: WEEKLY_CHECKIN.mentorFeedback,
    indicators: WEEKLY_CHECKIN.observations.map(x => ({ ...x })),
    actionId, action: option.action, owner: option.owner, milestone: option.milestone,
    nextReview: 'Next weekly development check-in (fictional)',
    supportAtReview: { training: state.training, mentoringSessions: state.mentoring },
    authority: 'No new competence, licence or decision authority is granted by this conversation.'
  };
  return { ...state, weekly: { heardEmployee: true, record },
    training: actionId === 'training' ? 'rescheduled' : state.training,
    decision: null, events: [...state.events, { type: 'weekly-review', detail: option.title }] };
}
export function canAssignScopedPlanning(state) {
  return state.path === 'site' && state.weekly.record?.actionId === 'handover' && skillStatus(state, 'planning') === 'supported';
}
export function decisionChoices(state) {
  return [
    { id: 'coach', title: 'Continue supported practice', description: 'Keep coaching in place and reassess the evidence.', available: true },
    { id: 'scope', title: 'Assign a bounded planning task', description: 'GM approves one mentored two-trade look-ahead; no site-supervision authority.', available: canAssignScopedPlanning(state), reason: state.path !== 'site' ? 'Available on the site-coordination pathway.' : !state.weekly.record ? 'First record a two-way weekly development review on Step 3.' : state.weekly.record.actionId !== 'handover' ? 'The agreed weekly action was not coached handover practice; this pathway needs a new agreed practice plan.' : 'Needs two independent planning demonstrations and a fictional GM evidence review; coached notes alone are insufficient.' },
    { id: 'redirect', title: 'Explore a different contribution', description: 'Respect the employee’s preference and compare technical or cross-functional routes.', available: true },
    { id: 'appoint', title: 'Appoint independent site supervisor', description: 'Full authority over the site.', available: false, reason: 'Blocked: safety/authority and people-leadership requirements are not verified. Training or tenure does not override this.' }
  ];
}
export function decide(state, decisionId) {
  const option = decisionChoices(state).find(x => x.id === decisionId);
  if (!option || !option.available) throw new Error('Decision not permitted by scenario safeguards');
  let summary;
  let next;
  let impact;
  if (decisionId === 'scope') {
    summary = 'Approve a supervised two-trade planning assignment, not a site-supervisor appointment.';
    next = 'Casey (GM) approves scope; Morgan observes the work; review after the assignment.';
    impact = 'Illustrative: two weekly mentor hours allocated; one of three available hours remains. Casey retains site accountability.';
  } else if (decisionId === 'redirect') {
    summary = 'Discuss technical-specialist and cross-functional directions without penalising the employee.';
    next = 'Ask Alex to select a preferred direction and agree on the next practical opportunity.';
    impact = 'Current coverage is retained while a revised development assignment is considered.';
  } else {
    summary = 'Continue coached practice; do not expand independent authority yet.';
    next = 'Complete a practice task, obtain the employee’s feedback and review current evidence.';
    impact = 'Existing site responsibilities remain with the authorised managers; mentor time still needs protecting.';
  }
  const record = {
    fixture: state.version,
    pathway: PATHWAYS[state.path].title,
    action: option.title,
    summary, next, impact,
    known: ['Practical trade quality supported by example observations.', 'Commercial awareness supported by example observations.'],
    unknown: SKILLS.filter(s => skillStatus(state, s.id) === 'unknown').map(s => s.name),
    needsReview: SKILLS.filter(s => skillStatus(state, s.id) === 'review').map(s => s.name),
    restricted: 'No independent site-supervision authority established.',
    employeeVoice: state.employeeFeedback,
    weeklyReview: state.weekly.record ? { ...state.weekly.record, indicators: state.weekly.record.indicators.map(x => ({ ...x })) } : null,
    managerSupport: { training: state.training, completedMentoringSessions: state.mentoring },
    evidence: SKILLS.map(s => ({ skill: s.name, status: skillStatus(state, s.id), observations: observationsFor(state, s.id).length, independent: observationsFor(state, s.id).filter(o => o.practice === 'independent').length, managerReviewed: Boolean(state.reviews[s.id]) })),
    synthetic: true
  };
  return { ...state, step: 5, decision: record, events: [...state.events, { type: 'decision', detail: option.title }] };
}
export function supportSummary(state) {
  return { remainingMentorHours: 3 - 2, assignedMentorHours: 2, completedSessions: state.mentoring, training: state.training };
}
export function memoText(record) {
  if (!record) return '';
  return [
    'WORKFORCE CAPABILITY — FICTIONAL MANAGEMENT DECISION',
    `Scenario fixture: ${record.fixture}`,
    `Development pathway: ${record.pathway}`,
    `Chosen action: ${record.action}`,
    `Rationale: ${record.summary}`,
    `Employee perspective: ${record.employeeVoice}`,
    `Weekly review: ${record.weeklyReview ? record.weeklyReview.period + ' — ' + record.weeklyReview.action : 'Not recorded'}`,
    `Mentor feedback: ${record.weeklyReview?.mentorFeedback ?? 'No weekly review recorded'}`,
    `Weekly next milestone: ${record.weeklyReview?.milestone ?? 'Schedule a two-way check-in'}`,
    `Weekly owner: ${record.weeklyReview?.owner ?? 'Not assigned'}`,
    ...(record.weeklyReview?.indicators ?? []).map(x => `KPI context — ${x.label}: ${x.value}. Limitation: ${x.context}`),
    `Unknown evidence: ${record.unknown.join(', ') || 'None recorded'}`,
    `Evidence needing review: ${record.needsReview.join(', ') || 'None recorded'}`,
    'Assessment method: coached notes do not establish independent competence; new observations require fictional GM review.',
    `Authority limit: ${record.restricted}`,
    `Manager support: ${record.managerSupport.completedMentoringSessions}/2 mentoring sessions; external training ${record.managerSupport.training}`,
    `Workforce consequence: ${record.impact}`,
    `Next action: ${record.next}`,
    'This record represents invented scenario choices only. It is not an assessment of a real person or employment advice.'
  ].join('\n');
}
