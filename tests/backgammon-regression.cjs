// npm install jsdom in a test environment; the game has no new runtime dependency.
const {JSDOM}=require('jsdom');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../Backgammon_index.html'),'utf8');
const core=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].find(x=>x[1].includes('function legalSequences'))[1];
function harness(blockStorage=false){
 const w=new JSDOM(html,{url:'https://vervenveda.com/arcade.github.io/',runScripts:'outside-only'}).window;
 const ctx=new Proxy({measureText:()=>({width:10}),createLinearGradient:()=>({addColorStop(){}}),createRadialGradient:()=>({addColorStop(){}})},{get:(o,k)=>o[k]||(()=>{})});
 w.HTMLCanvasElement.prototype.getContext=()=>ctx;
 const timers=[];w.setTimeout=(fn,delay)=>{timers.push({fn,delay});return timers.length};
 if(blockStorage) Object.defineProperty(w,'localStorage',{get(){throw Error('storage blocked')}});
 w.console.warn=()=>{};
 w.eval(core+'\nwindow.inspectGame=code=>eval(code);');
 const e=code=>w.inspectGame(code);
 e("modeSel.value='2p';cancelAI();");
 return {w,e,timers};
}
let passed=0;
function test(name,fn){const h=harness();try{fn(h);passed++;console.log('PASS '+name);}finally{h.w.close();}}
test('opening setup has 15 pieces and 167 pips per side',({e})=>{
 assert.equal(e('pipCount(state,RED)'),167);assert.equal(e('pipCount(state,BLACK)'),167);
 assert(e('validSavedGame(JSON.parse(JSON.stringify({match,cube,state,turn,dice,diceLeft,phase,gameOver,settings:{matchLen:"5",mode:"2p",humanSide:"red",hints:"off",depth:"2"}})))'));
});
test('blocked bar passes the human turn',({e,w})=>{
 e("state={board:Array.from({length:24},(_,i)=>i>=18?-2:0),bar:{1:15,'-1':0},off:{1:0,'-1':3}};");
 assert.equal(e('legalSequences(state,RED,[1,2]).length'),0);
 w.Math.random=()=>0;e('beginRoll()');assert.equal(e('turn'),-1);assert.equal(e('phase'),'preroll');
});
test('bar priority and blot hit',({e})=>{
 e("state={board:Array(24).fill(0),bar:{1:1,'-1':0},off:{1:14,'-1':14}};state.board[23]=-1;");
 assert(e("legalSingleMoves(state,RED,1).every(m=>m.from==='bar')"));
 e("applyMove(state,RED,{from:'bar',to:23,die:1})");assert.equal(e('state.bar[BLACK]'),1);assert.equal(e('state.board[23]'),1);
});
test('higher die when only one can be used; four moves for doubles',({e})=>{
 e("state={board:Array(24).fill(0),bar:{1:0,'-1':0},off:{1:14,'-1':0}};state.board[0]=1;state.board[23]=-15;");
 assert(e('legalSequences(state,RED,[1,2]).every(seq=>seq.length===1&&seq[0].die===2)'));
 e('state.board=standardSetup();state.off[RED]=0;');
 assert(e('legalSequences(state,RED,[1,1,1,1]).every(seq=>seq.length===4)'));
});
test('oversized bearing off cannot skip a higher checker',({e})=>{
 e("state={board:Array(24).fill(0),bar:{1:0,'-1':0},off:{1:13,'-1':0}};state.board[0]=1;state.board[4]=1;state.board[23]=-15;");
 assert.equal(e('canBearOffFrom(state,RED,0,6)'),false);assert.equal(e('canBearOffFrom(state,RED,4,6)'),true);
});
test('declined double ends play and scores only once',({e})=>{
 e('cube.pending={offeredBy:RED};declineDouble();');assert.equal(e('gameOver'),true);assert.equal(e('phase'),'over');
 e('beginRoll();declineDouble();finishGame(RED);');assert.equal(e('match.score[RED]'),1);assert.equal(e('loadAll().gameOver'),true);
});
test('single/gammon/backgammon scoring',({e})=>{
 for(const [kind,expected] of [['single',2],['gammon',4],['backgammon',6]]){
  e("startMatch(7);cube.value=2;state={board:Array(24).fill(0),bar:{1:0,'-1':0},off:{1:15,'-1':0}};");
  e(kind==='single'?'state.off[BLACK]=1;state.board[12]=-14':kind==='gammon'?'state.board[12]=-15':'state.bar[BLACK]=1;state.board[12]=-14');
  e('finishGame(RED)');assert.equal(e('match.score[RED]'),expected);
 }
});
test('resume rebuilds and commits saved legal moves',({e,w})=>{
 w.Math.random=()=>0.2;e('beginRoll();saveAll();sequencesThisTurn=[];resumeFromSaved(loadAll());');
 assert(e('sequencesThisTurn.length>0'));const before=e('JSON.stringify(state)');e('commitMove(sequencesThisTurn[0][0])');assert.notEqual(e('JSON.stringify(state)'),before);
});
test('resume restores a pending doubling decision',({e,w})=>{
 e('cube.pending={offeredBy:RED};saveAll();cube.pending=null;resumeFromSaved(loadAll());');
 assert(w.document.getElementById('mTitle').textContent.includes('offers to double'));
});
test('Undo and new game persist immediately',({e,w})=>{
 w.Math.random=()=>0.2;e('beginRoll();commitMove(sequencesThisTurn[0][0]);undoStep();');
 assert(e('JSON.stringify(state)===JSON.stringify(loadAll().state)'));
 e('startGame();');assert.equal(e('loadAll().phase'),'preroll');assert.equal(e('pipCount(loadAll().state,RED)'),167);
});
test('invalid saves rejected without changing current game',({e})=>{
 e('saveAll();');const before=e('JSON.stringify(state)');
 for(const mutation of ['bad.state.board=[]','bad.state.board[0]=99','bad.dice=[7]','bad.match.target="<img>"','bad.settings.mode="unknown"','bad.cube.value=3']){
  e('var bad=loadAll();'+mutation+';resumeFromSaved(bad);');assert.equal(e('JSON.stringify(state)'),before);
 }
});
test('one AI action scheduled; stale callbacks cannot roll a new game',({e,timers})=>{
 timers.length=0;e("modeSel.value='ai';humanSel.value='black';startGame();maybeAI();maybeAI();");
 assert.equal(timers.filter(t=>t.delay===420).length,1);
 e("modeSel.value='2p';playerSettingsChanged();startGame();");
 timers.filter(t=>t.delay===420).forEach(t=>t.fn());assert.equal(e('phase'),'preroll');assert.equal(e('dice.length'),0);
});
test('AI doubles execute one move per timer and finish turn',({e,timers,w})=>{
 w.Math.random=()=>0.2;e("modeSel.value='ai';humanSel.value='black';startGame();");
 const roll=timers.find(t=>t.delay===420);timers.splice(0,timers.length);roll.fn();
 for(let i=0;i<4;i++){
  const moves=timers.filter(t=>t.delay===210);assert.equal(moves.length,1);timers.splice(0,timers.length);moves[0].fn();
 }
 assert.equal(e('turn'),-1);assert.equal(e('phase'),'preroll');
});
test('learning reinforces favorable pip and bar differences after an AI win',({e})=>{
 e("modeSel.value='ai';humanSel.value='black';aiProfile=defaultAIProfile();state={board:Array(24).fill(0),bar:{1:0,'-1':1},off:{1:15,'-1':0}};state.board[0]=-14;updateAIProfileAfterGame(RED);");
 assert(e('aiProfile.weights.pip < -0.9'));assert(e('aiProfile.weights.bar < -2'));assert.equal(e('aiProfile.wins'),1);
});
const h=harness(true);assert.equal(h.e('hasSaved()'),false);assert.equal(h.e('loadAll()'),null);h.w.close();passed++;console.log('PASS blocked storage does not crash boot');
console.log(`${passed} Backgammon regression cases passed; no visual/device certification implied.`);
