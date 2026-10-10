# Skills-First Competence and Progression Method — Design Proposal

**Status:** Research-informed design draft v0.1; not a record of the author's historical employer processes, not an approved assessment instrument, and not implemented software.  
**Supports:** [Career Pathways requirements](product/CAREER_PATHWAYS_REQUIREMENTS.md), especially CAP-01, CAP-04–07, CAP-09 and CAP-13–16.  
**Tracking:** [Issue #2](https://github.com/NathanTaylorOps/workforce-capability-development/issues/2)  
**Reviewed source starting points:** 2026-10-10. See [Research references](#research-references).

## 1. Goal and decision boundary

Help a manager **recognise what an employee can already do**, identify legitimate gaps for an employee-chosen development direction, organise appropriate work practice and assessment, and make a defensible **human** decision about the next responsibility.

This is *workforce development and management decision support*, not regulated vocational certification, employment-law advice, employee ranking or automated promotion.

**Design question:** What can the worker demonstrably do, in what conditions, on what evidence, and what do they want to learn or take responsibility for next?

A familiar route might be `labourer → skilled tradesperson → leading hand → site supervisor → project manager`, but the actual decision should compare **destination requirements**, not count titles. Demonstrated transferable skills may support accelerated, cross-functional or lateral movement.

## 2. External research and its applicability

| Source | Relevant principle | How to adapt; limitation |
| --- | --- | --- |
| Australian Skills Quality Authority (ASQA), 2025 assessment guidance | Assessment evidence should be **valid, sufficient, authentic and current**; interpretation should be consistent and fair | Use these as quality checks for *internal* skills evidence. The simulation is **not an RTO**, cannot issue a regulated qualification and cannot assert ASQA accreditation. |
| NIST Manufacturing Extension Partnership, Training Within Industry | Prepare → demonstrate → try-out → follow-up; teaching includes job relations and improvements to methods | Structure practical job instruction and gradual withdrawal of coaching. This is a useful method, not a claim that a previous employer formally operated a certified TWI programme. |
| CIPD, Performance Management (29 Jan 2026) | Continuous objective-setting, meaningful two-way discussion, resources/support and line-manager accountability | Model weekly/periodic reviews and management commitments. Exact cadence must reflect the role and the employee; development cannot be reduced to a single score. |

**Do not publicly label the software or a workplace approach 'market-leading' on these sources alone.** Establish any comparative claim through defined criteria, representative alternatives, expert review and actual observed outcomes.

## 3. Proposed workflow

| Step | User action | Required output | Common failure to prevent |
| --- | --- | --- | --- |
| **Discover** | Employee and manager identify technical, operational, commercial and transferable strengths, including earlier experience | Skills inventory with optional supporting evidence and unknowns | Assuming current job title defines capability |
| **Choose** | Employee states preferred direction; manager presents realistic alternatives | Agreed goal(s), including option to remain or specialise technically | Pushing every high performer into supervision |
| **Map** | Compare existing evidence with a *destination* role's observable requirements | Requirements satisfied, gaps, uncertainty and restrictions | Requiring every intermediate promotion |
| **Develop** | Assign practical projects, mentor time, external training and manager resources | Plan with owners, milestones and support commitments | Treating all development as employee responsibility |
| **Observe** | Mentor records task context, outcomes, mistakes and coached follow-up | Evidence, limitations and employee perspective | Equating attendance with performance |
| **Assess** | Appropriately scoped assessor reviews evidence using consistent criteria | Supported, insufficient, disputed or outdated evidence status | One subjective impression deciding readiness |
| **Decide** | Authorised manager weighs role requirements, workforce coverage and consent | Explicit next action and recorded rationale | Silently granting site authority or job title |
| **Review** | Employee and manager revisit practice, support, quality and outcomes | Revised plan / next review / status | Assuming one sign-off proves lasting transfer |

## 3A. Hybrid assessment approach — formal evidence plus management judgment

For this product, adopt a **hybrid** method rather than choosing between bureaucratic checkbox assessment and entirely informal managerial opinion.

**Structured evidence:** Job-specific competencies, observed work outputs, agreed KPIs, documented milestones, required training and bounded authority. The role requirements provide consistency; evidence must still be interpreted in context.

**Continuous managerial input:** Regular employee conversations, mentor and leading-hand observations, judgement about independent problem-solving and teamwork, explanations of setbacks, and review of management-provided support. These inputs provide context and help plan development, **not a shortcut around missing evidence or legal prerequisites**.

**Decision:** A human manager considers both streams alongside the employee's aspirations and operational constraints, identifies conflicting or incomplete evidence, documents the rationale and agrees on the next action. Appropriate assessors and delegated decision-makers have separate responsibilities.

### Evidence hierarchy for the *proposed* fictional workflow

| Information | Example | How it is used |
| --- | --- | --- |
| Observable work | Completed inspection, plan, quality records, handover, safely handled task | Primary evidence against explicit role requirements |
| Documented milestones | Supervised task completed; independent task repeated under defined conditions | Demonstrates progression over time, where criteria fit the task |
| Leading-hand or mentor feedback | Dated observation of work quality, decision-making or coaching need | Adds context and helps identify practice needs; verifier scope matters |
| Weekly management review | Employee input, stated goals, open commitments, obstacles and follow-up | Informs development support, readiness discussions and fair process |
| KPI and operational trend | Job-specific quality/rework, completion timeliness, planning reliability | Supporting signal only; causation and context must be examined |
| Professional judgment | Manager's explanation of strengths, limitations, uncertainty and options | Human assessment rationale; cannot replace statutory licensing or task evidence |

**Conflict rule:** If direct evidence, KPI trends and mentor feedback disagree, the system surfaces that disagreement and offers reassessment or further observation. It must not silently compute an overall employee-worth or potential score.

**No invented historical detail:** The actual historical balance of formal sign-offs, weekly notes, KPI reviews and subjective judgment remains to be clarified. This section specifies an improved product method, not an assertion that every step or record was previously documented.

## 3B. Decision and review rhythm

1. **At the start:** Agree on the employee's preferred direction; record existing capabilities and what the destination requires.
2. **During work:** Mentor observes real tasks; manager makes resources and opportunities available.
3. **At an agreed review:** Employee and manager examine work evidence, KPIs, feedback, support commitments and any disagreements.
4. **At a readiness decision:** Appropriate human decision-maker documents what is supported, uncertain or restricted, and authorises only permissible scoped next steps.
5. **After transition:** Check quality, safety, confidence, supervision needs and workforce coverage; alter the plan if evidence changes.

The review interval should be configurable; weekly is an illustrative cadence, not an automatic compliance requirement.

## 4. Worked fictional example — field employee considers site supervision

**Everything in this example is synthetic and illustrative.** No named historical employee, former employer or real personnel record is represented.

A small custom builder needs more site coordination capacity. **Alex**, currently a field operative, has strong construction-quality results and has helped with scheduling and materials planning on previous assignments. Alex wants to explore supervision but has not yet demonstrated every critical supervisory responsibility. Alex could also take a cross-functional coordination position without becoming a site supervisor.

The manager should inspect **six separate destination requirements**:

| Requirement | Proposed observable evidence | Initial fictional state | Meaning for progression |
| --- | --- | --- | --- |
| **Quality of practical work** | Multiple accepted inspections; defect identification and prevention in different tasks | Evidence available | Recognise existing competence where evidence is valid and current |
| **Work planning / sequencing** | Creates a feasible short look-ahead plan that accounts for prerequisites and dependencies | Some evidence; further practice warranted | Support direct supervised coordination tasks |
| **Communication and handover** | Gives usable instructions, records changes and confirms understanding with crew/trades | Partially observed | Arrange guided practice and feedback |
| **Safety and site controls** | Identifies relevant hazards; follows required plans, permits and escalation duties | Evidence incomplete | Do not grant regulated/safety-critical authority |
| **Commercial awareness** | Recognises rework, lost time, cost consequences and when to escalate a variation | Evidence of earlier planning assistance | Transfer strengths; observe application in new context |
| **Leading people** | Sets expectations respectfully, addresses quality issues, receives feedback and follows through | Not yet observed in a leadership setting | Provide mentoring/realistic practice; no leadership label from technical quality alone |

The table intentionally avoids a universal numeric pass threshold. Each role requirement needs task-specific criteria, scenario jurisdiction and proper assessment authority before real implementation.

### Three defensible decisions

- **Stepwise:** Alex remains in the current role and practises planning and team coordination with mentor support, then returns for review.
- **Accelerated:** If the evidence and permissions later support it, Alex may enter a supervised coordination/supervisory-development assignment **without first having held a leading-hand title**. Restricted authorities remain withheld until separately authorised.
- **Lateral:** Alex moves into planning, estimating or scheduling development, transferring verified operational strengths to the new role.

A fourth valid choice is that Alex does not pursue additional responsibility now. This is not recorded as failure or low potential.

### What the manager is accountable for

The manager agrees to supply mentoring time, access to operational information, safe practice tasks, relevant external instruction where justified and timely feedback. If those resources are not delivered, the plan records the **management support gap**, rather than misclassifying the worker.

### What the application must never infer

- `technically excellent` ⇒ `ready to lead people`: **invalid**.
- `attended training` ⇒ `competent`: **invalid**.
- `competent` ⇒ `licensed/authorised`: **invalid**.
- `has not held intermediate title` ⇒ `ineligible`: **invalid**, unless a justified formal prerequisite truly applies.
- `not interested in promotion` ⇒ `underperforming`: **invalid**.

## 5. Initial evidence record contract (design only)

A practical observation record should expose:

- `requirement_id` and `requirement_version`
- `worker_id` (fictional only in public demo)
- `activity`, `conditions`, `task_result`, `observed_date`
- `evidence_origin` (work sample, direct observation, knowledge check, prior documented work, third-party statement)
- `observer_id`, their role, and **assessment scope**
- `competency_claim`: supported / not-yet-demonstrated / unknown / disputed / superseded
- `confidence_limitations`, `recency`, `follow_up`
- employee comments or alternative account (optional)
- version/history for review and replay

Keep raw evidence separate from an assessor's conclusion and from the decision-maker's authority grant. Source records should be traceable, but a public educational demo must not pretend to secure private HR evidence.

## 6. Acceptance examples to turn into automated tests

1. A worker with evidence from another discipline is offered a valid cross-functional pathway **without defaulting to an entry-level retraining plan**.
2. A worker who has not held 'leading hand' can be considered for the destination role when every actual requirement is met; titles do not substitute for rules.
3. Someone who has only attended manufacturer training is marked as trained, not automatically authorised for an unrelated safety-critical site responsibility.
4. Missing evidence returns **unknown / needs evidence**, never a low score.
5. The same observation set and rules generate the same review interpretation after scenario reset.
6. A manager who misses the promised weekly coaching activity receives an unfulfilled support action in the management view.
7. Inconsistent assessor permission or expired external prerequisite prevents an authority grant.
8. Choosing the technical specialist path remains a legitimate positive development outcome.
9. Review of a role change includes effects on field coverage, mentor time and responsibility ownership.
10. Employee disagreement remains reviewable and cannot be overwritten invisibly.

These are proposed tests, **not evidence that tests have been run**.

## 7. UX implication

The initial experience should be **skills and work first**, not a talent-heatmap or hierarchical organisation chart:

1. **Existing capabilities** — what Alex already demonstrates and what remains uncertain.
2. **Possible next contributions** — technical depth, lateral work, guided coordination, supervisory development.
3. **Development plan** — only the actual gaps, with employer-provided support visible.
4. **Evidence review** — observations separated from decisions, with ability to dispute.
5. **Manager decision** — authority boundaries and organisation-wide effects.
6. **Outcome and reflection** — alternative routes, replay, manager and employee follow-through.

A detailed first wireframe should be reviewed before implementing the components.

## 8. Open design decisions for the owner

- In historical practice, what **specific observable work** was used to decide someone could take on a new responsibility?
- Which decisions required the owner/GM to sign off, and which could a leading hand safely make?
- How were weekly development reviews documented or followed up?
- Did formal assessments use consistent evidence criteria or mostly documented manager/mentor judgment?
- What real role-specific safety, trade or licensing prerequisites should the fictional scenario emulate **without falsely claiming compliance**?

Do **not** answer these questions by retroactively inventing historical forms or procedures. Record uncertainty honestly; use research-derived practice only as a new design proposal.

## Research references

- [ASQA: 2025 assessment practice guide](https://legacy.asqa.gov.au/how-we-regulate/revised-standards-rtos/practice-guides/practice-guide-assessment) — source specific to registered vocational education settings; internal adaptation only.
- [Australian legislation: 2025 assessment instruments](https://www.legislation.gov.au/F2025L00354/asmade/2025-03-14/text/original/epub/OEBPS/document_1/document_1.html) — assessment/evidence principles; legal scope does not automatically extend to this app.
- [NIST MEP: Training Within Industry](https://www.nist.gov/mep/training-within-industry-twi).
- [CIPD: Performance management factsheet (29 Jan 2026)](https://www.cipd.org/en/knowledge/factsheets/performance-factsheet/).

Further research must check jurisdiction-specific licensing, employee relations, assessment rules and actual user needs before deployment beyond an educational synthetic demo.
