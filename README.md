# Workforce Capability & Development

**A practical, skills-first demonstration of people development, managerial judgment and organisational capability.**

**Status: Functional prototype (v0.2).** The latest source implements a richer evidence workflow. The [GitHub Pages site](https://nathantaylorops.github.io/workforce-capability-development/) deploys from `main` after successful publishing checks; it may temporarily run an earlier version while a feature pull request is open or deployment is underway. The first fictional leadership scenario is implemented and GitHub Pages reports a successful deployment. This is **not** a complete HR platform or a production-ready tool. The hosted site's complete browser functionality has not yet been independently smoke-tested after deployment.

## Experience the prototype

**[Open the live Leadership Studio](https://nathantaylorops.github.io/workforce-capability-development/)** — public, synthetic-data demonstration hosted on GitHub Pages. [Deployment workflow: successful on second attempt](https://github.com/NathanTaylorOps/workforce-capability-development/actions/runs/38077504496).

**Leadership Studio — Develop a future leader.** Act as General Manager of fictional **Hawthorn Projects** and make a development decision about fictional field employee Alex. The guided six-stage experience lets you:

1. Understand the employee, the organisation and available mentor capacity.
2. Compare **site coordination, technical specialisation and estimating/scheduling** pathways without a fixed promotion ladder.
3. Record fictional mentor follow-through and correct a delayed employer-funded training commitment.
4. Inspect competency evidence and add pre-authored, fictional work observations.
5. Make an evidence-based management decision. **Independent site-supervisor appointment remains blocked** where the evidence and authority are insufficient.
6. Review the operational consequences and copy or download a fictional decision record.

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
| Scenario-rule tests | v0.2 has **15 local unit tests passing**; see the latest [Actions checks](https://github.com/NathanTaylorOps/workforce-capability-development/actions/workflows/ci.yml) for branch and deployed `main` verification |
| Browser interaction testing | Local scripted desktop/mobile flow performed; report below |
| Public GitHub Pages deployment | GitHub Actions **successful**, [published URL](https://nathantaylorops.github.io/workforce-capability-development/); live browser smoke test still outstanding |
| Independent reviewer / accessibility and release validation | Not yet completed |

**Maintainer:** [NathanTaylorOps](https://github.com/NathanTaylorOps). No external contributors or independent reviews are claimed.

## Evidence review in v0.2

The v0.2 workflow requires a completed fictional mentoring session before simulated independent practice can be recorded. Coached records and unreviewed observations do **not** prove independent competence. After two pre-authored independent planning tasks, the visitor must explicitly perform a fictional GM evidence review before the bounded planning assignment can be considered. Independent site-supervision authority remains blocked. Manager support changes invalidate previously generated decisions so exported records cannot silently become stale. All evidence, checks and reviewer roles are invented teaching fixtures; the demo does not authenticate reviewers or certify workers.
