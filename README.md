# Workforce Capability & Development

**A practical, skills-first demonstration of people development, managerial judgment and organisational capability.**

**Status: v0.9.0 published preview; the operating introduction is tracked in [issue #24](https://github.com/NathanTaylorOps/workforce-capability-development/issues/24).** The [Leadership Studio](https://nathantaylorops.github.io/workforce-capability-development/) presents a fictional management situation involving employee development, mentoring, delivery commitments, succession and continuity. The entry screen provides a short account of the operating challenge, with a separate option to work through the full six-stage simulation. The [v0.9.0 release](https://github.com/NathanTaylorOps/workforce-capability-development/releases/tag/v0.9.0) remains the verified baseline; later merged changes are not part of that tagged version. All scenario information is invented. This is not a personnel assessment, workforce scheduling system or authority to approve real work.

## Experience the prototype

**[Open the live Leadership Studio](https://nathantaylorops.github.io/workforce-capability-development/)** — public, synthetic-data demonstration hosted on GitHub Pages. [Deployment workflow: successful on second attempt](https://github.com/NathanTaylorOps/workforce-capability-development/actions/runs/38077504496).

**Leadership Studio — Develop a future leader.** Act as General Manager of fictional **Hawthorn Projects** and make a development decision about fictional field employee Alex. The guided six-stage experience lets you:

1. Understand the employee, the organisation and available mentor capacity.
2. Compare **site coordination, technical specialisation and estimating/scheduling** pathways without a fixed promotion ladder.
3. Record fictional mentor follow-through, hear the employee’s pre-authored perspective and complete a weekly development review combining contextual KPI indicators, mentor feedback, management actions and milestones.
4. Inspect competency evidence and add pre-authored, fictional work observations.
5. Make an evidence-based management decision. **Independent site-supervisor appointment remains blocked** where the evidence and authority are insufficient.
6. Review the operational consequences and copy or download a fictional decision record.

The final management decision screen can now save a first fictional decision and compare a second full run against the same initial scenario. The side-by-side review shows development choices, work allocations, mentoring and unresolved authority; it does not create a real staffing or site approval. The comparison can be exported as fictional JSON.

This is a **single synthetic scenario**, with deliberately simplified criteria. Its observations, characters, budget/time assumptions and outcomes are invented; nothing represents individual real-life employee records or measured business performance. **The fictional two-independent-observation requirement** is an intentionally simplified teaching rule, not a universal assessment or legal standard. Coached and independent observations are distinct; new independent evidence requires a separate simulated GM review before a narrowly scoped planning responsibility can be considered.

The app does not use a backend, collect personal data, persist scenario state or require accounts. Reset returns to the initial scenario.

### Run locally

There is **no installation or dependency download** required to view the app. Start any static server from the repository root:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080/` in a browser. Open directly as a `file://` document only if your browser supports ES modules from local files; using a local server is recommended.

Tests require Node.js 20 or later; no `npm install` step is needed:

```bash
npm run check
```

`npm test` runs the deterministic scenario-rule tests. GitHub Actions runs the same checks for pull requests and `main`, and a separate workflow publishes the necessary static assets to GitHub Pages. The first successful deployment is verified from the [publishing workflow](https://github.com/NathanTaylorOps/workforce-capability-development/actions/runs/38077504496). The deployed JavaScript module graph and complete in-browser journey still require post-deployment smoke testing.

## Why this exists

An operations leader should not assume that tenure or job title defines potential, that all capable people want to supervise, or that passing training automatically confers competence, a licence or permission to act. Managers must also provide coaching opportunities, follow up on their own commitments and assess the workforce implications of changing a person's duties.

This repository explores **work requirements → existing skills → employee-selected direction → coached practice → observed evidence → human judgment → scoped authority → organisational follow-through**.

It is part of [NathanTaylorOps](https://github.com/NathanTaylorOps)'s operations and management portfolio. The scenario is an explanatory fictional product, **not evidence that the specific situations depicted actually occurred**. Any historical leadership case study must be separately sourced, anonymised where necessary and approved for public release.

## Scope and limitations

- This prototype simulates one skills-first development scenario only. Difficult conversations, director-level succession, multiple enterprises and comprehensive workforce modelling remain future work.
- The current review uses limited pre-authored synthetic observations and a simplified evidence threshold. No real training, licensing, HR compliance or assessor validation occurs.
- Role suitability, hiring, promotion, dismissal, discipline and safety-critical work authority **must not** be decided automatically. A real organisation requires qualified human assessment and applicable legal/industry checks.
- Training completed, competence evidenced, credentials held, authority delegated and worker availability are distinct facts.
- No employee ranking, inferred personality, employee-worth score, automated surveillance, real HR records or invented financial ROI.

## Repository structure

| Path | Purpose |
| --- | --- |
| [`index.html`](index.html), [`styles.css`](styles.css) | Responsive accessible-first web interface (no framework required) |
| [`src/data.js`](src/data.js) | Versioned fictional scenario, role paths and evidence fixtures |
| [`src/engine.js`](src/engine.js) | Deterministic, pure decision and assessment rules |
| [`src/app.js`](src/app.js) | Guided browser interaction and local-only rendering |
| [`tests/engine.test.js`](tests/engine.test.js) | Node.js scenario unit tests |
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | Pull request and main-branch validation |
| [`.github/workflows/pages.yml`](.github/workflows/pages.yml) | GitHub Pages publishing workflow |
| [`docs/`](docs/) | Research, product requirements, evidence boundaries and UX specifications |

## Project documents

- [Project charter](docs/PROJECT_CHARTER.md) — purpose and governance.
- [Discovery and release roadmap](docs/ROADMAP.md) — future phases and release gates.
- [Working agreement](docs/WORKING_AGREEMENT.md) — maintainer practices and verification expectations.
- [Data and evidence policy](docs/DATA_AND_EVIDENCE.md) — public data and historical fact boundaries.
- [Career pathways requirements](docs/product/CAREER_PATHWAYS_REQUIREMENTS.md) — initial functional requirements.
- [Competence and progression method](docs/COMPETENCE_AND_PROGRESSION_METHOD.md) — research-informed assessment proposal.
- [Assessment screen spec](docs/ux/ASSESSMENT_REVIEW_SCREEN.md) — reviewable UX design, now partially implemented.
- [Architecture record](docs/architecture/ADR-0001-STATIC_PROTOTYPE.md) — why the first build is dependency-free.
- [Prototype verification](docs/qa/PROTOTYPE_VERIFICATION.md) — checks run and known gaps.

## Current progress

| Stage | Verified state |
| --- | --- |
| Repository foundation | Done |
| Initial discovery, requirements and UX documentation | Drafted and merged; research ongoing |
| First static leadership scenario | Merged into `main` in [PR #5](https://github.com/NathanTaylorOps/workforce-capability-development/pull/5) |
| Scenario-rule tests | **71/71** scenario unit tests passed on the shipped v0.9 baseline; see [GitHub Actions verification](https://github.com/NathanTaylorOps/workforce-capability-development/actions/runs/38161750331). Older version-specific counts below are historical snapshots. |
| Browser interaction testing | Real hosted HTTPS Chromium smoke test **passed on desktop and mobile**: [workflow #38161773855](https://github.com/NathanTaylorOps/workforce-capability-development/actions/runs/38161773855). It checks actual JS/CSS loading, keyboard skip-link, continuity comparison, exports and overflow; it is not a formal WCAG audit. |
| Public GitHub Pages deployment | **Successful** for `8f6da00`: [published site](https://nathantaylorops.github.io/workforce-capability-development/) and [deployment evidence](https://github.com/NathanTaylorOps/workforce-capability-development/actions/runs/38161750334). |
| Independent reviewer / accessibility / security audit | Not completed; browser smoke and automated unit tests are limited engineering checks. First formal GitHub release/tag remains subject to owner approval. |

**Maintainer:** [NathanTaylorOps](https://github.com/NathanTaylorOps). No external contributors or independent reviews are claimed.

## Evidence review in v0.2

The v0.2 workflow requires a completed fictional mentoring session before simulated independent practice can be recorded. Coached records and unreviewed observations do **not** prove independent competence. After two pre-authored independent planning tasks, the visitor must explicitly perform a fictional GM evidence review before the bounded planning assignment can be considered. Independent site-supervision authority remains blocked. Manager support changes invalidate previously generated decisions so exported records cannot silently become stale. All evidence, checks and reviewer roles are invented teaching fixtures; the demo does not authenticate reviewers or certify workers.

## Weekly development review in v0.3

The fictional week-two check-in shows work indicators **with limitations**, mentor feedback, a pre-written employee perspective, the organisation's outstanding support commitments and three different manager follow-up actions. The manager must hear Alex before recording a review. The selected action records its owner, milestone and next review, and flows into the eventual decision memo. A limited site-planning assignment also requires an agreed coached-handover development action, independently demonstrated planning tasks and an explicit fictional GM evidence review. No KPI or check-in independently grants competence, credentials or work authority.

**Verification scope:** 23/23 scenario tests pass locally. Desktop and mobile browser interaction smoke tests used the actual HTML/CSS and a temporary, in-memory concatenation of the three application modules because local HTTP navigation is blocked in the verification environment. This was a historical local test limitation; the later [v0.9 actual published-browser flow](https://github.com/NathanTaylorOps/workforce-capability-development/actions/runs/38161773855) passed on desktop and mobile. The full application is not exhaustively UI-tested. [Test plan and limitations](docs/qa/WEEKLY_REVIEW_V03.md).

## Workforce capacity and succession in v0.4

The fictional GM now explicitly plans how four hours of Alex's existing field assignment will be managed if a supervised planning opportunity goes ahead. Three options—stage the work, arrange qualified relief or defer the reassignment—have different coverage consequences. A bounded assignment requires not only the earlier competency and weekly-review safeguards, but also an explicit fictional GM workforce-coverage review. A deferral choice blocks the assignment; any planning or staffing assumptions are labelled as illustrative. Site-supervisor appointment remains restricted, and no successor is inferred from technical competence.

The decision memo and outcome show field work retained, relief hours, deferred work, mentor availability, continuing GM accountability and the absence of an independently authorised supervisor successor. Changing a coverage choice invalidates any older decision.

**Verification before PR review:** 30/30 local scenario tests and scripted desktop/mobile Chromium walkthroughs passed using in-memory concatenated JavaScript modules. At this historical stage, actual live ES-module loading was untested; a subsequent [v0.9 published-browser verification](https://github.com/NathanTaylorOps/workforce-capability-development/actions/runs/38161773855) passed. Independent usability and formal accessibility audits remain outstanding. [Scope, assumptions and verification](docs/qa/WORKFORCE_COVERAGE_V04.md).

## Succession readiness and continuity in v0.5

The GM must also decide how to protect supervisory knowledge and prepare an appropriate handover, independently from the immediate four-hour field coverage plan. Fictional options include developing interested junior Jordan, sharing specialist knowledge with leading hand Morgan, or preparing an externally qualified supervisor search. Each choice exposes what is observed, what is unknown, a knowledge-transfer action, a named management follow-up and an unresolved succession risk.

A separately recorded fictional GM handover review is now required before a bounded planning assignment can proceed. **None of these choices establishes an authorised independent supervisor**. Site accountability stays with the GM; a planned handover does not fill a vacancy. The outcome and exported decision memo preserve the chosen strategy, remaining evidence gaps and risks.

**Local verification:** 38/38 scenario tests, plus desktop and mobile scripted Chromium walkthroughs, passed. The browser smoke tests used in-memory concatenated modules rather than a hosted ES-module graph. [PR #10](https://github.com/NathanTaylorOps/workforce-capability-development/pull/10) was merged and the v0.5 Pages deployment succeeded; the later [published v0.9 comparison flow](https://github.com/NathanTaylorOps/workforce-capability-development/actions/runs/38161773855) has now been tested in real desktop/mobile Chromium. Full-product usability and accessibility audits are still outstanding. [Assumptions and verification](docs/qa/SUCCESSION_CONTINUITY_V05.md).

## Organisational capacity and key-person dependency in v0.6

The delivered v0.6 slice adds a **four-role fictional organisational view** covering site supervision, field delivery, technical mentoring and estimating/scheduling. The GM can compare protecting contingency mentor time, assigning one additional coached handover to Jordan, or investigating external training support. Mentor capacity is bounded and each option exposes delivery and key-person dependency consequences.

**No option certifies a successor, grants site-supervision authority, or turns an unverified external trainer into available capacity.** The fictional scenario remains single-week and illustrative, not a live staffing planner or business-wide succession model.

**Historical verification:** 46/46 local Node.js scenario tests and scripted desktop/mobile browser walkthroughs passed on the v0.6 development branch. GitHub CI and Pages deployment subsequently passed; v0.9 published-module testing later passed, while independent user and accessibility reviews remain outstanding. [Detailed v0.6 assumptions and test limitations](docs/qa/ORGANISATIONAL_DEPTH_V06.md).

## Critical-role absence stress test in v0.7

[Feature #13](https://github.com/NathanTaylorOps/workforce-capability-development/issues/13) lets a portfolio visitor simulate Casey (GM) or Reese (estimator) being unavailable for a fictional week. Every existing responsibility remains visible as **covered**, **partially supported**, or **uncovered**. Technical contribution does not confer supervisory authority; during Casey's absence, new fictional GM approvals are blocked until the baseline is restored. Reset restores the original synthetic fixture.

This is not real-time staff availability information, personnel advice, or evidence of actual authorisation. This feature was delivered through [PR #16](https://github.com/NathanTaylorOps/workforce-capability-development/pull/16), merged and published. The separate v0.9 browser workflow later verified the role-absence journey on the live site.


## Continuity decision comparison in v0.9

[Feature #15](https://github.com/NathanTaylorOps/workforce-capability-development/issues/15) adds a two-response comparison for the same Casey or Reese hypothetical absence. Both responses retain **exactly the same exposure baseline**; options differ only in illustrative work deferral, sourcing and human follow-up. No candidate, qualified hours or authority are automatically added. The visitor can propose an option for external human review, then export a clearly unapproved fictional comparison record. This is **not** a staffing, hiring, safety or commercial approval.

The issue/PR conversation holds evolving requirements and verification evidence; durable scenario assumptions remain alongside the code. This feature was delivered through [PR #18](https://github.com/NathanTaylorOps/workforce-capability-development/pull/18), approved by the owner, merged and published; the real deployed comparison and export flow passed browser smoke testing.


## Published-site functional smoke test — release gate #19

The [release-gate issue #19](https://github.com/NathanTaylorOps/workforce-capability-development/issues/19) tracks an actual **HTTPS, browser-executed** end-to-end check rather than only local in-memory simulations. [GitHub Actions](.github/workflows/live-smoke.yml) launches Chromium against the deployed Pages URL after successful publication, checking that real JavaScript modules load, the visitor can navigate to Step 5, compare Casey and Reese absences, preserve identical role exposure in both alternatives, export an unapproved fictional comparison, and use the mobile layout without horizontal overflow. The workflow checks the published version against the deploying commit and captures failure evidence.

**Verified successful published run:** [#38161773855](https://github.com/NathanTaylorOps/workforce-capability-development/actions/runs/38161773855), confirming real desktop and mobile flows; [milestone #12](https://github.com/NathanTaylorOps/workforce-capability-development/issues/12) is complete. The automated scenario remains fictional and does not constitute a formal WCAG/accessibility audit, user acceptance test, role-authorisation check or personnel-management certification.

A completed decision can be previewed as a management brief and printed or saved as PDF using the browser. After comparing two runs, the brief includes both recorded decisions. It sets out the operating position, evidence, capacity, unresolved authority and required follow-up. All figures and people remain fictional.
