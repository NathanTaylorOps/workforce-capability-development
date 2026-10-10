# Workforce capacity and succession — v0.4 verification

**Stage:** Proposed PR implementation. Public employee and company examples are entirely fictional; no staffing, finance, licence or employment decision can be made from this simulation.

## Why this matters

The earlier experience could consider a bounded planning assignment after work evidence and the employee's weekly development review, without determining who would cover the person's existing production duties. This feature connects employee growth to the GM's organisation-wide responsibility for workforce capacity and succession.

## Explicit demonstration assumptions

One fictional week has two projects, 32 hours of field work allocated to Alex, a proposed four-hour supervised planning task, and three total available mentor hours (two reserved). These numbers are authored teaching examples, **not a recommended staffing model** or historical business data.

The manager chooses one response:
- **Stage:** move four noncritical field hours into the following week. This creates a scheduling consequence; hours are not erased.
- **Relief:** allocate four hours of appropriately qualified cover within the fictional scenario. Real availability, licence, job scope, budget and authorisation remain unverified.
- **Defer:** keep Alex on field work and revisit the assignment. This option does not permit the four-hour planning task.

The system requires a separately recorded simulated GM coverage review before it can consider the limited planning task. Independent site-supervision authority is still blocked. No competent and authorised successor is invented.

## Controls and outputs

- Role competence and weekly coaching remain necessary but are insufficient without a capacity plan.
- Changing the plan revokes its previous confirmation and invalidates the decision record.
- Changing the development pathway clears the site-specific plan, without deleting evidence.
- Decisions explain field hours retained, released, covered, deferred and unaddressed; mentor hours; GM accountability; and unresolved succession.
- Coaching or alternative direction does not automatically consume the four proposed hours.
- Exports show assumptions and limits rather than invented operational gains.

## Checks completed before review

- Node.js syntax and scenario rules: **30/30 local automated tests passed**.
- Desktop 1440×1000 and mobile 390×844: full scripted Chromium walkthrough passed, including the weekly check-in, mentor support, independently observed work, fictional GM evidence review, three-option coverage planner, coverage confirmation, bounded decision and JSON export; no JavaScript page errors or horizontal overflow.
- The browser walkthrough used the real HTML/CSS with an in-memory concatenation of JavaScript modules: browser navigation to local HTTP was blocked by the test environment. Import statements were checked with Node, and the missing weekly-review imports identified in v0.3 were fixed.
- The live deployed module loading path, independent user review, formal accessibility audit, occupational licensing and full workforce scheduling remain unverified.

**Release gate:** Owner reviews this PR; GitHub CI must pass. Then merge and verify Pages deployment and the live interactive journey separately.
