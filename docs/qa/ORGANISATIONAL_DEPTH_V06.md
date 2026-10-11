# v0.6 — Organisational depth, capacity and knowledge dependencies

**Status:** Working branch proposed for review; the fictional scenario is not an HR, rostering, legal, or certification product. All workers, names, roles and resource figures are invented teaching fixtures.

## Management problem

A single-person development plan can appear successful while the organisation remains exposed to vacancy, duplicated managerial workload and critical knowledge concentrated in individuals. The existing prototype already models Alex's four displaced field-work hours and a provisional knowledge-transfer strategy; this version connects those decisions to a fictional **four-role organisational view** and finite mentor capacity.

## Implemented behaviour in this branch

- A four-role board describes site supervision (Casey), field delivery (Alex), technical mentoring (Morgan), and estimating/scheduling (Reese). **Role statuses describe operational coverage and evidence limits, not workers' value or ability.**
- Three management resource responses: protect the final hour for contingencies, allocate that hour to Jordan's coached practice, or investigate separately funded external instruction without asserting that it is booked.
- A deterministic **3-hour** mentor constraint: 2 hours reserved for Alex, at most 1 additional hour for Jordan. No plan produces fictitious extra mentor hours or a verified successor.
- If the selected succession plan promises Jordan a coached handover but the organisational plan preserves the hour without allocating support, the scenario shows the gap and withholds the bounded planning task pending a compatible resource choice.
- An organisation plan is recorded as a separate GM follow-through action. Changes to field coverage, succession or the allocation invalidate dependent review approvals and any previously exported management decision.
- The outcome screen, JSON record and copyable management memo include the chosen resource response, role-specific exposure and explicitly unresolved dependencies.
- The estimator's key-person dependency remains visible regardless of the decisions made for Alex, demonstrating the limited scope of a single workforce investment.

## Verification conducted locally

- `node --check` for all three source modules.
- `node --test tests/engine.test.js`: **46/46 tests passed**, including eight new tests for the four-role board, review order, mentor allocation, knowledge risk, unverified training, decision invalidation and deterministic export.
- Chromium smoke tests at **1440 × 1000** and **390 × 844**, using actual HTML/CSS and an **in-memory concatenation of ES modules** because this verification environment blocked local HTTP navigation. Confirmed the review → evidence → field coverage → succession → organisation allocation → scoped decision → outcome path, zero uncaught browser errors, four rendered role cards, no horizontal viewport overflow and a generated organisational decision record.
- The browser simulation does **not** verify actual hosted module requests, accessibility compliance, performance on real devices or external user acceptance. CI and Pages deployment remain pending until review and merge.

## Key limitations and design safeguards

- The sample fictional staffing picture is **not** a real organisation chart, workforce forecast, or personnel data system.
- A resource allocation does **not** establish a qualification, actual availability, employment eligibility, licence, safety authority or job readiness.
- Missing information remains open. “Single documented owner” does not establish a measured probability of absence or turnover.
- Mentor hours describe an invented week and exclude other real-world demands and pay/cost modelling.
- All manager sign-offs in the demo are **simulated pedagogical actions** without real user authentication or assessors.
- No comparison of individual employees' worth, automated adverse employment action, or unsourced return-on-investment calculations.

## Further work after approval

1. Independently smoke-test the deployed ES module graph and keyboard navigation at the public URL.
2. Add more robust integration/E2E coverage if this moves beyond a single static scenario.
3. Test readability and comprehension with relevant actual practitioners or recruiters (attribute feedback only when received).
4. Broaden the organisation model only after documenting the dependencies, role interfaces, manager obligations, and sources of relevant capacity data.