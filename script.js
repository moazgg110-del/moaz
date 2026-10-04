import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const TEAMS = {"مصر":{"flag":"🇪🇬","color":"#d73643","players":[["محمد الشناوي","GK"],["مصطفى شوبير","GK"],["المهدي سليمان","GK"],["محمد علاء","GK"],["محمد هاني","DF"],["حمدي فتحي","DF"],["رامي ربيعة","DF"],["ياسر إبراهيم","DF"],["حسام عبدالمجيد","DF"],["محمد عبدالمنعم","DF"],["كريم حافظ","DF"],["أحمد فتوح","DF"],["طارق علاء","DF"],["مروان عطية","MF"],["مهند لاشين","MF"],["إمام عاشور","MF"],["محمود صابر","MF"],["نبيل عماد دونجا","MF"],["مصطفى زيكو","MF"],["محمود حسن تريزيجيه","MF"],["أحمد سيد زيزو","MF"],["هيثم حسن","MF"],["محمد صلاح","FW"],["عمر مرموش","FW"],["إبراهيم عادل","FW"],["حمزة عبدالكريم","FW"]]},"المغرب":{"flag":"🇲🇦","color":"#c83b45","players":[["ياسين بونو","GK"],["منير المحمدي","GK"],["رضا التكناوتي","GK"],["نصير مزراوي","DF"],["أنس صلاح الدين","DF"],["يوسف بلعمري","DF"],["أشرف حكيمي","DF"],["زكرياء الواحدي","DF"],["نايف أكرد","DF"],["شادي رياض","DF"],["رضوان حلحال","DF"],["عيسى ديوب","DF"],["سمير المورابيط","MF"],["أيوب بوعدي","MF"],["نائل العيناوي","MF"],["سفيان أمرابط","MF"],["عز الدين أوناحي","MF"],["بلال الخنوس","MF"],["إسماعيل الصيباري","MF"],["عبد الصمد الزلزولي","FW"],["شمس الدين طالبي","FW"],["سفيان رحيمي","FW"],["أيوب الكعبي","FW"],["إبراهيم دياز","FW"],["جسيم ياسين","FW"],["أيوب الميموني","FW"]]},"تونس":{"flag":"🇹🇳","color":"#d72c36","players":[["أيمن دحمان","GK"],["مهيب شماخ","GK"],["صبري بن حسن","GK"],["يان فاليري","DF"],["معز النفاتي","DF"],["منتصر الطالبي","DF"],["علاء غرام","DF"],["محمد أمين بن حميدة","DF"],["محمد النصراوي","DF"],["علي معلول","DF"],["أمين الشرني","DF"],["عيسى العيدوني","MF"],["فرجاني ساسي","MF"],["محمد علي بن رمضان","MF"],["حمزة رفيعة","MF"],["أنيس بن سليمان","MF"],["سامي شوشان","MF"],["إسماعيل الغربي","MF"],["خليل العياري","FW"],["سيف الله لطيف","FW"],["إلياس العاشوري","FW"],["سباستيان تونكتي","FW"],["ريان اللومي","FW"],["صادق قديدة","FW"],["حازم المستوري","FW"]]},"الجزائر":{"flag":"🇩🇿","color":"#31b96d","players":[["أسامة بن بوط","GK"],["ملفين ماستيل","GK"],["لوكا زيدان","GK"],["أشرف عبادة","DF"],["ريان آيت نوري","DF"],["زين الدين بلعيد","DF"],["رفيق بلغالي","DF"],["رامي بن سبعيني","DF"],["سمير شرقي","DF"],["جوان حجام","DF"],["عيسى ماندي","DF"],["محمد توغاي","DF"],["حسام عوار","MF"],["نبيل بن طالب","MF"],["هشام بوداوي","MF"],["فارس شايبي","MF"],["إبراهيم مازة","MF"],["ياسين تيطراوي","MF"],["رامز زروقي","MF"],["محمد الأمين عمورة","FW"],["نذير بن بوعلي","FW"],["عادل بولبينة","FW"],["فارس قدجاميس","FW"],["أمين غويري","FW"],["رياض محرز","FW"],["أنيس حاج موسى","FW"]]},"السعودية":{"flag":"🇸🇦","color":"#36b96d","players":[["محمد العويس","GK"],["نواف العقيدي","GK"],["أحمد الكسار","GK"],["عبدالقدوس عطية","GK"],["عبدالإله العمري","DF"],["حسان التمبكتي","DF"],["جهاد ذكري","DF"],["علي لاجامي","DF"],["حسن كادش","DF"],["سعود عبدالحميد","DF"],["محمد أبو الشامات","DF"],["علي مجرشي","DF"],["متعب الحربي","DF"],["نواف بوشل","DF"],["زكريا هوساوي","DF"],["محمد كنو","MF"],["عبدالله الخيبري","MF"],["زياد الجهني","MF"],["ناصر الدوسري","MF"],["مصعب الجوير","MF"],["علاء الحجي","MF"],["سالم الدوسري","MF"],["خالد الغنام","MF"],["أيمن يحيى","MF"],["سلطان مندش","FW"],["صالح أبو الشامات","FW"],["فراس البريكان","FW"],["عبدالله السالم","FW"],["صالح الشهري","FW"],["عبدالله الحمدان","FW"]]},"قطر":{"flag":"🇶🇦","color":"#9d2f58","players":[["مشعل برشم","GK"],["محمود أبو ندى","GK"],["صلاح زكريا","GK"],["بيدرو ميغيل","DF"],["لوكاس مينديز","DF"],["عيسى لاي","DF"],["جاسم جابر","DF"],["أيوب العلوي","DF"],["همام أحمد","DF"],["بوعلام خوخي","DF"],["سلطان البريك","DF"],["الهاشمي الحسين","DF"],["عبدالعزيز حاتم","MF"],["كريم بوضياف","MF"],["أحمد الجانحي","MF"],["أحمد فتحي","MF"],["عاصم ماديبو","MF"],["أحمد علاء الدين","FW"],["إدملسون جونيور","FW"],["محمد مونتاري","FW"],["حسن الهيدوس","FW"],["أكرم عفيف","FW"],["المعز علي","FW"],["يوسف عبدالرزاق","FW"],["محمد المناعي","FW"],["تحسين محمد","FW"]]}};

// V2 Egyptian club squads. Player records are independent: [name, position].
Object.assign(TEAMS, {
  "الأهلي": {flag:"🔴", color:"#b51f2a", players:[
    ["محمد الشناوي","GK"],["مصطفى شوبير","GK"],["حمزة علاء","GK"],
    ["ياسر إبراهيم","DF"],["محمد هاني","DF"],["أشرف داري","DF"],["ياسين مرعي","DF"],["عمرو الجزار","DF"],["كريم الدبيس","DF"],["كريم فؤاد","DF"],["هادي رياض","DF"],
    ["مروان عطية","MF"],["إمام عاشور","MF"],["أحمد نبيل كوكا","MF"],["حسين الشحات","MF"],["طاهر محمد طاهر","MF"],["أحمد سيد زيزو","MF"],["أكرم توفيق","MF"],["عمر الساعي","MF"],["علي محمود","MF"],["محمد مجدي أفشة","MF"],["أحمد رضا","MF"],
    ["أشرف بن شرقي","FW"],["سفيان بن جديدة","FW"],["منصف بقرار","FW"],["أقطاي عبد الله","FW"]]},
  "الزمالك": {flag:"⚪", color:"#e8e8e8", players:[
    ["محمد عواد","GK"],["محمد صبحي","GK"],["مهدي سليمان","GK"],["محمود أشرف الشناوي","GK"],
    ["عمر جابر","DF"],["محمود حمدي الونش","DF"],["أحمد فتوح","DF"],["أحمد حسام","DF"],["محمد إسماعيل","DF"],["محمود بنتايج","DF"],["مصطفى الزناري","DF"],
    ["محمد شحاتة","MF"],["عبد الله السعيد","MF"],["محمود جهاد","MF"],["أحمد ربيع","MF"],["سيف فاروق جعفر","MF"],["محمد السيد","MF"],["أحمد عبد الرحيم إيشو","MF"],
    ["ناصر منسي","FW"],["عمرو ناصر","FW"],["أحمد شريف","FW"],["آدم كايد","FW"],["عدي الدباغ","FW"],["خوان بيزيرا","FW"],["شيكو بانزا","FW"],["أحمد الجفالي","FW"],["حسام أشرف","FW"]]},
  "سموحة": {flag:"🔵", color:"#1687d9", players:[
    ["محمد أشرف","GK"],["أحمد يحيى","GK"],["الهاني سليمان","GK"],
    ["محمد رجب","DF"],["بركات حجاج","DF"],["أحمد خالد","DF"],["محمد مغربي","DF"],["عبد الرحمن عامر","DF"],["حسام حسن","DF"],["أحمد رمضان","DF"],
    ["عمرو قلاوة","MF"],["مصطفى البدري","MF"],["إسلام جابر","MF"],["محمود صابر","MF"],["محمد كناريا","MF"],["دوكو دودو","MF"],["محمود وحيد","MF"],
    ["حسام حسن","FW"],["صامويل أمادي","FW"],["أبو بكر ليادي","FW"],["برناردو بيريز","FW"]]},
  "بتروجيت": {flag:"🔷", color:"#1e6ca8", players:[
    ["عمر صلاح","GK"],["محمد أبو النجا","GK"],["أحمد دعدور","GK"],
    ["محمد سمير","DF"],["مصطفى الجمل","DF"],["أحمد رضا","DF"],["أحمد كمال","DF"],["عبد الرحمن خالد","DF"],["محمود منصور","DF"],["حسن رمضان","DF"],
    ["حامد حمدان","MF"],["سامح إبراهيم","MF"],["رشاد المتولي","MF"],["محمد إبراهيم","MF"],["أحمد عبد الرحمن","MF"],["مصطفى البدري","MF"],
    ["محمد شريف","FW"],["باسم مرسي","FW"],["أحمد عبد القادر","FW"],["إسلام عيسى","FW"]]}
});

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

let selectedTeam = "مصر";
let opponentTeam = "المغرب";
let selectedBench = null;
let quality = "medium";
let gameSpeed = 1;
let fx = true;
let scene, camera, renderer, clock;
let ball, players = [], activePlayer;
let score = [0,0], matchSeconds = 0, paused = false, gameStarted = false;
let keys = {up:false,down:false,left:false,right:false};
let joystickPointer = null;
let swipeStart = null;
let shotCharge = 0;
let staminaMap = new Map();
let nameSprites = [];
let referee = null;
let crowd = [];
let setPiece = null;
let foulCooldown = 0;
let cardCounts = new Map();
let shotCharging = false;
let shotChargeStart = 0;


const formationPositions = [
  {x:0,z:22,pos:"GK"},{x:-18,z:9,pos:"DF"},{x:0,z:8,pos:"DF"},{x:18,z:9,pos:"DF"},
  {x:-12,z:-5,pos:"MF"},{x:12,z:-5,pos:"MF"},{x:0,z:-10,pos:"MF"},
  {x:-19,z:-22,pos:"FW"},{x:0,z:-25,pos:"FW"},{x:19,z:-22,pos:"FW"},{x:0,z:-38,pos:"FW"}
];

function makeInitialXI(team){
  const ps = TEAMS[team].players;
  const by = p => ps.filter(x=>x[1]===p);
  const order = [...by("GK").slice(0,1),...by("DF").slice(0,3),...by("MF").slice(0,3),...by("FW").slice(0,4)];
  return order;
}
let lineups = Object.fromEntries(Object.keys(TEAMS).map(t=>[t,makeInitialXI(t)]));
let benches = Object.fromEntries(Object.keys(TEAMS).map(t=>[t,TEAMS[t].players.filter(p=>!lineups[t].includes(p))]));

function initials(name){return name.split(/\s+/).slice(0,2).map(x=>x[0]).join("")}
function show(id){$$(".screen").forEach(x=>x.classList.remove("active"));$(id).classList.add("active")}
function updateLoading(n,text){$("#progressBar").style.width=n+"%";$("#loadingText").textContent=text}

function renderTeams(){
  const homeSel=$("#homeTeamSelect"), awaySel=$("#awayTeamSelect");
  if(homeSel){homeSel.innerHTML="";awaySel.innerHTML="";Object.keys(TEAMS).forEach(n=>{const a=document.createElement("option");a.value=n;a.textContent=TEAMS[n].flag+" "+n;a.selected=n===selectedTeam;homeSel.appendChild(a);const b=document.createElement("option");b.value=n;b.textContent=TEAMS[n].flag+" "+n;b.selected=n===opponentTeam;awaySel.appendChild(b);});homeSel.onchange=e=>{selectedTeam=e.target.value;if(selectedTeam===opponentTeam){opponentTeam=Object.keys(TEAMS).find(n=>n!==selectedTeam);}selectedBench=null;renderTeams();};awaySel.onchange=e=>{if(e.target.value!==selectedTeam)opponentTeam=e.target.value;else{showEvent("اختر فريقًا مختلفًا عن فريقك");renderTeams();}};}
  const tabs=$("#teamTabs");tabs.innerHTML="";
  Object.entries(TEAMS).forEach(([name,t])=>{
    const b=document.createElement("button");b.className="tab"+(name===selectedTeam?" active":"");b.innerHTML=`<span class="crest">${t.flag}</span>${name}`;
    b.addEventListener("click",()=>{selectedTeam=name;selectedBench=null;renderTeams()});tabs.appendChild(b);
  });
  const f=$("#formation");f.innerHTML="";
  lineups[selectedTeam].forEach((p,i)=>{
    const pos=formationPositions[i];const d=document.createElement("button");d.className="slot"+(selectedBench&&selectedBench===p?" selected":"");
    d.style.left=(50+pos.x*1.65)+"%";d.style.top=(50+pos.z*.95)+"%";
    d.innerHTML=`<span class="player-avatar" style="background:linear-gradient(145deg,${TEAMS[selectedTeam].color},#171f18)">${initials(p[0])}</span><b>${p[0]}</b>`;
    d.addEventListener("click",()=>{
      if(selectedBench){const idx=lineups[selectedTeam].indexOf(p);if(idx>=0){lineups[selectedTeam][idx]=selectedBench;benches[selectedTeam]=benches[selectedTeam].filter(x=>x!==selectedBench);benches[selectedTeam].push(p);selectedBench=null;renderTeams()}}
    });
    f.appendChild(d);
  });
  const bench=$("#bench");bench.innerHTML="";
  benches[selectedTeam].forEach(p=>{
    const d=document.createElement("button");d.className="card"+(selectedBench===p?" selected":"");
    d.innerHTML=`<span class="card-avatar">${initials(p[0])}</span><span><b>${p[0]}</b><small>${posArabic(p[1])}</small></span>`;
    d.addEventListener("click",()=>{selectedBench=p;renderTeams()});bench.appendChild(d);
  });
}
function posArabic(p){return p==="GK"?"حارس":p==="DF"?"دفاع":p==="MF"?"وسط":"هجوم"}

function createRenderer(){
  const wrap=$("#gameCanvasWrap");
  try{renderer=new THREE.WebGLRenderer({antialias:quality==="high",powerPreference:"high-performance"});}catch(err){console.error(err);updateLoading(100,"تعذر تشغيل WebGL على هذا المتصفح");throw err;}
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,quality==="high"?2:1.35));
  renderer.setSize(wrap.clientWidth,wrap.clientHeight);
  renderer.shadowMap.enabled=quality==="high";
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  wrap.innerHTML="";wrap.appendChild(renderer.domElement);
  window.addEventListener("resize",resizeRenderer);
}
function resizeRenderer(){
  if(!renderer)return;
  const w=$("#gameCanvasWrap").clientWidth,h=$("#gameCanvasWrap").clientHeight;
  renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
}
function makePlayerMesh(color,number){
  const g=new THREE.Group();
  const body=new THREE.Mesh(new THREE.CapsuleGeometry(.42,.9,6,10),new THREE.MeshStandardMaterial({color,roughness:.8}));
  body.position.y=1.05;body.castShadow=quality==="high";g.add(body);
  const head=new THREE.Mesh(new THREE.SphereGeometry(.27,12,10),new THREE.MeshStandardMaterial({color:0xd8a47c,roughness:.9}));
  head.position.y=1.9;head.castShadow=quality==="high";g.add(head);
  const shirt=new THREE.Mesh(new THREE.BoxGeometry(.55,.42,.25),new THREE.MeshStandardMaterial({color:0xffffff,roughness:.9}));
  shirt.position.y=1.2;g.add(shirt);
  return g;
}
function makeTextSprite(text,color="#ffffff"){
  const canvas=document.createElement("canvas");canvas.width=512;canvas.height=128;const ctx=canvas.getContext("2d");
  ctx.clearRect(0,0,512,128);ctx.fillStyle="rgba(4,12,7,.78)";ctx.roundRect(8,25,496,78,18);ctx.fill();ctx.fillStyle=color;ctx.font="bold 34px Arial";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(text,256,64);
  const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;const mat=new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false});const s=new THREE.Sprite(mat);s.scale.set(4.5,1.12,1);return s;
}
function makeStaminaSprite(){
  const canvas=document.createElement("canvas");canvas.width=256;canvas.height=48;const ctx=canvas.getContext("2d");ctx.fillStyle="rgba(0,0,0,.65)";ctx.roundRect(4,10,248,28,10);ctx.fill();ctx.fillStyle="#55dc85";ctx.fillRect(8,14,240,20);const tex=new THREE.CanvasTexture(canvas);const mat=new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false});const s=new THREE.Sprite(mat);s.scale.set(2.8,.55,1);s.userData.canvas=canvas;s.userData.ctx=ctx;s.userData.tex=tex;return s;
}
function updateStaminaSprite(p){const s=p.staminaSprite;if(!s)return;const ctx=s.userData.ctx;ctx.clearRect(0,0,256,48);ctx.fillStyle="rgba(0,0,0,.65)";ctx.roundRect(4,10,248,28,10);ctx.fill();const w=Math.max(0,240*p.stamina/100);ctx.fillStyle=p.stamina>55?"#55dc85":p.stamina>25?"#ffe05b":"#ff6b4a";ctx.fillRect(8,14,w,20);s.userData.tex.needsUpdate=true}
function makeField(){
  scene=new THREE.Scene();scene.background=new THREE.Color(0x79a6c2);
  scene.fog=new THREE.Fog(0x79a6c2,70,210);
  camera=new THREE.PerspectiveCamera(58,1,.1,300);
  camera.position.set(0,14,31);camera.lookAt(0,0,0);
  clock=new THREE.Clock();
  const amb=new THREE.HemisphereLight(0xffffff,0x35512f,quality==="high"?1.4:1.1);scene.add(amb);
  const sun=new THREE.DirectionalLight(0xffffff,quality==="high"?2.1:1.5);sun.position.set(-25,45,15);sun.castShadow=quality==="high";sun.shadow.mapSize.set(1024,1024);scene.add(sun);
  const grass=new THREE.Mesh(new THREE.PlaneGeometry(92,140),new THREE.MeshStandardMaterial({color:0x287342,roughness:.95}));
  grass.rotation.x=-Math.PI/2;grass.receiveShadow=true;scene.add(grass);
  for(let z=-60;z<=60;z+=10){const stripe=new THREE.Mesh(new THREE.PlaneGeometry(92,10),new THREE.MeshBasicMaterial({color:(z/10)%2===0?0x2d7a47:0x327f4b}));stripe.rotation.x=-Math.PI/2;stripe.position.z=z;stripe.position.y=.006;scene.add(stripe)}
  const lineMat=new THREE.MeshBasicMaterial({color:0xffffff});
  const line=(x,z,w,d)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,.025,d),lineMat);m.position.set(x,.035,z);scene.add(m)}
  line(0,0,92,.18);line(0,-70,92,.18);line(0,70,92,.18);line(-46,0,.18,140);line(46,0,.18,140);
  const circle=new THREE.Mesh(new THREE.RingGeometry(9.8,10,.18,64),lineMat);circle.rotation.x=-Math.PI/2;circle.position.y=.04;scene.add(circle);
  const spot=new THREE.Mesh(new THREE.CircleGeometry(.35,24),lineMat);spot.rotation.x=-Math.PI/2;spot.position.y=.04;scene.add(spot);
  makeGoal(0,-69);makeGoal(0,69);
  makeStandsAndCrowd();
  makeReferee();
}
function makeStandsAndCrowd(){
  const standMat=new THREE.MeshStandardMaterial({color:0x26342b,roughness:1});
  [[0,-78,120,8],[0,78,120,8],[-52,0,8,140],[52,0,8,140]].forEach(a=>{const m=new THREE.Mesh(new THREE.BoxGeometry(a[2],5,a[3]),standMat);m.position.set(a[0],2.5,a[1]);m.castShadow=quality==="high";scene.add(m)});
  const colors=[0xf4f4f4,0xffcf4a,0x55a9ff,0xff5d6c,0x6be38a];
  for(let side of [-1,1]) for(let row=0;row<3;row++) for(let i=0;i<28;i++){
    const m=new THREE.Mesh(new THREE.CapsuleGeometry(.18,.35,4,6),new THREE.MeshStandardMaterial({color:colors[(i+row)%colors.length]}));
    m.position.set(-48+i*3.55,3.2+row*.65,side*(77+row*2.2));scene.add(m);crowd.push(m);
  }
}
function makeReferee(){
  const g=new THREE.Group();const body=new THREE.Mesh(new THREE.CapsuleGeometry(.32,.72,6,8),new THREE.MeshStandardMaterial({color:0x20252b}));body.position.y=.9;g.add(body);const head=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),new THREE.MeshStandardMaterial({color:0xd8a47c}));head.position.y=1.65;g.add(head);g.position.set(0,0,2);scene.add(g);referee={mesh:g,vx:0,vz:0};
}

function makeGoal(x,z){
  const g=new THREE.Group(),mat=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.5});
  [[-7,2.7,0],[7,2.7,0],[-7,0,-2],[7,0,-2]].forEach(a=>{const p=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.12+a[1]*2,10),mat);p.position.set(a[0],a[1],z+a[2]);g.add(p)});
  const bar=new THREE.Mesh(new THREE.BoxGeometry(14,.16,.16),mat);bar.position.set(0,5.4,z);g.add(bar);
  scene.add(g);
}
function setupMatch(){
  makeField();
  const home=lineups[selectedTeam],away=makeInitialXI(opponentTeam);
  players=[];
  home.forEach((p,i)=>addPlayer(p,formationPositions[i],true,i));
  away.forEach((p,i)=>addPlayer(p,{x:-formationPositions[i].x,z:-formationPositions[i].z},false,i));
  activePlayer=players[0];
  ball=new THREE.Mesh(new THREE.SphereGeometry(.34,18,14),new THREE.MeshStandardMaterial({color:0xf4f4f0,roughness:.45}));
  ball.position.set(0,.5,0);ball.castShadow=quality==="high";scene.add(ball);
  score=[0,0];matchSeconds=0;$("#score").textContent="0 - 0";$("#homeName").textContent=selectedTeam;$("#awayName").textContent=opponentTeam;
}
function addPlayer(data,pos,home,index){
  const teamName=home?selectedTeam:opponentTeam;
  const mesh=makePlayerMesh(TEAMS[teamName].color,index);
  mesh.position.set(pos.x,0,pos.z);scene.add(mesh);
  const nameSprite=makeTextSprite(data[0],home?"#ffffff":"#ffd4d4");nameSprite.position.set(0,2.65,0);mesh.add(nameSprite);
  const staminaSprite=makeStaminaSprite();staminaSprite.position.set(0,2.25,0);mesh.add(staminaSprite);
  const p={mesh,data,home,index,vx:0,vz:0,stamina:100,nameSprite,staminaSprite};players.push(p);staminaMap.set(data[0],p);updateStaminaSprite(p);
}
function resetPositions(){
  players.forEach(p=>{const base=formationPositions[p.index];p.mesh.position.set(p.home?base.x:-base.x,0,p.home?base.z:-base.z);p.vx=p.vz=0});
  ball.position.set(0,.5,0);ball.userData={vx:0,vz:0,vy:0};players.forEach(p=>{p.stamina=100;updateStaminaSprite(p)});if(referee)referee.mesh.position.set(0,0,2);
}
function controlledMove(dt){
  if(!activePlayer)return;
  let x=0,z=0;
  if(keys.left)x-=1;if(keys.right)x+=1;if(keys.up)z-=1;if(keys.down)z+=1;
  if(x||z){const l=Math.hypot(x,z);x/=l;z/=l;activePlayer.vx=THREE.MathUtils.lerp(activePlayer.vx,x*7,dt*7);activePlayer.vz=THREE.MathUtils.lerp(activePlayer.vz,z*7,dt*7);activePlayer.stamina=Math.max(0,activePlayer.stamina-dt*5.5)}
  else {activePlayer.vx*=.84;activePlayer.vz*=.84;activePlayer.stamina=Math.min(100,activePlayer.stamina+dt*3.2)}
  updateStaminaSprite(activePlayer);
  activePlayer.mesh.position.x+=activePlayer.vx*dt;activePlayer.mesh.position.z+=activePlayer.vz*dt;
  activePlayer.mesh.position.x=THREE.MathUtils.clamp(activePlayer.mesh.position.x,-43,43);
  activePlayer.mesh.position.z=THREE.MathUtils.clamp(activePlayer.mesh.position.z,-65,65);
  activePlayer.mesh.rotation.y=Math.atan2(activePlayer.vx,activePlayer.vz);
}
function aiUpdate(dt){
  players.filter(p=>p!==activePlayer).forEach(p=>{
    const target=p.home?ball.position:ball.position;
    let dx=target.x-p.mesh.position.x,dz=target.z-p.mesh.position.z,l=Math.hypot(dx,dz);
    if(l>2){p.vx=THREE.MathUtils.lerp(p.vx,dx/l*(p.home?4.3:4.8),dt*2);p.vz=THREE.MathUtils.lerp(p.vz,dz/l*(p.home?4.3:4.8),dt*2)}
    else {p.vx*=.8;p.vz*=.8}
    p.mesh.position.x+=p.vx*dt;p.mesh.position.z+=p.vz*dt;p.stamina=Math.max(0,p.stamina-dt*2.2);updateStaminaSprite(p);
    p.mesh.position.x=THREE.MathUtils.clamp(p.mesh.position.x,-43,43);p.mesh.position.z=THREE.MathUtils.clamp(p.mesh.position.z,-65,65);
  });
}
function updateReferee(dt){
  if(!referee||!ball)return;const target=ball.position;const dx=target.x-referee.mesh.position.x,dz=target.z-referee.mesh.position.z,l=Math.hypot(dx,dz);if(l>5){referee.vx=dx/l*3.2;referee.vz=dz/l*3.2}else{referee.vx*=.85;referee.vz*=.85}referee.mesh.position.x+=referee.vx*dt;referee.mesh.position.z+=referee.vz*dt;referee.mesh.position.x=THREE.MathUtils.clamp(referee.mesh.position.x,-40,40);referee.mesh.position.z=THREE.MathUtils.clamp(referee.mesh.position.z,-62,62);
}
function detectFouls(dt){
  foulCooldown=Math.max(0,foulCooldown-dt);if(foulCooldown>0||setPiece||!activePlayer)return;
  const opponents=players.filter(p=>!p.home);let near=opponents.find(p=>p.mesh.position.distanceTo(activePlayer.mesh.position)<1.05 && ball.position.distanceTo(activePlayer.mesh.position)<2.2);
  if(near && Math.random()<dt*.18){foulCooldown=7;const inBox=ball.position.z<-48 && Math.abs(ball.position.x)<18;const key=near.data[0];const c=(cardCounts.get(key)||0)+1;cardCounts.set(key,c);if(c===1)showEvent("🟨 بطاقة صفراء • مخالفة",1300);else if(c>=2)showEvent("🟥 طرد • بطاقة حمراء",1300);else showEvent("مخالفة",1000);startSetPiece(inBox?"penalty":"freeKick");}
}
function updateBall(dt){
  if(!ball.userData.vx)ball.userData={vx:0,vz:0,vy:0};
  const v=ball.userData;
  ball.position.x+=v.vx*dt;ball.position.z+=v.vz*dt;ball.position.y+=v.vy*dt;
  v.vy-=9.8*dt;v.vx*=Math.pow(.985,dt*60);v.vz*=Math.pow(.985,dt*60);
  if(ball.position.y<.35){ball.position.y=.35;v.vy*=-.48;v.vx*=.88;v.vz*=.88}
  if(Math.abs(ball.position.x)>45){ball.position.x=THREE.MathUtils.clamp(ball.position.x,-45,45);v.vx*=-.65}
  if(ball.position.z<-72){score[0]++;goal("home");}
  if(ball.position.z>72){score[1]++;goal("away");}
}
function showEvent(text,ms=1200){const e=$("#eventBanner");e.textContent=text;e.classList.remove("hidden");clearTimeout(showEvent.t);showEvent.t=setTimeout(()=>e.classList.add("hidden"),ms)}
function startSetPiece(type){
  setPiece={type};$("#setPieceTitle").textContent=type==="penalty"?"⚽ ركلة جزاء":"⚽ ركلة حرة";$("#setPieceText").textContent=type==="penalty"?"اسحب التسديد واختر القوة":"اسحب التسديد أفقيًا للتحكم في القوة";$("#setPieceHud").classList.remove("hidden");
  ball.position.set(0,.5,type==="penalty"?-56:-30);ball.userData={vx:0,vz:0,vy:0};
  if(type==="freeKick"){players.filter(p=>!p.home).slice(0,4).forEach((p,i)=>p.mesh.position.set((i-1.5)*2,0,-31));}
  else players.filter(p=>!p.home).slice(0,3).forEach((p,i)=>p.mesh.position.set((i-1)*1.8,0,-48));
}
function endSetPiece(){setPiece=null;$("#setPieceHud").classList.add("hidden");}
function kick(type,power=.55){
  if(!activePlayer||!ball)return;
  if(activePlayer.stamina<7){showEvent("اللاعب مرهق 💨");return}
  const dx=ball.position.x-activePlayer.mesh.position.x,dz=ball.position.z-activePlayer.mesh.position.z;
  if(!setPiece && Math.hypot(dx,dz)>4)return;
  let dir=new THREE.Vector3(dx,0,dz);
  if(setPiece){dir.set(0,setPiece.type==="penalty"?-1:-1,0);}
  if(dir.lengthSq()<.1)dir.set(0,0,-1);dir.normalize();
  if(type==="cross"){dir.x += (activePlayer.mesh.rotation.y||0)*.08;dir.z-=.55;dir.normalize();ball.userData.vy=6.2;power=.72}
  const speed=type==="shot"?(setPiece?.type==="penalty"?15:18)+power*22:10+power*8;
  ball.userData.vx=dir.x*speed;ball.userData.vz=dir.z*speed;ball.userData.vy=type==="shot"?2.5+power*3.2:ball.userData.vy||1.2;
  activePlayer.stamina=Math.max(0,activePlayer.stamina-(type==="shot"?7+power*7:2));updateStaminaSprite(activePlayer);
  if(setPiece){showEvent(setPiece.type==="penalty"?"ركلة الجزاء انطلقت!":"الركلة الحرة انطلقت!",1200);endSetPiece();}
}
function beginShotCharge(){shotCharging=true;shotChargeStart=performance.now();$("#shotHud").classList.remove("hidden");updateShotHud(0)}
function updateShotHud(power){power=Math.max(0,Math.min(1,power));$("#shotPowerBar").style.width=(power*100)+"%";$("#shotPowerText").textContent=Math.round(power*100)+"%"}
function finishShotCharge(dx=0){if(!shotCharging)return;const held=Math.min(1,(performance.now()-shotChargeStart)/900);const swipe=Math.min(1,Math.abs(dx)/150);const power=Math.max(.18,Math.min(1,held*.65+swipe*.55));updateShotHud(power);kick("shot",power);shotCharging=false;setTimeout(()=>$("#shotHud").classList.add("hidden"),180);}
function goal(side){
  $("#score").textContent=`${score[0]} - ${score[1]}`;showEvent("⚽ جوووووول!",1600);
  if(fx){ball.material.emissive=new THREE.Color(0xffd45a);setTimeout(()=>ball.material.emissive=new THREE.Color(0x000000),250)}
  setTimeout(resetPositions,700);
}
function updateCamera(dt){
  const p=activePlayer?.mesh.position||new THREE.Vector3();
  camera.position.x=THREE.MathUtils.lerp(camera.position.x,p.x*.42,dt*3);
  camera.position.z=THREE.MathUtils.lerp(camera.position.z,p.z+27,dt*3);
  camera.position.y=THREE.MathUtils.lerp(camera.position.y,15,dt*2);
  camera.lookAt(p.x*.45,0,p.z-3);
}
function animate(){
  requestAnimationFrame(animate);
  const dt=Math.min(clock?.getDelta()||.016,.035)*gameSpeed;
  if(gameStarted&&!paused){
    matchSeconds+=dt;updateClock();
    controlledMove(dt);aiUpdate(dt);updateBall(dt);updateReferee(dt);detectFouls(dt);updateCamera(dt);
    crowd.forEach((c,i)=>{c.position.y=3.2+(Math.sin(matchSeconds*3+i)*.12)});
    ball.rotation.x+=dt*8;ball.rotation.z+=dt*7;
  }
  renderer?.render(scene,camera);
}
function updateClock(){
  const m=Math.floor(matchSeconds/60).toString().padStart(2,"0"),s=Math.floor(matchSeconds%60).toString().padStart(2,"0");$("#matchClock").textContent=`${m}:${s}`;
}

function bindKeyboard(){
  addEventListener("keydown",e=>{
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","w","a","s","d","W","A","S","D"].includes(e.key))e.preventDefault();
    if(e.key==="ArrowUp"||e.key==="w"||e.key==="W")keys.up=true;
    if(e.key==="ArrowDown"||e.key==="s"||e.key==="S")keys.down=true;
    if(e.key==="ArrowLeft"||e.key==="a"||e.key==="A")keys.left=true;
    if(e.key==="ArrowRight"||e.key==="d"||e.key==="D")keys.right=true;
    if(e.key===" "){e.preventDefault();kick("shot",.8)}
    if(e.key==="q")kick("pass",.4);
  });
  addEventListener("keyup",e=>{
    if(e.key==="ArrowUp"||e.key==="w"||e.key==="W")keys.up=false;
    if(e.key==="ArrowDown"||e.key==="s"||e.key==="S")keys.down=false;
    if(e.key==="ArrowLeft"||e.key==="a"||e.key==="A")keys.left=false;
    if(e.key==="ArrowRight"||e.key==="d"||e.key==="D")keys.right=false;
  });
}
function bindJoystick(){
  const j=$("#joystick"),nub=j.querySelector("i");
  const move=e=>{
    const r=j.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
    let dx=e.clientX-cx,dy=e.clientY-cy,l=Math.hypot(dx,dy),max=38;if(l>max){dx=dx/l*max;dy=dy/l*max}
    nub.style.transform=`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px))`;
    keys.left=dx<-12;keys.right=dx>12;keys.up=dy<-12;keys.down=dy>12;
  };
  j.addEventListener("pointerdown",e=>{joystickPointer=e.pointerId;j.setPointerCapture(e.pointerId);move(e)});
  j.addEventListener("pointermove",e=>{if(e.pointerId===joystickPointer)move(e)});
  j.addEventListener("pointerup",()=>{joystickPointer=null;nub.style.transform="translate(-50%,-50%)";keys.left=keys.right=keys.up=keys.down=false});
  j.addEventListener("pointercancel",()=>{joystickPointer=null;keys.left=keys.right=keys.up=keys.down=false});
}
function bindGestureButton(el,type){
  el.addEventListener("pointerdown",e=>{swipeStart={x:e.clientX,y:e.clientY,t:performance.now(),type};el.classList.add("active");el.setPointerCapture(e.pointerId);if(type==="shot")beginShotCharge();});
  el.addEventListener("pointermove",e=>{if(type==="shot"&&swipeStart){const dx=e.clientX-swipeStart.x;const held=Math.min(1,(performance.now()-swipeStart.t)/900);const power=Math.min(1,held*.65+Math.min(1,Math.abs(dx)/150)*.55);updateShotHud(power);}});
  el.addEventListener("pointerup",e=>{if(!swipeStart)return;el.classList.remove("active");const dx=e.clientX-swipeStart.x,dy=e.clientY-swipeStart.y;if(type==="through"){if(dy<-35)kick("cross",.72);else kick("pass",Math.min(1,Math.max(.2,Math.hypot(dx,dy)/100)));}else finishShotCharge(dx);swipeStart=null;});
  el.addEventListener("pointercancel",()=>{if(type==="shot"){shotCharging=false;$("#shotHud").classList.add("hidden");}swipeStart=null;el.classList.remove("active")});
}
function applyQuality(q){
  quality=q;$("#qualitySelect").value=q;$("#qualityBtn").textContent=q==="high"?"جودة: عالية":"جودة: متوسطة";
  if(renderer){renderer.setPixelRatio(Math.min(devicePixelRatio||1,q==="high"?2:1.35));renderer.shadowMap.enabled=q==="high"}
}

$("#teamsBtn").onclick=()=>{renderTeams();show("#teams")};
$("#controlsBtn").onclick=()=>show("#controls");
$("#settingsBtn").onclick=()=>show("#settings");
$("#playBtn").onclick=()=>startGame();
$$("[data-back]").forEach(b=>b.onclick=()=>show("#home"));
$("#qualityBtn").onclick=()=>applyQuality(quality==="medium"?"high":"medium");
$("#qualitySelect").onchange=e=>applyQuality(e.target.value);
$("#speedSelect").onchange=e=>gameSpeed=parseFloat(e.target.value);
$("#fxToggle").onchange=e=>fx=e.target.checked;
$("#pauseGame").onclick=()=>{$("#pauseOverlay").classList.remove("hidden");paused=true};
$("#resumeBtn").onclick=()=>{$("#pauseOverlay").classList.add("hidden");paused=false};
$("#quitBtn").onclick=()=>{paused=false;gameStarted=false;show("#home")};
bindKeyboard();bindJoystick();bindGestureButton($("#throughBtn"),"through");bindGestureButton($("#shootBtn"),"shot");

function startGame(){
  show("#game");gameStarted=true;paused=false;setupMatch();resizeRenderer();$("#pauseOverlay").classList.add("hidden");
}
(async function init(){
  updateLoading(20,"جاري تحميل محرك 3D...");
  await new Promise(r=>setTimeout(r,250));
  renderTeams();
  updateLoading(55,"جاري تجهيز الفرق والتشكيلات...");
  createRenderer();
  updateLoading(80,"جاري تجهيز الملعب والإضاءة...");
  await new Promise(r=>setTimeout(r,250));
  updateLoading(100,"جاهز");
  setTimeout(()=>$("#loading").classList.add("hidden"),400);
  animate();
})();
