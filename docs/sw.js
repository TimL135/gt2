if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(i[a])return;let c={};const d=e=>n(e,a),o={module:{uri:a},exports:c,require:d};i[a]=Promise.all(r.map((e=>o[e]||d(e)))).then((e=>(s(...e),c)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/background-e7f209ba.png",revision:null},{url:"assets/index-35083b23.js",revision:null},{url:"assets/index-a79697ad.css",revision:null},{url:"icon.png",revision:"08267a05c8cde3021c9d3e697e20dd96"},{url:"img/background/background.png",revision:"be5bca75e1c7d0b4a1cee2369f4a178a"},{url:"img/enemies/Enemie2.png",revision:"ad40e4a99dc6468c13d8da615c1a622a"},{url:"img/enemies/normal.png",revision:"398ab1b8b757a7c79c052513aaa5fdf5"},{url:"img/items/heal.png",revision:"d384c101e29a928db21b1777bc4e4f53"},{url:"img/items/slow.png",revision:"ada37654bcebcb9a0c1a44d428aeb594"},{url:"img/items/speed.png",revision:"0cca058169df58f4e3a3784e0b0296dc"},{url:"img/items/stun.png",revision:"56fcc8ec49605507ffe31c502151dbe3"},{url:"img/player/plasma.png",revision:"d62581fa2775c6fd6a7493e5e8662f1f"},{url:"img/player/player.png",revision:"6f62d990c8a79d205bd7209f9cca51ac"},{url:"index.html",revision:"7635b4610dd57c6a90004a449dfe9199"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"icon.png",revision:"08267a05c8cde3021c9d3e697e20dd96"},{url:"manifest.webmanifest",revision:"49485c2c6153a7c93a8eb0e00125e47e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
