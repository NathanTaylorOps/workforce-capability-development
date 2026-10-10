/** All organisations, characters, observations, costs and outcomes below are fictional. */
export const FIXTURE_VERSION = '2026-10-demo-3';
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
export const SCENARIO_ASSUMPTIONS = [
  'Two fictional projects require coordination this week.',
  'The senior leading hand has three hours available for mentoring.',
  'The development plan allocates two of those hours.',
  'A supported requirement in the fictional demo needs two independently demonstrated task records and a simulated manager evidence review.',
  'Mentored practice, training attendance and quantity of notes alone do not confer authority.',
  'Independent site-supervision authority is not established in the scenario.',
  'Evidence is illustrative; no real-world qualification is assessed.'
];
