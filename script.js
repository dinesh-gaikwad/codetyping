const $ = id => document.getElementById(id);
let challenge, startTime = null, timerId = null, elapsed = 0, running = false, errors = 0;
let best = Number(localStorage.getItem("codetype_best") || 0);
let stats = JSON.parse(localStorage.getItem("codetype_stats") || '{"bestWpm":0,"bestAcc":0,"challenges":0}');

const keyRows = [
"1234567890-=","QWERTYUIOP[]\\","ASDFGHJKL;'","ZXCVBNM,./"
];
function buildKeyboard(){
  $("keyboard").innerHTML="";
  keyRows.forEach(row=>[...row].forEach(k=>{
    const el=document.createElement("div"); el.className="key"; el.id="key-"+CSS.escape(k); el.textContent=k;
    $("keyboard").appendChild(el);
  }));
  ["TAB","SPACE","BACKSPACE","ENTER","SHIFT","CTRL"].forEach(k=>{
    const el=document.createElement("div"); el.className="key"; el.id="key-"+k; el.textContent=k;
    $("keyboard").appendChild(el);
  });
}
buildKeyboard();

function filtered(){
  const lang=$("language").value;
  return lang==="all"?CHALLENGES:CHALLENGES.filter(x=>x.lang===lang);
}
function pickChallenge(){
  const arr=filtered();
  challenge=arr[Math.floor(Math.random()*arr.length)];
  $("challengeTitle").textContent=challenge.title;
  $("challengeLang").textContent=challenge.lang.toUpperCase();
  $("typingArea").value="";
  errors=0; elapsed=0; running=false; startTime=null; clearInterval(timerId);
  render();
  updateStats();
  $("typingArea").focus();
}
function render(){
  const text=challenge.code, typed=$("typingArea").value;
  let html="";
  for(let i=0;i<text.length;i++){
    let cls=i<typed.length?(typed[i]===text[i]?"correct":"wrong"):"";
    if(i===typed.length) cls+=" current";
    const c=text[i]===" "?" ":text[i];
    html+=`<span class="${cls.trim()}">${escapeHtml(c)}</span>`;
  }
  $("codeDisplay").innerHTML=html;
  $("progress").textContent=Math.min(100,Math.round(typed.length/text.length*100))+"%";
  highlightNext(text[typed.length]);
}
function escapeHtml(s){return s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");}
function highlightNext(ch){
  document.querySelectorAll(".key.next").forEach(x=>x.classList.remove("next"));
  if(!ch)return;
  let label=ch===" "?"SPACE":ch==="\n"?"ENTER":ch.toUpperCase();
  const el=document.getElementById("key-"+CSS.escape(label));
  if(el)el.classList.add("next");
}
function formatTime(sec){
  sec=Math.max(0,sec); return String(Math.floor(sec/60)).padStart(2,"0")+":"+String(sec%60).padStart(2,"0");
}
function metrics(){
  const typed=$("typingArea").value, target=challenge.code;
  let wrong=0;
  for(let i=0;i<Math.min(typed.length,target.length);i++) if(typed[i]!==target[i]) wrong++;
  errors=wrong;
  const minutes=Math.max(elapsed,0.5)/60;
  const correct=Math.max(0,typed.length-wrong);
  const wpm=Math.round((correct/5)/minutes);
  const acc=typed.length?Math.max(0,Math.round((correct/typed.length)*1000)/10):100;
  return {wpm,acc};
}
function updateStats(){
  const m=metrics();
  $("wpm").textContent=m.wpm;
  $("accuracy").textContent=m.acc+"%";
  $("errors").textContent=errors;
  $("time").textContent=formatTime(Math.max(0,Number($("duration").value)-elapsed));
  $("best").textContent=best;
  $("pbWpm").textContent=stats.bestWpm;
  $("pbAcc").textContent=stats.bestAcc+"%";
  $("pbChallenges").textContent=stats.challenges;
}
function start(){
  if(running)return;
  running=true; startTime=Date.now()-elapsed*1000;
  timerId=setInterval(()=>{
    elapsed=Math.floor((Date.now()-startTime)/1000);
    updateStats();
    if(elapsed>=Number($("duration").value)) finish();
  },250);
}
function finish(){
  clearInterval(timerId); running=false;
  const m=metrics(); stats.challenges++;
  if(m.wpm>stats.bestWpm){stats.bestWpm=m.wpm;best=m.wpm;localStorage.setItem("codetype_best",best)}
  if(m.acc>stats.bestAcc)stats.bestAcc=m.acc;
  localStorage.setItem("codetype_stats",JSON.stringify(stats));
  updateStats();
  $("typingArea").blur();
}
$("typingArea").addEventListener("input",()=>{
  if(!running && $("typingArea").value.length)start();
  render(); updateStats();
  if($("typingArea").value.length>=challenge.code.length)finish();
});
$("typingArea").addEventListener("keydown",e=>{
  if(e.ctrlKey && e.key.toLowerCase()==="r"){e.preventDefault();return}
  if(e.key==="Tab"){
    e.preventDefault();
    const a=e.target,s=a.selectionStart;
    a.value=a.value.slice(0,s)+"    "+a.value.slice(a.selectionEnd);
    a.selectionStart=a.selectionEnd=s+4;
    a.dispatchEvent(new Event("input"));
  }
});
["paste","copy","cut","drop"].forEach(evt=>$("typingArea").addEventListener(evt,e=>e.preventDefault()));
document.addEventListener("keydown",e=>{
  if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
  const k=e.key.toUpperCase(); const label=k===" "?"SPACE":k;
  const el=document.getElementById("key-"+CSS.escape(label));
  if(el)el.classList.add("active");
});
document.addEventListener("keyup",e=>{
  const k=e.key.toUpperCase(); const label=k===" "?"SPACE":k;
  const el=document.getElementById("key-"+CSS.escape(label));
  if(el)el.classList.remove("active");
});
$("newChallenge").onclick=pickChallenge;
$("resetBtn").onclick=pickChallenge;
$("language").onchange=pickChallenge;
$("duration").onchange=pickChallenge;
$("themeBtn").onclick=()=>{
  document.body.classList.toggle("light");
  $("themeBtn").textContent=document.body.classList.contains("light")?"🌙":"☀️";
  localStorage.setItem("codetype_theme",document.body.classList.contains("light")?"light":"dark");
};
if(localStorage.getItem("codetype_theme")==="light"){document.body.classList.add("light");$("themeBtn").textContent="🌙"}
pickChallenge();