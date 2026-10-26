/* Arcade Game Shell v1 · Adapted from Khaemenes Academy Home Personalization.
 * Public links only. Never reads, copies, syncs or authenticates learner records. */
(()=>{
"use strict";
const SCRIPT=document.currentScript;
if(!SCRIPT||!SCRIPT.src||document.getElementById("arcadeGameTools"))return;
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
'body.arcade-game-shell-ready #vnvBetaProgramLink,body.arcade-game-shell-ready #vnvBetaProgramFallback,body.arcade-game-shell-ready #vnv-global-support-top,body.arcade-game-shell-ready a[aria-label="Open the Verve N Veda Beta Program"]{display:none!important}',
'#arcadeGameBreadcrumb,#arcadeGameTools,#arcadeGameTools *{box-sizing:border-box}',
'#arcadeGameBreadcrumb{position:fixed;z-index:2147482300;top:max(8px,env(safe-area-inset-top));left:max(8px,env(safe-area-inset-left));max-width:min(94vw,560px);display:flex;align-items:center;gap:8px;padding:5px 8px;border:1px solid rgba(192,167,123,.7);border-radius:7px;background:rgba(17,31,40,.94);color:#f8f4e9;box-shadow:0 5px 20px rgba(0,0,0,.22);backdrop-filter:blur(8px);font:400 12px/1.3 "Avenir Next","Segoe UI",Arial,sans-serif;text-align:left}',
'#arcadeGameBreadcrumb a{color:#e9d29a;text-decoration:none;white-space:nowrap;padding:5px 6px;border-radius:5px}',
'#arcadeGameBreadcrumb .arcade-current{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;max-width:235px;opacity:.9}',
'#arcadeGameBreadcrumb .arcade-sep{opacity:.55}',
'#arcadeGameBreadcrumb button{min-height:28px;flex:none;margin:0;padding:4px 8px;border:1px solid rgba(235,213,170,.45);border-radius:5px;background:transparent;color:#f8f4e9;font:inherit;cursor:pointer}',
'#arcadeGameTools{position:fixed;z-index:2147482450;right:max(9px,env(safe-area-inset-right));bottom:max(9px,env(safe-area-inset-bottom));display:flex;flex-direction:column;align-items:flex-end;gap:6px;max-width:calc(100vw - 18px);font:400 11px/1.25 "Avenir Next","Segoe UI",Arial,sans-serif;color:#17392f}',
'#arcadeGameTools .arcade-tool-trigger{min-height:42px;min-width:76px;border:1px solid #b48b45;border-radius:7px;background:rgba(255,253,248,.98);color:#17392f;box-shadow:0 6px 24px rgba(0,0,0,.23);font:500 11px/1.3 "Avenir Next","Segoe UI",Arial,sans-serif;cursor:pointer;padding:8px 12px}',
'#arcadeGameTools .arcade-tool-list{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:5px;padding:6px;border:1px solid rgba(180,139,69,.5);border-radius:7px;background:rgba(255,253,248,.98);box-shadow:0 8px 28px rgba(0,0,0,.22);max-width:min(94vw,480px)}',
'#arcadeGameTools .arcade-tool-list[hidden]{display:none!important}',
'#arcadeGameTools a{min-width:98px;min-height:42px;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:8px 9px;border-radius:7px;border:1px solid rgba(23,57,47,.25);background:#f8f9f5;color:#17392f;text-decoration:none;white-space:nowrap;font:500 11px/1.2 "Avenir Next","Segoe UI",Arial,sans-serif;letter-spacing:0}',
'#arcadeGameTools .arcade-tool-mark{width:18px;height:18px;display:inline-grid;place-items:center;border-radius:50%;background:#17392f;color:#fff;font:400 11px/1 Georgia,serif}',
'#arcadeGameTools .arcade-beta{background:#142331;color:#f8f2e8;border-color:#bd9c60}',
'#arcadeGameTools .arcade-beta .arcade-tool-mark{background:#bd9c60;color:#142331}',
'#arcadeGameTools .arcade-support{background:#597365;color:#fff;border-color:#446152}',
'#arcadeGameTools .arcade-support .arcade-tool-mark{background:#f2e5c8;color:#17392f}',
'#arcadeGameBreadcrumb a:focus-visible,#arcadeGameBreadcrumb button:focus-visible,#arcadeGameTools a:focus-visible,#arcadeGameTools button:focus-visible{outline:3px solid #edb94d;outline-offset:3px}',
'#arcadeGameTools a:hover,#arcadeGameTools button:hover{filter:brightness(1.08)}',
'body.arcade-game-shell-ready:has(dialog[open]) #arcadeGameTools,body.arcade-game-shell-ready:has(dialog[open]) #arcadeGameBreadcrumb,body.arcade-game-shell-ready:has(.tourOverlay[style*="flex"]) #arcadeGameTools,body.arcade-game-shell-ready:has(.tourOverlay[style*="flex"]) #arcadeGameBreadcrumb{display:none!important}',
'@media(max-width:650px){#arcadeGameBreadcrumb{max-width:calc(100vw - 16px);font-size:11px}#arcadeGameBreadcrumb .arcade-current{max-width:110px}#arcadeGameBreadcrumb button{padding:4px 6px}#arcadeGameTools .arcade-tool-list{max-width:min(95vw,252px)}#arcadeGameTools a{flex:1 1 100px}}',
'@media(max-width:350px){#arcadeGameBreadcrumb .arcade-current{display:none}}',
'@media print{#arcadeGameBreadcrumb,#arcadeGameTools{display:none!important}}',
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
 const breadcrumbs=element("nav",{id:"arcadeGameBreadcrumb","aria-label":"Arcade breadcrumb"});
 // Avoid covering the pre-existing Verve N Veda global navigation strip.
 if(typeof document.querySelector==="function" && document.querySelector(".vnv-global-strip"))breadcrumbs.style.top="max(54px,calc(env(safe-area-inset-top) + 46px))";
 breadcrumbs.append(element("a",{href:URLS.arcade},"← Arcade"),element("span",{className:"arcade-sep","aria-hidden":"true"},"/"),element("span",{className:"arcade-current","aria-current":"page"},title));
 if(document.fullscreenEnabled&&typeof document.documentElement.requestFullscreen==="function"){
  const full=element("button",{type:"button","aria-label":"Enter full-screen game view"},"Full Screen");
  full.addEventListener("click",async()=>{
   try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}
   catch{full.textContent="Fullscreen unavailable";}
  });
  document.addEventListener("fullscreenchange",()=>{
   const active=!!document.fullscreenElement;
   full.textContent=active?"Exit Full Screen":"Full Screen";
   full.setAttribute("aria-label",active?"Exit full-screen game view":"Enter full-screen game view");
  });
  breadcrumbs.append(full);
 }
 const dock=element("nav",{id:"arcadeGameTools","aria-label":"Arcade quick utilities"});
 const toggle=element("button",{className:"arcade-tool-trigger",type:"button","aria-expanded":"false","aria-controls":"arcadeGameToolList"},"Tools +");
 const tray=element("div",{id:"arcadeGameToolList",className:"arcade-tool-list"});
 tray.hidden=true;
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
 document.body.append(breadcrumbs,dock);
 // Show the four tools on roomy desktop screens; keep play space clear on phones.
 expand(!!(window.matchMedia&&window.matchMedia("(min-width: 800px)").matches));
 window.ArcadeGameShell=Object.freeze({mounted:true,version:"1.0",arcade:URLS.arcade,openTools:()=>expand(true),closeTools:()=>expand(false)});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount,{once:true});else mount();
})();