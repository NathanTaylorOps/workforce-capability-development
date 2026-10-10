# Career Pathways, Competence & Progression — Initial Requirements

**Document status:** Discovery draft v0.1 — requires owner review, management research and UX validation.  
**Issue:** [#2 — leadership-development evidence and flagship requirements](https://github.com/NathanTaylorOps/workforce-capability-development/issues/2)  
**Scope:** Proposed initial product vertical slice; **no features are implemented**.  
**Data:** Fictional construction organisation and people only.

## 1. Management problem

Trade competence, management readiness, willingness to lead, and organisational demand are not identical. A useful workforce-development system begins with an individual's **demonstrated existing skills**, including skills developed outside the current role, before deciding what additional support is needed. Many workers follow a common progression (e.g., labourer → tradesperson → leading hand → site supervisor → project manager), but it must **not** be a compulsory ladder. Demonstrated readiness may support lateral moves, cross-functional assignments, faster progression or skipping a conventional step when role requirements and independent authority checks permit. Organisations must avoid assuming that every valuable employee should become a supervisor, or that course completion grants responsibility. Development also affects workforce coverage, managerial time and replacement needs.

The proposed product must help a manager and employee **make existing capability visible, agree on a realistic development direction**, provide structured workplace learning, gather meaningful evidence, review support provided, decide on readiness and manage organisational consequences. Pathways represent possible routes to role requirements, **not fixed seniority gates**.

**Not a predictive talent-ranking platform, HRIS or automated promotion engine.**

## 2. Users and outcomes

| User | Job to be done | What an acceptable outcome looks like |
| --- | --- | --- |
| Employee / junior tradesperson | Have existing skills recognised; understand choices, expectations, opportunities and support; express preferences | Can choose technical, cross-functional, leadership, current-role or external direction without an implied penalty or prescribed sequence |
| Mentor / experienced leading hand | Teach, demonstrate, observe and give actionable feedback | Can record work-based practice and limitations without granting unauthorised permission |
| Manager / GM | Plan development, address organisational constraints, allocate support, verify readiness and decide on responsibility | Can explain the evidence and constraints behind a **human decision** |
| Owner / executive | See workforce coverage, key-person dependency and support commitments | Can assess the organisational consequences without reading unnecessary sensitive personal detail |
| Portfolio visitor | Understand a credible management philosophy within minutes | Completes a coherent fictional example and sees clearly labelled, explainable results |

Demo role selection is **presentation only**, not secure access control.

## 3. Proposed capability map

1. **Role definition:** role purpose, work outputs, critical tasks, behavioural requirements, reporting line, decision rights, job-specific hazards and necessary external credentials.
2. **Existing-skill discovery:** jointly identify technical, organisational, commercial and transferable skills already demonstrated in current or previous work; record confidence, context, evidence and unknowns without inferring employee worth.
5. **Employee interests:** strengths, aspirations, desired pace, restrictions they choose to share, alternate technical/management/cross-functional pathways and choice to stay in role.
6. **Flexible pathway matching:** compare existing evidence to each target role's actual requirements, then offer direct, lateral, accelerated or stepwise routes with only genuinely missing competencies and authorisations targeted for further development.
3. **Development plan:** agreed goals, measurable indicators, milestones, real opportunities to practise, mentor, external instruction, manager-provided time/resources, next review.
4. **Workplace learning:** demonstrate → coached practice → independent practice → observation → feedback → reinforcement, with ability to repeat or adjust.
7. **Assessment evidence:** observed task performance, dates/context, quality standard, assessor and limitations; evidence can be absent, disputed or expired.
8. **Scoped authority:** explicit approver, permissions, conditions, timeframe and revocation. Competence alone never grants authority.
9. **Progress review:** employee input, evidence, unfulfilled management commitments, barriers, alternatives and documented agreed next action.
10. **Organisational effect:** work coverage before/after, mentor capacity, potential vacancies, succession, workforce replacement and supplier relationships where relevant.
13. **Career outcomes:** remain in role, progress technically, lead a team, manage a site, move laterally, change occupational field, skip an unnecessary intermediate title, change role by agreement or transition externally. External business ownership is optional, not an expected path.

## 4. First-release P0 user stories and acceptance tests

| ID | User story | Must be demonstrated or tested |
| --- | --- | --- |
| CAP-01 | As a manager, I can define a role's requirements | A supervisor requires different observable competencies from a skilled trade specialist; role version is recorded |
| CAP-02 | As an employee, I can record my interest and preferred pathway | Declining supervision is an accepted choice; technical pathway remains visible and unpenalised |
| CAP-03 | As a manager, I can create a development plan with an employee | Every goal states evidence, realistic milestone, mentor/owner, resources and review date |
| CAP-04 | As a mentor, I can record practice and observed results | Training attendance and practical work evidence are recorded separately |
| CAP-05 | As a manager, I can see whether evidence is sufficient for consideration | Missing evidence displays **unknown**, not a failed skill, zero score or an automatic rejection |
| CAP-06 | As an authorised assessor, I can assess a scoped competence | An assessor without the necessary scope cannot issue a valid sign-off in the rules engine |
| CAP-07 | As an authorised manager, I can grant bounded authority | A person with trade skills but no supervision approval cannot automatically authorise site decisions |
| CAP-08 | As an employee, I can raise feedback or disagree with an assessment | Concern remains visible for appropriate review; no silent overwrite or retaliation logic |
| CAP-09 | As a manager, I can see whether promised support occurred | Missed mentoring time or cancelled external training changes the development plan status, not employee worth |
| CAP-10 | As a GM, I can model one employee changing responsibilities | Uncovered responsibilities or mentorship load are exposed, with options to recruit, redistribute, develop or delay |
| CAP-11 | As a portfolio visitor, I can compare management decisions | The same initial scenario can be reset/replayed; differences and assumptions are explained |
| CAP-12 | As a visitor, I can see provenance and limitations | Fictional characters/data are unmistakable; any separate real leadership case uses cleared sources only |
| CAP-13 | As an employee, I can document relevant skills I already have | Previously demonstrated skills can satisfy equivalent role requirements after evidence/scope review; no redundant training is required solely due to current job title |
| CAP-14 | As a manager, I can compare more than one viable progression route | Direct, lateral, stepwise and cross-functional paths are available where defensible; the system never requires an arbitrary intermediate title |
| CAP-15 | As an authorised decision-maker, I can consider accelerated progression without bypassing safeguards | All destination-role requirements, external credentials, assessor scope and delegated authority still apply even when levels are skipped |
| CAP-16 | As an employee and manager, I can plan training around uncovered capability rather than job-title assumptions | Skill gaps and employee-selected interests shape a targeted learning plan; transferable strengths reduce duplicated instruction |

Acceptance tests are proposed product criteria, **not tests that have already passed**.

## 5. Business-rule invariants

- `training_completed !== competent !== licensed !== authorised !== available`.
- The ability to train someone does not itself grant the authority to assess, certify or delegate.
- Unknown evidence remains unknown; do not infer incompetence or personal risk.
- A qualification, assessment and authority grant can have different scopes, expiry dates and prerequisites.
- Delegation cannot exceed the grantor's permission, organisational policies or relevant legal requirements.
- Employee interest and informed choice must affect the proposed pathway; declined promotion is not scored negatively.
- The default career ladder is illustrative, not prescriptive. No requirement may depend *only* on a previous job title if equivalent competence and relevant legal/permission prerequisites can be demonstrated.
- Recognition of prior experience requires contextual evidence and, where applicable, authorised assessment; a manager's impression or past job title alone is insufficient to grant regulated work or authority.
- Accelerated and lateral progression must remain open to all eligible employees on transparent, consistent criteria; avoid hidden favouritism or unsupported claims of 'high potential'.
- No automated adverse employment decisions, worth/rank scores, personality diagnosis or forced career outcome.
- Development indicators are role-specific and evidence-backed; no single composite "leadership potential" number.
- Manager obligations must be recorded and reviewed alongside employee milestones.
- A reporting-line or responsibility change triggers a workforce-coverage and handover review.
- Fairness or employment-law-sensitive scenarios must stop at an explicit human/HR advice boundary rather than simulate definitive legal compliance.
- Calculated operational consequences, assumed conditions and authored outcome narratives must be distinct.

## 6. Minimum domain concepts (subject to architecture research)

| Entity | Important fields / relations |
| --- | --- |
| Organisation, Site, Team | `id`, version, reporting/coverage relationships |
| Role and RoleRequirement | role version, expected tasks, evidence criteria, legal/external prerequisite where applicable; **no mandatory prerequisite job title unless explicitly justified** |
| SkillProfile / TransferableSkill | skill concept, evidence/context, source, employee input, verification status, linked requirements across different roles |
| PathwayOption | origin/current role, destination role(s), required gap closure, lateral/stepwise/direct movement, employee agreement, dependencies and safeguards |
| Person (fictional) | fictional identifier, work assignment, chosen development interests |
| CompetenceEvidence | skill/requirement, context, observation, date, assessor, status, source and limitation |
| LearningActivity | method, instructor, attendance, practice, effectiveness follow-up |
| DevelopmentPlan and Goal | employee agreement, milestone, measure, mentor, manager support, deadlines |
| Review | employee feedback, evidence, manager action, decision, next date |
| AuthorityGrant | scope, grantor, approver eligibility, issue/expiry/revocation |
| PositionAssignment / Coverage | current capacity, vacancy, replacement/succession options |
| DecisionRecord | known facts, unknowns, options, rationale, person deciding, review |
| ScenarioEvent | event timestamp/order, fixture version, rule/branch, provenance |

The application must have **one canonical scenario state**, not duplicate mutable copies hidden in different screens.

## 7. Sample review states (not employee ratings)

- `not_discussed` → `agreed` → `in_development` → `ready_for_review`
- Review may resolve to `additional_practice`, `evidence_requested`, `alternative_pathway`, `declined_by_employee`, or `approved_for_next_action`.
- An **approved next action** is not identical to appointment, licensing or delegated authority.
- All steps remain revisable, with reason and history; any formal role/authority change is a separate human decision.

## 8. What to measure carefully

Measure relevant outcomes such as practical task conformance, avoidable rework, timely job preparation, quality observations, independently verified skill coverage, employee-chosen goal progress and mentor/manager follow-through.

For each indicator define unit, source, denominator (where applicable), collection effort, review interval, potential bias and what conclusions it **cannot** support. No precise financial gain should be inferred from one training record.

## 9. Initial UI requirements

The primary visitor journey should be usable without sign-in and contain no real personnel data. Begin with a brief employer-facing introduction, then the fictional employee's perspective and manager's options. Use a compact action-focused workspace, not a dashboard of employee scores. The UI should expose why a step is available or blocked, allow back/reset/compare, and remain keyboard accessible and mobile readable.

Candidate screens, **not yet wireframed**:
1. Context, existing strengths and work/role requirements.
2. Employee aspirations and **multiple possible development routes** (including cross-functional/direct).
3. Agreed plan with manager commitments.
4. Learning and work evidence.
5. Review and bounded delegation decision.
6. Team coverage and organisational consequences.
7. Decision memo and compare/replay.

## 10. Exclusions and later scope

Do not build a full HRIS, LMS, payroll, real employee database, live labour scheduling, commercial subcontractor onboarding, real licensing verification, promotion predictor, continuous employee monitoring, ESOP administration or acquisition management in the first release.

A difficult role-alignment conversation is a **separate researched scenario**; it must not trivialise changes to employment conditions or employee welfare.

## 11. Questions requiring owner input before release-one design

1. Which *common* roles should be shown in the first fictional business, and what real-world examples justify moving directly or laterally between them?
2. Which 3–5 **observable** requirements distinguish readiness for the destination role regardless of the person's current title?
3. In actual practice, what evidence did mentors and managers use before increasing responsibility?
4. Which review cadence was used for which employee types, and what did a review record contain?
5. What responsibility changed first, and what approval limits applied?
6. Which original templates are available and safe to reconstruct? **Do not upload private employee records.**
7. What should count as a successful 5–10-minute recruiter-facing demonstration?

These questions are not permission to publish anyone's personal career history.
