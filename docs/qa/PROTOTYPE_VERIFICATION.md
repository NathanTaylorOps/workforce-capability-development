# Prototype verification log

**Scope:** First interactive fictional leadership journey, now merged into `main` and deployed through GitHub Pages. Verification includes local self-checks and GitHub Actions evidence, **not independent review or production certification**.

## Automated scenario rules

- Environment: Node.js v22.16.0 / Linux.
- Command: `npm run check` (syntax checks for the three modules, followed by `node --test tests/*.test.js`).
- Result: **11/11 unit tests passed**.
- Tests cover deterministic reset and replay, prior skills, planning evidence versus limited delegation, blocked supervisory appointment, no duplicate observations, missing evidence, alternate paths, employer support commitments, mentoring limits, decision memo and invalid actions.

## Scripted browser smoke test

- Environment: Chromium headless, Playwright Python.
- Due to this verification environment blocking page navigation for both local HTTP and `file:` URLs, browser smoke tests were run with the actual HTML/CSS and a temporary in-memory concatenation of the three application scripts. **This validates the core browser interactions and presentation, but not the deployed ES module loading path.** Module syntax was independently checked with Node.js.
- Desktop: 1440 × 1050; initial brief → alternative path → site path → manager commitments → evidence → simulated practice → scoped decision → outcome. **Passed without JavaScript runtime errors.**
- Mobile: 390 × 844; brief → path selection. **Passed without JavaScript runtime errors or horizontal overflow.**
- Screenshots were reviewed locally; not evidence of an independent UX or WCAG audit.

## GitHub Actions and publishing verification

- [PR #5](https://github.com/NathanTaylorOps/workforce-capability-development/pull/5) was merged into `main` at commit `2febb043b6bd13ce8cd959ef1d7379dcdc5a0564`.
- [Main-branch application CI](https://github.com/NathanTaylorOps/workforce-capability-development/actions/runs/38077504506) **passed**; it runs the same scenario/syntax checks described above.
- The [GitHub Pages publishing run](https://github.com/NathanTaylorOps/workforce-capability-development/actions/runs/38077504496) initially failed at `actions/configure-pages@v5` because the Pages site had not been enabled. The repository owner enabled **Settings → Pages → Build and deployment → GitHub Actions**. The failed deployment was re-run, and **attempt 2 passed**: configuration, site upload and Pages deployment all completed successfully.
- The deployment job's reported environment URL is **https://nathantaylorops.github.io/workforce-capability-development/**. This confirms the publication workflow succeeded; it does **not** independently verify that a browser can load every script or complete all scenario steps from the live URL.

## Outstanding live-site and release checks

- Open the live URL via HTTPS and confirm stylesheet, JavaScript modules, event handlers and all six steps load correctly. This independent live-site smoke test could not be completed from the verification environment.
- Keyboard traversal, zoom/reflow, screen-reader semantics, colour contrast and reduced-motion accessibility testing.
- Full browser automation across alternative decisions and responsive widths using the deployed site rather than in-memory script substitution.
- External user/recruiter validation of clarity, fairness and value.

**Reviewer smoke-test checklist:** Open the published URL; verify it renders a fictional company and employee; choose technical and cross-functional paths before returning to site coordination; record a mentor/support action; view competency evidence; attempt a management decision and confirm that unsatisfied independent site-supervisor authority remains blocked; open the outcome memo; reset the journey. Record any failure with browser, screen size, step and message.

## Open product gaps

The current prototype supports **one** fictional scenario with guided actions and an exportable management memo. It does not implement live workforce scheduling, genuine licence/assessor validation, actual employee assessments, real employee records, multiple-stakeholder permissions, full simulated branching comparison, or legal decision support. The current evidence count rule is intentionally simplified and must not be generalised to any real occupation.

## Proposed v0.2 iteration verification (feature branch; not deployed yet)

- Local Node.js 22 `npm run check` passed **15/15** scenario-rule tests, including coaching vs independent evidence, reviewer permission simulation, explicit review before bounded delegation, stale decision invalidation, deterministic replay and existing alternative career directions.
- Desktop (1360×900) and mobile (390×844) guided browser flow completed, including two fictional independent planning observations, GM evidence review, bounded planning decision, blocked independent supervisor appointment, and no horizontal overflow or JavaScript runtime errors.
- Browser smoke used **in-memory concatenation** of the same JS modules because the test container blocks local URL navigation. This does **not** verify hosted ES-module loading or constitute an independent production accessibility test.
- New workflow remains hypothetical and is **not** evidence of formal historic sign-off practices, an accredited competency assessment or real identity/authority validation.
