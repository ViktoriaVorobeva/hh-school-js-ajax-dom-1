(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const v=10,y=5,L=3,S=t=>fetch(`https://restcountries.com/v3.1/name/${t}`,{method:"GET",mode:"cors",cache:"no-cache",credentials:"include",headers:{"Content-Type":"application/json"},redirect:"follow"}).then(e=>e.ok?e.json():Promise.reject("error"),e=>Promise.reject(e)),g=(t,e)=>{localStorage.setItem(t,JSON.stringify(e))},d=t=>{const e=localStorage.getItem(t);return e!==null?JSON.parse(e):[]},f=document.querySelector(".search"),c=document.querySelector(".suggest"),a=document.querySelector(".result"),m=document.querySelector(".history__list"),u=(t,e)=>d(e).find(r=>r.name.common===t),_=t=>{c.classList.remove("active"),c.innerHTML="";let e=0;t.map(s=>s.name.common).slice(0,v).forEach(s=>{const r=document.createElement("li");r.textContent=s,r.classList.add("suggest__item"),u(s,"visited")&&e<y?(e++,r.classList.add("suggest__item-visited"),c.prepend(r)):c.append(r)}),c.classList.add("active")},h=t=>{const e=a.querySelector(".result__name"),s=a.querySelector(".result__capital"),r=a.querySelector(".result__languages"),n=a.querySelector(".result__currencies"),o=a.querySelector(".result__flag");e.textContent=t.name.common,s.textContent=t.capital;for(const i in t.languages){const l=document.createElement("li");l.textContent=t.languages[i],r.append(l)}for(const i in t.currencies){const l=document.createElement("li");l.textContent=i,n.append(l)}o.setAttribute("src",t.flags.png),o.setAttribute("alt",t.flags.alt),a.classList.add("active")},p=()=>{m.innerHTML="",d("visited").map(e=>e.name.common).slice(0,L).forEach(e=>{const s=document.createElement("li");s.textContent=e,m.append(s)})},E=t=>{a.classList.remove("active"),c.classList.remove("active"),f.value="";const e=t.target.textContent,s=u(e,"currentRequests"),r=u(e,"visited"),n=d("visited");r||n.unshift(s),g("visited",n),h(s),p()},C=async t=>{t.preventDefault();let e=[];try{e=await S(t.target.value),g("currentRequests",e),_(e)}catch{const s=document.createElement("li");s.textContent="Страны по данному запросу не существует(",s.classList.add("suggest__item"),c.append(s),c.classList.add("active")}};f.addEventListener("change",C);c.addEventListener("click",E);window.addEventListener("storage",()=>{p()});