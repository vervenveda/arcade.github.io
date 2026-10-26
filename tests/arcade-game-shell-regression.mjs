#!/usr/bin/env node
/* Arcade shared game shell regression.
 * Verifies installation and simulated dock behavior; not visual-browser certification. */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import assert from "node:assert/strict";
import {fileURLToPath} from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const shell=read("assets/arcade-game-shell.js");
new vm.Script(shell,{filename:"assets/arcade-game-shell.js"});
const rootGames=[
 "Chess_Studio_index.html","Orions_connect_four_index.html",
 "Jenny's_Sudoku_index.html","SixbySix_index.html","AffixSix™_index.html"
];
const kidsGames=[
 "ABC_Bubbles_index.html","Acts_of_Kindness_index.html","Bubble_Pop_index.html",
 "Palette_Quest_index.html","Pattern_Pirates_index.html","Shapes_index.html",
 "prek_waether_match_index.html","PizzaAmorè_index.html","PizzaAmorè_deluxe_index.html"
];
for(const name of rootGames.concat(kidsGames)){
 const nested=kidsGames.includes(name);
 const filename=nested?"games/kids/"+name:name;
 const html=read(filename);
 const expected='<script src="'+(nested?"../../assets/":"./assets/")+'arcade-game-shell.js" defer></script>';
 assert.equal(html.split(expected).length-1,1,filename+" missing/duplicated shell script");
 assert.equal((html.match(/<!doctype html>/gi)||[]).length,1,filename+" multiple documents");
 assert.equal((html.match(/<\/body>/gi)||[]).length,1,filename+" multiple body closes");
 for(const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)){
  if(match[1].trim())new vm.Script(match[1],{filename});
 }
}
function mountOn(url,wide){
 const nodes=new Map();
 class Element{
  constructor(tag){this.tagName=tag;this.children=[];this.attributes={};this.style={};this.hidden=false;
   this.classList={add:()=>{}};}
  setAttribute(key,val){this.attributes[key]=String(val);if(key==="id")nodes.set(String(val),this);}
  append(...children){this.children.push(...children);}
  appendChild(child){this.append(child);}
  addEventListener(type,fn){this["on_"+type]=fn;}
  focus(){}
 }
 const doc=new URL(url);
 const document={
  currentScript:{src:new URL("assets/arcade-game-shell.js",new URL("https://vervenveda.github.io/arcade.github.io/")).href},
  readyState:"complete",title:"Arcade Example",fullscreenEnabled:true,fullscreenElement:null,
  documentElement:{requestFullscreen:async()=>{}},
  body:new Element("body"),head:new Element("head"),
  createElement:tag=>new Element(tag),getElementById:id=>nodes.get(id)||null,addEventListener:()=>{}
 };
 const window={matchMedia:()=>({matches:wide}),addEventListener:()=>{}};
 const location={hostname:doc.hostname,pathname:doc.pathname};
 vm.runInNewContext(shell,{document,window,location,URL,console});
 assert(window.ArcadeGameShell?.mounted,"Shell not initialized");
 const dock=nodes.get("arcadeGameTools"),tray=nodes.get("arcadeGameToolList");
 const crumb=nodes.get("arcadeGameBreadcrumb"),trigger=dock.children[1];
 assert.equal(tray.children.length,4,"Missing utility buttons");
 const links=tray.children.map(node=>node.attributes.href);
 assert.equal(links[0],"https://vervenveda.com/Khaemenes_Academy.github.io/student/");
 assert(links[1].startsWith("https://vervenveda.com/beta/?source="));
 assert(links[1].endsWith("#feedback"));
 assert.equal(links[2],"https://buy.stripe.com/aFa8wQ5xf9Scf65caT4AU0s");
 assert.equal(links[3],"https://vervenveda.com/PLERASearch.github.io/");
 assert.equal(crumb.children[0].attributes.href,"https://vervenveda.github.io/arcade.github.io/index.html");
 for(const a of tray.children){assert.equal(a.attributes.rel,"noopener noreferrer");assert.equal(a.attributes.target,"_blank");}
 assert.equal(tray.hidden,!wide,"Responsive initial dock state wrong");
 trigger.on_click();
 assert.equal(tray.hidden,wide,"Dock toggle failed");
 assert(!("KhaemenesFamilyRegistry" in window),"Shell must not access learner records");
}
mountOn("https://vervenveda.github.io/arcade.github.io/Chess_Studio_index.html",true);
mountOn("https://vervenveda.github.io/arcade.github.io/games/kids/ABC_Bubbles_index.html",false);
assert(shell.includes("#vnvBetaProgramLink"),"Existing floating Beta control not deduplicated");
console.log("PASS: 14 game pages include one correct shell reference and valid inline scripts.");
console.log("PASS: simulated desktop and mobile docks, public links, breadcrumbs and toggle.");
console.log("PENDING: visual/mobile/real-browser validation on actual devices.");
