# UX Spec 01 — Capability & Readiness Review

**Stage:** Reviewable text wireframe v0.1 — not built, not user-tested, not a historical personnel record.  
**Applies to:** [Skills-first progression](../product/CAREER_PATHWAYS_REQUIREMENTS.md) and [hybrid competence method](../COMPETENCE_AND_PROGRESSION_METHOD.md).  
**Demo data:** Entirely fictional. Role requirements, competencies and observations are **illustrative**, not professional licensing standards.

## Why this screen exists

A frontline/operations manager must be able to answer three questions without reading a large HR report:

1. **What can this employee already do?**
2. **What is still uncertain or needs work before the next responsibility?**
3. **What must the employee, manager and business do next?**

The screen combines objective task evidence and documented milestones with coaching notes, mentor feedback, KPIs and human judgment. It makes disagreement, uncertainty and management support gaps visible.

**It must not render a single 'talent score', automated promote/demote action or psychiatric/personality classification.**

## Suggested screen hierarchy — wide layout

```text
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Workforce Capability                     FICTIONAL DEMO   [Reset] [Help]        │
│                                                                                 │
│ Review readiness                                                            3/6│
│ Alex • Field operative • Wants to explore site coordination             │
│ [View existing skills]  [Technical pathway]  [Cross-functional pathway]         │
├───────────────────────────────────────────────┬─────────────────────────────────┤
│ EXISTING CAPABILITY                           │ DEVELOPMENT & SUPPORT           │
│                                               │                                 │
│ Task / observed evidence         Review state │ Goal: Plan a two-trade workday  │
│ ✓ Quality of trade work          Supported    │ Mentor: Morgan                  │
│ ◐ Planning and sequencing        Needs review │ Manager support: 2 hrs / week  │
│ ◐ Communication and handover     Needs review │                                 │
│ ? Site safety / authority        Unknown      │ Milestones                      │
│ ✓ Commercial awareness          Supported    │ ☑ Build look-ahead plan        │
│ ? Team leadership                Unknown      │ ☐ Observe trade handover       │
│                                               │ ☐ Run coached handover          │
│ [Select requirement → view observations]      │                                 │
│                                               │ Support commitments             │
│ --------------------------------------------  │ ! External instruction delayed  │
│ SELECTED: Planning and sequencing             │ [Replan / assign owner]         │
│                                               │                                 │
│ Evidence: 2 relevant task observations        │ NEXT REVIEW                     │
│ Mentor feedback: improving, needs practice    │ Agreed follow-up date           │
│ KPI trend: contextual, not decisive           │ [Review conversations]          │
│ Employee view: wants more practice            │                                 │
│ [Show evidence] [Add fictional observation]   │                                 │
├───────────────────────────────────────────────┴─────────────────────────────────┤
│ READINESS DISCUSSION                                                           │
│ Known: proven trade quality; some planning experience.                         │
│ Unknown: safe site authority, people-leadership performance.                    │
│ Constraints: no authorisation to independently supervise.                      │
│ Employee preference: supported coordination practice.                          │
│                                                                                 │
│ [Continue coaching]  [Consider scoped task delegation]  [Explore other path]   │
│ All actions lead to a human decision record; no automatic appointment.          │
└─────────────────────────────────────────────────────────────────────────────────┘
```

Characters and figures above are **fictional mock data** and are subject to content review. Exact UI copy and structure are proposals.

## Mobile presentation

Use one column; header and selected employee context remain concise. Order:
1. Person, chosen direction and alternate pathway action.
2. Existing-capability summary, with one requirement expanded at a time.
3. Evidence details (accessible disclosure); show observations separately from interpretation.
4. Development commitments, including late employer actions.
5. Readiness discussion with a persistent *Review options* action.

No horizontal-scrolling assessment table, hover-only controls or text clipped by status labels.

## Interaction contract

| Element | Default | Interaction | Guardrail |
| --- | --- | --- | --- |
| Pathway selector | Employee's stated interest | Switch between site coordination, technical depth and cross-functional planning | Warn if switching would replace a draft; preserve employee choice in scenario history |
| Requirement row | Collapsed summary | Select to reveal evidence, limitations, relevant criteria and assessor | Missing evidence shown as **unknown**, not 'failed' |
| Observation evidence | Read-only fictional records | Inspect context, date, source, reviewer, decision relevance | Separate evidence from the assessors' conclusions |
| Add observation | No form open | Add a synthetic observation with outcome, context and fictional observer | Exercise-only; never accepts/upload real employee evidence in the demo |
| Mentor feedback | Latest relevant review | Read observations and request follow-up | Feedback is not a competence credential |
| Weekly review | Latest completed and next due | Read employee comments, manager actions and KPI context | Employee voice and unsettled issues remain visible |
| Manager support | Delivered / delayed / pending | Resolve or reschedule support; state cause and accountable owner | Manager missed support not scored as worker underperformance |
| Continue coaching | Available | Record a coached task and review milestone | Can proceed while evidence incomplete |
| Scoped delegation | Available only if the manager can consider it | Show exact task, conditions, approver, excluded authority, review date | Prevent bypassing missing authorisation or mandatory safety prerequisites |
| Explore other path | Available | Compare skills alignment and unmet requirements | Never frame technical work as lower-status |
| Decision history | Read-only | View choice, rationale, evidence and current next step | Preserve changes and disagreement transparently |
| Reset | Available with confirmation | Restore deterministic initial fixture | No persistence of personal data in public demo |

**Important:** Controls here describe desired future behaviour, not implemented functionality.

## State labels and terminology

Use people-respectful, fact-specific labels:
- **Supported by evidence** — evidence covers the defined requirement with adequate context.
- **Needs further review** — evidence exists but conflicts, is partial or needs corroboration.
- **Not yet demonstrated** — a defined assessment task was attempted and requirements were not yet met; include learning support.
- **Unknown** — insufficient information to reach a conclusion.
- **Restricted** — permission, credential or safety limitation prevents an action irrespective of performance.

Do not conflate 'not yet demonstrated' with 'unknown'. Do not make status colour the only signal: every state has a text label and assistive description.

## Example dynamic copy for a review event

**Manager action:** Choose *Consider scoped task delegation*.

**System response:**
> Alex has evidence of trade quality and some work planning. There is not yet sufficient evidence or authorisation to independently supervise the site. A supported **two-trade handover exercise** may be planned if the appropriate person approves its scope and safety arrangements. Record who will supervise, what Alex may decide, when to escalate and when the activity will be reviewed.

**Alternative:** If direct practical evidence is added later, revisit only the requirements affected, never automatically confer the supervisor title.

## Acceptance tests before claiming this screen complete

1. The employee can choose a technical or lateral path without any 'failed promotion' state.
2. A prior verified skill satisfies a matching requirement independent of the employee's current title.
3. A mentor comment without adequate work evidence cannot automatically establish task competence.
4. A recorded KPI improvement alone cannot authorise site supervision.
5. Contradictory evidence surfaces a review warning and supports employee disagreement.
6. A missed manager training commitment remains actionable and does not lower an employee rating.
7. An unauthorised assessor cannot approve the competence record.
8. Limited supervised practice can be considered while independent authority remains blocked.
9. A visible, legible record explains the person's preference, evidence, uncertainties, decision and next review.
10. The screen, forms and disclosures work with keyboard and mobile layouts; contrast, labels and focus cues are audited.
11. A reset reproduces the same starting scenario and decision outcomes.
12. No real employer/employee names, documents or personal data are collected for the public demo.

**Test status:** Not implemented or executed. Detailed UX design must be reviewed and built first.

## Decisions before development

- Agree on the **first destination role** and the exact two or three tasks suitable for a short recruiter demo.
- Confirm which manager actions genuinely require an authorisation check.
- Choose whether the demo is mostly guided (recommended initially) or a full navigation workspace.
- Review tone, responsiveness and screen density with an actual interactive prototype.
