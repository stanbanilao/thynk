(() => {
  'use strict';
  const qs=(s,r=document)=>r.querySelector(s), qsa=(s,r=document)=>[...r.querySelectorAll(s)];
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse=window.matchMedia('(pointer: coarse)').matches;
  const hc=navigator.hardwareConcurrency||4;
  const memory=navigator.deviceMemory||4;
  const quality=coarse||hc<=4||memory<=4?'medium':'high';

  const loader=qs('#pageLoader');
  window.addEventListener('load',()=>setTimeout(()=>loader?.classList.add('hide'),180),{once:true});
  setTimeout(()=>loader?.classList.add('hide'),2500);

  const header=qs('#siteHeader');
  const menuBtn=qs('#menuToggle');
  const mobile=qs('#mobileMenu');
  const setMenu=(open)=>{
    menuBtn?.classList.toggle('open',open);
    mobile?.classList.toggle('open',open);
    menuBtn?.setAttribute('aria-expanded',String(open));
    mobile?.setAttribute('aria-hidden',String(!open));
    document.body.style.overflow=open?'hidden':'';
  };
  menuBtn?.addEventListener('click',()=>setMenu(!mobile.classList.contains('open')));
  qsa('#mobileMenu a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
  const updateHeader=()=>header?.classList.toggle('scrolled',scrollY>28);
  updateHeader();
  addEventListener('scroll',updateHeader,{passive:true});

  qsa('.worlds,.workflow,.showcase,.industries-preview,.proof,.stillness,.cta').forEach(el=>el.classList.add('reveal'));
  const revealIO=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('visible',e.isIntersecting)),{threshold:.08,rootMargin:'0px 0px -6%'});
  qsa('.reveal').forEach(el=>revealIO.observe(el));

  const interactive=qsa('a,button,.interactive-card,.showcase-visual');
  const cursor=qs('#cursor');
  if(cursor&&!coarse&&!reduced){
    const ring=qs('.cursor-ring',cursor), core=qs('.cursor-core',cursor);
    let tx=innerWidth/2,ty=innerHeight/2,rx=tx,ry=ty;
    addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});
    interactive.forEach(el=>{
      el.addEventListener('pointerenter',()=>cursor.classList.add('hover'));
      el.addEventListener('pointerleave',()=>cursor.classList.remove('hover'));
    });
    const drawCursor=()=>{
      rx+=(tx-rx)*.16;ry+=(ty-ry)*.16;
      ring.style.transform=`translate3d(${rx}px,${ry}px,0)`;
      core.style.transform=`translate3d(${tx}px,${ty}px,0)`;
    };
    window.__thynkCursor=drawCursor;
  }

  qsa('.interactive-card').forEach(card=>{
    if(coarse)return;
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
      card.style.setProperty('--mx',`${x*100}%`);card.style.setProperty('--my',`${y*100}%`);
      card.style.transform=`perspective(900px) rotateX(${(0.5-y)*4}deg) rotateY(${(x-0.5)*5}deg) translateY(-3px)`;
    });
    card.addEventListener('pointerleave',()=>card.style.transform='');
  });
  qsa('.showcase-visual').forEach(el=>{
    if(coarse)return;
    el.addEventListener('pointermove',e=>{
      const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
      el.style.setProperty('--rx',`${(0.5-y)*2.7}deg`);el.style.setProperty('--ry',`${(x-.5)*3.2}deg`);
    });
    el.addEventListener('pointerleave',()=>{el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')});
  });

  const words=[
    {word:'THYNK',caption:'Start with the real business problem before choosing the technology.',pills:['Listen','Map','Question','Focus']},
    {word:'DESIGN',caption:'Shape a clear experience for the people who actually use the system.',pills:['Journey','Interface','Brand','Clarity']},
    {word:'BUILD',caption:'Turn the idea into a practical product, website or operational tool.',pills:['Web','Apps','Portals','Data']},
    {word:'CONNECT',caption:'Make people, information and existing tools behave like one system.',pills:['CRM','Email','Files','Teams','Data']},
    {word:'AUTOMATE',caption:'Give repeatable rules-based work to digital workers, with human review where it matters.',pills:['RPA','Checks','Docs','Reports','Exceptions']},
    {word:'EVOLVE',caption:'Measure what improved, then keep refining instead of treating launch as the finish line.',pills:['Measure','Learn','Improve','Scale']}
  ];
  const formingStage=qs('#formingStage'), formingCaption=qs('#formingCaption'), formingProgress=qs('#formingProgress'), formingSection=qs('.forming-section');
  const formedWords=[]; const pills=[];
  if(formingStage&&formingProgress){
    words.forEach((item,wi)=>{
      const word=document.createElement('div');word.className='forming-word';word.dataset.index=wi;
      [...item.word].forEach((ch,li)=>{
        const span=document.createElement('span');span.className='forming-letter';span.textContent=ch;
        const angle=(li/item.word.length)*Math.PI*2 + wi*.17;
        const dist=150+(li%3)*65+wi*6;
        span.style.setProperty('--x',`${Math.cos(angle)*dist}px`);
        span.style.setProperty('--y',`${Math.sin(angle)*dist*.72}px`);
        span.style.setProperty('--r',`${((li*29+wi*17)%90)-45}deg`);
        span.style.setProperty('--s',`${.38+(li%4)*.09}`);
        word.appendChild(span);
      });
      formingStage.appendChild(word);formedWords.push(word);
      const dot=document.createElement('i');formingProgress.appendChild(dot);
      item.pills.forEach((label,pi)=>{
        const p=document.createElement('span');p.className='orbit-pill';p.textContent=label;p.dataset.word=wi;p.dataset.pill=pi;formingStage.appendChild(p);pills.push(p);
      });
    });
  }
  let formingState={index:0,local:0};
  const updateForming=()=>{
    if(!formingSection||!formedWords.length)return;
    const rect=formingSection.getBoundingClientRect();
    const total=Math.max(1,formingSection.offsetHeight-innerHeight);
    const progress=clamp(-rect.top/total,0,.9999);
    const raw=progress*words.length;
    const idx=clamp(Math.floor(raw),0,words.length-1);const local=raw-idx;
    formingState={index:idx,local};
    formedWords.forEach((word,wi)=>{
      word.classList.toggle('active',wi===idx);
      qsa('.forming-letter',word).forEach((letter,li)=>{
        const threshold=(li+1)/(qsa('.forming-letter',word).length+1)*.68;
        letter.classList.toggle('formed',wi<idx||(wi===idx&&local>threshold));
      });
    });
    qsa('#formingProgress i').forEach((d,i)=>d.classList.toggle('active',i===idx));
    if(formingCaption)formingCaption.textContent=words[idx].caption;
    pills.forEach(p=>p.classList.toggle('show',Number(p.dataset.word)===idx&&local>.58));
  };
  addEventListener('scroll',updateForming,{passive:true});
  addEventListener('resize',updateForming,{passive:true});
  updateForming();

  const workflow=qs('#workflowShell');
  if(workflow){
    const steps=qsa('.workflow-steps div',workflow);let current=0,timer=null;
    const startFlow=()=>{if(timer)return;timer=setInterval(()=>{current=(current+1)%steps.length;steps.forEach((s,i)=>s.classList.toggle('active',i===current))},1300)};
    const stopFlow=()=>{clearInterval(timer);timer=null};
    new IntersectionObserver(entries=>entries.forEach(e=>e.isIntersecting?startFlow():stopFlow()),{threshold:.3}).observe(workflow);
  }

  class MotionEngine{
    constructor(){this.tasks=new Set();this.running=true;this.last=performance.now();this.loop=this.loop.bind(this);requestAnimationFrame(this.loop);document.addEventListener('visibilitychange',()=>this.running=!document.hidden)}
    add(fn){this.tasks.add(fn);return()=>this.tasks.delete(fn)}
    loop(now){const dt=Math.min(40,now-this.last);this.last=now;if(this.running&&!reduced)this.tasks.forEach(fn=>fn(now,dt));requestAnimationFrame(this.loop)}
  }
  const motion=new MotionEngine();
  if(window.__thynkCursor)motion.add(window.__thynkCursor);

  const constellation=qs('#constellationCanvas');
  if(constellation&&!reduced){
    const ctx=constellation.getContext('2d',{alpha:true});let w=0,h=0,dpr=1;
    const mouse={x:-9999,y:-9999};let particles=[];
    const count=quality==='high'?64:36;const connect=quality==='high'?145:125;
    const resize=()=>{dpr=Math.min(devicePixelRatio||1,quality==='high'?1.6:1.25);w=innerWidth;h=innerHeight;const nw=Math.round(w*dpr),nh=Math.round(h*dpr);if(constellation.width!==nw||constellation.height!==nh){constellation.width=nw;constellation.height=nh;constellation.style.width=w+'px';constellation.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0)};if(!particles.length)particles=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:.7+Math.random()*1.6,a:.18+Math.random()*.35}))};
    resize();addEventListener('resize',resize,{passive:true});
    addEventListener('pointermove',e=>{mouse.x=e.clientX;mouse.y=e.clientY},{passive:true});
    addEventListener('pointerleave',()=>{mouse.x=-9999;mouse.y=-9999},{passive:true});
    motion.add(()=>{
      ctx.clearRect(0,0,w,h);
      for(let i=0;i<particles.length;i++){
        const p=particles[i];p.x+=p.vx;p.y+=p.vy;
        if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0;
        const dx=p.x-mouse.x,dy=p.y-mouse.y,ds=dx*dx+dy*dy;
        if(ds<15000&&ds>1){const d=Math.sqrt(ds),f=(1-d/123)*1.2;p.x+=dx/d*f;p.y+=dy/d*f}
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,107,53,${p.a})`;ctx.fill();
        for(let j=i+1;j<particles.length;j++){
          const q=particles[j],x=p.x-q.x,y=p.y-q.y,d2=x*x+y*y;
          if(d2<connect*connect){const alpha=(1-Math.sqrt(d2)/connect)*.16;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(255,107,53,${alpha})`;ctx.lineWidth=.55;ctx.stroke()}
        }
      }
    });
  }

  const liquid=qs('#liquidCanvas');
  if(liquid&&!reduced){
    const ctx=liquid.getContext('2d',{alpha:true});let w=0,h=0,dpr=1,ripples=[],last={x:0,y:0};
    const reactEls=qsa('.liquid-react,.hero-line');let rects=[];
    const resize=()=>{dpr=Math.min(devicePixelRatio||1,1.4);w=innerWidth;h=innerHeight;liquid.width=Math.round(w*dpr);liquid.height=Math.round(h*dpr);liquid.style.width=w+'px';liquid.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);rects=reactEls.map(el=>({el,rect:el.getBoundingClientRect()}))};
    resize();addEventListener('resize',resize,{passive:true});
    const ripple=(x,y,touch=false)=>{ripples.push({x,y,r:3,max:touch?185:95,a:touch?.7:.45,s:touch?2.9:1.45})};
    addEventListener('pointermove',e=>{if(coarse)return;const dist=Math.hypot(e.clientX-last.x,e.clientY-last.y);if(dist>34){ripple(e.clientX,e.clientY);last={x:e.clientX,y:e.clientY}};rects.forEach(({el,rect})=>{const cx=rect.left+rect.width/2,cy=rect.top+rect.height/2,d=Math.hypot(e.clientX-cx,e.clientY-cy);if(d<230){const f=(230-d)/230,ang=Math.atan2(cy-e.clientY,cx-e.clientX);el.style.transform=`translate3d(${Math.cos(ang)*f*8}px,${Math.sin(ang)*f*8}px,0)`}else el.style.transform=''})},{passive:true});
    addEventListener('pointerdown',e=>ripple(e.clientX,e.clientY,coarse),{passive:true});
    motion.add(()=>{ctx.clearRect(0,0,w,h);ripples=ripples.filter(r=>r.a>.01&&r.r<r.max).slice(-42);ripples.forEach(r=>{r.r+=r.s;r.a*=.982;for(let n=0;n<2;n++){ctx.beginPath();ctx.arc(r.x,r.y,r.r*(1-n*.28),0,Math.PI*2);ctx.strokeStyle=`rgba(255,107,53,${r.a*(1-n*.45)})`;ctx.lineWidth=n?0.8:1.25;ctx.stroke()}})});
  }

  const orbitPills=()=>{
    if(!pills.length)return;
    const active=pills.filter(p=>p.classList.contains('show'));if(!active.length)return;
    const radius=clamp(innerWidth*.18,118,225), t=performance.now()*.00032;
    active.forEach((p,i)=>{const a=t+i/active.length*Math.PI*2;const x=Math.cos(a)*radius,y=Math.sin(a)*radius*.58;p.style.transform=`translate3d(calc(-50% + ${x}px),calc(-50% + ${y}px),0)`});
  };
  motion.add(orbitPills);

  qsa('.magnetic').forEach(el=>{
    if(coarse)return;
    el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-(r.left+r.width/2),y=e.clientY-(r.top+r.height/2);el.style.transform=`translate3d(${x*.08}px,${y*.08}px,0)`});
    el.addEventListener('pointerleave',()=>el.style.transform='');
  });
})();
