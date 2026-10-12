import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState, decide, choosePath} from '../src/engine.js';
import {captureManagementRun} from '../src/management-comparison.js';
import {decisionBrief} from '../src/decision-brief.js';

test('brief uses the completed decision and preserves status and missing follow-up',()=>{
 const state=decide(initialState(),'coach');
 const before=JSON.stringify(state), html=decisionBrief(state);
 assert.ok(html.includes(state.decision.summary));
 assert.ok(html.includes(state.decision.restricted));
 assert.match(html,/Next review point:<\/strong> Not recorded/);
 assert.match(html,/Field coverage not reviewed/);
 assert.match(html,/Mentoring completed/);
 assert.equal((html.match(/class="brief-page"/g)||[]).length,1);
 assert.equal(JSON.stringify(state),before);
 assert.throws(()=>decisionBrief(initialState()),/complete fictional/);
});
test('comparison prints both separate records and escapes all record text',()=>{
 const first=captureManagementRun(decide(initialState(),'coach'),1);
 const state=decide(choosePath(initialState(),'operations'),'redirect');
 state.decision.employeeVoice='<img src=x onerror=alert(1)>';
 const html=decisionBrief(state,first);
 assert.equal((html.match(/class="brief-page"/g)||[]).length,2);
 assert.ok(html.includes(first.decision.summary));
 assert.ok(html.includes(state.decision.summary));
 assert.match(html,/&lt;img/);
 assert.doesNotMatch(html,/<img/);
 assert.match(html,/same initial scenario/);
});
