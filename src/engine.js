import { BASE_OBSERVATIONS, FIXTURE_VERSION, PATHWAYS, SKILLS } from './data.js';

/** Immutable, deterministic demo state: no real personal records, network or browser storage. */
export function initialState() {
  return {
    version: FIXTURE_VERSION,
    step: 0,
    path: 'site',
    selectedSkill: 'planning',
    observations: BASE_OBSERVATIONS.map(o => ({ ...o })),
    training: 'delayed',
    mentoring: 1,
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
  const count = observationsFor(state, id).length;
  if (count === 0) return 'unknown';
  return count >= skill.required ? 'supported' : 'review';
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
  return { ...state, path: id, decision: null, events: [...state.events, { type: 'path', detail: PATHWAYS[id].title }] };
}
export function selectSkill(state, id) {
  if (!skillById(id)) throw new Error('Unknown competency');
  return { ...state, selectedSkill: id };
}
/** A one-time additional, pre-written, fictional observation per competency. */
export function addSampleObservation(state, id) {
  const skill = skillById(id);
  if (!skill) throw new Error('Unknown competency');
  const existing = observationsFor(state, id).length;
  if (existing >= skill.required || existing >= skill.samples.length) return state;
  const sample = skill.samples[existing];
  if (!sample) return state;
  const observation = { id: `sample-${id}-${existing + 1}`, skill: id, text: sample, source: 'Simulated observed practice', observer: 'Morgan · senior leading hand', phase: 'New practice · fictional' };
  return { ...state, observations: [...state.observations, observation], decision: null, events: [...state.events, { type: 'observation', detail: skill.name }] };
}
export function rescheduleTraining(state) {
  if (state.training !== 'delayed') return state;
  return { ...state, training: 'rescheduled', events: [...state.events, { type: 'support', detail: 'External instruction rescheduled by manager' }] };
}
export function recordMentoring(state) {
  if (state.mentoring >= 2) return state;
  return { ...state, mentoring: state.mentoring + 1, events: [...state.events, { type: 'support', detail: 'Mentoring session completed' }] };
}
export function canAssignScopedPlanning(state) {
  return state.path === 'site' && skillStatus(state, 'planning') === 'supported';
}
export function decisionChoices(state) {
  return [
    { id: 'coach', title: 'Continue supported practice', description: 'Keep coaching in place and reassess the evidence.', available: true },
    { id: 'scope', title: 'Assign a bounded planning task', description: 'GM approves one mentored two-trade look-ahead; no site-supervision authority.', available: canAssignScopedPlanning(state), reason: state.path !== 'site' ? 'Available on the site-coordination pathway.' : 'Needs two relevant planning observations before the GM can consider this task.' },
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
    restricted: 'No independent site-supervision authority established.',
    employeeVoice: state.employeeFeedback,
    managerSupport: { training: state.training, completedMentoringSessions: state.mentoring },
    evidence: SKILLS.map(s => ({ skill: s.name, status: skillStatus(state, s.id), observations: observationsFor(state, s.id).length })),
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
    `Unknown evidence: ${record.unknown.join(', ') || 'None recorded'}`,
    `Authority limit: ${record.restricted}`,
    `Manager support: ${record.managerSupport.completedMentoringSessions}/2 mentoring sessions; external training ${record.managerSupport.training}`,
    `Workforce consequence: ${record.impact}`,
    `Next action: ${record.next}`,
    'This record represents invented scenario choices only. It is not an assessment of a real person or employment advice.'
  ].join('\n');
}
