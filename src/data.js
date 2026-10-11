/** All organisations, characters, observations, costs and outcomes below are fictional. */
export const FIXTURE_VERSION = '2026-10-demo-6';
export const SCENARIO_NAME = 'Hawthorn Projects';
export const STEPS = [
  { id: 'brief', title: 'The situation', short: 'Brief' },
  { id: 'pathway', title: 'Choose a direction', short: 'Pathway' },
  { id: 'plan', title: 'Build the plan', short: 'Plan' },
  { id: 'evidence', title: 'Review the evidence', short: 'Evidence' },
  { id: 'decision', title: 'Make a decision', short: 'Decision' },
  { id: 'outcome', title: 'Review the outcome', short: 'Outcome' }
];
export const PATHWAYS = {
  site: { id: 'site', tag: 'Leadership', title: 'Site coordination', subtitle: 'Develop responsibility for people, workflow and safe decisions.', role: 'Site supervisor', focus: ['planning', 'communication', 'safety', 'leadership'], supports: 'Guided planning, coached handovers and supervisor observation.', consequence: 'Requires cover for field work and time from an experienced mentor.' },
  specialist: { id: 'specialist', tag: 'Technical', title: 'Technical specialist', subtitle: 'Deepen craft capability and become a source of practical expertise.', role: 'Technical specialist', focus: ['quality', 'commercial'], supports: 'Manufacturer-led learning and practical quality mentoring.', consequence: 'Preserves strong production capability while allocating learning time.' },
  operations: { id: 'operations', tag: 'Cross-functional', title: 'Estimating & scheduling', subtitle: 'Build on site experience to strengthen planning and commercial delivery.', role: 'Project coordinator', focus: ['planning', 'commercial', 'communication'], supports: 'Exposure to estimating reviews and a small scheduling assignment.', consequence: 'Creates new planning coverage but requires backfilling some site tasks.' }
};
export const SKILLS = [
  { id: 'quality', name: 'Practical quality', tag: 'Technical', required: 2, description: 'Produces accepted work and identifies avoidable defects before handover.', samples: ['Observed accurate installation and corrected an emerging defect.', 'Verified clean handover following independent quality checks.'] },
  { id: 'planning', name: 'Planning & sequencing', tag: 'Operations', required: 2, description: 'Builds a workable short-term plan, with dependencies and available resources.', samples: ['Prepared a two-trade look-ahead independently with the site supervisor observing.', 'Independently replanned a work sequence around a supplier delay and flagged dependencies.'] },
  { id: 'communication', name: 'Communication & handover', tag: 'People', required: 2, description: 'Communicates expectations and confirms shared understanding.', samples: ['Independently delivered a documented pre-start handover.', 'Independently identified and escalated conflicting instructions.'] },
  { id: 'safety', name: 'Site safety & authority', tag: 'Safety', required: 2, description: 'Recognises hazards and understands the limits of safety-critical authority.', samples: ['Identified a site access hazard during an observed walk-through.'] },
  { id: 'commercial', name: 'Commercial awareness', tag: 'Operations', required: 2, description: 'Understands how lost time, rework, variations and quantities affect delivery.', samples: ['Flagged cost exposure created by an avoidable return visit.', 'Explained the impact of changed quantities to the estimating team.'] },
  { id: 'leadership', name: 'Leading people', tag: 'People', required: 2, description: 'Supports colleagues, addresses issues respectfully and follows through.', samples: ['Ran a coached crew briefing with clear actions and support.'] }
];
// Fictional, pre-authored observations. No ability to upload or store real personal data.
export const BASE_OBSERVATIONS = [
  { id: 'q1', skill: 'quality', text: 'Accurate installation, defects spotted before inspection.', source: 'Direct observation', observer: 'Morgan · senior leading hand', phase: 'Earlier work', practice: 'independent', assessment: 'verified' },
  { id: 'q2', skill: 'quality', text: 'Clean quality handover on a second type of job.', source: 'Work sample', observer: 'Casey · GM', phase: 'Earlier work', practice: 'independent', assessment: 'verified' },
  { id: 'p1', skill: 'planning', text: 'Helped prepare a two-day materials and labour plan.', source: 'Coached observation', observer: 'Morgan · senior leading hand', phase: 'Earlier work', practice: 'coached', assessment: 'unreviewed' },
  { id: 'c1', skill: 'communication', text: 'Provided a clear trade handover with mentor support.', source: 'Coached observation', observer: 'Morgan · senior leading hand', phase: 'Earlier work', practice: 'coached', assessment: 'unreviewed' },
  { id: 'm1', skill: 'commercial', text: 'Flagged rework and time implications of a late variation.', source: 'Work sample', observer: 'Casey · GM', phase: 'Earlier work', practice: 'independent', assessment: 'verified' },
  { id: 'm2', skill: 'commercial', text: 'Reviewed quantity changes with the estimator.', source: 'Cross-functional observation', observer: 'Estimating mentor', phase: 'Earlier work', practice: 'independent', assessment: 'verified' }
];
/** Fictional, qualitative weekly-development review: no employee ranking or real KPIs. */
export const WEEKLY_CHECKIN = {
  period: 'Illustrative week 2',
  manager: 'Casey · GM',
  employee: 'Alex · field operative',
  observations: [
    { label: 'Quality / rework', value: 'Two accepted handovers', context: 'A useful quality signal, not proof of supervisory readiness or causation.' },
    { label: 'Work planning', value: 'One coached look-ahead', context: 'Mentor-supported scheduling; independent planning is still under assessment.' }
  ],
  mentorFeedback: 'Morgan observed good trade preparation and early identification of a material dependency. Alex still needs coached experience coordinating handovers.',
  employeePerspective: 'I want to practise running a handover with Morgan nearby. I am also interested in learning how estimating works.',
  options: [
    { id: 'handover', title: 'Agree a coached handover', action: 'Morgan and Alex will run a supervised two-trade handover.', owner: 'Casey to protect mentor time; Morgan to observe.', milestone: 'Observe instructions, escalation and next-day follow-through.' },
    { id: 'training', title: 'Repair the training commitment', action: 'Casey will rebook the company-funded external instruction.', owner: 'Casey to confirm the new training arrangement.', milestone: 'Review the instruction plan and later practical application.' },
    { id: 'explore', title: 'Explore estimating alongside site work', action: 'Alex will observe an estimating review before committing to a pathway change.', owner: 'Casey to arrange a short estimating-team introduction.', milestone: 'Ask Alex what was learned and whether this direction fits.' }
  ]
};
/** Explicit teaching assumptions; hours are assigned work in one fictional week, not a complete staffing model. */
export const WORKFORCE_FIXTURE = Object.freeze({
  assignedFieldHours: 32,
  developmentAssignmentHours: 4,
  mentorAvailableHours: 3,
  mentorReservedHours: 2,
  coordinationOwner: 'Casey · GM',
  projects: 2
});
export const COVERAGE_OPTIONS = [
  { id: 'stage', title: 'Stage the transition', summary: 'Resequence four noncritical field-work hours into the following week.', caveat: 'Casey must verify project dependencies and communicate the revised sequence before action.' },
  { id: 'relief', title: 'Arrange qualified cover', summary: 'Identify four hours of suitable relief capacity for Alex’s field responsibilities.', caveat: 'Casey must check availability, work scope, qualifications and budget before releasing Alex.' },
  { id: 'defer', title: 'Protect delivery; develop later', summary: 'Keep Alex on the existing field plan this week and revisit the development assignment.', caveat: 'Preserves current allocation; no planning-task delegation can occur this week.' }
];
/** Fictional choices for *planning* succession, not certifying a successor or making an appointment. */
export const SUCCESSION_OPTIONS = [
  { id: 'jordan', title: 'Develop Jordan as a possible successor', category: 'Internal pathway',
    evidence: 'Jordan has expressed interest and contributed to a coached handover; independent site-leadership evidence is incomplete.',
    gap: 'Observe additional coordination and safety-critical work; verify required authority before any appointment.',
    handover: 'Jordan shadows a defined trade handover while Casey retains responsibility and Morgan observes within available time.',
    next: 'Casey checks Jordan’s interest and evidence at the next weekly review.' },
  { id: 'morgan', title: 'Share technical knowledge with Morgan', category: 'Specialist continuity',
    evidence: 'Morgan is a senior leading hand who mentors practical site work; independent supervision authority is not established.',
    gap: 'Mentor time is already committed; technical depth is not evidence of independent site-supervision readiness.',
    handover: 'Casey and Morgan document sequencing, quality checks and escalation contacts without adding unbudgeted mentoring hours.',
    next: 'Casey reviews knowledge concentration and Morgan’s available capacity before allocating more work.' },
  { id: 'external', title: 'Prepare an external supervision search', category: 'Recruitment option',
    evidence: 'No available, qualified external person has been verified in this fictional scenario.',
    gap: 'Availability, credentials, cost, fit and employment conditions must be checked before assigning work.',
    handover: 'Casey creates a role-specific handover brief and maintains site accountability while suitable candidates are evaluated.',
    next: 'Casey reviews the recruiting brief and verifies any real candidate before making an offer.' }
];

/** Completely fictional role coverage and organisational response options, not employee ratings. */
export const ORGANISATION_ROLES = Object.freeze([
  { id: 'supervision', title: 'Site supervision', owner: 'Casey · GM', dependency: 'Casey remains the sole verified authority in this teaching fixture.', next: 'Develop a suitable deputy or verify independent supervisory cover.' },
  { id: 'field', title: 'Field delivery', owner: 'Alex · field operative', dependency: 'Four hours of field work may be displaced by development practice.', next: 'Arrange approved relief or reschedule the affected work.' },
  { id: 'mentoring', title: 'Technical quality & mentoring', owner: 'Morgan · leading hand', dependency: 'One experienced mentor covers trade coaching and quality knowledge.', next: 'Protect mentor time and share practical methods without assuming management readiness.' },
  { id: 'estimating', title: 'Estimating & scheduling', owner: 'Reese · estimator', dependency: 'Only Reese is shown as holding current estimating workflow knowledge.', next: 'Document the bid-to-schedule handover and assess cross-training options.' }
]);
export const ORGANISATION_OPTIONS = Object.freeze([
  { id: 'reserve', title: 'Keep an hour for site contingencies', subtitle: 'Protect the remaining one hour of Morgan’s capacity; Jordan’s extra coached handover would need another arrangement.', action: 'Casey to plan a later supervised learning slot for Jordan.' },
  { id: 'jordan', title: 'Coach Jordan for one additional hour', subtitle: 'Allocate Morgan’s last hour to Jordan, taking mentor demand to 3 of 3 hours. No verified successor results.', action: 'Casey to agree a one-hour coached task with Jordan and Morgan and review outcomes.' },
  { id: 'external', title: 'Explore external training support', subtitle: 'Keep the spare hour for contingency while researching a separately funded trainer. External support is not booked or verified.', action: 'Casey to investigate provider suitability, cost, scope and permission before relying on support.' }
]);

/** Bounded hypothetical absence events; these are not real staff availability reports. */
export const ABSENCE_EVENTS = Object.freeze([
  { id: 'casey', title: 'Casey · GM unavailable', note: 'No authorised acting GM or independent site supervisor is verified.' },
  { id: 'reese', title: 'Reese · estimator unavailable', note: 'No independently verified estimating or scheduling replacement is recorded.' }
]);
/** A tiny responsibility register. Partial support never means full operational cover. */
export const CRITICAL_RESPONSIBILITIES = Object.freeze([
  { id: 'site-approval', role: 'supervision', title: 'Approve site safety and escalation decisions', ownerId: 'casey', owner: 'Casey · GM',
    absentStatus: 'uncovered', absentDetail: 'No other independent site decision authority has been verified.',
    next: 'Escalate to the organisation’s accountable decision-maker to appoint and verify authorised temporary cover; none is established here.' },
  { id: 'trade-sequence', role: 'supervision', title: 'Agree tomorrow’s coordinated trade sequence', ownerId: 'casey', owner: 'Casey · GM',
    absentStatus: 'partial', absentDetail: 'Morgan may contribute technical sequencing input, but cannot assume GM sign-off or independent supervision.',
    next: 'Arrange an authorised decision-maker to review the draft before any work that requires approval proceeds.' },
  { id: 'field-work', role: 'field', title: 'Deliver assigned trade work', ownerId: 'alex', owner: 'Alex · field operative',
    absentStatus: 'uncovered', absentDetail: 'No replacement for Alex’s own assigned work is established in this fixture.',
    next: 'Replan the field allocation; do not assume replacement hours.' },
  { id: 'quality-coaching', role: 'mentoring', title: 'Provide practical quality coaching', ownerId: 'morgan', owner: 'Morgan · leading hand',
    absentStatus: 'uncovered', absentDetail: 'No alternative quality mentor is recorded in the fictional week.',
    next: 'Protect existing quality checks and make a supervised training plan.' },
  { id: 'estimates', role: 'estimating', title: 'Prepare and check project estimates', ownerId: 'reese', owner: 'Reese · estimator',
    absentStatus: 'uncovered', absentDetail: 'Alex’s commercial awareness is not evidence of independent estimating competence or available cover.',
    next: 'Escalate estimating priorities and verify a suitable estimator before committing bids.' },
  { id: 'bid-handover', role: 'estimating', title: 'Transfer estimating assumptions into project scheduling', ownerId: 'reese', owner: 'Reese · estimator',
    absentStatus: 'uncovered', absentDetail: 'A handover method may be documented, but no qualified alternate owner is shown.',
    next: 'Recover source assumptions and arrange a verified reviewer before approving a new schedule.' }
]);

/** Entirely fictional role-specific cover prospects, never approved replacements. */
export const COVER_REVIEW_OPTIONS = Object.freeze([
  {
    "taskId": "site-approval",
    "candidateId": "morgan",
    "name": "Morgan · senior leading hand",
    "evidence": "Trade mentoring does not establish independent site-approval competence.",
    "choice": "Morgan prefers technical mentoring; no managerial appointment requested.",
    "prerequisite": "Site-specific mandatory credentials and conditions remain unverified.",
    "authority": "No GM or site sign-off authority established.",
    "next": "Escalate to an authorised decision-maker; verify powers and prerequisites."
  },
  {
    "taskId": "trade-sequence",
    "candidateId": "morgan",
    "name": "Morgan · senior leading hand",
    "evidence": "Can assist with technical sequencing; approval competence unverified.",
    "choice": "Technical input does not imply Morgan wants a supervisory role.",
    "prerequisite": "Independent sign-off prerequisites not confirmed.",
    "authority": "Can draft, not approve Casey’s trade sequence.",
    "next": "Get authorised managerial review before proceeding."
  },
  {
    "taskId": "trade-sequence",
    "candidateId": "jordan",
    "name": "Jordan · developing colleague",
    "evidence": "Coached handover observed; no independent coordination evidence.",
    "choice": "Jordan is interested in learning, not assigned independent cover.",
    "prerequisite": "Competence and role permissions unverified.",
    "authority": "No site or coordination sign-off authority.",
    "next": "Arrange properly supervised practice and mentor time."
  },
  {
    "taskId": "estimates",
    "candidateId": "alex",
    "name": "Alex · field operative",
    "evidence": "Commercial awareness does not demonstrate independent estimating competence.",
    "choice": "Estimating is an interest, not a role assignment.",
    "prerequisite": "Employer-specific bid requirements not checked; no universal licence implied.",
    "authority": "No estimate or tender approval authority.",
    "next": "Arrange an estimating observation and suitable independent review."
  },
  {
    "taskId": "estimates",
    "candidateId": "external",
    "name": "Potential external estimator",
    "evidence": "No specific applicant, work sample or assessment available.",
    "choice": "No external engagement or consent established.",
    "prerequisite": "Verify relevant role requirements when a person is identified.",
    "authority": "No company approval authority established.",
    "next": "Confirm candidate, terms, budget, credentials and delegated authority."
  },
  {
    "taskId": "bid-handover",
    "candidateId": "alex",
    "name": "Alex · field operative",
    "evidence": "Commercial knowledge does not establish independent bid handover competence.",
    "choice": "Cross-functional learning is optional and chosen with Alex.",
    "prerequisite": "Required estimating checks and permissions remain unverified.",
    "authority": "No commercial handover sign-off authority.",
    "next": "Use an authorised estimating reviewer for the handover."
  },
  {
    "taskId": "bid-handover",
    "candidateId": "morgan",
    "name": "Morgan · senior leading hand",
    "evidence": "Technical sequencing insight, but no independently verified estimating handover competence.",
    "choice": "Technical expertise is not an estimating appointment.",
    "prerequisite": "Role-specific sign-off obligations unknown.",
    "authority": "No commercial bid handover authority.",
    "next": "Share site constraints with the authorised estimator."
  }
]);

/** Illustrative management RESPONSES, not a qualified cover pool or an authority grant. */
export const CONTINUITY_RESPONSES = Object.freeze({
  casey: Object.freeze([
    { id: 'stage', title: 'Hold critical approvals and resequence low-risk coordination',
      action: 'Pause decisions that need GM or site-supervision authority. Shift two illustrative hours of noncritical sequencing into a later work window.',
      deferredHours: 2, mentorHours: 0, support: 'Morgan can document technical constraints only; no acting GM or supervisory delegation is established.',
      owner: 'Business owner / authorised governance lead', followUp: 'Verify an authorised acting decision-maker, then review the two deferred hours before restarting.',
      risk: 'Safety and site approvals remain uncovered; partially supported sequencing cannot be signed off.',
      assumption: 'Two hours of noncritical coordination could be deferred, subject to checking the actual site programme.' },
    { id: 'source', title: 'Escalate for authorised interim management cover',
      action: 'Seek an independently verified interim manager and preserve the existing job records while approval-dependent work stays on hold.',
      deferredHours: 0, mentorHours: 0, support: 'An external appointment is a sourcing action only; no candidate, hours, credentials or delegation is verified.',
      owner: 'Business owner / authorised governance lead', followUp: 'Check credentials, delegated decision rights and real availability; replan affected work until an appointment is approved.',
      risk: 'The interim position is unfilled, site approvals are uncovered and sequencing support is still partial.',
      assumption: 'A suitable interim manager might be available; the example establishes neither availability nor a cost.' }
  ]),
  reese: Object.freeze([
    { id: 'stage', title: 'Hold affected bids and preserve the estimating handover',
      action: 'Defer three illustrative hours of estimate and scheduling review until qualified assurance is arranged.',
      deferredHours: 3, mentorHours: 0, support: 'Alex may share site information but cannot approve commercial estimates or become an estimator by default.',
      owner: 'Casey · GM', followUp: 'Notify affected stakeholders, document assumptions and set a new qualified review date.',
      risk: 'Both estimating responsibilities remain uncovered; bid deadlines and scheduling assumptions require human review.',
      assumption: 'Three hours of noncritical estimating review can be moved; no contractual deadlines have been verified.' },
    { id: 'source', title: 'Seek qualified estimating support before bids proceed',
      action: 'Request a scoped estimating reviewer while withholding estimates and schedules that require independent approval.',
      deferredHours: 0, mentorHours: 0, support: 'Potential external support has no verified credentials, availability, price or contracting approval.',
      owner: 'Casey · GM', followUp: 'Verify an assessor/reviewer, authorisation, available hours and budget before allocating work.',
      risk: 'Both estimating responsibilities remain uncovered until a suitable and authorised reviewer is genuinely confirmed.',
      assumption: 'A qualified reviewer could potentially be sourced; no staffing or financial outcome is implied.' }
  ])
});

export const SCENARIO_ASSUMPTIONS = [
  'Two fictional projects require coordination this week.',
  'The illustrated week includes 32 assigned field-work hours for Alex; this is not a full-time employment assumption.',
  'A four-hour supervised planning assignment would displace four of those field-work hours.',
  'The manager must explicitly choose and confirm how field-work coverage is managed before approving the fictional assignment.',
  'Resequencing work does not make it disappear; relief must be qualified and financially approved in a real workplace.',
  'The senior leading hand has three hours available for mentoring.',
  'The development plan allocates two of those hours.',
  'A supported requirement in the fictional demo needs two independently demonstrated task records and a simulated manager evidence review.',
  'Mentored practice, training attendance and quantity of notes alone do not confer authority.',
  'Succession choices represent development and handover plans only; there is no verified independent site-supervision successor.',
  'The four organisational role owners and a single-week mentor budget are invented illustrations, not a live staffing roster.',
  'Estimating has one documented owner in this fictional fixture; that does not imply that only one real person could ever perform it.',
  'Allocating the last mentor hour to Jordan funds coached practice only; it does not establish competence or cover site-supervision authority.',
  'Absence events are hypothetical what-if snapshots; they do not prove real employee availability or appoint an acting manager.',
  'A colleague preparing technical inputs is only partial support when an independent approval is still missing.',
  'Independent site-supervision authority is not established in the scenario.',
  'Evidence is illustrative; no real-world qualification is assessed.'
];