/** All organisations, characters, observations, costs and outcomes below are fictional. */
export const FIXTURE_VERSION = '2026-10-demo-1';
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
  { id: 'planning', name: 'Planning & sequencing', tag: 'Operations', required: 2, description: 'Builds a workable short-term plan, with dependencies and available resources.', samples: ['Built a two-trade look-ahead with material and access constraints.', 'Replanned around a supplier delay and flagged dependencies early.'] },
  { id: 'communication', name: 'Communication & handover', tag: 'People', required: 2, description: 'Communicates expectations and confirms shared understanding.', samples: ['Delivered a clear pre-start handover and documented open issues.', 'Resolved conflicting instructions using an agreed escalation route.'] },
  { id: 'safety', name: 'Site safety & authority', tag: 'Safety', required: 2, description: 'Recognises hazards and understands the limits of safety-critical authority.', samples: ['Identified a site access hazard during an observed walk-through.'] },
  { id: 'commercial', name: 'Commercial awareness', tag: 'Operations', required: 2, description: 'Understands how lost time, rework, variations and quantities affect delivery.', samples: ['Flagged cost exposure created by an avoidable return visit.', 'Explained the impact of changed quantities to the estimating team.'] },
  { id: 'leadership', name: 'Leading people', tag: 'People', required: 2, description: 'Supports colleagues, addresses issues respectfully and follows through.', samples: ['Ran a coached crew briefing with clear actions and support.'] }
];
// Fictional, pre-authored observations. No ability to upload or store real personal data.
export const BASE_OBSERVATIONS = [
  { id: 'q1', skill: 'quality', text: 'Accurate installation, defects spotted before inspection.', source: 'Direct observation', observer: 'Morgan · senior leading hand', phase: 'Earlier work' },
  { id: 'q2', skill: 'quality', text: 'Clean quality handover on a second type of job.', source: 'Work sample', observer: 'Casey · GM', phase: 'Earlier work' },
  { id: 'p1', skill: 'planning', text: 'Helped prepare a two-day materials and labour plan.', source: 'Coached observation', observer: 'Morgan · senior leading hand', phase: 'Earlier work' },
  { id: 'c1', skill: 'communication', text: 'Provided a clear trade handover with mentor support.', source: 'Coached observation', observer: 'Morgan · senior leading hand', phase: 'Earlier work' },
  { id: 'm1', skill: 'commercial', text: 'Flagged rework and time implications of a late variation.', source: 'Work sample', observer: 'Casey · GM', phase: 'Earlier work' },
  { id: 'm2', skill: 'commercial', text: 'Reviewed quantity changes with the estimator.', source: 'Cross-functional observation', observer: 'Estimating mentor', phase: 'Earlier work' }
];
export const SCENARIO_ASSUMPTIONS = [
  'Two fictional projects require coordination this week.',
  'The senior leading hand has three hours available for mentoring.',
  'The development plan allocates two of those hours.',
  'Independent site-supervision authority is not established in the scenario.',
  'Evidence is illustrative; no real-world qualification is assessed.'
];
