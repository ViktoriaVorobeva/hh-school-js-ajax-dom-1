(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const i of c.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(n){if(n.ep)return;n.ep=!0;const c=s(n);fetch(n.href,c)}})();const v=10,L=5,y=3,S=e=>fetch(`https://restcountries.com/v3.1/name/${e}`,{method:"GET",mode:"cors",cache:"no-cache",credentials:"include",headers:{"Content-Type":"application/json"},redirect:"follow"}).then(t=>t.ok?t.json():Promise.reject(t)),f=(e,t)=>{try{localStorage.setItem(e,JSON.stringify(t))}catch{localStorage.clear()}},d=e=>{const t=localStorage.getItem(e);if(t!==null)try{return JSON.parse(t)}catch{return[]}return[]},p=document.querySelector(".search"),o=document.querySelector(".suggest"),a=document.querySelector(".result"),g=document.querySelector(".history__list"),u=(e,t)=>d(t).find(r=>r.name.common===e),h=e=>{o.classList.remove("active"),o.innerHTML="";let t=0;e.map(s=>s.name.common).slice(0,v).forEach(s=>{const r=document.createElement("li");r.textContent=s,r.classList.add("suggest__item"),u(s,"visited")&&t<L?(t++,r.classList.add("suggest__item-visited"),o.prepend(r)):o.append(r)}),o.classList.add("active")},_=e=>{const t=a.querySelector(".result__name"),s=a.querySelector(".result__capital"),r=a.querySelector(".result__languages"),n=a.querySelector(".result__currencies"),c=a.querySelector(".result__flag");t.textContent=e.name.common,s.textContent=e.capital[0];for(const i in e.languages){const l=document.createElement("li");l.textContent=e.languages[i],r.append(l)}for(const i in e.currencies){const l=document.createElement("li");l.textContent=i,n.append(l)}c.setAttribute("src",e.flags.png),c.setAttribute("alt",e.flags.alt),a.classList.add("active")},m=()=>{const e=d("visited");e.length!==0?e.map(t=>t.name.common).slice(0,y).forEach(t=>{const s=document.createElement("li");s.textContent=t,g.append(s)}):g.innerHTML=""},E=e=>{if(e.target&&e.target instanceof HTMLLIElement){a.classList.remove("active"),o.classList.remove("active"),p.value="";const t=e.target.textContent,s=u(t,"currentRequests"),r=u(t,"visited"),n=d("visited");!r&&s&&n.unshift(s),f("visited",n),s&&_(s),m()}},C=async e=>{if(e.preventDefault(),e.target&&e.target instanceof HTMLInputElement){let t=[];try{t=await S(e.target.value),f("currentRequests",t),h(t)}catch(s){const r=document.createElement("li");s.statusText?r.textContent=s.statusText:r.textContent="Проблемы с подключением. Попробуйте обновить страницу",r.classList.add("suggest__item"),o.append(r),o.classList.add("active")}}};p.addEventListener("change",C);o.addEventListener("click",E);window.addEventListener("storage",()=>{m()});m();
