# Prototype verification log

**Scope:** First interactive fictional leadership journey on the proposed prototype branch. Verification is a local self-check, **not independent review or production certification**.

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

## Planned CI and deployment checks (not yet passed)

- Pull-request CI in GitHub Actions.
- GitHub Pages deployment in repository configured for GitHub Actions.
- Load the actual deployed module graph using HTTPS.
- Keyboard traversal, zoom/reflow, screen reader, colour contrast and reduced-motion accessibility testing.
- Full browser automation across alternative decisions and responsive widths.
- External user/recruiter validation of comprehension and value.

## Open product gaps

The current prototype supports **one** fictional scenario with guided actions and an exportable management memo. It does not implement live workforce scheduling, genuine licence/assessor validation, actual employee assessments, real employee records, multiple-stakeholder permissions, full simulated branching comparison, or legal decision support. The current evidence count rule is intentionally simplified and must not be generalised to any real occupation.
