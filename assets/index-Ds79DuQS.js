(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();function g(n){const o=[[[0,0],[0,1],[0,2]],[[1,0],[1,1],[1,2]],[[2,0],[2,1],[2,2]],[[0,0],[1,0],[2,0]],[[0,1],[1,1],[2,1]],[[0,2],[1,2],[2,2]],[[0,0],[1,1],[2,2]],[[0,2],[1,1],[2,0]]];for(const i of o){const[[s,e],[t,r],[c,l]]=i,m=n[s][e],v=n[t][r],I=n[c][l];if(m&&m===v&&v===I)return m}return n.flat().every(i=>i)?"draw":null}const B={X:-100,O:100,draw:0};function O(n){let o=-1/0,i={row:0,col:0};for(let s=0;s<3;s++)for(let e=0;e<3;e++)if(!n[s][e]){n[s][e]="O";const t=h(n,0,!1);n[s][e]="",t>o&&(o=t,i={row:s,col:e})}return i}function h(n,o,i){const s=g(n);if(s!==null)return B[s]-o;if(i){let e=-1/0;for(let t=0;t<3;t++)for(let r=0;r<3;r++)if(!n[t][r]){n[t][r]="O";const c=h(n,o+1,!1);n[t][r]="",e=Math.max(c,e)}return e}else{let e=1/0;for(let t=0;t<3;t++)for(let r=0;r<3;r++)if(!n[t][r]){n[t][r]="X";const c=h(n,o+1,!0);n[t][r]="",e=Math.min(c,e)}return e}}function y(){return Array.from({length:3},()=>Array(3).fill(""))}function C(n){if(!("speechSynthesis"in window))return;const o=new SpeechSynthesisUtterance(n);o.lang="zh-TW",speechSynthesis.cancel(),speechSynthesis.speak(o)}function M({board:n,isThinking:o,onClick:i}){const s=document.getElementById("board");s.innerHTML="",n.forEach((e,t)=>{e.forEach((r,c)=>{const l=document.createElement("button");l.className=`
        w-[100px] h-[100px]
        text-8xl font-extrabold
        border border-gray-300 dark:border-gray-700
        rounded-xl shadow transition-transform duration-200 ease-in-out
        hover:scale-105 active:scale-95
        ${r==="X"?"text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-800":r==="O"?"text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-800":"text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"}
        ${r===""?"bg-white dark:bg-gray-900":"bg-transparent"}
      `,l.textContent=r,!r&&!o&&(l.onclick=()=>i(t,c)),s.appendChild(l)})})}function S(n){const o=document.getElementById("talk"),i=document.getElementById("talk-text");i.textContent=n,o.classList.remove("hidden","animate-fade-out"),o.classList.add("animate-fade-in"),clearTimeout(o._fadeOutTimer),o._fadeOutTimer=setTimeout(()=>{o.classList.remove("animate-fade-in"),o.classList.add("animate-fade-out"),setTimeout(()=>o.classList.add("hidden"),400)},500)}const p={ai:new Audio("sounds/ai.mp3"),click:new Audio("sounds/click.mp3")},k=["這步你真的想清楚了嗎？","你還有機會... 雖然不大。","看起來你快投降了。","我會讓你見識到什麼叫完美布局。","準備好了嗎？這次我認真了。","你這樣下，太天真了。","你這樣下，是想幫我嗎？","這場對決注定只有一個勝者。","你的 O 有點迷路了。","你是不是走錯房間了？這是高手區。","你還好嗎？要不要我讓一步。","下得不錯…對我來說啦。","這種局面，我閉著眼也能贏。","這招我已經見過 101 次了。","年輕人、有讀書嗎。"];let a=y(),u=!1,f=!0,w=!0;const A=document.getElementById("reset"),T=document.getElementById("result-modal"),P=document.getElementById("modal-title"),X=document.getElementById("modal-close"),E=document.getElementById("spinner"),N=document.getElementById("talk"),j=document.getElementById("talk-text"),b=document.getElementById("toggle-sound"),x=document.getElementById("toggle-trash");b.addEventListener("change",()=>f=b.checked);x.addEventListener("change",()=>w=x.checked);A.addEventListener("click",()=>{a=y(),N.classList.add("hidden"),j.textContent="",d()});X.addEventListener("click",()=>{T.classList.add("hidden"),a=y(),d()});function L(n){P.textContent=n==="draw"?"平手了！":n==="X"?"你贏了！":"AI 贏了！",T.classList.remove("hidden")}function d(){M({board:a,isThinking:u,onClick:async(n,o)=>{if(u||a[n][o])return;a[n][o]="X",navigator.vibrate&&navigator.vibrate(50),f&&p.click.play(),d();const i=g(a);if(i)return L(i);if(u=!0,E.classList.remove("hidden"),w){const r=k[Math.floor(Math.random()*k.length)];S(r),f&&C(r)}await new Promise(r=>setTimeout(r,1200));const{row:s,col:e}=O(a);a[s][e]="O",navigator.vibrate&&navigator.vibrate(50),f&&p.ai.play(),u=!1,E.classList.add("hidden"),d();const t=g(a);if(t)return L(t)}})}d();
