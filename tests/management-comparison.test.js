import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,choosePath,decide,recordMentoring,rescheduleTraining} from '../src/engine.js';
import {captureManagementRun,compareManagementRuns} from '../src/management-comparison.js';

const first=()=>captureManagementRun(decide(initialState(),'coach'),1);
const second=()=>captureManagementRun(decide(choosePath(initialState(),'operations'),'redirect'),2);

test('two completed decisions use independent copies of the same initial fixture',()=>{
  const a=first(),b=second(),report=compareManagementRuns(a,b);
  assert.equal(a.initialFixture,b.initialFixture);
  assert.equal(report.fixture,initialState().version);
  assert.equal(report.kind,'fictional-management-decision-comparison');
  assert.equal(report.sourceRunCount,2);
  assert.equal(report.synthetic,true);
  assert.ok(report.differences.some(x=>x.key==='pathway'));
  assert.ok(report.differences.some(x=>x.key==='action'));
  assert.ok(report.differences.some(x=>x.key==='next'));
  assert.ok(report.unchanged.some(x=>x.key==='authority'));
  assert.equal(report.independentAuthorityEstablished,false);
  assert.equal(a.inputs.coverage.confirmed,false);
  assert.equal(b.inputs.coverage.confirmed,false);
  assert.notStrictEqual(report.runs[0].decision,a.decision);
});

test('replaying the same decision is deterministic and does not invent differences',()=>{
  const a=first(),b=captureManagementRun(decide(initialState(),'coach'),2);
  const report=compareManagementRuns(a,b);
  assert.deepEqual(report.differences,[]);
  assert.equal(report.unchanged.length,15);
  assert.deepEqual(report,compareManagementRuns(first(),captureManagementRun(decide(initialState(),'coach'),2)));
});

test('saved decisions cannot be changed through a later run or exported record',()=>{
  const a=first();
  const secondState=decide(rescheduleTraining(recordMentoring(initialState())),'coach');
  const b=captureManagementRun(secondState,2);
  const report=compareManagementRuns(a,b);
  assert.equal(a.inputs.completedMentoringSessions,1);
  assert.equal(b.inputs.completedMentoringSessions,2);
  assert.equal(a.inputs.training,'delayed');
  assert.equal(b.inputs.training,'rescheduled');
  assert.ok(report.differences.some(x=>x.key==='mentor'));
  assert.ok(report.differences.some(x=>x.key==='training'));
  report.runs[0].decision.action='Externally changed';
  assert.equal(a.decision.action,'Continue supported practice');
});

test('incomplete or incompatible records and invalid approvals are rejected',()=>{
  assert.throws(()=>captureManagementRun(initialState(),1),/complete fictional management decision/);
  assert.throws(()=>captureManagementRun(decide(initialState(),'coach'),3),/exactly two/);
  const a=first(),b=second();
  assert.throws(()=>compareManagementRuns(b,a),/same current fictional starting conditions/);
  assert.throws(()=>compareManagementRuns(a,{...b,initialFixture:'different'}),/same current fictional starting conditions/);
  assert.throws(()=>compareManagementRuns(a,{...b,fixture:'different'}),/same current fictional starting conditions/);
  const stale=decide(initialState(),'coach');
  stale.events.push({type:'observation',detail:'unsaved'});
  assert.throws(()=>captureManagementRun(stale,1),/changed after being recorded/);
  assert.throws(()=>decide(initialState(),'appoint'),/not permitted/);
});

test('downloadable records retain fictional limitations and approval boundaries',()=>{
  const record=JSON.parse(JSON.stringify(compareManagementRuns(first(),second())));
  assert.match(record.decisionStatus,/not real workforce or site approvals/i);
  assert.equal(record.independentAuthorityEstablished,false);
  assert.ok(record.limitations.some(x=>/not verify a qualified/i.test(x)));
  for(const run of record.runs) {
    assert.equal(run.decision.restricted,'No independent site-supervision authority established.');
    assert.equal(run.decision.organisation.qualifiedSuccessor,false);
  }
});
