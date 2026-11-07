const EVENTS=[
 {id:1,name:"HackNova 24-hour Hackathon",cat:"Tech",date:"2026-12-12T09:00",venue:"Main Auditorium",g:["#2f4bff","#7a3cff"],desc:"Build a working prototype in 24 hours with a team of up to four.",long:"Teams pick a problem track on the day, build through the night and demo to a panel of mentors. Food, mentors and power strips are provided. Bring a laptop and a team."},
 {id:2,name:"Responsive Web Design Workshop",cat:"Workshop",date:"2026-12-05T14:00",venue:"Lab 3, CS Block",g:["#0891b2","#2f4bff"],desc:"Hands-on session on flexbox, grid and mobile-first CSS.",long:"Two hours of live coding. You will rebuild a landing page so it works on a phone, a tablet and a desktop. Basic HTML knowledge is enough."},
 {id:3,name:"Unplugged Campus Concert",cat:"Music",date:"2026-12-19T18:30",venue:"Open Air Theatre",g:["#e11d48","#f97316"],desc:"Student bands and solo acts play an acoustic evening set.",long:"Doors open at 18:00. Ten acts, no amplified drums, food stalls on the lawn. Bring a mat if you want a front-row spot."},
 {id:4,name:"Inter-College Football Cup",cat:"Sports",date:"2027-01-09T08:00",venue:"University Ground",g:["#16a34a","#0d9488"],desc:"Eight college teams, one knockout bracket, one trophy.",long:"Matches run from morning to late afternoon. Teams must register a squad of 11 plus 4 substitutes. Spectators are free."},
 {id:5,name:"Intro to Machine Learning",cat:"Workshop",date:"2026-12-08T10:00",venue:"Seminar Hall B",g:["#7c3aed","#db2777"],desc:"Train and evaluate your first classifier in Python.",long:"We go from a raw CSV to a trained model in one morning using scikit-learn. Bring a laptop with Python 3 installed."},
 {id:6,name:"Open Canvas Art Exhibition",cat:"Art",date:"2027-01-16T11:00",venue:"Design Gallery",g:["#f59e0b","#ef4444"],desc:"Paintings, prints and digital art by students across departments.",long:"Walk through three rooms of student work. Artists will be present from 14:00 to talk about their pieces. Entry is free."},
 {id:7,name:"Capture The Flag Night",cat:"Tech",date:"2027-01-23T19:00",venue:"Lab 1, CS Block",g:["#0f766e","#2f4bff"],desc:"Solve security puzzles against the clock in solo or pair mode.",long:"Challenges cover web, crypto and reverse engineering at beginner and intermediate levels. A scoreboard runs live all night."},
 {id:8,name:"Startup Pitch Evening",cat:"Talk",date:"2027-02-06T17:00",venue:"Conference Room 2",g:["#475569","#2f4bff"],desc:"Five student teams pitch to founders and investors.",long:"Each team gets five minutes to pitch and five for questions. Founders from the local startup community will judge."}
];
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=(d,o)=>new Intl.DateTimeFormat("en-GB",o).format(new Date(d));
const when=d=>fmt(d,{weekday:"short",day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});
const store={
  get(k,f){try{return JSON.parse(localStorage.getItem(k))??f}catch(e){return f}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
};
let cat="All",query="",regs=store.get("kx-regs",[]);

/* theme */
const root=document.documentElement;
function applyTheme(t){root.setAttribute("data-theme",t)}
const savedTheme=store.get("kx-theme",null);
if(savedTheme)applyTheme(savedTheme);
$("#theme").onclick=()=>{
  const cur=root.getAttribute("data-theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
  const nx=cur==="dark"?"light":"dark";applyTheme(nx);store.set("kx-theme",nx);
};

/* filters + cards */
function renderChips(){
  const cats=["All",...new Set(EVENTS.map(e=>e.cat))];
  $("#chips").innerHTML=cats.map(c=>`<button class="chip" aria-pressed="${c===cat}" data-c="${c}">${c}</button>`).join("");
  $("#chips").querySelectorAll(".chip").forEach(b=>b.onclick=()=>{cat=b.dataset.c;renderChips();renderGrid()});
}
function art(e,small){
  const dt=new Date(e.date);
  return `<div class="art" style="background:linear-gradient(135deg,${e.g[0]},${e.g[1]})"><div><span class="d">${dt.getDate()}</span><span class="m">${fmt(dt,{month:"short"})}</span></div><span class="c">${esc(e.cat)}</span></div>`;
}
function renderGrid(){
  const list=EVENTS.filter(e=>(cat==="All"||e.cat===cat)&&(e.name+e.venue+e.cat+e.desc).toLowerCase().includes(query.toLowerCase()))
    .sort((a,b)=>new Date(a.date)-new Date(b.date));
  $("#grid").innerHTML=list.length?list.map(e=>`<article class="card">${art(e)}<div class="body"><h3>${esc(e.name)}</h3><div class="meta">${fmt(e.date,{weekday:"short",hour:"2-digit",minute:"2-digit"})} · ${esc(e.venue)}</div><p>${esc(e.desc)}</p><button class="btn" data-id="${e.id}">View and register</button></div></article>`).join("")
    :`<div class="empty">No events match “${esc(query)}”${cat!=="All"?" in "+esc(cat):""}. Clear the search or pick another category.</div>`;
  $("#grid").querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>openModal(+b.dataset.id));
}
$("#q").oninput=e=>{query=e.target.value.trim();renderGrid()};

/* countdown */
const nextEvent=()=>EVENTS.filter(e=>new Date(e.date)>Date.now()).sort((a,b)=>new Date(a.date)-new Date(b.date))[0];
function parts(ms){const s=Math.max(0,Math.floor(ms/1000));return[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60]}
function tick(){
  const e=nextEvent(),box=$("#next");
  if(!e){box.innerHTML="<div><strong>No upcoming events right now</strong><small>Check back soon.</small></div>";return}
  const p=parts(new Date(e.date)-Date.now()),L=["days","hrs","min","sec"];
  box.innerHTML=`<div><small>Next up</small><strong>${esc(e.name)}</strong><small>${when(e.date)}</small></div><div class="cd">${p.map((v,i)=>`<div><span>${String(v).padStart(2,"0")}</span><small>${L[i]}</small></div>`).join("")}</div><button class="btn" id="nb">Register</button>`;
  $("#nb").onclick=()=>openModal(e.id);
}
setInterval(tick,1000);

/* modal + form */
let lastFocus=null;
function openModal(id){
  const e=EVENTS.find(x=>x.id===id);lastFocus=document.activeElement;
  $("#sheet").innerHTML=`${art(e)}<button class="btn icon x" id="close" aria-label="Close">✕</button>
  <div class="pad"><h2 id="mt">${esc(e.name)}</h2><p>${when(e.date)} · ${esc(e.venue)}</p><p>${esc(e.long)}</p>
  <div id="formbox"><form id="f" novalidate>
   <div><label for="n">Full name</label><input id="n" autocomplete="name"><div class="err" data-e="n"></div></div>
   <div><label for="m">Email address</label><input id="m" type="email" autocomplete="email"><div class="err" data-e="m"></div></div>
   <div><label for="p">Phone number</label><input id="p" type="tel" autocomplete="tel" placeholder="e.g. 9876543210"><div class="err" data-e="p"></div></div>
   <div><label for="s">Event</label><select id="s">${EVENTS.map(x=>`<option value="${x.id}" ${x.id===id?"selected":""}>${esc(x.name)}</option>`).join("")}</select><div class="err" data-e="s"></div></div>
   <button class="btn" type="submit">Confirm registration</button></form></div></div>`;
  $("#modal").classList.add("open");document.body.style.overflow="hidden";
  $("#close").onclick=closeModal;$("#n").focus();
  $("#f").onsubmit=submit;
  ["n","m","p"].forEach(k=>$("#"+k).oninput=()=>check(k));
}
function closeModal(){$("#modal").classList.remove("open");document.body.style.overflow="";if(lastFocus)lastFocus.focus()}
$("#modal").onclick=e=>{if(e.target.id==="modal")closeModal()};
addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

const rules={
  n:v=>!v?"Enter your full name.":!/^[A-Za-z][A-Za-z .'-]{1,59}$/.test(v)?"Use letters only, at least 2 characters.":"",
  m:v=>!v?"Enter your email address.":!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(v)?"Enter a valid email like name@example.com.":"",
  p:v=>{const d=v.replace(/[\s-]/g,"").replace(/^\+91/,"");return !v?"Enter your phone number.":!/^[6-9]\d{9}$/.test(d)?"Enter a 10-digit mobile number starting with 6, 7, 8 or 9.":""}
};
function check(k){
  const el=$("#"+k),msg=rules[k](el.value.trim());
  el.classList.toggle("bad",!!msg);document.querySelector(`[data-e="${k}"]`).textContent=msg;return !msg;
}
function submit(ev){
  ev.preventDefault();
  const ok=["n","m","p"].map(check).every(Boolean);if(!ok){document.querySelector(".bad").focus();return}
  const id=+$("#s").value,email=$("#m").value.trim().toLowerCase();
  if(regs.some(r=>r.id===id&&r.email===email)){
    $("#s").classList.add("bad");document.querySelector('[data-e="s"]').textContent="This email is already registered for this event.";return}
  const e=EVENTS.find(x=>x.id===id);
  regs.push({id,name:$("#n").value.trim(),email,phone:$("#p").value.trim(),at:Date.now()});
  store.set("kx-regs",regs);renderRegs();
  $("#formbox").innerHTML=`<div class="ok" style="margin-top:18px">You’re registered, ${esc(regs[regs.length-1].name.split(" ")[0])}. We’ve saved your seat for <b>${esc(e.name)}</b> on ${when(e.date)}.</div><button class="btn ghost" style="margin-top:14px" id="done">Close</button>`;
  $("#done").onclick=closeModal;toast("Registration confirmed");
}

/* registrations */
function renderRegs(){
  $("#regs").innerHTML=regs.length?regs.map((r,i)=>{const e=EVENTS.find(x=>x.id===r.id);return `<div class="reg"><div><strong>${esc(e.name)}</strong><br><small>${esc(r.name)} · ${esc(r.email)}</small></div><button class="btn ghost" data-i="${i}">Cancel</button></div>`}).join("")
   :`<div class="empty">You haven’t registered for anything yet. Pick an event above.</div>`;
  $("#regs").querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>{regs.splice(+b.dataset.i,1);store.set("kx-regs",regs);renderRegs();toast("Registration cancelled")});
  $("#clear").hidden=!regs.length;
}
$("#clear").onclick=()=>{regs=[];store.set("kx-regs",regs);renderRegs()};
let tt;function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("show"),2400)}

renderChips();renderGrid();renderRegs();tick();
