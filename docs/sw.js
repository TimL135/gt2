if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let l={};const c=e=>i(e,a),u={module:{uri:a},exports:l,require:c};s[a]=Promise.all(n.map((e=>u[e]||c(e)))).then((e=>(r(...e),l)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/aim-4bb513f9.png",revision:null},{url:"assets/background-e7f209ba.png",revision:null},{url:"assets/chase-b516e857.png",revision:null},{url:"assets/heal-ef150568.png",revision:null},{url:"assets/index-67ee8743.js",revision:null},{url:"assets/index-a055496b.css",revision:null},{url:"assets/normal-c68122fe.png",revision:null},{url:"assets/plasma-9d5c466b.png",revision:null},{url:"assets/plasmaEnemie-1b5d6348.png",revision:null},{url:"assets/player-0d64c3eb.png",revision:null},{url:"assets/player2-9ce81ae9.png",revision:null},{url:"assets/player3-cc532c3e.png",revision:null},{url:"assets/player4-9c364ee4.png",revision:null},{url:"assets/player5-a79a356e.png",revision:null},{url:"assets/shot-2e2fe013.png",revision:null},{url:"assets/slow-a5da1641.png",revision:null},{url:"assets/speed-8bffb78f.png",revision:null},{url:"assets/stun-87b8fe13.png",revision:null},{url:"icon.png",revision:"08267a05c8cde3021c9d3e697e20dd96"},{url:"img/background/background.png",revision:"be5bca75e1c7d0b4a1cee2369f4a178a"},{url:"img/enemies/aim.png",revision:"b73bb2163576f5452f72397adc1f399b"},{url:"img/enemies/chase.png",revision:"d22beaee03cdc9e8e69c12eb53895167"},{url:"img/enemies/Enemie2.png",revision:"ad40e4a99dc6468c13d8da615c1a622a"},{url:"img/enemies/normal.png",revision:"398ab1b8b757a7c79c052513aaa5fdf5"},{url:"img/enemies/plasmaEnemie.png",revision:"fa1922a939a92a35190dbae83ac532be"},{url:"img/enemies/shot.png",revision:"0b1785c7fd1958c87135f0655947b580"},{url:"img/items/heal.png",revision:"8159c70d879896a8c4690a6b75a99f9d"},{url:"img/items/slow.png",revision:"ada37654bcebcb9a0c1a44d428aeb594"},{url:"img/items/speed.png",revision:"986cc69cef0ac4cccd4ba5bac573bd32"},{url:"img/items/stun.png",revision:"56fcc8ec49605507ffe31c502151dbe3"},{url:"img/player/plasma.png",revision:"d62581fa2775c6fd6a7493e5e8662f1f"},{url:"img/player/player.png",revision:"6f62d990c8a79d205bd7209f9cca51ac"},{url:"img/player/player2.png",revision:"bd56fc7814f6d575cb724175a9734a93"},{url:"img/player/player3.png",revision:"462bec7da0a9083bad77cd92db55babf"},{url:"img/player/player4.png",revision:"5f58849821bbb8b27516d62a05b51a5f"},{url:"img/player/player5.png",revision:"c0c8ea1005168ae587eee7eeda80e9fc"},{url:"index.html",revision:"14409e12db54c4aa95cb41542bd3e49a"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"icon.png",revision:"08267a05c8cde3021c9d3e697e20dd96"},{url:"manifest.webmanifest",revision:"49485c2c6153a7c93a8eb0e00125e47e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
