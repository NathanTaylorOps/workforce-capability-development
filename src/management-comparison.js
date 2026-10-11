/**
 * Two complete fictional management decisions, each from the same untouched
 * scenario fixture. No real workforce, personnel or site approval is created.
 */
import {initialState} from './engine.js';

const copy = value => JSON.parse(JSON.stringify(value));
const originalFixture = () => JSON.stringify(initialState());

export function captureManagementRun(state, number) {
  if (number !== 1 && number !== 2) throw new Error('A comparison supports exactly two numbered runs.');
  if (!state || !state.decision || state.step !== 5 || state.decision.synthetic !== true) {
    throw new Error('Record a complete fictional management decision before saving the run.');
  }
  if (state.version !== initialState().version || state.decision.fixture !== state.version) {
    throw new Error('Decision and initial scenario versions do not match.');
  }
  const last = state.events?.at(-1);
  if (last?.type !== 'decision' || last.detail !== state.decision.action) {
    throw new Error('The decision was changed after being recorded. Review it again before comparing.');
  }
  return copy({
    kind: 'fictional-management-run',
    synthetic: true,
    number,
    fixture: state.version,
    initialFixture: originalFixture(),
    inputs: {
      pathway: state.path,
      training: state.training,
      completedMentoringSessions: state.mentoring,
      weeklyAction: state.weekly.record?.action ?? 'No weekly development review recorded',
      coverage: state.coverage,
      succession: state.succession,
      organisation: state.organisation,
      absenceEvent: state.absence.event,
      evidenceReviews: state.reviews
    },
    decision: state.decision,
    actions: state.events
  });
}
function validateRun(run, number) {
  if (!run || run.synthetic !== true || run.kind !== 'fictional-management-run' ||
      run.number !== number || !run.decision || run.decision.synthetic !== true ||
      run.decision.fixture !== run.fixture || run.fixture !== initialState().version ||
      run.initialFixture !== originalFixture()) {
    throw new Error('The decision records must use the same current fictional starting conditions.');
  }
}

const fields = [
  {key:'pathway', label:'Development direction', value:run=>run.decision.pathway, note:'The development pathway changed.'},
  {key:'action', label:'Management decision', value:run=>run.decision.action, note:'The recorded management decision changed.'},
  {key:'weekly', label:'Agreed development follow-up', value:run=>run.inputs.weeklyAction, note:'A review commitment is not an approval of staffing.'},
  {key:'training', label:'Company training commitment', value:run=>run.inputs.training, note:'Management support is separate from employee competence.'},
  {key:'mentor', label:'Mentoring sessions recorded', value:run=>run.inputs.completedMentoringSessions, note:'Coaching is not independent evidence of competence.'},
  {key:'field', label:'Field hours remaining with Alex', value:run=>run.decision.workforce.alexFieldHours, unit:'h', note:'Based on the fictional reassignment and coverage decisions.'},
  {key:'deferred', label:'Field hours deferred', value:run=>run.decision.workforce.deferredHours, unit:'h', note:'Deferred work is not completed work.'},
  {key:'relief', label:'Provisionally planned relief', value:run=>run.decision.workforce.reliefHours, unit:'h', note:'Relief is still subject to availability, competence and budget checks.'},
  {key:'unaddressed', label:'Field hours without a plan', value:run=>run.decision.workforce.unaddressedHours, unit:'h', note:'Unaddressed work cannot be assumed covered.'},
  {key:'organisation', label:'Organisation resource response', value:run=>run.decision.organisation.approach, note:'A planning response is not a verified staffing change.'},
  {key:'mentorhours', label:'Mentor hours allocated', value:run=>run.decision.organisation.allocatedMentorHours, unit:'h',note:'The same mentoring hours cannot be allocated twice.'},
  {key:'absence', label:'Hypothetical role absence', value:run=>run.decision.absence.label, note:'A fictional availability event, not a report of actual staffing.'},
  {key:'uncovered', label:'Uncovered critical responsibilities', value:run=>run.decision.absence.uncovered, note:'Responsibilities without independently verified cover.'},
  {key:'next', label:'Next management action', value:run=>run.decision.next, note:'Different decisions can require different follow-up.'},
  {key:'authority', label:'Authority restriction', value:run=>run.decision.restricted, note:'Neither approach bypasses site or management approval requirements.'}
];

export function compareManagementRuns(first, second) {
  validateRun(first, 1);
  validateRun(second, 2);
  if (first.initialFixture !== second.initialFixture) throw new Error('Different scenario baselines cannot be compared.');
  const differences=[], unchanged=[];
  for (const field of fields) {
    const left=field.value(first), right=field.value(second);
    const row={key:field.key,label:field.label,first:String(left)+(field.unit??''),second:String(right)+(field.unit??''),note:field.note};
    if (left===right) unchanged.push(row); else differences.push(row);
  }
  return copy({
    kind:'fictional-management-decision-comparison',
    synthetic:true,
    fixture:first.fixture,
    baseline:"Same versioned initial scenario; neither run inherits the other run's evidence reviews or approvals.",
    sourceRunCount:2,
    decisionStatus:'FICTIONAL DECISIONS — not real workforce or site approvals',
    independentAuthorityEstablished:false,
    runs:[first,second],
    differences,unchanged,
    limitations:[
      'All people, hours, work exposure and decisions are fictional teaching assumptions.',
      'Planned relief and manager review do not verify a qualified, available replacement.',
      'Coaching, observed competence, credentials, delegated authority and available capacity are separate facts.',
      'A scenario comparison is not evidence of measured business improvement or an operational approval.'
    ]
  });
}
