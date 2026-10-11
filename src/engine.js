import { ABSENCE_EVENTS, COVER_REVIEW_OPTIONS, CRITICAL_RESPONSIBILITIES, BASE_OBSERVATIONS, COVERAGE_OPTIONS, SUCCESSION_OPTIONS, ORGANISATION_OPTIONS, ORGANISATION_ROLES, FIXTURE_VERSION, PATHWAYS, SKILLS, WEEKLY_CHECKIN, WORKFORCE_FIXTURE } from './data.js';

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
    coverage: { option: null, confirmed: false },
    succession: { option: null, confirmed: false },
    organisation: { option: null, confirmed: false },
    absence: { event: null },
    coverReview: { taskId: null, candidateId: null },
    employeeFeedback: 'Interested in growing, but wants supported practice before leading alone.',
    events: [],
    decision: null
  };
}
/** Select or clear a purely fictional critical-role absence. Existing evidence is unchanged. */
export function chooseAbsenceEvent(state, eventId) {
  if (eventId !== null && !ABSENCE_EVENTS.some(x => x.id === eventId)) throw new Error('Unknown hypothetical role absence.');
  if (state.absence.event === eventId) return state;
  return { ...state, absence: { event: eventId }, coverReview: { taskId: null, candidateId: null }, decision: null,
    events: [...state.events, { type: 'absence', detail: eventId ?? 'baseline restored' }] };
}
/** Explicit tasks and verified owners, not a generic staffing-health rating. */
export function absenceImpact(state) {
  const event = ABSENCE_EVENTS.find(x => x.id === state.absence.event) ?? null;
  const roles = CRITICAL_RESPONSIBILITIES.map(task => {
    const affected = task.ownerId === event?.id;
    const status = affected ? task.absentStatus : 'covered';
    return {
      id: task.id, role: task.role, title: task.title, owner: task.owner,
      status, affected, scope: affected ? 'Hypothetical availability gap' : 'Unchanged owner in fictional baseline',
      detail: affected ? task.absentDetail : 'Existing fictional role assignment remains in place. This is not a real-time capacity check.',
      accountable: affected ? 'No verified acting owner for this task' : task.owner,
      next: affected ? task.next : 'Maintain normal assignment; validate actual capacity before operational use.'
    };
  });
  return {
    event: event?.id ?? null,
    label: event?.title ?? 'Baseline · no additional role absence',
    explanation: event?.note ?? 'All six fictional responsibilities remain with their named owners; no new availability claim is made.',
    roles,
    covered: roles.filter(x => x.status === 'covered').length,
    partial: roles.filter(x => x.status === 'partial').length,
    uncovered: roles.filter(x => x.status === 'uncovered').length,
    independentSupervisorVerified: false,
    actingManagerVerified: false,
    provisional: true
  };
}
/** Inspect an affected task only; selecting a person never grants authority. */
export function chooseCoverTask(state, taskId) {
  const task = absenceImpact(state).roles.find(x => x.id === taskId && x.affected);
  if (!task) throw new Error('Only responsibilities exposed by the chosen hypothetical absence can be reviewed.');
  if (state.coverReview.taskId === taskId) return state;
  return { ...state, coverReview: {taskId, candidateId:null}, decision:null, events:[...state.events,{type:'cover-task',detail:task.title}] };
}
export function chooseCoverCandidate(state, candidateId) {
  const option = COVER_REVIEW_OPTIONS.find(x => x.taskId === state.coverReview.taskId && x.candidateId === candidateId);
  if (!option || !absenceImpact(state).roles.some(x => x.id === option.taskId && x.affected)) throw new Error('Unknown or inapplicable fictional support candidate.');
  if (state.coverReview.candidateId === candidateId) return state;
  return { ...state, coverReview: {...state.coverReview,candidateId}, decision:null, events:[...state.events,{type:'cover-prospect',detail:option.taskId+': '+candidateId}] };
}
export function coverSuitability(state) {
  const task = absenceImpact(state).roles.find(x => x.id === state.coverReview.taskId && x.affected);
  const options = task ? COVER_REVIEW_OPTIONS.filter(x => x.taskId === task.id) : [];
  const candidate = options.find(x => x.candidateId === state.coverReview.candidateId) ?? null;
  if (!candidate) return {task:task??null,options,selected:null,outcome:'Not assessed',canCover:false};
  const remaining = organisationImpact(state).spareMentorHours;
  const capacityDetail = candidate.candidateId === 'morgan' ? remaining+' of 3 mentoring hours remain unallocated, but zero additional task-duty hours are verified. Mentor time cannot be counted twice.' :
    candidate.candidateId === 'alex' ? 'Alex has 32 hours of assigned field work; no independent estimating cover hours are verified.' :
    candidate.candidateId === 'jordan' ? 'Jordan’s task availability is unverified; coached time cannot be counted as independent role coverage.' :
    'No external candidate, engagement, start date or available hours are established.';
  const preference = candidate.candidateId === 'alex' && state.path === 'operations' ? 'Alex selected a cross-functional learning path; this is not agreement to take on estimating cover.' : candidate.choice;
  return {task,options,selected:candidate,
    evidence:{status:'Incomplete for this duty',detail:candidate.evidence},
    prerequisites:{status:'Unverified',detail:candidate.prerequisite},
    authority:{status:'Not established',detail:candidate.authority},
    capacity:{status:'Not verified',confirmedTaskHours:0,unallocatedMentorHours:remaining,detail:capacityDetail},
    preference,canCover:false,outcome:'No authorised replacement established',
    unresolved:[candidate.evidence,candidate.prerequisite,candidate.authority,capacityDetail],next:candidate.next,provisional:true};
}
function requireGmAvailable(state) {
  if (state.absence.event === 'casey') throw new Error('Casey is unavailable in this hypothetical event; no authorised acting GM is recorded. Restore the baseline before making new GM approvals.');
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
  return { ...state, path: id, weekly: { heardEmployee: false, record: null }, coverage: { option: null, confirmed: false }, succession: { option: null, confirmed: false }, organisation: { option: null, confirmed: false },
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
  requireGmAvailable(state);
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
  requireGmAvailable(state);
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
  requireGmAvailable(state);
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
/** Site coverage is separately planned and approved; competence alone cannot create capacity. */
export function chooseCoveragePlan(state, id) {
  if (state.path !== 'site') throw new Error('This coverage scenario is available on the site coordination pathway.');
  if (!COVERAGE_OPTIONS.some(option => option.id === id)) throw new Error('Unknown workforce coverage option.');
  if (state.coverage.option === id) return state;
  return { ...state, coverage: { option: id, confirmed: false }, organisation: { ...state.organisation, confirmed: false }, decision: null,
    events: [...state.events, { type: 'coverage-choice', detail: id }] };
}
export function confirmCoveragePlan(state) {
  requireGmAvailable(state);
  if (state.path !== 'site' || !state.coverage.option) throw new Error('Select a valid coverage option before confirming the fictional GM review.');
  if (state.coverage.confirmed) return state;
  return { ...state, coverage: { ...state.coverage, confirmed: true }, organisation: { ...state.organisation, confirmed: false }, decision: null,
    events: [...state.events, { type: 'coverage-review', detail: state.coverage.option }] };
}
/** Select a *development or continuity approach*. This never nominates an authorised supervisor. */
export function chooseSuccessionPlan(state, id) {
  if (state.path !== 'site') throw new Error('Succession planning is scoped to the site-coordination scenario.');
  if (!SUCCESSION_OPTIONS.some(option => option.id === id)) throw new Error('Unknown succession continuity option.');
  if (state.succession.option === id) return state;
  return { ...state, succession: { option: id, confirmed: false }, organisation: { ...state.organisation, confirmed: false }, decision: null,
    events: [...state.events, { type: 'succession-choice', detail: id }] };
}
/** Manager sign-off acknowledges a knowledge handover plan, *never* successor competence. */
export function confirmSuccessionPlan(state) {
  requireGmAvailable(state);
  if (state.path !== 'site' || !state.succession.option) throw new Error('Select a succession continuity response first.');
  if (!state.weekly.record) throw new Error('Record a two-way development review before confirming succession follow-through.');
  if (state.succession.confirmed) return state;
  return { ...state, succession: { ...state.succession, confirmed: true }, organisation: { ...state.organisation, confirmed: false }, decision: null,
    events: [...state.events, { type: 'succession-review', detail: state.succession.option }] };
}
/** Explicit unresolved risks remain even when a handover *plan* is recorded. */
export function successionImpact(state) {
  const option = SUCCESSION_OPTIONS.find(item => item.id === state.succession.option);
  const confirmed = Boolean(option && state.succession.confirmed && state.path === 'site');
  return {
    option: option?.id ?? null, confirmed,
    approach: option?.title ?? 'Not selected',
    evidence: option?.evidence ?? 'No successor capability has been assessed.',
    gap: option?.gap ?? 'Continuity and independent site-supervision cover are not yet established.',
    handover: confirmed ? option.handover : 'No GM-reviewed handover response is recorded.',
    next: confirmed ? option.next : 'Choose and review a continuity response before changing responsibilities.',
    accountable: state.absence.event === 'casey' ? 'Casey unavailable · no acting GM verified' : WORKFORCE_FIXTURE.coordinationOwner,
    independentSupervisorReady: false,
    verifiedReplacementAvailable: false,
    risk: confirmed ? 'Handover action planned; independent supervisory succession and readiness remain unresolved.' :
      'No confirmed handover plan; concentrated management knowledge and an unresolved supervisor vacancy remain risks.',
    provisional: true
  };
}

/** Plan cross-role manager and mentor allocation; role authority is never inferred. */
export function chooseOrganisationPlan(state, id) {
  if (state.path !== 'site') throw new Error('The organisational investment scenario is available on the site pathway.');
  if (!ORGANISATION_OPTIONS.some(option => option.id === id)) throw new Error('Unknown organisational allocation.');
  if (state.organisation.option === id) return state;
  return { ...state, organisation: { option: id, confirmed: false }, decision: null,
    events: [...state.events, { type: 'organisation-choice', detail: id }] };
}
export function confirmOrganisationPlan(state) {
  requireGmAvailable(state);
  if (state.path !== 'site' || !ORGANISATION_OPTIONS.some(x => x.id === state.organisation.option)) {
    throw new Error('Choose a valid organisational response before confirmation.');
  }
  if (!state.weekly.record || !state.coverage.confirmed || !state.succession.confirmed) {
    throw new Error('Record the development, field coverage and succession reviews before confirming organisation-wide capacity.');
  }
  if (state.organisation.confirmed) return state;
  return { ...state, organisation: { ...state.organisation, confirmed: true }, decision: null,
    events: [...state.events, { type: 'organisation-review', detail: state.organisation.option }] };
}
/** Transparent synthetic role exposures and hour balance; not a talent or organisational-health score. */
export function organisationImpact(state, action = 'scope') {
  const selected = ORGANISATION_OPTIONS.find(x => x.id === state.organisation.option);
  const confirmed = Boolean(selected && state.organisation.confirmed && state.path === 'site');
  const jordanHour = selected?.id === 'jordan' && confirmed ? 1 : 0;
  const mentorUsed = WORKFORCE_FIXTURE.mentorReservedHours + jordanHour;
  const mentorAvailable = WORKFORCE_FIXTURE.mentorAvailableHours;
  const workforce = workforceImpact(state, action);
  const jordanHandover = state.succession.option === 'jordan' && state.succession.confirmed;
  const jordanCapacityGap = jordanHandover && (!confirmed || selected?.id !== 'jordan');
  const roles = ORGANISATION_ROLES.map(role => {
    if (role.id === 'supervision' && state.absence.event === 'casey') return { ...role, status: 'Unavailable · no acting authority', note: 'Casey is hypothetically unavailable. Morgan can help with technical preparation, not authorised supervision.' };
    if (role.id === 'estimating' && state.absence.event === 'reese') return { ...role, status: 'Unavailable · no verified estimator cover', note: 'Estimating and bid handovers require a suitably assessed replacement; none is shown.' };
    if (role.id === 'supervision') return { ...role, status: 'Single authorised owner', note: 'Casey retains site authority; no independent successor is verified.' };
    if (role.id === 'field') return { ...role, status: workforce.unaddressedHours > 0 ? 'Work coverage unresolved' : workforce.deferredHours > 0 ? 'Replanned, not completed' : workforce.reliefHours > 0 ? 'Provisional relief plan' : 'No reassignment applied', note: workforce.consequence };
    if (role.id === 'mentoring') return { ...role, status: mentorUsed === mentorAvailable ? 'Full weekly allocation' : 'One hour unallocated', note: `${mentorUsed} of ${mentorAvailable} fictional mentor hours allocated. Allocation is not evidence of competence.` };
    return { ...role, status: 'Single documented knowledge owner', note: 'No verified estimating backup exists within this fictional fixture; document the workflow and evaluate cross-training.' };
  });
  const risks = [
    'Site-supervision authority remains concentrated with Casey.',
    ...(state.absence.event ? [`Hypothetical absence: ${absenceImpact(state).label}; ${absenceImpact(state).uncovered} responsibilities uncovered and ${absenceImpact(state).partial} partially supported.`] : []),
    'Estimating and scheduling knowledge remains with one documented owner.',
    ...(jordanCapacityGap ? ['Jordan’s selected handover has no allocated new mentor hour in this fictional week.'] : []),
    ...(mentorUsed === mentorAvailable ? ['No spare Morgan mentoring hour remains for site contingencies.'] : []),
    ...(selected?.id === 'external' ? ['External instruction is only being explored; provider, cost and availability are unverified.'] : []),
    ...(workforce.unaddressedHours > 0 ? ['Four hours of field work lack a confirmed coverage response.'] : [])
  ];
  return {
    option: selected?.id ?? null, confirmed, approach: selected?.title ?? 'Not selected',
    managerAction: selected?.action ?? 'Choose and confirm an organisational response after the other management reviews.',
    mentorAvailableHours: mentorAvailable, alexMentorHours: WORKFORCE_FIXTURE.mentorReservedHours,
    jordanMentorHours: jordanHour, allocatedMentorHours: mentorUsed,
    spareMentorHours: mentorAvailable - mentorUsed,
    jordanCapacityGap, qualifiedSuccessor: false, risks, roles, provisional: true
  };
}
/** Calculates transparent *illustrative* consequences, not a forecast of staffing or finance. */
export function workforceImpact(state, action = 'scope') {
  const applied = action === 'scope' && state.path === 'site' && state.coverage.option !== 'defer';
  const plannedHours = WORKFORCE_FIXTURE.assignedFieldHours;
  const releasedHours = applied ? WORKFORCE_FIXTURE.developmentAssignmentHours : 0;
  const option = state.coverage.option;
  const confirmed = Boolean(state.coverage.confirmed);
  const covered = applied && confirmed && option === 'relief' ? releasedHours : 0;
  const deferred = applied && confirmed && option === 'stage' ? releasedHours : 0;
  const unaddressed = Math.max(0, releasedHours - covered - deferred);
  const consequence = !applied ?
    'No field-work hours reassigned by this decision; any development transition still needs a later capacity check.' :
    option === 'relief' && confirmed ?
      'Four fictional hours assigned to qualified relief, subject to real availability, scope and budget checks. Casey retains site accountability.' :
    option === 'stage' && confirmed ?
      'Four noncritical field-work hours moved to the following week; schedule and dependencies must be confirmed. Casey retains site accountability.' :
      'Four field-work hours would have no agreed coverage. The bounded task must not be assigned yet.';
  return {
    plan: option, confirmed, baselineFieldHours: plannedHours,
    releasedFieldHours: releasedHours, alexFieldHours: plannedHours - releasedHours,
    reliefHours: covered, deferredHours: deferred, unaddressedHours: unaddressed,
    mentorAvailableHours: WORKFORCE_FIXTURE.mentorAvailableHours,
    mentorReservedHours: WORKFORCE_FIXTURE.mentorReservedHours,
    mentorUnallocatedHours: WORKFORCE_FIXTURE.mentorAvailableHours - WORKFORCE_FIXTURE.mentorReservedHours,
    coordinationOwner: WORKFORCE_FIXTURE.coordinationOwner,
    successorStatus: successionImpact(state).risk,
    consequence,
    provisional: true
  };
}
export function canAssignScopedPlanning(state) {
  return state.absence.event !== 'casey' && state.path === 'site' && state.weekly.record?.actionId === 'handover' && skillStatus(state, 'planning') === 'supported' &&
    state.coverage.confirmed && state.succession.confirmed && state.organisation.confirmed &&
    !(state.succession.option === 'jordan' && organisationImpact(state).jordanCapacityGap) && ['stage', 'relief'].includes(state.coverage.option) && workforceImpact(state).unaddressedHours === 0;
}
export function decisionChoices(state) {
  return [
    { id: 'coach', title: 'Continue supported practice', description: 'Keep coaching in place and reassess the evidence.', available: state.absence.event !== 'casey', reason: 'Casey is hypothetically unavailable; no authorised acting GM is identified to approve new management actions.' },
    { id: 'scope', title: 'Assign a bounded planning task', description: 'GM approves one mentored two-trade look-ahead; no site-supervision authority.', available: canAssignScopedPlanning(state), reason: state.absence.event === 'casey' ? 'No authorised acting GM is verified during this hypothetical absence; bounded delegation cannot be approved.' : state.path !== 'site' ? 'Available on the site-coordination pathway.' : !state.weekly.record ? 'First record a two-way weekly development review on Step 3.' : state.weekly.record.actionId !== 'handover' ? 'The agreed weekly action was not coached handover practice; this pathway needs a new agreed practice plan.' : skillStatus(state, 'planning') !== 'supported' ? 'Needs two independent planning demonstrations and a fictional GM evidence review; coached notes alone are insufficient.' : !state.coverage.option ? 'Choose a team coverage response below before releasing Alex from field work.' : state.coverage.option === 'defer' ? 'The team coverage plan defers this assignment. Choose a different plan if the task must proceed now.' : !state.coverage.confirmed ? 'Record the fictional GM coverage review below before committing to the assignment.' : !state.succession.option ? 'Choose a succession and knowledge-handover response before reallocating responsibilities.' : !state.succession.confirmed ? 'Record the fictional GM succession handover review; choosing a potential successor does not grant authority.' : !state.organisation.option ? 'Choose an organisation-wide capacity and mentoring response.' : !state.organisation.confirmed ? 'Confirm the organisation-wide resource response after the coverage and succession reviews.' : state.succession.option === 'jordan' && organisationImpact(state).jordanCapacityGap ? 'The proposed Jordan handover lacks a scheduled mentor hour; allocate suitable support before the handover proceeds.' : 'The workforce and authority requirements must be reviewed.' },
    { id: 'redirect', title: 'Explore a different contribution', description: 'Respect the employee’s preference and compare technical or cross-functional routes.', available: state.absence.event !== 'casey', reason: 'The GM is absent in this hypothetical event. An authorised leader must be identified before new decisions are approved.' },
    { id: 'appoint', title: 'Appoint independent site supervisor', description: 'Full authority over the site.', available: false, reason: 'Blocked: safety/authority and people-leadership requirements are not verified. Training or tenure does not override this.' }
  ];
}
export function decide(state, decisionId) {
  const option = decisionChoices(state).find(x => x.id === decisionId);
  if (!option || !option.available) throw new Error('Decision not permitted by scenario safeguards');
  let summary;
  let next;
  let impact;
  const workforce = workforceImpact(state, decisionId);
  const succession = successionImpact(state);
  const organisation = organisationImpact(state, decisionId);
  if (decisionId === 'scope') {
    summary = 'Approve a supervised two-trade planning assignment, not a site-supervisor appointment.';
    next = 'Casey (GM) approves scope; Morgan observes the work; review after the assignment.';
    impact = workforce.consequence;
  } else if (decisionId === 'redirect') {
    summary = 'Discuss technical-specialist and cross-functional directions without penalising the employee.';
    next = 'Ask Alex to select a preferred direction and agree on the next practical opportunity.';
    impact = workforce.consequence;
  } else {
    summary = 'Continue coached practice; do not expand independent authority yet.';
    next = 'Complete a practice task, obtain the employee’s feedback and review current evidence.';
    impact = workforce.consequence;
  }
  const record = {
    fixture: state.version,
    pathway: PATHWAYS[state.path].title,
    action: option.title,
    summary, next, impact, workforce, succession, organisation, absence: absenceImpact(state), coverReview: coverSuitability(state),
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
    `Workforce plan: ${record.workforce?.plan ?? 'Not selected'}; fictional GM review: ${record.workforce?.confirmed ? 'recorded' : 'not recorded'}`,
    `Assigned field hours: ${record.workforce?.baselineFieldHours ?? 'unknown'}; released: ${record.workforce?.releasedFieldHours ?? 'unknown'}; relief: ${record.workforce?.reliefHours ?? 'unknown'}; deferred: ${record.workforce?.deferredHours ?? 'unknown'}; unaddressed: ${record.workforce?.unaddressedHours ?? 'unknown'}`,
    `Succession approach: ${record.succession?.approach ?? 'Not selected'}; GM handover review: ${record.succession?.confirmed ? 'recorded' : 'not recorded'}`,
    `Succession gap: ${record.succession?.gap ?? 'Not assessed'}`,
    `Handover action: ${record.succession?.handover ?? 'Not assessed'}`,
    `Continuity owner: ${record.succession?.accountable ?? 'Not assigned'}`,
    `Next succession review: ${record.succession?.next ?? 'Not arranged'}`,
    `Succession risk: ${record.succession?.risk ?? 'Not assessed'}`,
    `Succession status: ${record.workforce?.successorStatus ?? 'Not assessed'}`,
    `Organisation-wide response: ${record.organisation?.approach ?? 'Not selected'}; fictional GM review: ${record.organisation?.confirmed ? 'recorded' : 'not recorded'}`,
    `Hypothetical critical-role event: ${record.absence?.label ?? 'No additional absence modelled'}`,
    `Cover prospect: ${record.coverReview?.selected?.name ?? 'None'}; ${record.coverReview?.outcome ?? 'Not assessed'}`, 
    ...(record.coverReview?.selected ? [`Cover duty: ${record.coverReview.task.title}`,`Cover evidence: ${record.coverReview.evidence.detail}`,`Prerequisites: ${record.coverReview.prerequisites.detail}`,`Approval authority: ${record.coverReview.authority.detail}`,`Available hours: ${record.coverReview.capacity.detail}`,`Employee preference: ${record.coverReview.preference}`,`Cover follow-up: ${record.coverReview.next}`] : []),
    'Hypothetical absence only: No real absence, availability, certification, or acting authority has been verified.',
    `Hypothetical exposure: ${record.absence?.covered ?? 'unknown'} covered; ${record.absence?.partial ?? 'unknown'} partially supported; ${record.absence?.uncovered ?? 'unknown'} uncovered`,
    ...(record.absence?.roles ?? []).filter(x => x.affected).map(x => `Exposed responsibility — ${x.title}: ${x.status}; ${x.detail} Next: ${x.next}`),
    `Mentor allocation: ${record.organisation?.allocatedMentorHours ?? 'unknown'}/${record.organisation?.mentorAvailableHours ?? 'unknown'}h; Jordan coaching: ${record.organisation?.jordanMentorHours ?? 'unknown'}h; unallocated: ${record.organisation?.spareMentorHours ?? 'unknown'}h`,
    ...(record.organisation?.roles ?? []).map(x => `Role coverage — ${x.title}: ${x.owner}; status ${x.status}; ${x.note}`),
    ...(record.organisation?.risks ?? []).map(x => `Unresolved organisational dependency: ${x}`),
    `Workforce consequence: ${record.impact}`,
    `Next action: ${record.next}`,
    'This record represents invented scenario choices only. It is not an assessment of a real person or employment advice.'
  ].join('\n');
}