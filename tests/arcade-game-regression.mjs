#!/usr/bin/env node
// Arcade source + simulation regressions. Not browser/gameplay certification.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import assert from "node:assert/strict";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const files={
 chess:"Chess_Studio_index.html",orion:"Orions_connect_four_index.html",
 sudoku:"Jenny's_Sudoku_index.html",pirates:"games/kids/Pattern_Pirates_index.html",
 bubble:"games/kids/Bubble_Pop_index.html",abc:"games/kids/ABC_Bubbles_index.html",
 six:"SixbySix_index.html",affix:"AffixSix™_index.html"
};
const s=Object.fromEntries(Object.entries(files).map(([k,p])=>[k,read(p)]));
function cut(html,a,b){
 const i=html.indexOf(a),j=html.indexOf(b,i+a.length);
 assert(i>=0&&j>i,"Missing source marker: "+a);
 return html.slice(i,j);
}
for(const [name,html] of Object.entries(s)){
 assert.equal((html.match(/<!doctype html>/gi)||[]).length,1,name+" duplicate doctype");
 assert.equal((html.match(/<html\b/gi)||[]).length,1,name+" duplicate html root");
 assert.equal((html.match(/<\/html>/gi)||[]).length,1,name+" duplicate closing html");
 for(const m of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))
  if(m[1].trim())new vm.Script(m[1],{filename:files[name]});
}
assert.equal((s.pirates.match(/\n  init\(\);\s*\n/g)||[]).length,1,"Pirates double init");
assert(s.pirates.includes('id="tourOverlay"'),"Pirates tutorial missing");
assert(s.pirates.includes("name.textContent = String(f.name"),"Pirates unsafe save-name output");
assert(s.abc.includes('document.createElement("button")'),"ABC bubbles not keyboard operable");
assert(s.abc.includes("!bubble.isConnected"),"ABC orphan animation");
assert(s.chess.includes("function invalidateAI"),"Chess stale AI guard missing");
assert(s.chess.includes("function validSnapshotState"),"Chess save guard missing");
assert(s.chess.includes('sq.type = "button"'),"Chess keyboard squares missing");
assert(s.orion.includes("function cancelPendingAI"),"Orion AI cancellation missing");
assert(s.orion.includes("mode !== 'hybrid' || currentPlayer !== 'B'"),"Orion turn guard missing");
assert(!s.orion.includes("setTimeout(() => aiMove()"),"Orion bare delayed AI call");
assert(s.bubble.includes("startGame(true)")&&s.bubble.includes("if(timed === true)"),"Bubble Pop timer reset issue");
const saved=cut(s.sudoku,"  function validSavedGrid(","  function loadState(){");
const valid=vm.runInNewContext(saved+";validSavedGame");
const solved=Array.from({length:9},(_,r)=>Array.from({length:9},(_,c)=>1+((r*3+Math.floor(r/3)+c)%9)));
const puzzle=solved.map(row=>row.map((v,c)=>c<2?v:0));
const clone=x=>x.map(row=>row.slice());
const good={difficulty:"medium",dark:false,diagonal:false,solution:solved,puzzle,current:clone(puzzle)};
assert(valid(good),"Sudoku rejects good save");
assert(!valid({...good,current:[[1]]}),"Sudoku accepts malformed grid");
const bad=clone(puzzle);bad[0][0]=9;
assert(!valid({...good,puzzle:bad}),"Sudoku accepts altered given");
const gen=cut(s.pirates,"  function generateGoal(","  function renderGoalCard(){");
const rnd=n=>Math.floor(Math.random()*n);
const adjacent=(p,N)=>[p-N,p+N,p-1,p+1].filter(q=>q>=0&&q<N*N&&Math.abs(Math.floor(q/N)-Math.floor(p/N))+Math.abs(q%N-p%N)===1);
for(let trial=0;trial<100;trial++){
 const N=6,board=Array.from({length:36},()=>({shape:"ABCD"[rnd(4)],color:"abcde"[rnd(5)]}));
 const start=rnd(36),context={STATE:{board,piratePos:start},rnd};
 const goals=vm.runInNewContext(gen+";generateGoal('kids','hard',6)",context);
 let positions=new Set([start]);
 for(const tile of goals){
  const next=new Set();
  for(const p of positions)for(const q of adjacent(p,N))
   if(board[q].shape===tile.shape&&board[q].color===tile.color)next.add(q);
  positions=next;
 }
 assert(positions.size>0,"Unreachable Pirates map: "+trial);
}
console.log("PASS: eight unique-document sources and inline script syntax");
console.log("PASS: Sudoku good/bad saves; Pattern Pirates 100 valid routes");
console.log("PASS: source guards for Chess, Orion, ABC and Bubble Pop");
console.log("PENDING: real-browser runtime, device, offline and learner boundary checks");
