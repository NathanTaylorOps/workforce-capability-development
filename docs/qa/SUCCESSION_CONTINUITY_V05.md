# v0.5 — Succession readiness and knowledge continuity

**Status:** Proposed implementation pending owner review and merge. This is a single entirely fictional scenario, not a personnel file, hiring decision, qualification, or production workforce-planning tool.

## Management problem

Increasing someone's responsibilities can leave the business dependent on its current manager or mentor even after the immediate four-hour field-work gap is covered. A capacity plan is not a succession plan: a role handover needs knowledge transfer, explicit accountability, employee choice and realistic checks on successor readiness.

## What v0.5 implements

- A separate, skills-first succession and handover section on the existing management-decision screen, with three **fictional management strategies**: develop an interested junior colleague (Jordan); distribute specialist knowledge with experienced leading hand Morgan; or prepare a role-specific external recruiting search.
- Each strategy identifies *known evidence*, *missing evidence/limitations*, a proposed knowledge transfer step, and a named manager-owned follow-up. Options are not scored or ranked.
- Selecting a strategy **does not** mark it confirmed. A separate fictional GM acknowledgement records a handover plan **only after a two-way weekly review**. It never records a person as qualified, available or authorised.
- The limited four-hour planning assignment now requires all three independent safeguards: GM-reviewed planning work evidence and the employee's agreed weekly development action; a separately reviewed field-coverage response; and a GM-reviewed continuity/handover plan.
- Changing a strategy resets its handover acknowledgement and invalidates a previous decision record. Switching the employee's pathway clears succession and coverage plans while retaining real work evidence.
- The exported decision JSON and text memo state the chosen approach, unverified qualifications/availability, handover task, owner, follow-up and residual risk. The outcome screen shows the same risks.

## The limits matter

- **No candidate is labelled ready:** neither Jordan, Morgan nor an unspecified external candidate is established as an independent site supervisor.
- An acknowledged *plan* is not a completed handover, a competency sign-off, an authority grant, or a filled vacancy.
- Mentor availability is still the fictional three hours previously modelled, with two reserved. The plan cannot assume extra time or resources without a separate operating decision.
- Site supervision stays with Casey (fictional GM), as already required by the earlier scenario. Scenario estimates and personnel are invented.
- This does not introduce real employee data, integrations, recruitment, employment-law advice or statutory licensing verification.

## Verification carried out locally

- **38/38** Node.js native unit tests and syntax checks: `npm run check` (8 additional tests for succession state, alternatives, human review gating, no false authority, stale-decision invalidation, pathway changes and export).
- Scripted Chromium headless browser walkthroughs on **1440 × 1000 desktop** and **390 × 844 mobile**: both passed. Exercised weekly review, mentoring, independent evidence, GM review, coverage choice and confirmation, succession choice and confirmation, blocked independent appointment, permitted limited task, outcome rendering and decision JSON download. No JavaScript exceptions or horizontal overflow were observed.
- As in prior prototype testing, this isolated smoke test uses the actual HTML/CSS and concatenated application modules because this environment cannot reliably navigate to locally served HTML. **It is not an end-to-end HTTP or deployed ES-module-graph test.** GitHub CI and live deployment should be reviewed after merging.
- All fictional data only; no real personal history published.

## Follow-on work (not part of this PR)

Evaluate whether the 6-step experience should later add a dedicated team-wide succession map, multiple vacancies, overlapping mentor capacity, formal role/authority criteria and employer-facing accessibility validation. Only expand after usability feedback; do not infer employee-worth scores or invent readiness measurements.
