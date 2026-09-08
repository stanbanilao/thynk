(() => {
  'use strict';
  const qs=(s,r=document)=>r.querySelector(s), qsa=(s,r=document)=>[...r.querySelectorAll(s)];
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse=window.matchMedia('(pointer: coarse)').matches;
  const hc=navigator.hardwareConcurrency||4;
  const memory=navigator.deviceMemory||4;
  const quality=coarse||hc<=4||memory<=4?'medium':'high';

  // Load the v2.1 premium layer before the page loader leaves.
  const premiumCss=document.createElement('link');
  premiumCss.rel='stylesheet';
  premiumCss.href='css/v2-premium.css';
  document.head.appendChild(premiumCss);
  qs('meta[name="theme-color"]')?.setAttribute('content','#0f151d');

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

  // One-time section reveals avoid the visible/invisible toggle friction on scroll-back.
  qsa('.worlds,.workflow,.showcase,.industries-preview,.proof,.stillness,.cta').forEach(el=>el.classList.add('reveal'));
  const revealIO=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      revealIO.unobserve(e.target);
    }
  }),{threshold:.08,rootMargin:'0px 0px -6%'});
  qsa('.reveal').forEach(el=>revealIO.observe(el));

  // Keep the native cursor. Interaction happens on the surfaces, not by dragging a delayed cursor ring.
  const cursor=qs('#cursor');
  if(cursor)cursor.setAttribute('aria-hidden','true');

  qsa('.interactive-card').forEach(card=>{
    if(coarse||quality!=='high')return;
    let r=null;
    card.addEventListener('pointerenter',()=>{r=card.getBoundingClientRect()});
    card.addEventListener('pointermove',e=>{
      if(!r)return;
      const x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
      card.style.setProperty('--mx',`${x*100}%`);
      card.style.setProperty('--my',`${y*100}%`);
      card.style.transform=`perspective(1000px) rotateX(${(0.5-y)*2.4}deg) rotateY(${(x-0.5)*2.8}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave',()=>{r=null;card.style.transform=''});
  });

  qsa('.showcase-visual').forEach(el=>{
    if(coarse||quality!=='high')return;
    let r=null;
    el.addEventListener('pointerenter',()=>{r=el.getBoundingClientRect()});
    el.addEventListener('pointermove',e=>{
      if(!r)return;
      const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
      el.style.setProperty('--rx',`${(0.5-y)*1.8}deg`);
      el.style.setProperty('--ry',`${(x-.5)*2.1}deg`);
    });
    el.addEventListener('pointerleave',()=>{r=null;el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')});
  });

  // Premium public-facing copy: evidence-led, without internal/version language.
  const showcaseIntro=qs('.showcase .split-head>p');
  if(showcaseIntro)showcaseIntro.textContent='Product-style demonstrations of the systems, interfaces and digital experiences Thynkverse shapes around real work.';
  const proofIntro=qs('.proof .split-head>p');
  if(proofIntro)proofIntro.textContent='We prefer project evidence: interfaces, workflow changes, before-and-after processes and verified outcomes when they are documented.';

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
        const dist=138+(li%3)*54+wi*5;
        span.style.setProperty('--x',`${Math.cos(angle)*dist}px`);
        span.style.setProperty('--y',`${Math.sin(angle)*dist*.7}px`);
        span.style.setProperty('--r',`${((li*29+wi*17)%72)-36}deg`);
        span.style.setProperty('--s',`${.46+(li%4)*.08}`);
        word.appendChild(span);
      });
      formingStage.appendChild(word);formedWords.push(word);
      const dot=document.createElement('i');formingProgress.appendChild(dot);
      item.pills.forEach((label,pi)=>{
        const p=document.createElement('span');p.className='orbit-pill';p.textContent=label;p.dataset.word=wi;p.dataset.pill=pi;formingStage.appendChild(p);pills.push(p);
      });
    });
  }

  const updateForming=()=>{
    if(!formingSection||!formedWords.length)return;
    const rect=formingSection.getBoundingClientRect();
    const total=Math.max(1,formingSection.offsetHeight-innerHeight);
    const progress=clamp(-rect.top/total,0,.9999);
    const raw=progress*words.length;
    const idx=clamp(Math.floor(raw),0,words.length-1);const local=raw-idx;
    formedWords.forEach((word,wi)=>{
      word.classList.toggle('active',wi===idx);
      const letters=qsa('.forming-letter',word);
      letters.forEach((letter,li)=>{
        const threshold=(li+1)/(letters.length+1)*.64;
        letter.classList.toggle('formed',wi<idx||(wi===idx&&local>threshold));
      });
    });
    qsa('#formingProgress i').forEach((d,i)=>d.classList.toggle('active',i===idx));
    if(formingCaption)formingCaption.textContent=words[idx].caption;
    pills.forEach(p=>p.classList.toggle('show',Number(p.dataset.word)===idx&&local>.6));
  };
  addEventListener('scroll',updateForming,{passive:true});
  addEventListener('resize',updateForming,{passive:true});
  updateForming();

  const workflow=qs('#workflowShell');
  if(workflow){
    const steps=qsa('.workflow-steps div',workflow);let current=0,timer=null;
    const startFlow=()=>{if(timer)return;timer=setInterval(()=>{current=(current+1)%steps.length;steps.forEach((s,i)=>s.classList.toggle('active',i===current))},1450)};
    const stopFlow=()=>{clearInterval(timer);timer=null};
    new IntersectionObserver(entries=>entries.forEach(e=>e.isIntersecting?startFlow():stopFlow()),{threshold:.3}).observe(workflow);
  }

  class MotionEngine{
    constructor(){this.tasks=new Set();this.running=true;this.last=performance.now();this.loop=this.loop.bind(this);requestAnimationFrame(this.loop);document.addEventListener('visibilitychange',()=>this.running=!document.hidden)}
    add(fn){this.tasks.add(fn);return()=>this.tasks.delete(fn)}
    loop(now){const dt=Math.min(40,now-this.last);this.last=now;if(this.running&&!reduced)this.tasks.forEach(fn=>fn(now,dt));requestAnimationFrame(this.loop)}
  }
  const motion=new MotionEngine();

  // Hero behaves like a precision assembly: calm at rest, then layers separate as the camera moves through it.
  const hero=qs('.hero');
  const coreA=qs('.orb-a');
  const coreB=qs('.orb-b');
  const heroCopy=qs('.hero-copy');
  const heroStatus=qs('.hero-status');
  const scrollCue=qs('.scroll-cue');
  const updateHeroCore=()=>{
    if(!hero||!coreA||!coreB)return;
    const rect=hero.getBoundingClientRect();
    const p=clamp(-rect.top/Math.max(1,rect.height*.9),0,1);
    const fade=1-clamp((p-.48)/.42,0,1);
    coreA.style.setProperty('--core-a-scale',(1+p*.72).toFixed(3));
    coreA.style.setProperty('--core-a-rot',`${(p*46).toFixed(2)}deg`);
    coreA.style.setProperty('--core-a-opacity',(Math.max(.05,.52*(1-p*.76))).toFixed(3));
    coreB.style.setProperty('--core-b-scale',(1+p*1.05).toFixed(3));
    coreB.style.setProperty('--core-b-rot',`${(-p*72).toFixed(2)}deg`);
    coreB.style.setProperty('--core-b-x',`${(p*38).toFixed(1)}px`);
    coreB.style.setProperty('--core-b-y',`${(-p*22).toFixed(1)}px`);
    coreB.style.setProperty('--core-b-opacity',(Math.max(.05,.68*(1-p*.82))).toFixed(3));
    hero.style.setProperty('--hero-grid-shift',`${(p*26).toFixed(1)}px`);
    if(heroCopy)heroCopy.style.opacity=String(fade);
    if(heroStatus)heroStatus.style.opacity=String(fade);
    if(scrollCue)scrollCue.style.opacity=String(fade);
  };
  addEventListener('scroll',updateHeroCore,{passive:true});
  addEventListener('resize',updateHeroCore,{passive:true});
  updateHeroCore();

  const constellation=qs('#constellationCanvas');
  if(constellation&&!reduced){
    const ctx=constellation.getContext('2d',{alpha:true});let w=0,h=0,dpr=1;
    const mouse={x:-9999,y:-9999};let particles=[];
    const count=quality==='high'?44:26;const connect=quality==='high'?138:118;
    const resize=()=>{
      dpr=Math.min(devicePixelRatio||1,quality==='high'?1.45:1.2);w=innerWidth;h=innerHeight;
      const nw=Math.round(w*dpr),nh=Math.round(h*dpr);
      if(constellation.width!==nw||constellation.height!==nh){
        constellation.width=nw;constellation.height=nh;constellation.style.width=w+'px';constellation.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);
      }
      if(!particles.length)particles=Array.from({length:count},()=>({
        x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16,
        r:.6+Math.random()*1.25,a:.12+Math.random()*.22,hot:Math.random()<.14
      }));
    };
    resize();addEventListener('resize',resize,{passive:true});
    addEventListener('pointermove',e=>{mouse.x=e.clientX;mouse.y=e.clientY},{passive:true});
    addEventListener('pointerleave',()=>{mouse.x=-9999;mouse.y=-9999},{passive:true});
    motion.add(()=>{
      ctx.clearRect(0,0,w,h);
      if(scrollY>innerHeight*1.35)return;
      for(let i=0;i<particles.length;i++){
        const p=particles[i];p.x+=p.vx;p.y+=p.vy;
        if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0;
        const dx=p.x-mouse.x,dy=p.y-mouse.y,ds=dx*dx+dy*dy;
        if(ds<12500&&ds>1){const d=Math.sqrt(ds),f=(1-d/112)*.55;p.x+=dx/d*f;p.y+=dy/d*f}
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.hot?`rgba(255,120,70,${p.a*.95})`:`rgba(176,191,208,${p.a})`;
        ctx.fill();
        for(let j=i+1;j<particles.length;j++){
          const q=particles[j],x=p.x-q.x,y=p.y-q.y,d2=x*x+y*y;
          if(d2<connect*connect){
            const alpha=(1-Math.sqrt(d2)/connect)*.095;
            ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
            ctx.strokeStyle=`rgba(151,169,190,${alpha})`;ctx.lineWidth=.5;ctx.stroke();
          }
        }
      }
    });
  }

  // Water only appears around the workflow console, where it represents information flow.
  const liquid=qs('#liquidCanvas');
  const liquidZone=qs('#workflowShell');
  if(liquid&&liquidZone&&!reduced){
    const ctx=liquid.getContext('2d',{alpha:true});let w=0,h=0,dpr=1,ripples=[],last={x:0,y:0},zoneRect=null,zoneActive=false;
    const resize=()=>{dpr=Math.min(devicePixelRatio||1,1.25);w=innerWidth;h=innerHeight;liquid.width=Math.round(w*dpr);liquid.height=Math.round(h*dpr);liquid.style.width=w+'px';liquid.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);if(zoneActive)zoneRect=liquidZone.getBoundingClientRect()};
    const syncZone=()=>{if(zoneActive)zoneRect=liquidZone.getBoundingClientRect()};
    resize();addEventListener('resize',resize,{passive:true});addEventListener('scroll',syncZone,{passive:true});
    new IntersectionObserver(entries=>entries.forEach(e=>{zoneActive=e.isIntersecting;if(zoneActive)zoneRect=liquidZone.getBoundingClientRect()}),{threshold:.08}).observe(liquidZone);
    const ripple=(x,y,touch=false)=>{ripples.push({x,y,r:3,max:touch?145:76,a:touch?.48:.3,s:touch?2.2:1.2})};
    addEventListener('pointermove',e=>{
      if(coarse||!zoneActive||!zoneRect)return;
      if(e.clientX<zoneRect.left||e.clientX>zoneRect.right||e.clientY<zoneRect.top||e.clientY>zoneRect.bottom)return;
      const dist=Math.hypot(e.clientX-last.x,e.clientY-last.y);
      if(dist>48){ripple(e.clientX,e.clientY);last={x:e.clientX,y:e.clientY}};
    },{passive:true});
    addEventListener('pointerdown',e=>{
      if(!zoneActive||!zoneRect)return;
      if(e.clientX>=zoneRect.left&&e.clientX<=zoneRect.right&&e.clientY>=zoneRect.top&&e.clientY<=zoneRect.bottom)ripple(e.clientX,e.clientY,coarse);
    },{passive:true});
    motion.add(()=>{
      ctx.clearRect(0,0,w,h);
      if(!zoneActive)return;
      ripples=ripples.filter(r=>r.a>.01&&r.r<r.max).slice(-24);
      ripples.forEach(r=>{r.r+=r.s;r.a*=.978;ctx.beginPath();ctx.arc(r.x,r.y,r.r,0,Math.PI*2);ctx.strokeStyle=`rgba(255,122,72,${r.a})`;ctx.lineWidth=1;ctx.stroke()});
    });
  }

  const orbitPills=()=>{
    if(!pills.length)return;
    const active=pills.filter(p=>p.classList.contains('show'));if(!active.length)return;
    const radius=clamp(innerWidth*.17,112,205),t=performance.now()*.00025;
    active.forEach((p,i)=>{const a=t+i/active.length*Math.PI*2;const x=Math.cos(a)*radius,y=Math.sin(a)*radius*.56;p.style.transform=`translate3d(calc(-50% + ${x}px),calc(-50% + ${y}px),0)`});
  };
  motion.add(orbitPills);

  qsa('.magnetic').forEach(el=>{
    if(coarse||quality!=='high')return;
    let r=null;
    el.addEventListener('pointerenter',()=>{r=el.getBoundingClientRect()});
    el.addEventListener('pointermove',e=>{if(!r)return;const x=e.clientX-(r.left+r.width/2),y=e.clientY-(r.top+r.height/2);el.style.transform=`translate3d(${x*.045}px,${y*.045}px,0)`});
    el.addEventListener('pointerleave',()=>{r=null;el.style.transform=''});
  });
})();
