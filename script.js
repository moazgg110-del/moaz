(() => {
"use strict";

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const canvas = $("#gameCanvas");
const ctx = canvas.getContext("2d", {alpha:false});
const preview = $("#previewCanvas");
const pctx = preview.getContext("2d");

const WEAPONS = {
  sword:{name:"شفرة طاقة",icon:"⚔️",color:"#55e7ff",damage:24,range:72,cool:360,ammo:Infinity,speed:0,kind:"melee"},
  hammer:{name:"مطرقة",icon:"🔨",color:"#ffb43c",damage:38,range:62,cool:650,ammo:Infinity,speed:0,kind:"melee",knock:420},
  blaster:{name:"بلاستر",icon:"🔫",color:"#63a5ff",damage:14,range:0,cool:230,ammo:40,speed:8,kind:"bullet"},
  shotgun:{name:"قاذف نبضي",icon:"💥",color:"#ff7b4f",damage:10,range:0,cool:680,ammo:16,speed:7,kind:"spread"},
  rocket:{name:"صاروخ",icon:"🚀",color:"#ff4c71",damage:40,range:0,cool:900,ammo:6,speed:5.2,kind:"rocket"},
  boomerang:{name:"بوميرانج",icon:"🪃",color:"#b46cff",damage:18,range:0,cool:480,ammo:18,speed:6,kind:"boomerang"},
  laser:{name:"قاطع ليزر",icon:"⚡",color:"#ffe45c",damage:28,range:230,cool:950,ammo:8,speed:0,kind:"laser"}
};

const COLORS = ["#00e6d1","#4da3ff","#ff5ca8","#a66cff","#ffb72e","#63e86d","#ff6b52"];

let selectedColor = COLORS[0];
let selectedWeapon = "sword";
let mode = "duel";
let soundOn = true;
let running = false;
let paused = false;
let last = 0;
let accumulator = 0;
let score = 0;
let hits = 0;
let wave = 1;
let roundOver = false;
let world = {w:1280,h:720,ground:625};
let particles = [];
let projectiles = [];
let platforms = [];
let pickups = [];
let player, enemy;

const keys = {left:false,right:false,jump:false,attack:false};

function showScreen(id){
  $$(".screen").forEach(s=>s.classList.remove("active"));
  $(id).classList.add("active");
}
function resizeCanvas(){
  const r=canvas.getBoundingClientRect();
  const d=Math.min(window.devicePixelRatio||1,2);
  canvas.width=Math.max(1,Math.floor(r.width*d));
  canvas.height=Math.max(1,Math.floor(r.height*d));
  ctx.setTransform(d,0,0,d,0,0);
}
window.addEventListener("resize",resizeCanvas);

function makePlayer(x,y,color,weapon){
  return {
    x,y,vx:0,vy:0,w:38,h:82,color,hp:100,maxHp:100,
    grounded:false,facing:1,weapon,attackTimer:0,invuln:0,
    jumps:0,score:0,stun:0,ai:false,aiTimer:0,shots:0
  };
}

function buildPlatforms(){
  platforms=[
    {x:0,y:world.ground,w:world.w,h:95},
    {x:100,y:500,w:260,h:22},
    {x:510,y:445,w:260,h:22},
    {x:900,y:500,w:280,h:22},
    {x:360,y:350,w:180,h:18},
    {x:760,y:320,w:180,h:18}
  ];
  if(mode==="chaos"){
    platforms.push({x:570,y:540,w:130,h:18},{x:40,y:280,w:160,h:18});
  }
}

function resetRound(){
  buildPlatforms();
  player=makePlayer(170,350,selectedColor,selectedWeapon);
  enemy=makePlayer(1030,350,"#ffd42a", mode==="chaos" ? randomWeapon() : "blaster");
  enemy.ai=true;
  particles=[];projectiles=[];pickups=[];
  if(mode==="chaos") spawnPickupSet();
  roundOver=false;running=true;paused=false;
  updateHUD();
}

function randomWeapon(){
  const a=Object.keys(WEAPONS);
  return a[Math.floor(Math.random()*a.length)];
}

function spawnPickupSet(){
  const choices=Object.keys(WEAPONS);
  for(let i=0;i<5;i++){
    pickups.push({x:120+Math.random()*1040,y:200+Math.random()*320,r:15,type:choices[Math.floor(Math.random()*choices.length)],life:15000});
  }
}

function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function dist(a,b){return Math.hypot(a.x-b.x,a.y-b.y)}
function rectsOverlap(a,b){return a.x<a.x+a.w && a.x+a.w>b.x && a.y<a.y+a.h && a.y+a.h>b.y}
function circleRect(c,r){
  const x=clamp(c.x,r.x,r.x+r.w),y=clamp(c.y,r.y,r.y+r.h);
  return Math.hypot(c.x-x,c.y-y)<c.r;
}

function hurt(target,damage,knockX=0,knockY=-180){
  if(target.invuln>0 || target.hp<=0)return;
  target.hp-=damage;
  target.vx+=knockX;
  target.vy+=knockY;
  target.invuln=180;
  burst(target.x,target.y-35,WEAPONS[target.weapon].color,10);
  hits++;
  if(target.hp<=0) finish(target===enemy);
}

function finish(playerWon){
  if(roundOver)return;
  roundOver=true;running=false;
  score += playerWon ? 100 : 0;
  $("#resultIcon").textContent=playerWon?"🏆":"💫";
  $("#resultTitle").textContent=playerWon?"فوز!":"هزيمة";
  $("#resultText").textContent=playerWon?"أسقطت الخصم ببراعة.":"المعركة انتهت، جرّب سلاحًا آخر.";
  $("#finalScore").textContent=score;
  $("#finalHits").textContent=hits;
  showScreen("#resultScreen");
}

function attack(attacker,target){
  const w=WEAPONS[attacker.weapon];
  if(attacker.attackTimer>0 || attacker.stun>0 || attacker.hp<=0)return;
  if(w.ammo!==Infinity && attacker.shots>=w.ammo){
    if(attacker===player) attacker.weapon="sword";
    else attacker.weapon="blaster";
    return;
  }
  attacker.attackTimer=w.cool;
  attacker.shots++;
  attacker.facing = target.x>=attacker.x ? 1 : -1;

  if(w.kind==="melee"){
    const hitbox={x:attacker.x+(attacker.facing>0?20:-w.range-20),y:attacker.y-55,w:w.range,h:55};
    if(target.x< hitbox.x+hitbox.w && target.x+target.w>hitbox.x && target.y< hitbox.y+hitbox.h && target.y+target.h>hitbox.y){
      hurt(target,w.damage,attacker.facing*(w.knock||250),-260);
    }
    slashFx(attacker,w);
  } else if(w.kind==="laser"){
    laserFx(attacker,w);
    const dx=target.x-attacker.x;
    if(Math.sign(dx)===attacker.facing && Math.abs(dx)<w.range && Math.abs(target.y-attacker.y)<90) hurt(target,w.damage,attacker.facing*180,-100);
  } else {
    const count=w.kind==="spread"?5:1;
    for(let i=0;i<count;i++){
      let angle=0;
      if(w.kind==="spread") angle=(-.26+i*.13);
      projectiles.push({
        x:attacker.x+attacker.facing*24,y:attacker.y-45,
        vx:Math.cos(angle)*w.speed*attacker.facing,
        vy:Math.sin(angle)*w.speed-0.5,
        r:w.kind==="rocket"?9:6,owner:attacker,type:w.kind,damage:w.damage,
        life: w.kind==="rocket"?180:130,turn:0
      });
    }
    muzzleFx(attacker,w);
  }
}

function updateEntity(p,dt){
  p.attackTimer=Math.max(0,p.attackTimer-dt);
  p.invuln=Math.max(0,p.invuln-dt);
  p.stun=Math.max(0,p.stun-dt);
  p.vy += 0.72*(dt/16.67);
  p.vx *= Math.pow(.86,dt/16.67);
  p.x += p.vx*(dt/16.67);
  p.y += p.vy*(dt/16.67);
  p.grounded=false;

  for(const pl of platforms){
    if(p.x+p.w>pl.x && p.x<pl.x+pl.w && p.y+p.h>=pl.y && p.y+p.h<=pl.y+28 && p.vy>=0){
      p.y=pl.y-p.h;p.vy=0;p.grounded=true;p.jumps=0;
    }
  }
  if(p.x<0){p.x=0;p.vx*=-.35}
  if(p.x+p.w>world.w){p.x=world.w-p.w;p.vx*=-.35}
  if(p.y>world.h+100){p.hp=0;finish(p===enemy)}
}

function controlPlayer(dt){
  if(player.stun>0)return;
  const accel=0.72*(dt/16.67);
  if(keys.left){player.vx-=accel;player.facing=-1}
  if(keys.right){player.vx+=accel;player.facing=1}
  player.vx=clamp(player.vx,-5.7,5.7);
  if(keys.jump && player.grounded){player.vy=-12.3;player.grounded=false;keys.jump=false}
  if(keys.attack)attack(player,enemy);
}

function controlAI(dt){
  if(enemy.stun>0)return;
  const dx=(player.x-enemy.x),dy=player.y-enemy.y;
  enemy.facing=dx>=0?1:-1;
  if(Math.abs(dx)>100) enemy.vx+=Math.sign(dx)*.34*(dt/16.67);
  enemy.vx=clamp(enemy.vx,-4.2,4.2);
  if(enemy.grounded && (dy<-90 || Math.random()<0.004))enemy.vy=-11.6;
  enemy.aiTimer-=dt;
  if(enemy.aiTimer<=0){
    enemy.aiTimer=180+Math.random()*400;
    if(Math.abs(dx)<300 || WEAPONS[enemy.weapon].kind!=="melee")attack(enemy,player);
  }
}

function updateProjectiles(dt){
  for(let i=projectiles.length-1;i>=0;i--){
    const q=projectiles[i];
    q.life-=dt;
    if(q.type==="rocket"){
      q.vy+=0.02*(dt/16.67);
    }
    q.x+=q.vx*(dt/16.67);q.y+=q.vy*(dt/16.67);
    if(q.owner!==player && circleRect(q,player)){hurt(player,q.damage,Math.sign(q.vx)*240,-160);burst(q.x,q.y,"#fff",12);projectiles.splice(i,1);continue}
    if(q.owner!==enemy && circleRect(q,enemy)){hurt(enemy,q.damage,Math.sign(q.vx)*240,-160);burst(q.x,q.y,WEAPONS[q.owner.weapon].color,12);projectiles.splice(i,1);continue}
    if(q.life<=0 || q.x<-50 || q.x>world.w+50 || q.y>world.h+100){projectiles.splice(i,1)}
  }
}

function updatePickups(dt){
  for(let i=pickups.length-1;i>=0;i--){
    const p=pickups[i];p.life-=dt;
    if(p.life<=0){pickups.splice(i,1);continue}
    if(Math.hypot(player.x+20-p.x,player.y+35-p.y)<35){player.weapon=p.type;player.shots=0;pickups.splice(i,1);burst(p.x,p.y,WEAPONS[p.type].color,15)}
    else if(Math.hypot(enemy.x+20-p.x,enemy.y+35-p.y)<35){enemy.weapon=p.type;enemy.shots=0;pickups.splice(i,1)}
  }
}

function burst(x,y,color,n=8){
  for(let i=0;i<n;i++){
    const a=Math.random()*Math.PI*2,s=1+Math.random()*4;
    particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,r:2+Math.random()*4,life:350+Math.random()*450,color});
  }
}
function slashFx(p,w){for(let i=0;i<8;i++)particles.push({x:p.x+p.facing*20,y:p.y-35,vx:p.facing*(2+Math.random()*4),vy:(Math.random()-.5)*4,r:3,life:220,color:w.color})}
function muzzleFx(p,w){burst(p.x+p.facing*30,p.y-45,w.color,7)}
function laserFx(p,w){particles.push({laser:true,x:p.x+p.facing*25,y:p.y-43,len:w.range,dir:p.facing,life:130,color:w.color})}

function updateParticles(dt){
  for(let i=particles.length-1;i>=0;i--){
    const p=particles[i];p.life-=dt;
    if(p.laser){if(p.life<=0)particles.splice(i,1);continue}
    p.x+=p.vx*(dt/16.67);p.y+=p.vy*(dt/16.67);p.vy+=.08*(dt/16.67);p.r*=.985;
    if(p.life<=0)particles.splice(i,1);
  }
}

function updateHUD(){
  if(!player||!enemy)return;
  $("#p1Hp").style.width=clamp(player.hp,0,100)+"%";
  $("#p2Hp").style.width=clamp(enemy.hp,0,100)+"%";
  $("#scoreLabel").textContent=`${Math.max(0,Math.round(player.hp))} - ${Math.max(0,Math.round(enemy.hp))}`;
  $("#weaponIcon").textContent=WEAPONS[player.weapon].icon;
  $("#weaponName").textContent=WEAPONS[player.weapon].name;
  const a=WEAPONS[player.weapon].ammo===Infinity?"∞":Math.max(0,WEAPONS[player.weapon].ammo-player.shots);
  $("#ammoLabel").textContent=a;
  $("#modeLabel").textContent=mode==="duel"?"مبارزة":mode==="survival"?"بقاء":"فوضى";
  $("#waveLabel").textContent=mode==="survival"?`الموجة ${wave}`:"";
}

function drawBackground(){
  const w=canvas.clientWidth,h=canvas.clientHeight;
  const sx=w/world.w, sy=h/world.h;
  ctx.save();ctx.scale(sx,sy);
  const g=ctx.createLinearGradient(0,0,0,world.h);g.addColorStop(0,"#121a30");g.addColorStop(1,"#070a12");ctx.fillStyle=g;ctx.fillRect(0,0,world.w,world.h);
  for(let i=0;i<45;i++){ctx.fillStyle=`rgba(255,255,255,${.05+(i%3)*.02})`;ctx.fillRect((i*293)%world.w,(i*127)%370,2,2)}
  ctx.fillStyle="#0c1423";ctx.fillRect(0,world.ground,world.w,95);
  for(const pl of platforms){ctx.fillStyle="#1c2a42";ctx.fillRect(pl.x,pl.y,pl.w,pl.h);ctx.fillStyle="#39d7ff55";ctx.fillRect(pl.x,pl.y,pl.w,3)}
  ctx.restore();
}

function drawStick(p){
  const sx=canvas.clientWidth/world.w,sy=canvas.clientHeight/world.h;
  ctx.save();ctx.scale(sx,sy);
  ctx.translate(p.x+p.w/2,p.y);
  ctx.globalAlpha=p.invuln>0&&Math.floor(p.invuln/50)%2===0?.35:1;
  ctx.strokeStyle=p.color;ctx.fillStyle=p.color;ctx.lineWidth=11;ctx.lineCap="round";
  ctx.beginPath();ctx.arc(0,22,19,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.moveTo(0,42);ctx.lineTo(0,92);ctx.stroke();
  ctx.beginPath();ctx.moveTo(0,55);ctx.lineTo(p.facing*38,68);ctx.stroke();
  ctx.beginPath();ctx.moveTo(0,90);ctx.lineTo(p.facing*27,125);ctx.stroke();
  ctx.beginPath();ctx.moveTo(0,90);ctx.lineTo(-p.facing*26,125);ctx.stroke();
  const w=WEAPONS[p.weapon];
  ctx.strokeStyle=w.color;ctx.lineWidth=7;
  if(w.kind==="melee"){ctx.beginPath();ctx.moveTo(p.facing*28,67);ctx.lineTo(p.facing*78,34);ctx.stroke()}
  else if(w.kind!=="laser"){ctx.beginPath();ctx.moveTo(p.facing*26,68);ctx.lineTo(p.facing*51,68);ctx.stroke()}
  ctx.restore();
}

function draw(){
  drawBackground();
  const sx=canvas.clientWidth/world.w,sy=canvas.clientHeight/world.h;
  ctx.save();ctx.scale(sx,sy);
  for(const p of pickups){
    const w=WEAPONS[p.type];ctx.beginPath();ctx.arc(p.x,p.y,17,0,Math.PI*2);ctx.fillStyle=w.color;ctx.shadowColor=w.color;ctx.shadowBlur=20;ctx.fill();ctx.shadowBlur=0;ctx.fillStyle="#08101c";ctx.font="18px sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(w.icon,p.x,p.y);
  }
  for(const q of projectiles){
    const w=WEAPONS[q.owner.weapon];ctx.beginPath();ctx.arc(q.x,q.y,q.r,0,Math.PI*2);ctx.fillStyle=w.color;ctx.shadowColor=w.color;ctx.shadowBlur=12;ctx.fill();ctx.shadowBlur=0;
  }
  for(const p of particles){
    if(p.laser){ctx.strokeStyle=p.color;ctx.globalAlpha=p.life/130;ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+p.len*p.dir,p.y);ctx.stroke();ctx.globalAlpha=1;continue}
    ctx.globalAlpha=Math.max(0,p.life/600);ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
  }
  ctx.restore();
  drawStick(player);drawStick(enemy);
}

function tick(t){
  if(!last)last=t;
  const dt=Math.min(34,t-last);last=t;
  if(running&&!paused&&!roundOver){
    controlPlayer(dt);controlAI(dt);updateEntity(player,dt);updateEntity(enemy,dt);
    updateProjectiles(dt);updatePickups(dt);updateParticles(dt);
    if(mode==="survival"&&enemy.hp<=0){wave++;resetRound()}
    updateHUD();
  }
  if($("#gameScreen").classList.contains("active"))draw();
  requestAnimationFrame(tick);
}

function startGame(){
  score=0;hits=0;wave=1;showScreen("#gameScreen");resizeCanvas();resetRound();
}
function setButtonEvents(){
  $$("[data-action]").forEach(b=>b.addEventListener("click",()=>{
    const a=b.dataset.action;
    if(a==="start"||a==="restart")startGame();
    else if(a==="loadout")showScreen("#loadoutScreen");
    else if(a==="modes")showScreen("#modesScreen");
    else if(a==="help")showScreen("#helpScreen");
    else if(a==="menu"){running=false;showScreen("#menuScreen")}
  }));
  $$(".mode-card").forEach(b=>b.addEventListener("click",()=>{$$(".mode-card").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");mode=b.dataset.mode}));
  $("#soundBtn").addEventListener("click",()=>{soundOn=!soundOn;$("#soundBtn").textContent=soundOn?"🔊":"🔇"});
  $("#pauseBtn").addEventListener("click",()=>{if(running){paused=!paused;$("#pauseBtn").textContent=paused?"▶":"Ⅱ"}});
}
function setupChoices(){
  const cc=$("#colorChoices");
  COLORS.forEach(c=>{const b=document.createElement("button");b.className="color-choice"+(c===selectedColor?" selected":"");b.style.background=c;b.style.color=c;b.onclick=()=>{selectedColor=c;$$(".color-choice").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");drawPreview()};cc.appendChild(b)});
  const wc=$("#weaponChoices");
  Object.entries(WEAPONS).forEach(([id,w])=>{const b=document.createElement("button");b.className="weapon-choice"+(id===selectedWeapon?" selected":"");b.innerHTML=`<span>${w.icon}</span><div><b>${w.name}</b><small>${w.kind==="melee"?"قتال قريب":"بعيد"}</small></div>`;b.onclick=()=>{selectedWeapon=id;$$(".weapon-choice").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");drawPreview()};wc.appendChild(b)});
}
function drawPreview(){
  pctx.clearRect(0,0,360,300);pctx.fillStyle="#080c15";pctx.fillRect(0,0,360,300);
  const p=makePlayer(155,70,selectedColor,selectedWeapon);pctx.save();pctx.translate(0,20);pctx.scale(1.35,1.35);
  pctx.translate(p.x+p.w/2,p.y);pctx.strokeStyle=p.color;pctx.fillStyle=p.color;pctx.lineWidth=8;pctx.lineCap="round";
  pctx.beginPath();pctx.arc(0,22,17,0,Math.PI*2);pctx.fill();pctx.beginPath();pctx.moveTo(0,40);pctx.lineTo(0,92);pctx.stroke();pctx.beginPath();pctx.moveTo(0,55);pctx.lineTo(38,68);pctx.stroke();pctx.beginPath();pctx.moveTo(0,90);pctx.lineTo(25,123);pctx.stroke();pctx.beginPath();pctx.moveTo(0,90);pctx.lineTo(-25,123);pctx.stroke();pctx.strokeStyle=WEAPONS[selectedWeapon].color;pctx.lineWidth=6;pctx.beginPath();pctx.moveTo(27,68);pctx.lineTo(77,35);pctx.stroke();pctx.restore();
}

function bindControls(){
  window.addEventListener("keydown",e=>{
    if(["ArrowLeft","ArrowRight","ArrowUp"," ","a","A","d","D","w","W"].includes(e.key))e.preventDefault();
    if(e.key==="ArrowLeft"||e.key==="a"||e.key==="A")keys.left=true;
    if(e.key==="ArrowRight"||e.key==="d"||e.key==="D")keys.right=true;
    if(e.key==="ArrowUp"||e.key==="w"||e.key==="W"||e.key===" ")keys.jump=true;
    if(e.key==="f"||e.key==="F"||e.key==="Enter")keys.attack=true;
  });
  window.addEventListener("keyup",e=>{
    if(e.key==="ArrowLeft"||e.key==="a"||e.key==="A")keys.left=false;
    if(e.key==="ArrowRight"||e.key==="d"||e.key==="D")keys.right=false;
    if(e.key==="ArrowUp"||e.key==="w"||e.key==="W"||e.key===" ")keys.jump=false;
    if(e.key==="f"||e.key==="F"||e.key==="Enter")keys.attack=false;
  });
  $$("#touchControls button").forEach(b=>{
    const k=b.dataset.key;
    const on=e=>{e.preventDefault();keys[k]=true;if(k==="jump")setTimeout(()=>keys.jump=false,80)};
    const off=e=>{e.preventDefault();if(k!=="jump")keys[k]=false};
    b.addEventListener("pointerdown",on);b.addEventListener("pointerup",off);b.addEventListener("pointercancel",off);b.addEventListener("pointerleave",off);
  });
}

setupChoices();setButtonEvents();bindControls();drawPreview();resizeCanvas();requestAnimationFrame(tick);
})();
