/* Arcade Game Shell v1 · Adapted from Khaemenes Academy Home Personalization.
 * Public links only. Never reads, copies, syncs or authenticates learner records. */
(()=>{
"use strict";
const SCRIPT=document.currentScript;
if(!SCRIPT||!SCRIPT.src||document.getElementById("arcadeGameTools"))return;
const IS_HOME=SCRIPT.hasAttribute?.("data-arcade-home")===true;
const URLS=Object.freeze({
 arcade:new URL("../index.html",SCRIPT.src).href,
 profile:"https://vervenveda.com/Khaemenes_Academy.github.io/student/",
 beta:"https://vervenveda.com/beta/",
 support:"https://buy.stripe.com/aFa8wQ5xf9Scf65caT4AU0s",
 search:"https://vervenveda.com/PLERASearch.github.io/"
});
const title=String(document.title||"Arcade Game").trim().slice(0,90);
const source=(String(location.hostname||"").replace(/[^a-z0-9.:-]/gi,"").slice(0,120)+
 String(location.pathname||"/").replace(/[\u0000-\u001f\u007f]/g,"").slice(0,240)).slice(0,320);
const beta=new URL(URLS.beta);beta.searchParams.set("source",source||"arcade");beta.hash="feedback";
const style=document.createElement("style");
style.id="arcadeGameShellStyles";
style.textContent=[
'body.arcade-game-shell-ready #vnvBetaProgramLink,body.arcade-game-shell-ready #vnvBetaProgramFallback,body.arcade-game-shell-ready #vnvEcosystemMenuButton,body.arcade-game-shell-ready #vnv-global-support,body.arcade-game-shell-ready #vnv-global-support-top,body.arcade-game-shell-ready a[aria-label="Open the Verve N Veda Beta Program"]{display:none!important}',
'#arcadeGameTools{position:fixed;z-index:2147482450;right:max(9px,env(safe-area-inset-right));bottom:max(9px,env(safe-area-inset-bottom));display:flex;flex-direction:row;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:5px;max-width:calc(100vw - 18px);padding:6px;border:1px solid rgba(180,139,69,.65);border-radius:7px;background:rgba(255,253,248,.98);box-shadow:0 8px 26px rgba(0,0,0,.22);font:400 11px/1.25 "Avenir Next","Segoe UI",Arial,sans-serif;color:#17392f}',
'#arcadeGameTools .arcade-tool-trigger{min-height:42px;min-width:77px;flex:none;border:1px solid #b48b45;border-radius:7px;background:#fffdf8;color:#17392f;box-shadow:none;font:500 11px/1.3 "Avenir Next","Segoe UI",Arial,sans-serif;cursor:pointer;padding:8px 11px}',
'#arcadeGameTools .arcade-tool-list{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:5px;padding:0;border:0;background:transparent;box-shadow:none;max-width:min(74vw,480px)}',
'#arcadeGameTools .arcade-tool-list[hidden]{display:none!important}',
'#arcadeGameTools .arcade-game-route{display:flex;flex:1 1 100%;align-items:center;justify-content:space-between;gap:8px;width:100%;padding:4px 4px 8px;border-bottom:1px solid rgba(23,57,47,.18);font:400 11px/1.3 "Avenir Next","Segoe UI",Arial,sans-serif;color:#17392f}',
'#arcadeGameTools .arcade-game-route a{min-width:0;min-height:34px;border:0;background:transparent;color:#17392f;display:inline-flex;padding:5px 6px;text-decoration:underline;text-underline-offset:3px;font:400 11px/1.3 "Avenir Next","Segoe UI",Arial,sans-serif}',
'#arcadeGameTools .arcade-route-title{flex:1;min-width:0;max-width:180px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#52675c}',
'#arcadeGameTools .arcade-game-route button{min-height:34px;border:1px solid #b48b45;border-radius:7px;background:#f8f4e9;color:#17392f;padding:5px 9px;font:400 10px/1.3 "Avenir Next","Segoe UI",Arial,sans-serif;cursor:pointer}',
'#arcadeGameTools a{min-width:98px;min-height:42px;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:8px 9px;border-radius:7px;border:1px solid rgba(23,57,47,.25);background:#f8f9f5;color:#17392f;text-decoration:none;white-space:nowrap;font:500 11px/1.2 "Avenir Next","Segoe UI",Arial,sans-serif;letter-spacing:0}',
'#arcadeGameTools .arcade-tool-mark{width:18px;height:18px;display:inline-grid;place-items:center;border-radius:50%;background:#17392f;color:#fff;font:400 11px/1 Georgia,serif}',
'#arcadeGameTools .arcade-beta{background:#142331;color:#f8f2e8;border-color:#bd9c60}',
'#arcadeGameTools .arcade-beta .arcade-tool-mark{background:#bd9c60;color:#142331}',
'#arcadeGameTools .arcade-support{background:#597365;color:#fff;border-color:#446152}',
'#arcadeGameTools .arcade-support .arcade-tool-mark{background:#f2e5c8;color:#17392f}',
'#arcadeGameTools a:hover,#arcadeGameTools button:hover{filter:brightness(1.08)}',
'#arcadeGameTools a:focus-visible,#arcadeGameTools button:focus-visible{outline:3px solid #b48b45;outline-offset:2px}',
'body.arcade-game-shell-ready:has(dialog[open]) #arcadeGameTools,body.arcade-game-shell-ready:has(#tourOverlay[style*="flex"]) #arcadeGameTools{display:none!important}',
'@media(max-width:650px){#arcadeGameTools{flex-direction:column;align-items:flex-end}#arcadeGameTools .arcade-tool-list{max-width:min(95vw,252px)}#arcadeGameTools a{flex:1 1 100px;min-width:100px}}',
'@media print{#arcadeGameTools{display:none!important}}',
'@media(prefers-reduced-motion:reduce){#arcadeGameTools a,#arcadeGameTools button{transform:none!important;transition:none!important}}'
].join("\n");
(document.head||document.documentElement).appendChild(style);
function element(tag,attr,text){
 const node=document.createElement(tag);
 for(const [key,value] of Object.entries(attr||{})){
  if(key==="className")node.className=value;
  else if(key==="type")node.type=value;
  else node.setAttribute(key,value);
 }
 if(text!==undefined)node.textContent=text;
 return node;
}
function mount(){
 if(!document.body||document.getElementById("arcadeGameTools"))return;
 document.body.classList.add("arcade-game-shell-ready");
 const dock=element("nav",{id:"arcadeGameTools","aria-label":"Arcade quick utilities"});
 const toggle=element("button",{className:"arcade-tool-trigger",type:"button","aria-expanded":"false","aria-controls":"arcadeGameToolList"},"Tools +");
 const tray=element("div",{id:"arcadeGameToolList",className:"arcade-tool-list"});
 tray.hidden=true;
 // A single lower-right dock owns every Arcade utility, including game return.
 // Never inject a top breadcrumb, additional masthead, or game overlay.
 if(!IS_HOME){
  const route=element("div",{className:"arcade-game-route","aria-label":"Arcade game location"});
  route.append(element("a",{href:URLS.arcade},"← Arcade"),element("span",{className:"arcade-route-title"},title));
  if(document.fullscreenEnabled&&typeof document.documentElement.requestFullscreen==="function"){
   const full=element("button",{type:"button","aria-label":"Enter full-screen game view"},"Full screen");
   full.addEventListener("click",async()=>{
    try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}
    catch{full.textContent="Unavailable";}
   });
   document.addEventListener("fullscreenchange",()=>{
    const active=!!document.fullscreenElement;
    full.textContent=active?"Exit screen":"Full screen";
    full.setAttribute("aria-label",active?"Exit full-screen game view":"Enter full-screen game view");
   });
   route.append(full);
  }
  tray.append(route);
 }
 const buttons=[
  ["P","Profile",URLS.profile,"","Open Academy Student Portal; learner identity is verified there"],
  ["β","Beta",beta.href,"arcade-beta","Report feedback about this game"],
  ["♡","Support",URLS.support,"arcade-support","Optional support for free Academy learning"],
  ["S","PLERA Search",URLS.search,"","Open the PLERA Search Engine"]
 ];
 for(const [mark,label,href,kind,tooltip] of buttons){
  const a=element("a",{href,className:kind,target:"_blank",rel:"noopener noreferrer","aria-label":label});
  a.append(element("span",{className:"arcade-tool-mark","aria-hidden":"true"},mark),element("span",{},label));
  a.title=tooltip;
  tray.append(a);
 }
 function expand(open){
  tray.hidden=!open;toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Hide Arcade tools":"Show Arcade tools");
  toggle.textContent=open?"Tools −":"Tools +";
 }
 toggle.addEventListener("click",()=>expand(tray.hidden));
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!tray.hidden){expand(false);toggle.focus();}});
 dock.append(tray,toggle);
 document.body.append(dock);
 // Show the four tools on roomy desktop screens; keep play space clear on phones.
 expand(!!(window.matchMedia&&window.matchMedia("(min-width: 800px)").matches));
 window.ArcadeGameShell=Object.freeze({mounted:true,version:"1.1",home:IS_HOME,arcade:URLS.arcade,openTools:()=>expand(true),closeTools:()=>expand(false)});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount,{once:true});else mount();
})();