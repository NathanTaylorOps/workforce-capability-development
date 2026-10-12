
/** Explain two recorded fictional decisions without changing domain rules. */
import {captureManagementRun,compareManagementRuns} from './management-comparison.js';

export function managementRunPanel({first, state, visible, button, safe}) {
  if (!first) {
    return `<section class="surface-card run-panel" aria-labelledby="run-panel-title">
      <span class="overline">COMPLETE DECISION COMPARISON</span>
      <h2 id="run-panel-title">Compare a different management approach.</h2>
      <p>Save this decision, then work through the fictional case again from its original starting point. The first run's assessments and approvals are not transferred.</p>
      ${button('Save first decision and try another', 'save-first-management-run', '', 'outline')}
    </section>`;
  }
  if (!visible) {
    return `<section class="surface-card run-panel" aria-labelledby="run-panel-title">
      <span class="overline">COMPLETE DECISION COMPARISON / SECOND RUN</span>
      <h2 id="run-panel-title">Review the two approaches.</h2>
      <p><strong>First decision:</strong> ${safe(first.decision.action)}.</p>
      <p>The second run started from the same initial fictional scenario. No evidence review or management approval was carried across.</p>
      ${button('Compare both decisions', 'compare-management-runs')}
    </section>`;
  }
  const report=compareManagementRuns(first,captureManagementRun(state,2));
  const metrics=run=>`<dl class="run-metrics">
    <div><dt>Management decision</dt><dd>${safe(run.decision.action)}</dd></div>
    <div><dt>Development direction</dt><dd>${safe(run.decision.pathway)}</dd></div>
    <div><dt>Field hours remaining</dt><dd>${safe(run.decision.workforce.alexFieldHours)}h</dd></div>
    <div><dt>Deferred work</dt><dd>${safe(run.decision.workforce.deferredHours)}h</dd></div>
    <div><dt>Provisional relief plan</dt><dd>${safe(run.decision.workforce.reliefHours)}h</dd></div>
    <div><dt>Uncovered responsibilities</dt><dd>${safe(run.decision.absence.uncovered)}</dd></div>
    <div><dt>Next management action</dt><dd>${safe(run.decision.next)}</dd></div>
  </dl>`;
  return `<section class="surface-card run-panel" aria-labelledby="run-panel-title">
    <span class="overline">TWO DECISIONS / SAME FICTIONAL STARTING CONDITIONS</span>
    <h2 id="run-panel-title">What changes between the decisions?</h2>
    <p>Both approaches start with the same versioned case (${safe(report.fixture)}). The differences reflect recorded choices and hypothetical outcomes, not a change to the initial workforce.</p>
    <div class="run-compare-columns">
      <article class="run-route"><span class="overline">FIRST DECISION</span><h3>${safe(report.runs[0].decision.action)}</h3>${metrics(report.runs[0])}</article>
      <article class="run-route"><span class="overline">SECOND DECISION</span><h3>${safe(report.runs[1].decision.action)}</h3>${metrics(report.runs[1])}</article>
    </div>
    <div class="run-difference-list">
      <h3>Differences and outstanding obligations</h3>
      ${report.differences.length ? `<ul>${report.differences.map(item=>`<li><strong>${safe(item.label)}</strong><div class="run-values"><span>First: ${safe(item.first)}</span><span>Second: ${safe(item.second)}</span></div><p>${safe(item.note)}</p></li>`).join('')}</ul>` : '<p>These decisions produce the same recorded comparison fields. No operational difference is implied.</p>'}
      <p class="run-unchanged"><strong>Unchanged:</strong> ${safe(report.unchanged.map(x=>x.label).join(', ') || 'None of the reviewed fields')}.</p>
    </div>
    <p class="run-boundary"><strong>Limit:</strong> These are hypothetical decisions and planning figures. They do not verify staffing, qualify a person, approve a site or establish measured business results.</p>
    <div class="run-actions">
      ${button('Download fictional comparison JSON','download-management-runs','','outline')}
      ${button('Try another second approach','retry-management-run','','quiet')}
    </div>
  </section>`;
}
