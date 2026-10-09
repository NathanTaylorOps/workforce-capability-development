# Working agreement — solo-maintained project

**Status:** Proposed for maintainer approval.

## Working cycle

1. **Investigate:** Establish the management problem, current practice, source quality and alternatives.
2. **Discuss:** Ask the owner targeted questions where first-hand operational experience or design preference is essential.
3. **Specify:** Define the smallest coherent experience, boundaries, failure states and acceptance criteria before production coding.
4. **Implement:** Make a focused change on a branch; avoid unrelated rewrites and duplicated domain logic.
5. **Verify:** Run relevant tests; review the actual diff, scenario state, accessibility and unintended consequences.
6. **Review:** Present a concise summary, evidence, limitations and a pull request for owner acceptance.
7. **Integrate:** Merge only approved work; update documentation and the next active priority.

Research, UX and architecture choices can require several exchanges. We should not pretend an unreviewed screen or a green check alone proves product quality.

## Repository and authorship

- The repository owner is NathanTaylorOps. Only accurately attributed contributions should be committed.
- Do not fabricate coauthors, reviewers, user studies, endorsements, tests, signed-off documents or operational results.
- An assistant or tool can prepare changes; GitHub attribution must be checked before merges if the owner requires commits to appear under their account.
- Third-party dependencies and reused code retain required licence/attribution notices.

## Issue and PR expectations

Each task should have a user/management problem, scope, evidence sources, known risks, acceptance criteria and test requirements. Each pull request should identify changes, checks actually performed, screenshots where relevant, unresolved limitations and owner decision.

A solo repository can use self-review and automated validation; it should never impersonate an independent human sign-off.

## Public-data boundary

Keep former employee details, personnel concerns, confidential contracts, employer-sensitive records, private reference contacts and raw real-world interview notes outside public Git history. Publish only independently reviewed, properly anonymised or authorised case-study claims.

## Quality and release rules

- Implemented ≠ tested ≠ independently validated ≠ production ready.
- Competence, evidence, licences, permissions and availability remain distinct throughout UI and logic.
- No unstable arbitrary people-ranking algorithms or unsupported causal ROI.
- Fix serious accessibility, safety, privacy and logic defects before release.
- Store validated versioned synthetic fixtures and test the same decisions across screens.
- Maintain a truthful README, change history, known-limitations list and release record.
