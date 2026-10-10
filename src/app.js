import { COVERAGE_OPTIONS, SUCCESSION_OPTIONS, PATHWAYS, SCENARIO_ASSUMPTIONS, SCENARIO_NAME, SKILLS, STEPS, WEEKLY_CHECKIN, WORKFORCE_FIXTURE } from './data.js';
import { addSampleObservation, chooseCoveragePlan, choosePath, chooseSuccessionPlan, confirmCoveragePlan, confirmSuccessionPlan, decide, decisionChoices, hearEmployee, initialState, memoText, observationsFor, recordMentoring, recordWeeklyReview, rescheduleTraining, reviewEvidence, selectSkill, skillById, skillStatus, skillStatusLabel, successionImpact, supportSummary, updateStep, workforceImpact } from './engine.js';

let state = initialState();
let notice = '';
const root = document.getElementById('app');
const safe = input => String(input).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
const button = (label, action, value = '', kind = 'primary', extra = '') => `<button type="button" class="btn btn-${kind}" data-action="${safe(action)}" data-value="${safe(value)}" ${extra}>${label}</button>`;
const tone = status => ({ supported: 'good', review: 'pending', unknown: 'unknown' })[status];
const status = (id) => `<span class="status status-${tone(skillStatus(state, id))}"><span class="status-dot"></span>${skillStatusLabel(skillStatus(state, id))}</span>`;
const ico = (symbol, label) => `<span class="icon" aria-label="${safe(label)}" role="img">${symbol}</span>`;
const activePath = () => PATHWAYS[state.path];

function sidebar() {
  return `<aside class="navigation-panel" aria-label="Scenario progress">
    <div class="nav-heading">THE LEADERSHIP JOURNEY <span>01 / 01</span></div>
    <nav aria-label="Scenario steps" class="step-nav">
      ${STEPS.map((s, i) => `<button type="button" class="step-link ${state.step === i ? 'is-active' : ''}" data-action="step" data-value="${i}" ${state.step === i ? 'aria-current="step"' : ''}><span class="step-number">${String(i + 1).padStart(2, '0')}</span><span class="step-label">${safe(s.title)}</span>${i < state.step ? '<span class="step-visited" aria-label="Visited">✓</span>' : ''}</button>`).join('')}
    </nav>
    <div class="sidebar-quote"><span class="quote-sign">“</span><p>Develop the person, strengthen the organisation.</p><span class="quote-author">A principle worth testing</span></div>
    <div class="sidebar-foot"><span class="online-dot"></span> Offline-first demonstration<br><span class="small">No real employee data. No account required.</span></div>
  </aside>`;
}
function topbar() {
  return `<header class="topbar">
    <div class="brand"><div class="brand-mark" aria-hidden="true">W<span>.</span></div><div class="brand-text"><strong>Workforce Capability</strong><span>& Development</span></div></div>
    <div class="top-actions"><span class="fiction-pill"><span class="fiction-dot"></span> FICTIONAL CASE STUDY</span>${button('↺ <span class="reset-label">Reset scenario</span>', 'reset', '', 'quiet')}</div>
  </header>`;
}
function heading(kicker, title, desc) {return `<div class="section-heading"><span class="overline">${kicker}</span><h1 id="page-title">${title}</h1><p>${desc}</p></div>`;}
function progressButtons({ showBack = true, next = true, nextLabel = 'Continue', nextStep = state.step + 1 } = {}) {
  return `<div class="page-controls">${showBack ? button('← Previous', 'step', String(state.step - 1), 'outline') : '<span></span>'}${next ? button(`${nextLabel} <span aria-hidden="true">→</span>`, 'step', String(nextStep), 'primary') : ''}</div>`;
}
function personRow() {
  return `<div class="personline"><div class="avatar">AM</div><div><strong>Alex</strong><small>Field operative · Hawthorn Projects</small></div><span class="person-tag">Fictional</span></div>`;
}
function brief() {
  return `${heading('01 · UNDERSTAND THE SITUATION', 'Better decisions start with the person.', 'You are the General Manager of a fictional construction business. Your task is to grow capability without losing sight of project delivery or the employee’s ambitions.')}
    <section class="hero-panel">
      <div class="hero-decoration" aria-hidden="true"><span></span><span></span><span></span></div>
      <span class="hero-eyebrow">HAWTHORN PROJECTS / WORKFORCE CASE 01</span>
      <h2>Potential is not<br><em>a job title.</em></h2>
      <p>A promising field employee wants to grow. The business needs stronger coordination. A conventional promotion looks tempting—but is it the right decision?</p>
      <div class="hero-tags"><span>One employee</span><span>Three possible directions</span><span>Real management trade-offs</span></div>
    </section>
    <div class="columns-two">
      <section class="surface-card accent-card"><div class="eyebrow-icon">01 / THE EMPLOYEE</div>${personRow()}<p>Alex delivers consistently good technical work, has helped with scheduling and understands some commercial impacts. Alex is curious about leadership—but wants real practice before being responsible for a site.</p><div class="subtle-line">“I want to learn more, but I don’t want to be thrown in at the deep end.”</div></section>
      <section class="surface-card"><div class="eyebrow-icon">02 / THE ORGANISATION</div><h3>Two projects. Limited mentor time.</h3><p>Experienced staff are already stretched. The business needs more coordination without compromising safety, quality or commitments to existing employees.</p><div class="metric-row"><div><strong>02</strong><small>Active projects*</small></div><div><strong>03h</strong><small>Mentor time / week*</small></div></div></section>
    </div>
    <div class="note-box"><span class="note-icon">i</span><p><strong>What is this?</strong> An interactive decision exercise—not a training certificate, promotion system or record of a real person. All details marked * and every character are invented for this demonstration.</p></div>
    ${progressButtons({showBack:false,nextLabel:'Start the assessment'})}`;
}
function pathway() {
  return `${heading('02 · CHOOSE A DIRECTION', 'A career is not a ladder.', 'Start with Alex’s existing strengths and interests. There is more than one valuable direction—and no assumed promotion order.')}
    <div class="capability-ribbon"><div><span class="ribbon-label">RECOGNISED STRENGTHS</span><strong>Trade quality · Commercial awareness</strong></div><p>Both are supported by example work observations, regardless of current job title.</p></div>
    <fieldset class="path-fieldset"><legend class="field-label">Select an agreed development direction</legend><div class="path-grid">${Object.values(PATHWAYS).map(p=>`<button type="button" data-action="path" data-value="${safe(p.id)}" class="path-card ${p.id === state.path ? 'path-selected' : ''}" aria-pressed="${p.id === state.path}"><span class="path-icon">${p.id === 'site' ? '↗' : p.id === 'specialist' ? '✳' : '⇄'}</span><span class="path-type">${safe(p.tag)}</span><strong>${safe(p.title)}</strong><span class="path-detail">${safe(p.subtitle)}</span><span class="path-end">${p.id === state.path ? '✓ Selected direction' : 'Explore this direction →'}</span></button>`).join('')}</div></fieldset>
    <section class="surface-card path-explanation"><span class="overline">WHAT THIS CHOICE MEANS</span><h3>${safe(activePath().title)}</h3><div class="explain-grid"><div><span class="text-label">DEVELOPMENT SUPPORT</span><p>${safe(activePath().supports)}</p></div><div><span class="text-label">WORKFORCE CONSIDERATION</span><p>${safe(activePath().consequence)}</p></div></div><div class="inline-alert">Changing direction never treats a technical pathway or career move as a failed promotion.</div></section>
    ${progressButtons()}`;
}
function weeklyReviewCard() {
  const record = state.weekly.record;
  const heard = state.weekly.heardEmployee;
  return `<section class="surface-card weekly-review" aria-labelledby="weekly-heading">
    <div class="card-head"><div><span class="overline">WEEKLY DEVELOPMENT CHECK-IN · ${safe(WEEKLY_CHECKIN.period)}</span><h3 id="weekly-heading">Evidence, conversation and follow-through.</h3></div><span class="pill pill-neutral">${record ? 'Review recorded' : 'Review due'}</span></div>
    <p class="review-intro">A qualitative management review: compare work evidence and contextual KPIs with the employee's perspective, mentor feedback and company commitments. No talent ranking or automatic promotion.</p>
    <div class="weekly-signals"><div><span class="text-label">WORK INDICATORS · CONTEXT MATTERS</span>${WEEKLY_CHECKIN.observations.map(signal=>`<div class="weekly-signal"><strong>${safe(signal.value)}</strong><span>${safe(signal.label)}</span><p>${safe(signal.context)}</p></div>`).join('')}</div><div><span class="text-label">LEADING-HAND FEEDBACK</span><p class="review-quote">“${safe(WEEKLY_CHECKIN.mentorFeedback)}”</p><span class="text-label">MANAGEMENT FOLLOW-THROUGH</span><p>${state.training === 'delayed' ? 'Company-funded external instruction is still delayed.' : 'Company-funded external instruction was rescheduled.'} ${state.mentoring}/2 planned mentoring sessions recorded.</p></div></div>
    <div class="weekly-employee"><div><span class="text-label">EMPLOYEE VOICE · TWO-WAY CONVERSATION</span>${heard ? `<p>“${safe(WEEKLY_CHECKIN.employeePerspective)}”</p>` : '<p>Alex’s own direction has not been heard in this week’s review. Ask before choosing a follow-up.</p>'}</div>${heard ? '' : button('Hear Alex’s perspective', 'hear-employee', '', 'outline')}</div>
    ${record ? `<div class="weekly-result" role="status"><span class="text-label">AGREED WEEKLY ACTION</span><strong>${safe(record.action)}</strong><p><b>Responsible:</b> ${safe(record.owner)}</p><p><b>Check next:</b> ${safe(record.milestone)}</p><p class="review-footnote">Historical snapshot: training was ${safe(record.supportAtReview.training)} when agreed. Newer support changes appear above; this review does not grant site authority.</p></div>` : `<fieldset class="weekly-actions" ${heard ? '' : 'disabled'}><legend class="text-label">CHOOSE ONE SUPPORTED NEXT ACTION</legend><div class="weekly-actions-grid">${WEEKLY_CHECKIN.options.map(option=>`<button type="button" class="weekly-action" data-action="weekly-action" data-value="${safe(option.id)}" ${heard ? '' : 'disabled'}><strong>${safe(option.title)} →</strong><small>${safe(option.milestone)}</small></button>`).join('')}</div></fieldset>`}
    <p class="review-footnote">Fictional example only. Work indicators are contextual observations—not a score. The manager remains accountable for commitments and the next check-in.</p>
  </section>`;
}
function plan() {
  const support = supportSummary(state);
  return `${heading('03 · COMMIT TO DEVELOPMENT', 'Growth needs support, not just targets.', 'A development plan must record what the employee will practise—and what the manager promises to provide.')}
    <section class="surface-card plan-card"><div class="card-head"><div><span class="overline">AGREED DEVELOPMENT DIRECTION</span><h3>${safe(activePath().title)}</h3></div><span class="pill pill-neutral">Manager + employee</span></div><div class="plan-target"><div class="target-emblem">◎</div><div><span class="text-label">FIRST PRACTICE MILESTONE</span><strong>${state.path === 'site' ? 'Prepare a two-trade work plan under supervision' : state.path === 'operations' ? 'Review a schedule and estimate assumptions with the team' : 'Deliver an observed quality review and coach a junior'}</strong><p>Assess an observable result, not training attendance alone.</p></div></div><div class="plan-checks"><div><span>01</span> Recognise Alex’s existing skills <b class="done-text">Completed</b></div><div><span>02</span> Agree direction with Alex <b class="done-text">Agreed</b></div><div><span>03</span> Provide coached practice <b>${state.mentoring}/2 sessions</b></div><div><span>04</span> Review observations and authority <b>Pending</b></div></div></section>
    <div class="columns-two"><section class="surface-card"><div class="card-head"><div><span class="overline">WORKPLACE MENTORING</span><h3>Time must be protected.</h3></div><span class="round-icon">◷</span></div><div class="big-stat">${support.completedSessions}<span>/2</span></div><p class="stat-description">Fictional sessions recorded in the current review period. Two hours of the mentor’s three available hours are allocated.</p><div class="thin-track"><div style="width:${state.mentoring * 50}%"></div></div>${button(state.mentoring>=2?'✓ Session recorded':'Record next fictional session', 'mentor', '', 'outline', state.mentoring>=2?'disabled':'')}</section>
      <section class="surface-card"><div class="card-head"><div><span class="overline">COMPANY COMMITMENT</span><h3>External instruction</h3></div><span class="round-icon">↗</span></div><span class="status ${state.training==='delayed'?'status-warning':'status-good'}"><span class="status-dot"></span>${state.training==='delayed'?'Delayed by employer':'Rescheduled by employer'}</span><p class="stat-description">The organisation agreed to arrange outside training. A missed commitment is a management action—not evidence of employee underperformance.</p>${button(state.training==='delayed'?'Reschedule fictional instruction':'✓ Manager action recorded', 'training', '', 'outline', state.training!=='delayed'?'disabled':'')}</section>
    </div>${weeklyReviewCard()}<div class="note-box"><span class="note-icon">i</span><p><strong>Support accountability:</strong> These actions change the manager’s follow-through record. They do not automatically increase Alex’s competence or confer authority.</p></div>
    ${progressButtons()}`;
}
function evidence() {
  const current = skillById(state.selectedSkill);
  const samples = observationsFor(state, current.id);
  const sampleCount = samples.filter(o => o.id.startsWith('sample-')).length;
  const eligible = sampleCount < current.samples.length && state.mentoring >= 2;
  const independent = samples.filter(o => o.practice === 'independent');
  const reviewReady = independent.length >= current.required && !state.reviews[current.id] && samples.some(o => o.assessment === 'unreviewed');
  const currentStatus = skillStatus(state, current.id);
  return `${heading('04 · EVIDENCE & JUDGMENT', 'Evidence is more than a count.', 'Coached practice shows development. Independently demonstrated tasks and a fictional GM evidence review are separate steps. Two independent observations are only a teaching rule for this fictional scenario, not a professional standard.')}
    <div class="evidence-layout"><section class="surface-card evidence-list"><div class="card-head"><div><span class="overline">ROLE-RELATED CAPABILITY</span><h3>What Alex can demonstrate</h3></div></div><div class="competency-list">${SKILLS.map(s=>`<button type="button" class="competency ${s.id===state.selectedSkill?'competency-current':''}" data-action="skill" data-value="${safe(s.id)}" aria-pressed="${s.id===state.selectedSkill}"><span class="skill-main"><span class="skill-name">${safe(s.name)}</span><span class="skill-group">${safe(s.tag)} · ${observationsFor(state,s.id).length} fictional records</span></span><span class="skill-status"><span class="status-indicator ${tone(skillStatus(state,s.id))}"></span><span>${skillStatusLabel(skillStatus(state,s.id))}</span></span></button>`).join('')}</div></section>
    <section class="surface-card evidence-detail"><span class="overline">SELECTED REQUIREMENT</span><h3>${safe(current.name)}</h3><p>${safe(current.description)}</p>${status(current.id)}<div class="evidence-separator"></div><div class="text-label">PRACTICAL OBSERVATIONS · FICTIONAL</div><ol class="observation-list">${samples.length ? samples.map(o=>`<li><span class="observation-dot"></span><div><strong>${safe(o.text)}</strong><small>${safe(o.source)} · ${safe(o.observer)}</small><span class="observation-phase">${safe(o.phase)} · ${o.practice==='coached'?'Coached practice':o.assessment==='verified'||state.reviews[current.id]?'Independent work · manager reviewed':'Independent work · needs manager review'}</span></div></li>`).join('') : '<li class="empty-observation">No relevant work observations recorded. This is unknown, not failure.</li>'}</ol>
    <div class="evidence-review-summary"><strong>Evidence check</strong><p>${independent.length} independently demonstrated task(s) · ${samples.length-independent.length} coached record(s). ${currentStatus==='supported'?'Requirement supported in this fictional review.':'A count of notes or coached tasks alone does not confirm readiness.'}</p></div>
    <div class="skill-footer">${eligible?button('Record next fictional independent task →','observe',current.id,'outline'):sampleCount>=current.samples.length?'<small>All fictional task samples recorded for this requirement.</small>':'<small>Complete the second fictional mentoring session on Step 3 before adding independent-practice evidence.</small>'}
      ${reviewReady?button('Record fictional GM evidence review','review',current.id,'outline'):''}
      <small>These are pre-written fictional records, not real assessments. The demo cannot verify an actual assessor or licence.</small></div></section></div>
    <section class="surface-card insight-card"><div class="insight-heading"><span class="overline">HYBRID ASSESSMENT</span><h3>What the numbers cannot tell us.</h3></div><div class="three-points"><div><strong>Work evidence</strong><p>Coached work and independent tasks have different evidentiary weight.</p></div><div><strong>Management judgment</strong><p>The fictional GM reviews context and confirms the limited example evidence.</p></div><div><strong>Authority</strong><p>Competence never confers a licence, site control or independent supervision.</p></div></div></section>
    ${progressButtons()}`;
}
function coveragePlanner() {
  if (state.path !== 'site') return `<section class="surface-card coverage-card"><span class="overline">ORGANISATIONAL EFFECT</span><h3>Changing direction also changes team capacity.</h3><p>The selected pathway is ${safe(activePath().title)}. This exercise only models the four-hour site-coordination reassignment; a real technical or cross-functional move requires its own coverage review. No site-supervisor succession is assumed.</p></section>`;
  const preview = workforceImpact(state);
  const selected = COVERAGE_OPTIONS.find(option => option.id === state.coverage.option);
  return `<section class="surface-card coverage-card" aria-labelledby="coverage-title">
    <div class="card-head"><div><span class="overline">WORKFORCE IMPACT · FICTIONAL WEEK</span><h3 id="coverage-title">Who covers the work while Alex develops?</h3></div><span class="pill pill-neutral">GM responsibility</span></div>
    <p class="coverage-intro">Four hours of supervised planning would displace four hours of Alex’s assigned field work. Choose what happens to that work <strong>before</strong> expanding responsibility.</p>
    <div class="coverage-metrics" aria-label="Illustrative workforce assumptions"><div><strong>${WORKFORCE_FIXTURE.assignedFieldHours}h</strong><small>Alex’s assigned field work</small></div><div><strong>${WORKFORCE_FIXTURE.developmentAssignmentHours}h</strong><small>Proposed planning practice</small></div><div><strong>${preview.mentorUnallocatedHours}h</strong><small>Mentor time unallocated</small></div></div>
    <fieldset class="coverage-fieldset"><legend class="text-label">CHOOSE A COVERAGE RESPONSE</legend><div class="coverage-options">${COVERAGE_OPTIONS.map(option => `<button class="coverage-option ${state.coverage.option === option.id ? 'is-selected' : ''}" type="button" data-action="coverage" data-value="${safe(option.id)}" aria-pressed="${state.coverage.option === option.id}"><strong>${safe(option.title)}</strong><span>${safe(option.summary)}</span></button>`).join('')}</div></fieldset>
    ${selected ? `<div class="coverage-review"><p><strong>Management check:</strong> ${safe(selected.caveat)}</p>${state.coverage.confirmed ? `<span class="coverage-confirmed" role="status">✓ Fictional GM coverage review recorded</span>` : button('Record fictional GM coverage review', 'confirm-coverage', '', 'outline')}<p class="review-footnote">This acknowledgement is part of the fictional exercise. It does not verify real staff availability, scheduling, licensing or budgets.</p></div>` : '<p class="review-footnote">No response chosen yet. Missing capacity cannot be assumed away by recognising an employee’s skills.</p>'}
    <div class="coverage-result" role="status"><div><strong>${preview.alexFieldHours}h</strong><small>Alex on field work if assigned</small></div><div><strong>${preview.reliefHours}h</strong><small>Relief arranged in scenario</small></div><div><strong>${preview.deferredHours}h</strong><small>Work deferred</small></div><div class="${preview.unaddressedHours > 0 ? 'coverage-risk' : ''}"><strong>${preview.unaddressedHours}h</strong><small>Without a confirmed response</small></div></div>
    <p class="coverage-followup"><strong>Succession boundary:</strong> Casey remains accountable for site supervision. Alex is developing capability, not inheriting authority, and the business still needs an authorised long-term successor.</p>
  </section>`;
}
function successionPlanner() {
  if (state.path !== 'site') return `<section class="surface-card succession-card"><span class="overline">SUCCESSION & KNOWLEDGE TRANSFER</span><h3>A career change needs a continuity plan.</h3><p>On this pathway, no fictional site-supervisor succession is assumed. A real transition would require an agreed handover, employee input, and a human decision about qualified coverage.</p></section>`;
  const impact = successionImpact(state);
  const selected = SUCCESSION_OPTIONS.find(option => option.id === state.succession.option);
  return `<section class="surface-card succession-card" aria-labelledby="succession-title">
    <div class="card-head"><div><span class="overline">SUCCESSION & ORGANISATIONAL RESILIENCE</span><h3 id="succession-title">Who can learn the work—and what remains at risk?</h3></div><span class="pill pill-neutral">Not an appointment</span></div>
    <p class="succession-intro">Casey remains the site-supervision owner. Explore realistic handover approaches, without assuming that experience, interest or a job title makes someone an authorised successor.</p>
    <fieldset class="succession-fieldset"><legend class="text-label">CHOOSE ONE CONTINUITY STRATEGY</legend><div class="succession-options">${SUCCESSION_OPTIONS.map(item=>`<button type="button" class="succession-option ${state.succession.option===item.id?'is-selected':''}" data-action="succession" data-value="${safe(item.id)}" aria-pressed="${state.succession.option===item.id}"><span>${safe(item.category)}</span><strong>${safe(item.title)}</strong><small>${safe(item.evidence)}</small></button>`).join('')}</div></fieldset>
    ${selected?`<div class="succession-detail"><strong>Evidence gap / limitation</strong><p>${safe(selected.gap)}</p><strong>Handover and knowledge transfer</strong><p>${safe(selected.handover)}</p><strong>Follow-up owner</strong><p>${safe(selected.next)}</p>${state.succession.confirmed?'<span class="coverage-confirmed" role="status">✓ Fictional GM handover plan recorded</span>':button('Record fictional GM handover review','confirm-succession','','outline')}<small>Planning an internal successor or an external search never verifies qualifications, availability, consent or supervisory authority.</small></div>`:'<p class="review-footnote">No continuity response selected. The management workload and site-supervision knowledge remain concentrated in Casey.</p>'}
    <div class="succession-risk" role="status"><strong>Open succession risk</strong><p>${safe(impact.risk)}</p><small>Accountable owner: ${safe(impact.accountable)} · No independently authorised successor verified.</small></div>
  </section>`;
}
function decision() {
  return `${heading('05 · DECIDE WITH ACCOUNTABILITY', 'A considered decision is better than a fast one.', 'Choose an action that respects Alex’s preference, the actual evidence and the business’s responsibility for quality and safety.')}
    <div class="decision-context"><div><span class="overline">CHOSEN DEVELOPMENT PATH</span><strong>${safe(activePath().title)}</strong><span>Alex has asked for guided progression, not an unsupported appointment.</span></div><div><span class="overline">IMPORTANT LIMIT</span><strong>Independent supervision restricted</strong><span>Relevant authority and leadership requirements remain unverified.</span></div></div>
    <div class="decision-review-status ${state.weekly.record ? 'review-complete' : 'review-incomplete'}"><strong>${state.weekly.record ? 'Weekly review recorded' : 'Weekly development review not yet recorded'}</strong><p>${state.weekly.record ? safe(state.weekly.record.action + ' · Next: ' + state.weekly.record.milestone) : 'Before considering a bounded planning responsibility, return to Step 3 to hear Alex and document an agreed development action.'}</p></div>
    ${coveragePlanner()}
    ${successionPlanner()}
    <div class="decision-options">${decisionChoices(state).map(c=>`<div class="decision-card ${c.available?'':'decision-disabled'}"><div class="decision-symbol">${c.id==='coach'?'↻':c.id==='scope'?'↗':c.id==='redirect'?'⇄':'×'}</div><div class="decision-copy"><h3>${safe(c.title)}</h3><p>${safe(c.description)}</p>${!c.available?`<div class="blocked-reason"><span aria-hidden="true">⊘</span> ${safe(c.reason)}</div>`:''}</div>${button(c.available?'Choose action →':'Not permitted','decide',c.id,c.available?'primary':'outline',c.available?'':'disabled aria-disabled="true"')}</div>`).join('')}</div>
    <div class="note-box"><span class="note-icon">i</span><p><strong>Human decision required:</strong> This is a controlled educational simulation. In a real workplace, assessor scope, company policy, work health and safety duties, and employment obligations must be verified independently.</p></div>
    ${progressButtons({next:false})}`;
}
function outcome() {
  if (!state.decision) return `${heading('06 · LEARN & REFLECT', 'No decision has been recorded yet.', 'Review the evidence and make a management decision to generate a reproducible, fictional decision memo.')}
   <section class="surface-card empty-outcome"><span class="empty-emblem">↗</span><h3>Ready when you are.</h3><p>Nothing has been decided for Alex. You can return to the decision step or explore another development pathway.</p>${button('Go to management decisions →','step','4')}</section>${progressButtons({next:false})}`;
  const d=state.decision;
  return `${heading('06 · REVIEW THE OUTCOME', 'A decision you can explain.', 'Good leadership makes responsibilities, uncertainty and follow-through visible. This record is reproducible from the same fictional scenario choices.')}
    <section class="surface-card outcome-card"><div class="outcome-head"><div class="outcome-icon">✓</div><div><span class="overline">FICTIONAL DECISION RECORDED</span><h3>${safe(d.action)}</h3><p>${safe(d.summary)}</p></div></div><div class="outcome-grid"><div><span class="text-label">WHAT WE KNOW</span><p>${safe(d.known.join(' '))}</p></div><div><span class="text-label">WHAT REMAINS UNKNOWN</span><p>${safe(d.unknown.join(', ')||'No unobserved requirements recorded.')}</p></div><div><span class="text-label">OPERATIONAL CONSEQUENCE</span><p>${safe(d.impact)}</p></div><div><span class="text-label">NEXT MANAGEMENT ACTION</span><p>${safe(d.next)}</p></div></div><section class="surface-card workforce-outcome" aria-labelledby="workforce-outcome-heading"><span class="overline">TEAM COVERAGE & SUCCESSION</span><h3 id="workforce-outcome-heading">What changed for the business?</h3><div class="coverage-metrics"><div><strong>${d.workforce.alexFieldHours}h</strong><small>Alex on field assignments</small></div><div><strong>${d.workforce.reliefHours}h</strong><small>Fictional relief</small></div><div><strong>${d.workforce.deferredHours}h</strong><small>Deferred field work</small></div></div><p><strong>Ownership:</strong> ${safe(d.workforce.coordinationOwner)}</p><p><strong>Succession approach:</strong> ${safe(d.succession.approach)} · ${d.succession.confirmed ? "Fictional GM handover plan recorded" : "No GM handover review"}</p><p><strong>Knowledge transfer:</strong> ${safe(d.succession.handover)}</p><p><strong>Next review:</strong> ${safe(d.succession.next)}</p><p><strong>Unresolved risk:</strong> ${safe(d.succession.risk)}</p><p class="review-footnote">The hours and options are made-up teaching assumptions, not a staff roster or financial forecast. Scope is limited to this decision, and site authority is unchanged.</p></section><div class="weekly-result outcome-weekly"><span class="text-label">WEEKLY DEVELOPMENT REVIEW</span><strong>${d.weeklyReview ? safe(d.weeklyReview.action) : 'Not recorded'}</strong><p>${d.weeklyReview ? safe(d.weeklyReview.owner + ' · ' + d.weeklyReview.milestone) : 'Record employee input and a management action on Step 3.'}</p></div><div class="outcome-end"><div><span class="text-label">EMPLOYEE PERSPECTIVE</span><p>“${safe(d.employeeVoice)}”</p></div><div class="outcome-buttons">${button('Copy decision memo','copy','','outline')}${button('Download JSON','download','','quiet')}</div></div></section>
    <div class="reflection-grid"><div class="reflection"><span>01</span><h3>Skills over titles</h3><p>Experience and evidence count, even when the person has not followed a conventional ladder.</p></div><div class="reflection"><span>02</span><h3>Support is mutual</h3><p>Manager commitments and training delays belong in the review alongside employee milestones.</p></div><div class="reflection"><span>03</span><h3>Authority is separate</h3><p>Neither attendance nor competence automatically creates delegated responsibilities.</p></div></div><div class="final-controls">${button('↺ Try a different approach','reset','','outline')}${button('← Revisit your decision','step','4','quiet')}</div>`;
}
function liveBrief() {
  const supported = SKILLS.filter(s=>skillStatus(state,s.id)==='supported').length;
  const outstanding = SKILLS.filter(s=>skillStatus(state,s.id)!=='supported').length;
  return `<aside class="inspector" aria-label="Current scenario summary"><section class="inspector-card"><div class="inspector-heading"><span class="overline">YOUR CURRENT BRIEF</span><span class="brief-live"><span></span> LIVE</span></div>${personRow()}
    <div class="inspector-divider"></div><div class="inspector-field"><span>Development direction</span><strong>${safe(activePath().title)}</strong></div>
    <div class="inspector-field"><span>Destination to explore</span><strong>${safe(activePath().role)}</strong></div>
    <div class="inspector-stats"><div><strong>${supported}</strong><small>Evidence-supported areas</small></div><div><strong>${outstanding}</strong><small>Need review / unknown</small></div></div>
    <div class="inspector-divider"></div><div class="inspector-field"><span>Field coverage plan</span><strong>${state.coverage.option ? safe(COVERAGE_OPTIONS.find(x=>x.id===state.coverage.option)?.title ?? 'Not selected') : 'Not yet selected'}</strong><small>${state.coverage.confirmed ? 'Fictional GM review recorded' : 'No GM confirmation recorded'}</small></div><div class="inspector-divider"></div><div class="inspector-field"><span>Succession & handover</span><strong>${state.succession.option ? safe(SUCCESSION_OPTIONS.find(x=>x.id===state.succession.option)?.title ?? "Not selected") : "Not yet selected"}</strong><small>${state.succession.confirmed ? "Fictional GM handover plan recorded; no supervisor verified" : "Continuity remains to be planned"}</small></div><span class="text-label">MANAGER FOLLOW-THROUGH</span><div class="followthrough"><span class="mini-icon">${state.training==='delayed'?'!':'✓'}</span><div><strong>External instruction</strong><small>${state.training==='delayed'?'Delayed · manager action needed':'Rescheduled by manager'}</small></div></div><div class="followthrough"><span class="mini-icon">◷</span><div><strong>Mentoring</strong><small>${state.mentoring} of 2 fictional sessions recorded</small></div></div><div class="followthrough"><span class="mini-icon">${state.weekly.record ? '✓' : '!'}</span><div><strong>Weekly development review</strong><small>${state.weekly.record ? safe(state.weekly.record.action) : 'Due · hear employee and agree a milestone'}</small></div></div>
    ${state.decision?`<div class="sidebar-decision"><strong>Decision recorded</strong><p>${safe(state.decision.action)}</p>${button('View outcome →','step','5','outline')}</div>`:''}
    </section><div class="principle-card"><span class="overline">THE CORE DISTINCTION</span><p>Trained <span>≠</span> competent<br>Competent <span>≠</span> authorised</p><small>Assessment supports a human decision. It doesn't replace one.</small></div></aside>`;
}
function footer() {return `<footer class="app-footer"><span>WORKFORCE CAPABILITY & DEVELOPMENT · PROTOTYPE V0.5</span><span>Fictional data only · Decisions are illustrative · <a href="https://github.com/NathanTaylorOps/workforce-capability-development" target="_blank" rel="noopener noreferrer">View source ↗</a></span></footer>`;}
function pageContent() {return [brief, pathway, plan, evidence, decision, outcome][state.step]();}
function render({ focusMain = false }={}) {
  root.innerHTML = `${topbar()}<div class="workspace">${sidebar()}<main id="main" class="content" tabindex="-1" aria-labelledby="page-title">${notice?`<div class="toast" role="status">${safe(notice)}</div>`:''}<div class="mobile-progress">STEP ${String(state.step+1).padStart(2,'0')} OF ${STEPS.length} · ${safe(STEPS[state.step].title)}</div>${pageContent()}</main>${liveBrief()}</div>${footer()}`;
  if (focusMain) root.querySelector('#main')?.focus({preventScroll: true});
}
function downloadMemo() {
  if (!state.decision) return;
  const blob = new Blob([JSON.stringify(state.decision,null,2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'fictional-leadership-decision.json'; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
root.addEventListener('click', async event => {
  const target = event.target.closest('button[data-action]');
  if (!target || target.disabled) return;
  const { action, value } = target.dataset;
  notice = '';
  let focusMain = false;
  try {
    switch(action) {
      case 'reset':
        if (state.events.length && !window.confirm('Reset this fictional scenario? All current choices and observations will be cleared.')) return;
        state = initialState(); focusMain = true; break;
      case 'step': state = updateStep(state, Number(value)); focusMain = true; break;
      case 'path': state = choosePath(state, value); break;
      case 'skill': state = selectSkill(state, value); break;
      case 'mentor': state = recordMentoring(state); notice = 'Fictional mentoring session recorded.'; break;
      case 'hear-employee': state = hearEmployee(state); notice = 'Alex’s fictional perspective is now part of the review.'; break;
      case 'weekly-action': state = recordWeeklyReview(state, value); notice = 'Weekly development action recorded with responsibility and a follow-up milestone.'; break;
      case 'coverage': state = chooseCoveragePlan(state, value); notice = 'Coverage option selected; GM review still needed.'; break;
      case 'confirm-coverage': state = confirmCoveragePlan(state); notice = 'Fictional coverage review recorded; real staffing verification remains outside this demo.'; break;
      case 'succession': state = chooseSuccessionPlan(state, value); notice = 'Succession strategy selected; no successor authority has been granted.'; break;
      case 'confirm-succession': state = confirmSuccessionPlan(state); notice = 'Fictional GM handover plan recorded; site succession remains unverified.'; break;
      case 'training': state = rescheduleTraining(state); notice = 'Fictional manager support commitment rescheduled.'; break;
      case 'observe': state = addSampleObservation(state, value); notice = 'A pre-written, independent fictional task observation was added for review.'; break;
      case 'review': state = reviewEvidence(state, value); notice = 'Fictional GM evidence review recorded; this is not a professional certification.'; break;
      case 'decide': state = decide(state, value); focusMain = true; break;
      case 'copy':
        if (!state.decision) break;
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable. Download JSON instead.');
        await navigator.clipboard.writeText(memoText(state.decision)); notice = 'Fictional decision memo copied.'; break;
      case 'download': downloadMemo(); notice = 'Fictional decision JSON downloaded.'; break;
      default: return;
    }
  } catch(error) {
    notice = error.message || 'The requested action could not be completed.';
  }
  const key = `${action}|${value}`;
  render({focusMain});
  if (!focusMain) {
    const match = [...root.querySelectorAll('button[data-action]')].find(el=>`${el.dataset.action}|${el.dataset.value}`===key);
    if (match && !match.disabled) match.focus({preventScroll:true});
  } else window.scrollTo({top:0,behavior:'instant'});
});
render();
