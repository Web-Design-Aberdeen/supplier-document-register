import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {analyse,render} from '../src/index.js';import {parseCSV,toCSV,escape} from '../src/util.js';
const data=JSON.parse(fs.readFileSync(new URL('../examples/input.json',import.meta.url),'utf8'));
test('the complete synthetic example produces a readable report',()=>{const r=analyse(data);assert.ok(r.title);assert.ok(r.summary);assert.match(render(r),/<h2>/);assert.ok(Array.isArray(r.issues));});
test('quoted CSV and dangerous spreadsheet values remain safe',()=>{assert.equal(parseCSV('id,note\r\n1,"one, two"')[0].note,'one, two');assert.throws(()=>parseCSV('id,note\n1,"unclosed'),/Unclosed/);assert.match(toCSV([{name:'=HYPERLINK("x")'}]),/'=HYPERLINK/);});
test('HTML escaping never emits an executable supplied tag',()=>{assert.equal(escape('<script>"&'), '&lt;script&gt;&quot;&amp;');});

test('private document identifiers and content never enter any output',()=>{const r=analyse(data);assert.doesNotMatch(JSON.stringify(r),/INTERNAL SECRET EXAMPLE|private-internal|internal\.pdf/);assert.equal(r.documents.length,3);});
test('review due and expiry are reported separately',()=>{const codes=analyse(data).issues.map(i=>i.code);assert.ok(codes.includes('review'));assert.ok(codes.includes('expiry'));});
test('ambiguous publication flags and duplicate document IDs fail',()=>{const d=structuredClone(data);d.documents[0].public='true';assert.throws(()=>analyse(d),/boolean/);d.documents[0].public=true;d.documents.push(d.documents[0]);assert.throws(()=>analyse(d),/Duplicate/);});
