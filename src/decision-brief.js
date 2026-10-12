import {SCENARIO_NAME, SCENARIO_ASSUMPTIONS} from './data.js';
import {captureManagementRun, compareManagementRuns} from './management-comparison.js';
import {decisionChoices} from './engine.js';

const safe = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const list = values => values.map(x => `<li>${safe(x)}</li>`).join('');

export function decisionBrief(state, first = null) {
  const current = captureManagementRun(state, first ? 2 : 1);
  const comparison = first ? compareManagementRuns(first, current) : null;
  const runs = comparison ? comparison.runs : [current];
  // Alternatives are the defined scenario options, not an invented deliberation history.
  const alternatives = decisionChoices(state);
  return runs.map((run, index) => {
    const d = run.decision, w = d.workforce, o = d.organisation;
    return `<article class="brief-page" aria-labelledby="brief-title-${index}">
      <header><p class="brief-status">FICTIONAL SCENARIO · MANAGEMENT DECISION RECORD</p><h1 id="brief-title-${index}">${safe(SCENARIO_NAME)} — decision brief</h1><p>Scenario ${safe(d.fixture)}${comparison ? ` · Decision ${index + 1} of 2` : ''} · Accountable manager: Casey (GM)</p></header>
      <section><h2>Operating position</h2><p>Develop Alex’s capability while maintaining delivery commitments, mentor capacity and clear authority. ${safe(SCENARIO_ASSUMPTIONS[0])} ${safe(SCENARIO_ASSUMPTIONS[1])}</p></section>
      <section><h2>Decision and basis</h2><p><strong>${safe(d.action)}.</strong> ${safe(d.summary)} Development direction: ${safe(d.pathway)}.</p><p>Employee position: ${safe(d.employeeVoice)}</p><p><strong>Alternative scenario routes:</strong> ${safe(alternatives.filter(x => x.title !== d.action).map(x => x.title).join('; '))}. Independent appointment remains blocked.</p></section>
      <section><h2>Evidence and authority</h2><p><strong>Supported requirements:</strong> ${safe(d.evidence.filter(x => x.status === 'supported').map(x => x.skill).join(', ') || 'None recorded')}.</p><p><strong>Missing evidence:</strong> ${safe(d.unknown.join(', ') || 'None recorded')}. <strong>Pending evidence review:</strong> ${safe(d.needsReview.join(', ') || 'None recorded')}.</p><p>${safe(d.restricted)} Coaching and training attendance do not establish independent competence or delegated authority.</p></section>
      <section><h2>Capacity, delivery and risk</h2><p>${safe(d.impact)}</p><dl><div><dt>Field work with Alex</dt><dd>${safe(w.alexFieldHours)}h</dd></div><div><dt>Provisional relief</dt><dd>${safe(w.reliefHours)}h</dd></div><div><dt>Deferred work</dt><dd>${safe(w.deferredHours)}h</dd></div><div><dt>Work without cover plan</dt><dd>${safe(w.unaddressedHours)}h</dd></div><div><dt>Mentor allocation</dt><dd>${safe(o.allocatedMentorHours)}/${safe(o.mentorAvailableHours)}h</dd></div><div><dt>Mentoring completed</dt><dd>${safe(d.managerSupport.completedMentoringSessions)} sessions</dd></div></dl><p><strong>Plan review status:</strong> Field coverage ${w.confirmed ? 'review recorded' : 'not reviewed'}; succession ${d.succession.confirmed ? 'review recorded' : 'not reviewed'}; resources ${o.confirmed ? 'review recorded' : 'not reviewed'}. These are scenario reviews; delivery remains provisional.</p><p><strong>Training:</strong> ${safe(d.managerSupport.training)}. <strong>Succession risk:</strong> ${safe(d.succession.risk)}</p><p><strong>Absence case:</strong> ${safe(d.absence.label)}; ${safe(d.absence.uncovered)} uncovered responsibilities.</p><ul>${list(o.risks)}</ul></section>
      <section><h2>Management follow-up</h2><p><strong>Required action:</strong> ${safe(d.next)}</p><p><strong>Development review:</strong> ${safe(d.weeklyReview?.action || 'Not recorded')}. <strong>Action owner:</strong> ${safe(d.weeklyReview?.owner || 'Casey (GM) — confirm assignment')}. <strong>Next review point:</strong> ${safe(d.weeklyReview?.milestone || 'Not recorded; Casey must agree a review point before further delegation')}.</p></section>
      ${comparison ? `<section><h2>Comparison with the other decision</h2><p>Both decisions use the same initial scenario. ${comparison.differences.length ? safe(comparison.differences.map(x => x.label).join('; ')) + ' differ.' : 'No differences in the recorded comparison fields.'} Neither decision establishes independent site-supervision authority.</p></section>` : ''}
      <footer>All people, evidence, hours and outcomes are fictional. Figures are scenario planning assumptions; relief requires availability, competence and budget checks. This record is not a real appointment, staffing approval or evidence of measured business results.</footer>
    </article>`;
  }).join('');
}

export function briefPreview(state, first, button) {
  return `<main id="main" class="brief-preview" tabindex="-1"><div class="brief-controls"><h2>Management decision brief</h2>${button('Print / save as PDF','print-brief')}${button('Return to decision','close-brief','','outline')}</div>${decisionBrief(state, first)}</main>`;
}
