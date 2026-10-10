# ADR-0001 — Dependency-free static prototype

**Status:** Proposed for owner approval · October 2026

## Context

The first deliverable is a portfolio-facing, fictional management decision experience, not an authenticated multi-tenant workforce product. It must start quickly, run on GitHub Pages, behave deterministically, and avoid storage of personnel data. No backend or licensed HR data is required.

## Decision for the prototype

Use **plain ECMAScript modules, semantic HTML and responsive CSS**. Separate fictional domain fixtures (`src/data.js`), pure scenario rules (`src/engine.js`) and browser interactions (`src/app.js`). There are no npm package dependencies or build step. Use Node.js's native test runner for rules. Build and deploy only the five required frontend files as a static site.

## Why this rather than a framework now?

- Zero third-party runtime dependencies and zero infrastructure cost for hosting the demonstration.
- No authentication, server database or personal data to manage.
- Small domain rules remain simple to inspect and test.
- A framework migration remains possible when multiple scenarios or complex UI state actually justify it.

## Trade-offs / future review

- All visible UI is rendered through templates in one app module; further screens would require componentisation and stronger integration-testing infrastructure.
- Browser E2E testing and accessibility audits are needed before claiming production quality.
- Public synthetic scenario state exists only in memory; resetting or reloading removes changes. Full branch comparison and persistence are not implemented.
- This is not suitable for real HR records or production user accounts. Revisit architecture and security if the scope changes.

**Approval:** Not yet requested/recorded from maintainer. This ADR describes a functional prototype, not a final product commitment.
