if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let l={};const c=e=>i(e,a),d={module:{uri:a},exports:l,require:c};s[a]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(r(...e),l)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/background-e7f209ba.png",revision:null},{url:"assets/heal-07f9b350.png",revision:null},{url:"assets/index-66a572b7.css",revision:null},{url:"assets/index-f4db1dd8.js",revision:null},{url:"assets/normal-c68122fe.png",revision:null},{url:"assets/plasma-9d5c466b.png",revision:null},{url:"assets/player-0d64c3eb.png",revision:null},{url:"assets/slow-a5da1641.png",revision:null},{url:"assets/speed-d2e3c3a1.png",revision:null},{url:"assets/stun-87b8fe13.png",revision:null},{url:"icon.png",revision:"08267a05c8cde3021c9d3e697e20dd96"},{url:"img/background/background.png",revision:"be5bca75e1c7d0b4a1cee2369f4a178a"},{url:"img/enemies/Enemie2.png",revision:"ad40e4a99dc6468c13d8da615c1a622a"},{url:"img/enemies/normal.png",revision:"398ab1b8b757a7c79c052513aaa5fdf5"},{url:"img/items/heal.png",revision:"d384c101e29a928db21b1777bc4e4f53"},{url:"img/items/slow.png",revision:"ada37654bcebcb9a0c1a44d428aeb594"},{url:"img/items/speed.png",revision:"0cca058169df58f4e3a3784e0b0296dc"},{url:"img/items/stun.png",revision:"56fcc8ec49605507ffe31c502151dbe3"},{url:"img/player/plasma.png",revision:"d62581fa2775c6fd6a7493e5e8662f1f"},{url:"img/player/player.png",revision:"6f62d990c8a79d205bd7209f9cca51ac"},{url:"index.html",revision:"5c702a827e86b33872ad23865af46540"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"icon.png",revision:"08267a05c8cde3021c9d3e697e20dd96"},{url:"manifest.webmanifest",revision:"49485c2c6153a7c93a8eb0e00125e47e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
