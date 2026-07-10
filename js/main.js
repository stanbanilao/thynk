/* ============================================
   PAGE LOADER
   ============================================ */
(function() {
  const loader = document.getElementById('pageLoader');
  const bar = document.getElementById('loaderBar');
  const pct = document.getElementById('loaderPct');
  let progress = 0;
  const interval = setInterval(() => {
    const inc = progress < 70 ? Math.random() * 12 : Math.random() * 4;
    progress = Math.min(progress + inc, 95);
    bar.style.width = progress + '%';
    pct.textContent = Math.round(progress) + '%';
  }, 120);
  window.addEventListener('load', () => {
    clearInterval(interval);
    bar.style.width = '100%';
    pct.textContent = '100%';
    setTimeout(() => { loader.classList.add('hidden'); }, 500);
  });
  setTimeout(() => { loader.classList.add('hidden'); }, 4000);
})();

/* ============================================
   MOBILE MENU
   ============================================ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ============================================
   TESTIMONIALS DATA & RENDER
   ============================================ */
const testimonials = [
  {
    quote: "Working with Thynkverse completely changed how people see our brand. We went from looking like just another small business to something that actually stands out. The logo alone has gotten more compliments than anything we've ever done.",
    name: "Siyanda Dlamini", role: "Owner, Siya's Kitchen & Catering", initials: "SD", color: "#ff6b35"
  },
  {
    quote: "I was honestly skeptical at first — I've worked with agencies before and always felt like just another client. This was different. They actually listened, pushed back when something wasn't working, and delivered a website I'm genuinely proud to send people to.",
    name: "Melanie Botha", role: "Director, Botha & Associates Law", initials: "MB", color: "#a78bfa"
  },
  {
    quote: "Our Instagram went from 800 to 6,200 followers in under four months. That's not just numbers — those are real customers. The content they create feels authentic to who we are, not like it was made by a robot.",
    name: "Kagiso Nkosi", role: "Co-founder, Kasi Threads", initials: "KN", color: "#34d399"
  },
  {
    quote: "They built our e-commerce store in three weeks and it looked better than sites I've seen from companies ten times our size. Setup was smooth, they explained everything, and sales have been up 40% since launch.",
    name: "Priya Govender", role: "Founder, Bloom Botanicals SA", initials: "PG", color: "#f59e0b"
  },
  {
    quote: "I needed a rebrand fast — new logo, new colours, new everything. Thynkverse came back with concepts in 48 hours and nailed it on the second round. I've already referred them to three other business owners in my network.",
    name: "Thabo Mahlangu", role: "CEO, Mahlangu Real Estate", initials: "TM", color: "#60a5fa"
  },
  {
    quote: "What I appreciate most is that they don't just do the work and disappear. They check in, they follow up, and when I had a small issue with my site a month after launch, they sorted it out same day. That's rare.",
    name: "Lindiwe Cele", role: "Founder, LCM Events", initials: "LC", color: "#f472b6"
  },
  {
    quote: "We needed a full digital strategy — not just a pretty website. They mapped out our entire online presence, from Google Business to social ads, and it actually made sense. Revenue from online channels doubled within six months.",
    name: "Ruan van der Merwe", role: "MD, VDM Construction Group", initials: "RV", color: "#ff6b35"
  },
  {
    quote: "The attention to detail is what gets me. Little things like font choices, how buttons feel on mobile, the way the colours work together — it all adds up to something that feels premium. Our clients notice it too.",
    name: "Zanele Mokoena", role: "Creative Director, Zanele Studio", initials: "ZM", color: "#34d399"
  }
];

const testiTrack = document.getElementById('testiTrack');
const doubledTesti = [...testimonials, ...testimonials];
doubledTesti.forEach(t => {
  const card = document.createElement('div');
  card.className = 'testi-card';
  card.innerHTML = `
    <div class="testi-stars">${'<span class="testi-star">★</span>'.repeat(5)}</div>
    <p class="testi-quote">${t.quote}</p>
    <div class="testi-author">
      <div class="testi-avatar" style="background:${t.color}18;color:${t.color};">${t.initials}</div>
      <div>
        <div class="testi-name">${t.name}</div>
        <div class="testi-role">${t.role}</div>
      </div>
      <div class="testi-verified">✓ Verified</div>
    </div>
  `;
  testiTrack.appendChild(card);
});

/* ============================================
   SERVICES DATA (With 07 and 08 Added)
   ============================================ */
const services = [
  {
    id: 1, title: "Brand Identity",
    shortDesc: "Logos, visual systems, and brand guidelines that make you unforgettable.",
    fullDesc: "We craft distinctive brand identities that capture your essence and resonate with your audience. From logo design to complete visual systems, we ensure every touchpoint tells your story consistently.",
    features: ["Logo Design & Variations", "Brand Guidelines & Style Guides", "Color Palette & Typography", "Brand Strategy & Positioning", "Collateral Design"],
    icon: "✦", color: "#ff6b35",
    waMsg: "Hi Thynkverse, I'm interested in your Brand Identity service. Can we discuss my project?"
  },
  {
    id: 2, title: "Web Design & Development",
    shortDesc: "Responsive, high-performance websites built to convert visitors into customers.",
    fullDesc: "We design and develop stunning, responsive websites that load fast and convert better. From landing pages to complex web applications, we build digital experiences that drive results.",
    features: ["Custom Website Design", "Frontend & Backend Development", "CMS Integration", "E-Commerce Solutions", "Performance Optimization"],
    icon: "◈", color: "#a78bfa",
    waMsg: "Hi Thynkverse, I'm interested in your Web Design & Development service. Can we discuss my project?"
  },
  {
    id: 3, title: "Social Media Management",
    shortDesc: "Content strategy, scheduling, and community management that grows your following.",
    fullDesc: "We manage your social presence end-to-end. From content creation and scheduling to community engagement and analytics, we turn your social channels into growth engines.",
    features: ["Content Strategy & Calendar", "Post Design & Copywriting", "Community Management", "Paid Social Advertising", "Monthly Analytics Reports"],
    icon: "◎", color: "#34d399",
    waMsg: "Hi Thynkverse, I'm interested in your Social Media Management service. Can we discuss my project?"
  },
  {
    id: 4, title: "E-Commerce Solutions",
    shortDesc: "Online stores that look beautiful and sell more with seamless checkout flows.",
    fullDesc: "We build e-commerce experiences that convert browsers into buyers. From product pages to checkout flows, we optimize every step of the customer journey for maximum revenue.",
    features: ["Store Design & Setup", "Payment Gateway Integration", "Inventory Management", "Conversion Rate Optimization", "Mobile Shopping Experience"],
    icon: "◉", color: "#f59e0b",
    waMsg: "Hi Thynkverse, I'm interested in your E-Commerce Solutions service. Can we discuss my project?"
  },
  {
    id: 5, title: "UI/UX Design",
    shortDesc: "User-centered interfaces and experiences that feel intuitive and delightful.",
    fullDesc: "We design user experiences that are intuitive, accessible, and beautiful. Through research-driven design, we create interfaces that users love and businesses benefit from.",
    features: ["User Research & Personas", "Wireframing & Prototyping", "Interface Design", "Usability Testing", "Design Systems"],
    icon: "◇", color: "#60a5fa",
    waMsg: "Hi Thynkverse, I'm interested in your UI/UX Design service. Can we discuss my project?"
  },
  {
    id: 6, title: "Digital Strategy",
    shortDesc: "Data-driven roadmaps that align your digital presence with business goals.",
    fullDesc: "We develop comprehensive digital strategies that align your online presence with your business objectives. From market analysis to execution roadmaps, we set you up for sustainable growth.",
    features: ["Market & Competitor Analysis", "Digital Roadmapping", "KPI Definition & Tracking", "Channel Strategy", "Growth Hacking"],
    icon: "✶", color: "#f472b6",
    waMsg: "Hi Thynkverse, I'm interested in your Digital Strategy service. Can we discuss my project?"
  },
  {
    id: 7, title: "Web & Mobile App Development",
    shortDesc: "Custom, high-performance web and native mobile applications built for scale and seamless user experiences.",
    fullDesc: "We engineer robust, scalable applications tailored to your operational needs. From initial wireframing to full deployment, we deliver intuitive digital products that solve complex problems and engage users across all devices.",
    features: ["Native iOS & Android Apps", "Progressive Web Apps (PWAs)", "Custom API Integrations", "Cloud Infrastructure Architecture", "Responsive Interface Layouts"],
    icon: "❖", color: "#38bdf8",
    waMsg: "Hi Thynkverse, I'm interested in your Web & Mobile App Development service. Can we discuss my project?"
  },
  {
    id: 8, title: "Webhooks & WhatsApp Automation",
    shortDesc: "Intelligent automated workflows connecting your WhatsApp Business directly to your customers.",
    fullDesc: "Streamline your customer communication with powerful webhook integrations and WhatsApp Business API automation. We build smart, keyword-driven auto-responders and seamless data bridges that keep your business connected 24/7.",
    features: ["WhatsApp Business API Setup", "Keyword-Driven Chatbots", "CRM Webhook Integration", "Automated Onboarding Flows", "24/7 Live Customer Resolution"],
    icon: "⇄", color: "#2def7e",
    waMsg: "Hi Thynkverse, I'm interested in your Webhooks & WhatsApp Automation service. Can we discuss my project?"
  }
];

const formingWords = [
  { text: "INNOVATE", class: "word-innovate", cards: [
    { icon: "💡", title: "Ideate" }, { icon: "🔍", title: "Research" },
    { icon: "📐", title: "Concept" }, { icon: "🎯", title: "Focus" }, { icon: "🚀", title: "Launch" }
  ]},
  { text: "CREATE", class: "word-create", cards: [
    { icon: "🎨", title: "Design" }, { icon: "✏️", title: "Sketch" },
    { icon: "🖌️", title: "Craft" }, { icon: "📸", title: "Visuals" }, { icon: "🎬", title: "Motion" }
  ]},
  { text: "TRANSFORM", class: "word-transform", cards: [
    { icon: "⚡", title: "Evolve" }, { icon: "🔄", title: "Adapt" },
    { icon: "📈", title: "Scale" }, { icon: "🔧", title: "Optimize" }, { icon: "🏗️", title: "Restructure" }
  ]},
  { text: "BUILD", class: "word-build", cards: [
    { icon: "💻", title: "Code" }, { icon: "📱", title: "Develop" },
    { icon: "🔗", title: "Integrate" }, { icon: "🧪", title: "Test" }, { icon: "🚢", title: "Deploy" }
  ]},
  { text: "EVOLVE", class: "word-evolve", cards: [
    { icon: "🌱", title: "Grow" }, { icon: "📊", title: "Analyze" },
    { icon: "🔮", title: "Predict" }, { icon: "♻️", title: "Iterate" }, { icon: "🏆", title: "Win" }
  ]}
];

/* ============================================
   PORTFOLIO (BUILT TO IMPRESS DATA & IMAGES)
   ============================================ */
const portfolioProjects = [
  {
    id: 1,
    title: "Visual Identity System",
    tag: "Brand Identity",
    imgUrl: "Brand Identity - Visiual Identity System.jpg",
    problem: "The client suffered from low market positioning, looking like a standard entry agency and unable to command premium margins.",
    engineering: "Constructed a comprehensive modern branding grid, applying rich Violet Core and Neon Black canvas tokens for visual dominance.",
    result: "Successfully established a high-authority position yielding over 2.4M organic campaign impressions."
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    tag: "Web Design",
    imgUrl: "Web Design - E-Commerce Platform.jpg",
    problem: "Sluggish load speeds on dynamic mobile viewports triggered a staggering 70% cart abandonment rate.",
    engineering: "Coded custom frontend logic, implemented rapid-load image delivery pipelines, and engineered clean product display grids.",
    result: "Dramatically slashed bounce rates and catalyzed immediate conversion spikes for the Lumina brand launch."
  },
  {
    id: 3,
    title: "Campaign Strategy",
    tag: "Social Media",
    imgUrl: "Social Media - Campaign Strategy.jpg",
    problem: "Stale, over-corporate content systems completely failed to establish meaningful interactive relationships with target consumer demographics.",
    engineering: "Divided content strategy into 4 highly creative core pillars and automated distribution weighted specifically to TikTok and Instagram.",
    result: "Surpassed initial Q3 reach targets to engage over 250k users at an incredible 18% interaction metric."
  },
  {
    id: 4,
    title: "Mobile App Interface",
    tag: "UI/UX Design",
    imgUrl: "UI UX Design - Mobile App Interface.jpg",
    problem: "Confusing financial interface architectures led to massive registrant dropping during sensitive verification processes.",
    engineering: "Redesigned entire step-by-step verification flows using flat visual meters, real-time stage tracking, and immediate transaction feedback overlays.",
    result: "Engineered a gorgeous, user-centric mobile app interface mockup perfectly simplified and ready for scale."
  },
  {
    id: 5,
    title: "Growth Roadmap",
    tag: "Digital Strategy",
    imgUrl: "Digital Strategy - Growth Roadmap.jpg",
    problem: "The firm was burning advertising capital through disjointed marketing spend running across separate, isolated channels.",
    engineering: "Architected a unified digital growth roadmap starting from tech-stack audits straight through to multi-quarter optimization metrics.",
    result: "Successfully generated a stunning +240% increase in traffic and an exponential +312% compounding revenue loop."
  },
  {
    id: 6,
    title: "Online Store Redesign",
    tag: "E-Commerce",
    imgUrl: "E-commerce - online store redesign.jpg",
    problem: "Cluttered navigational layouts and heavy static imagery made shopping confusing for users trying to browse inventories.",
    engineering: "Implemented precise filtering parameters, built clean custom image blocks, and embedded custom visual components.",
    result: "Transformed static pages into high-speed, performance-optimized, and visually stunning sales systems."
  },
  {
    id: 7,
    title: "Business Flow Funnel",
    tag: "Business Strategy",
    imgUrl: "Business Strategy - Business Funnel.jpg",
    problem: "Manual administrative handoffs was delaying contracts and causing the sales team to lose warm, incoming client leads.",
    engineering: "Mapped out and automated secure, automated data webhooks running directly from capture through to final team delivery portals.",
    result: "Dramatically minimized operational friction while optimizing sales pipeline velocity down to a 3.5% conversion cycle."
  }
];

/* ============================================
   CUSTOM CURSOR (desktop)
   ============================================ */
const isTouch = window.matchMedia('(pointer: coarse)').matches;

if (!isTouch) {
  const ring = document.getElementById('cursorRing');
  const dot = document.getElementById('cursorDot');
  const trails = [document.getElementById('trail1'), document.getElementById('trail2'), document.getElementById('trail3'), document.getElementById('trail4')];
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  let trailPos = trails.map(() => ({ x: 0, y: 0 }));

  document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

  function setupCursorHover() {
    document.querySelectorAll('a, button, .service-card, .gallery-card-item, .orbit-card, .so-close, .action-icon').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
  }
  setupCursorHover();

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px';
    dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
    trails.forEach((trail, i) => {
      const prev = i === 0 ? { x: mouseX, y: mouseY } : trailPos[i - 1];
      trailPos[i].x += (prev.x - trailPos[i].x) * (0.25 - i * 0.04);
      trailPos[i].y += (prev.y - trailPos[i].y) * (0.25 - i * 0.04);
      trail.style.left = trailPos[i].x + 'px';
      trail.style.top = trailPos[i].y + 'px';
    });
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

/* ============================================
   LIQUID RIPPLE (water touch / wave effect)
   ============================================ */
const liquidCanvas = document.getElementById('liquidCanvas');
const lCtx = liquidCanvas.getContext('2d');
let liquidW, liquidH;
let ripples = [];

function resizeLiquid() {
  liquidW = liquidCanvas.width = window.innerWidth;
  liquidH = liquidCanvas.height = window.innerHeight;
}
resizeLiquid();
window.addEventListener('resize', resizeLiquid);

class Ripple {
  constructor(x, y, isTouchRipple = false) {
    this.x = x; this.y = y;
    this.radius = 2;
    // Massive wave effect - larger radius so letters get heavily impacted visually
    this.maxRadius = isTouchRipple ? 180 + Math.random() * 80 : 80 + Math.random() * 40;
    this.opacity = isTouchRipple ? 0.7 : 0.6;
    this.speed = isTouchRipple ? 2.5 + Math.random() * 1.5 : 1.2 + Math.random() * 0.8;
    this.isTouch = isTouchRipple;
  }
  update() {
    this.radius += this.speed;
    this.opacity -= this.isTouch ? 0.006 : 0.012;
  }
  draw(ctx) {
    if (this.opacity <= 0) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 107, 53, ${this.opacity})`;
    ctx.lineWidth = this.isTouch ? 3.5 : 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.65, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 140, 90, ${this.opacity * 0.4})`;
    ctx.lineWidth = this.isTouch ? 2.5 : 1;
    ctx.stroke();

    if (this.isTouch) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 0.35, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 180, 120, ${this.opacity * 0.25})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }
}

// Desktop mouse ripples
if (!isTouch) {
  let lastLX = 0, lastLY = 0;
  document.addEventListener('mousemove', (e) => {
    const dist = Math.hypot(e.clientX - lastLX, e.clientY - lastLY);
    if (dist > 25) {
      ripples.push(new Ripple(e.clientX, e.clientY, false));
      lastLX = e.clientX; lastLY = e.clientY;
      rippleTextSlightly(e.clientX, e.clientY);
    }
  });
}

// Mobile touch ripples — larger splash water effect
let touchRippleCount = 0;
const MAX_TOUCH_RIPPLES = 12;

document.addEventListener('touchstart', (e) => {
  for (let i = 0; i < e.touches.length; i++) {
    const t = e.touches[i];
    if (touchRippleCount < MAX_TOUCH_RIPPLES) {
      ripples.push(new Ripple(t.clientX, t.clientY, true));
      touchRippleCount++;
      rippleTextSlightly(t.clientX, t.clientY);
      // Secondary dramatic ring delay
      setTimeout(() => {
        ripples.push(new Ripple(t.clientX, t.clientY, true));
      }, 180);
    }
  }
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  for (let i = 0; i < e.touches.length; i++) {
    const t = e.touches[i];
    if (touchRippleCount < MAX_TOUCH_RIPPLES && Math.random() > 0.6) {
      ripples.push(new Ripple(t.clientX, t.clientY, true));
      touchRippleCount++;
      rippleTextSlightly(t.clientX, t.clientY);
    }
  }
}, { passive: true });

document.addEventListener('touchend', () => {
  touchRippleCount = Math.max(0, touchRippleCount - 2);
});

// Animate letters physically warping with elastic offsets when touched/passed
function rippleTextSlightly(mx, my) {
  const letters = document.querySelectorAll('.hero-title span, .mv-title, .sc-title');
  letters.forEach(el => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.hypot(mx - cx, my - cy);
    if (dist < 220) {
      const force = (220 - dist) / 220;
      const angle = Math.atan2(cy - my, cx - mx);
      const tx = Math.cos(angle) * force * 15;
      const ty = Math.sin(angle) * force * 15;
      el.style.transform = `translate(${tx}px, ${ty}px) scale(${1 + force * 0.12})`;
    } else {
      el.style.transform = '';
    }
  });
}

function animateLiquid() {
  lCtx.clearRect(0, 0, liquidW, liquidH);
  ripples = ripples.filter(r => r.opacity > 0);
  ripples.forEach(r => { r.update(); r.draw(lCtx); });
  requestAnimationFrame(animateLiquid);
}
animateLiquid();

/* ============================================
   CONSTELLATION (70 particles)
   ============================================ */
const cCanvas = document.getElementById('constellationCanvas');
const cCtx = cCanvas.getContext('2d');
let cW, cH;
const PARTICLE_COUNT = 70;
const CONNECTION_DIST = 150;
const MOUSE_REPULSE = 120;
const TOUCH_REPULSE = 180;
const TOUCH_FORCE = 6;

function resizeConstellation() {
  cW = cCanvas.width = window.innerWidth;
  cH = cCanvas.height = window.innerHeight;
}
resizeConstellation();
window.addEventListener('resize', resizeConstellation);

let mouseCX = -1000, mouseCY = -1000;
let touchPoints = [];

document.addEventListener('mousemove', (e) => { mouseCX = e.clientX; mouseCY = e.clientY; });

document.addEventListener('touchstart', (e) => {
  touchPoints = [];
  for (let i = 0; i < e.touches.length; i++) {
    touchPoints.push({ x: e.touches[i].clientX, y: e.touches[i].clientY, force: TOUCH_FORCE });
  }
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  touchPoints = [];
  for (let i = 0; i < e.touches.length; i++) {
    touchPoints.push({ x: e.touches[i].clientX, y: e.touches[i].clientY, force: TOUCH_FORCE });
  }
}, { passive: true });

document.addEventListener('touchend', () => { touchPoints = []; });

class Particle {
  constructor() {
    this.x = Math.random() * cW;
    this.y = Math.random() * cH;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.size = 1.5 + Math.random() * 2.5;
    this.baseOpacity = 0.3 + Math.random() * 0.5;
    this.opacity = this.baseOpacity;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > cW) this.vx *= -1;
    if (this.y < 0 || this.y > cH) this.vy *= -1;

    // Mouse repulsion
    const mdx = this.x - mouseCX;
    const mdy = this.y - mouseCY;
    const mDist = Math.sqrt(mdx*mdx + mdy*mdy);
    if (mDist < MOUSE_REPULSE) {
      const force = (MOUSE_REPULSE - mDist) / MOUSE_REPULSE;
      this.x += (mdx / mDist) * force * 3;
      this.y += (mdy / mDist) * force * 3;
      this.opacity = Math.min(0.9, this.baseOpacity + 0.2);
    } else {
      this.opacity += (this.baseOpacity - this.opacity) * 0.05;
    }

    // Touch repulsion
    touchPoints.forEach(tp => {
      const tdx = this.x - tp.x;
      const tdy = this.y - tp.y;
      const tDist = Math.sqrt(tdx*tdx + tdy*tdy);
      if (tDist < TOUCH_REPULSE && tDist > 0) {
        const force = (TOUCH_REPULSE - tDist) / TOUCH_REPULSE;
        this.x += (tdx / tDist) * force * tp.force;
        this.y += (tdy / tDist) * force * tp.force;
        this.opacity = Math.min(1, this.baseOpacity + 0.4);
      }
    });
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 107, 53, ${this.opacity})`;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 107, 53, ${this.opacity * 0.15})`;
    ctx.fill();
  }
}

const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

function animateConstellation() {
  cCtx.clearRect(0, 0, cW, cH);
  particles.forEach(p => { p.update(); p.draw(cCtx); });
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < CONNECTION_DIST) {
        const opacity = (1 - dist / CONNECTION_DIST) * 0.25;
        cCtx.beginPath();
        cCtx.moveTo(particles[i].x, particles[i].y);
        cCtx.lineTo(particles[j].x, particles[j].y);
        cCtx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;
        cCtx.lineWidth = 0.6;
        cCtx.stroke();
      }
    }
  }
  requestAnimationFrame(animateConstellation);
}
animateConstellation();

/* ============================================
   TEXT SCRAMBLE
   ============================================ */
class TextScramble {
  constructor(el) { this.el = el; this.chars = '!<>-_\/[]{}—=+*^?#________'; this.original = el.innerText; }
  scramble() {
    let iter = 0;
    const iv = setInterval(() => {
      this.el.innerText = this.original.split('').map((c, i) => i < iter ? this.original[i] : this.chars[Math.floor(Math.random() * this.chars.length)]).join('');
      if (iter >= this.original.length) clearInterval(iv);
      iter += 0.5;
    }, 30);
  }
}
const scrambler = new TextScramble(document.getElementById('scrambleText'));
setTimeout(() => scrambler.scramble(), 500);

/* ============================================
   HEADER SCROLL LIMIT
   ============================================ */
const header = document.getElementById('header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 50));

/* ============================================
   PARALLAX BACKGROUND
   ============================================ */
const parallaxEls = document.querySelectorAll('.parallax-element');
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.speed) || 0.3;
    el.style.transform = `translateY(${sy * speed}px)`;
  });
});

/* ============================================
   FORMING WORDS + ORBIT CARDS
   ============================================ */
const container = document.getElementById('formingContainer');
const wordEls = [];
const allOrbitCards = [];

formingWords.forEach((wd, wi) => {
  const wordEl = document.createElement('div');
  wordEl.className = `forming-word ${wd.class}`;
  wd.text.split('').forEach((ch, ci) => {
    const sp = document.createElement('span');
    sp.className = 'forming-letter';
    sp.textContent = ch;
    const ang = (ci / wd.text.length) * Math.PI * 2 + Math.random() * 0.6;
    const dist = 160 + Math.random() * 220;
    sp.style.setProperty('--tx', `${Math.cos(ang) * dist}px`);
    sp.style.setProperty('--ty', `${Math.sin(ang) * dist}px`);
    sp.style.setProperty('--rot', `${(Math.random() - 0.5) * 100}deg`);
    sp.style.setProperty('--sc', `${0.35 + Math.random() * 0.25}`);
    wordEl.appendChild(sp);
  });
  container.appendChild(wordEl);
  wordEls.push(wordEl);

  wd.cards.forEach((cd, ci) => {
    const cEl = document.createElement('div');
    cEl.className = 'orbit-card';
    cEl.innerHTML = `<span class="oc-icon">${cd.icon}</span><div class="oc-title">${cd.title}</div>`;
    cEl.dataset.wi = wi;
    cEl.dataset.ci = ci;
    container.appendChild(cEl);
    allOrbitCards.push(cEl);
  });
});

/* Progress dots initialization */
const dotsContainer = document.getElementById('progressDots');
formingWords.forEach(() => { const d = document.createElement('div'); d.className = 'progress-dot'; dotsContainer.appendChild(d); });
const dots = document.querySelectorAll('.progress-dot');

/* Orbit State Machine */
const STATE = { SCATTERED: 0, FORMING: 1, ORBITING: 2, PAUSED: 3, FADING: 4 };
let activeWord = -1;
let cardState = STATE.SCATTERED;
let orbitAngle = 0;
let pauseTimer = 0;
let fadeTimer = 0;
const ORBIT_SPEED = 0.004;
const PAUSE_FRAMES = 120;
const FADE_FRAMES = 40;

function getOrbitRadius() {
  const w = window.innerWidth;
  if (w < 380) return 115;
  if (w < 500) return 130;
  if (w < 768) return 150;
  if (w < 1024) return 190;
  return 230;
}

function getCardPositions(wordIndex, angle, isParked) {
  const cx = container.offsetWidth / 2;
  const cy = container.offsetHeight / 2;
  const r = getOrbitRadius();
  const cards = allOrbitCards.filter(c => parseInt(c.dataset.wi) === wordIndex);
  return cards.map((card, i) => {
    const baseAngle = angle + (i / cards.length) * Math.PI * 2;
    let x = cx + Math.cos(baseAngle) * r;
    let y = cy + Math.sin(baseAngle) * r;
    if (isParked) {
      const sway = Math.sin(Date.now() / 1200 + i) * 4;
      x += Math.cos(baseAngle + Math.PI/2) * sway;
      y += Math.sin(baseAngle + Math.PI/2) * sway;
    }
    return { el: card, x: x - card.offsetWidth/2, y: y - card.offsetHeight/2 };
  });
}

function updateCardPositions(wordIndex, angle, isParked) {
  getCardPositions(wordIndex, angle, isParked).forEach(p => {
    p.el.style.left = p.x + 'px';
    p.el.style.top = p.y + 'px';
  });
}

function animateOrbit() {
  if (activeWord >= 0 && activeWord < formingWords.length) {
    const cards = allOrbitCards.filter(c => parseInt(c.dataset.wi) === activeWord);
    switch (cardState) {
      case STATE.ORBITING:
        orbitAngle += ORBIT_SPEED;
        updateCardPositions(activeWord, orbitAngle, false);
        if (orbitAngle > Math.PI * 3) {
          cardState = STATE.PAUSED;
          pauseTimer = PAUSE_FRAMES;
          cards.forEach(c => c.classList.add('parked'));
        }
        break;
      case STATE.PAUSED:
        pauseTimer--;
        updateCardPositions(activeWord, orbitAngle, true);
        if (pauseTimer <= 0) {
          cardState = STATE.FADING;
          fadeTimer = FADE_FRAMES;
          cards.forEach(c => c.classList.remove('parked'));
        }
        break;
      case STATE.FADING:
        fadeTimer--;
        const fadeOut = fadeTimer / FADE_FRAMES;
        cards.forEach(c => {
          c.style.opacity = Math.max(0, fadeOut);
          c.style.transform = `scale(${0.5 + fadeOut * 0.5})`;
        });
        if (fadeTimer <= 0) {
          cards.forEach(c => { c.classList.remove('visible'); c.style.opacity = ''; c.style.transform = ''; });
          cardState = STATE.SCATTERED;
        }
        break;
    }
  }
  requestAnimationFrame(animateOrbit);
}
animateOrbit();

/* Scroll handler */
const formingSection = document.querySelector('.forming-section');
window.addEventListener('scroll', () => {
  const rect = formingSection.getBoundingClientRect();
  const sectionH = formingSection.offsetHeight - window.innerHeight;
  const progress = Math.max(0, Math.min(1, -rect.top / sectionH));
  const wordCount = formingWords.length;
  const segProgress = progress * wordCount;
  const segIndex = Math.min(Math.floor(segProgress), wordCount - 1);
  const localProg = segProgress - segIndex;

  dots.forEach((d, i) => d.classList.toggle('active', i === segIndex));

  wordEls.forEach((el, i) => {
    el.classList.remove('active', 'fade-out');
    const letters = el.querySelectorAll('.forming-letter');
    if (i < segIndex) {
      el.classList.add('fade-out');
      letters.forEach(l => l.classList.add('formed'));
    } else if (i === segIndex) {
      el.classList.add('active');
      letters.forEach((l, li) => {
        const threshold = (li + 1) / letters.length;
        if (localProg >= threshold * 0.65) l.classList.add('formed');
        else l.classList.remove('formed');
      });
    } else {
      letters.forEach(l => l.classList.remove('formed'));
    }
  });

  if (segIndex !== activeWord) {
    if (activeWord >= 0) {
      allOrbitCards.filter(c => parseInt(c.dataset.wi) === activeWord)
        .forEach(c => { c.classList.remove('visible', 'parked'); c.style.opacity = ''; c.style.transform = ''; });
    }
    activeWord = segIndex;
    orbitAngle = 0;
    cardState = STATE.SCATTERED;
  }

  if (activeWord >= 0 && cardState === STATE.SCATTERED) {
    const letters = wordEls[activeWord].querySelectorAll('.forming-letter');
    const allFormed = Array.from(letters).every(l => l.classList.contains('formed'));
    if (allFormed) {
      cardState = STATE.ORBITING;
      allOrbitCards.filter(c => parseInt(c.dataset.wi) === activeWord).forEach(c => c.classList.add('visible'));
    }
  }
});

window.addEventListener('load', () => window.dispatchEvent(new Event('scroll')));
let resizeT;
window.addEventListener('resize', () => {
  clearTimeout(resizeT);
  resizeT = setTimeout(() => {
    if (activeWord >= 0 && (cardState === STATE.ORBITING || cardState === STATE.PAUSED)) {
      updateCardPositions(activeWord, orbitAngle, cardState === STATE.PAUSED);
    }
  }, 150);
});

/* ============================================
   SERVICES GRID + 3D TILT
   ============================================ */
const servicesGrid = document.getElementById('servicesGrid');
const serviceOverlay = document.getElementById('serviceOverlay');
const soContent = document.getElementById('soContent');
const soClose = document.getElementById('soClose');

services.forEach(s => {
  const card = document.createElement('div');
  // Dynamic glow classes assigned to new services
  let pulseClass = '';
  if (s.id === 7) pulseClass = ' service-card-07';
  if (s.id === 8) pulseClass = ' service-card-08';
  
  card.className = 'service-card' + pulseClass;
  card.style.animationDelay = `${(s.id - 1) * 0.5}s`;
  card.innerHTML = `
    <div class="sc-number">0${s.id}</div>
    <div class="sc-icon" style="background: ${s.color}15; color: ${s.color};">${s.icon}</div>
    <h3 class="sc-title">${s.title}</h3>
    <p class="sc-desc">${s.shortDesc}</p>
    <div class="sc-cta">View Details →</div>
  `;
  
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    const rx = (y - cy) / cy * -12, ry = (x - cx) / cx * 12;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    card.style.setProperty('--mx', `${(x/rect.width)*100}%`);
    card.style.setProperty('--my', `${(y/rect.height)*100}%`);
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  card.addEventListener('click', () => openOverlay(s));
  servicesGrid.appendChild(card);
});

function openOverlay(service) {
  soContent.innerHTML = `
    <div class="so-header">
      <span class="so-tag">Service 0${service.id}</span>
      <h2 class="so-title">${service.title}</h2>
      <p class="so-desc">${service.fullDesc}</p>
    </div>
    <div class="so-features">
      <h4>What's Included</h4>
      <ul>${service.features.map(f => `<li>${f}</li>`).join('')}</ul>
    </div>
    <a href="https://wa.me/27826836364?text=${encodeURIComponent(service.waMsg)}" target="_blank" class="so-whatsapp">
      <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      Discuss on WhatsApp
    </a>
  `;
  serviceOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

soClose.addEventListener('click', closeOverlay);
serviceOverlay.addEventListener('click', (e) => { if (e.target === serviceOverlay) closeOverlay(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeOverlay(); });
function closeOverlay() { serviceOverlay.classList.remove('open'); document.body.style.overflow = ''; }

/* ============================================
   MISSION & VISION SCROLL ALIGNMENT & DECYPHER
   ============================================ */
const missionCard = document.getElementById('missionCard');
const visionCard = document.getElementById('visionCard');
const scrambleMission = document.getElementById('scrambleMission');
const scrambleVision = document.getElementById('scrambleVision');

const mvObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      missionCard.classList.add('collided');
      visionCard.classList.add('collided');
      
      // Trigger scramble on titles once
      if (!scrambleMission.dataset.triggered) {
        scrambleMission.dataset.triggered = "true";
        new TextScramble(scrambleMission).scramble();
      }
      if (!scrambleVision.dataset.triggered) {
        scrambleVision.dataset.triggered = "true";
        new TextScramble(scrambleVision).scramble();
      }
    }
  });
}, { threshold: 0.15 });

mvObserver.observe(document.getElementById('missionVision'));

/* ============================================
   WORK GALLERY (DYNAMICS & SCROLL)
   ============================================ */
const galleryMarqueeTrack = document.getElementById('galleryMarqueeTrack');

// Double arrays for seamless infinite carousel loop matching testimonials
const doubledProjects = [...portfolioProjects, ...portfolioProjects];

doubledProjects.forEach((p, idx) => {
  const item = document.createElement('div');
  item.className = 'gallery-card-item';
  item.innerHTML = `
    <img src="${p.imgUrl}" alt="${p.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&q=80'">
    <div class="gallery-item-overlay">
      <div class="gallery-card-tag">${p.tag}</div>
      <div class="gallery-card-title">${p.title}</div>
    </div>
  `;
  item.addEventListener('click', () => openCaseStudy(p));
  galleryMarqueeTrack.appendChild(item);
});

if (!isTouch) {
  setupCursorHover();
}

function openCaseStudy(p) {
  // Pre-fill the WhatsApp inquire text dynamically with the project title and category
  const waLink = `https://wa.me/27826836364?text=${encodeURIComponent(`Hi Thynkverse, I am interested in inquiring about your "${p.tag} - ${p.title}" project showcase. Let's discuss!`)}`;
  
  soContent.innerHTML = `
    <div class="so-header">
      <span class="so-tag">${p.tag} CASE STUDY</span>
      <h2 class="so-title">${p.title}</h2>
    </div>
    <div class="cs-detail-grid">
      <div class="cs-detail-box">
        <h5>THE PROBLEM</h5>
        <p>${p.problem}</p>
      </div>
      <div class="cs-detail-box">
        <h5>THE ENGINEERING</h5>
        <p>${p.engineering}</p>
      </div>
      <div class="cs-detail-box">
        <h5>THE RESULTS</h5>
        <p>${p.result}</p>
      </div>
    </div>
    <a href="${waLink}" target="_blank" class="so-whatsapp">
      <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      Inquire about this work
    </a>
  `;
  serviceOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
