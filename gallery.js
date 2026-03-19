// ============================================================
//  FLAGRO — COMBINED JAVASCRIPT BUNDLE
//  All modules merged in load order:
//  config → app → gallery → social → shop → admin
// ============================================================


// ============================================================
//  SECTION 1: SITE CONFIGURATION  (config.js)
//  Edit ONLY this section to change colors, text, artworks, artists
// ============================================================

const SITE = {
  name: "FLAGRO",
  tagline: "Art Collective • IISER Berhampur",
  email: "flagro@iiserberhampur.ac.in",
  copyright: "FLAGRO © 2025",
};

const COLORS = {
  background: "#F5F0E8",   // warm cream — page background
  surface:    "#E8DFD0",   // sand — card backgrounds
  text:       "#2A2A2A",   // charcoal — main text
  primary:    "#1A5C5A",   // deep teal — buttons, links
  accent:     "#C4652A",   // burnt orange — badges, buy buttons
  white:      "#FFFFFF",
};

const FONTS = {
  display: "'Playfair Display', Georgia, serif",
  body:    "'DM Sans', sans-serif",
};

const SOCIALS = [
  { platform: "Instagram", handle: "@flagro.iiserb",              color: "#E1306C" },
  { platform: "Twitter/X", handle: "@flagro_art",                 color: "#1DA1F2" },
  { platform: "Behance",   handle: "FLAGRO Portfolio",            color: "#1769FF" },
  { platform: "YouTube",   handle: "FLAGRO Studio",               color: "#FF0000" },
  { platform: "Email",     handle: "flagro@iiserberhampur.ac.in", color: "#C4652A" },
];

// To add a real image: set imageUrl to "../images/your-file.jpg"
// Leave as null to show a color placeholder
const ARTWORKS = [
  { id:1, title:"Monsoon Reverie",  artist:"Ananya Das",     desc:"Watercolor capturing the ethereal beauty of monsoon light filtering through ancient banyan trees.", category:"fine",     forSale:true,  price:2500, bgColor:"#4a6b5a", imageUrl:null },
  { id:2, title:"Pixel Dharma",     artist:"Rohan Mishra",   desc:"Digital exploration of sacred geometry meets cyberpunk aesthetics in deep indigo tones.",           category:"digital",  forSale:false, price:0,    bgColor:"#6b5a4a", imageUrl:null },
  { id:3, title:"Vanishing Coast",  artist:"Priya Sahoo",    desc:"Mixed media documentary piece on the eroding coastlines of Odisha — hope in fragments.",            category:"pictopia", forSale:true,  price:3200, bgColor:"#5a4a6b", imageUrl:null },
  { id:4, title:"Neon Tantra",      artist:"Vikram Patel",   desc:"A vibrant digital fusion of traditional tantric motifs with modern neon color palettes.",            category:"digital",  forSale:true,  price:1800, bgColor:"#4a5a6b", imageUrl:null },
  { id:5, title:"Silent Paddy",     artist:"Meera Behera",   desc:"Oil on canvas depicting the meditative stillness of rice fields at twilight.",                       category:"fine",     forSale:false, price:0,    bgColor:"#6b4a5a", imageUrl:null },
  { id:6, title:"Fragmented Self",  artist:"Aditya Mohanty", desc:"Photographic series deconstructing identity through shattered mirror compositions.",                 category:"pictopia", forSale:true,  price:4100, bgColor:"#5a6b4a", imageUrl:null },
];

// photoUrl: set to "../images/artist-name.jpg" when ready
// available: false = card shows as "Closed"
const COMMISSION_ARTISTS = [
  { id:1, name:"Aayush",       role:"Digital Artist & Illustrator",  bio:"I create vibrant digital illustrations blending traditional Indian motifs with contemporary design. Open for portraits, posters, and concept art.", artTypes:["Digital Art","Illustration","Poster Design"], email:"aayush@iiserberhampur.ac.in",  instagram:"aayush.draws",  startingPrice:500, available:true,  bgColor:"#4a6b5a", photoUrl:null },
  { id:2, name:"Ananya Das",   role:"Watercolor & Fine Artist",       bio:"Specialising in expressive watercolor paintings — landscapes, portraits, and abstract emotions. Each piece handcrafted with care.",                  artTypes:["Watercolor","Fine Art","Portrait"],          email:"ananya@iiserberhampur.ac.in",  instagram:"ananya.art",    startingPrice:800, available:true,  bgColor:"#6b5a4a", photoUrl:null },
  { id:3, name:"Rohan Mishra", role:"Digital & Concept Artist",       bio:"From cyberpunk cityscapes to sacred geometry — I bring bold ideas to life. Available for album covers, merch design, and concept art.",               artTypes:["Digital Art","Concept Art","Album Covers"],  email:"rohan@iiserberhampur.ac.in",   instagram:"rohan.pixels",  startingPrice:600, available:false, bgColor:"#5a4a6b", photoUrl:null },
  { id:4, name:"Priya Sahoo",  role:"Mixed Media & Pictopia Artist",  bio:"I tell visual stories through mixed media and comic-style art. Open for editorial illustrations, zines, and documentary pieces.",                     artTypes:["Mixed Media","Pictopia","Editorial"],        email:"priya@iiserberhampur.ac.in",   instagram:"priya.frames",  startingPrice:700, available:true,  bgColor:"#4a5a6b", photoUrl:null },
];

const TRANSACTIONS = [
  { id:1, artwork:"Monsoon Reverie", artist:"Ananya Das",   amount:2500, date:"12 Mar 2025" },
  { id:2, artwork:"Vanishing Coast", artist:"Priya Sahoo",  amount:3200, date:"08 Mar 2025" },
  { id:3, artwork:"Neon Tantra",     artist:"Vikram Patel", amount:1800, date:"01 Mar 2025" },
];


// ============================================================
//  SECTION 2: MAIN APP LOGIC  (app.js)
//  Handles navigation, carousel, page rendering
// ============================================================

// ── STATE ────────────────────────────────────────────────────
let currentPage  = 'gallery';
let activeFilter = 'all';
let cfIndex      = 0;
let cfDragging   = false;
let cfStartX     = 0;
let cfLastX      = 0;
let cfVelocity   = 0;

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  buildNav();
  buildSidebar();
  navigateTo('gallery');
});

// Apply COLORS and SITE config to CSS variables & DOM
function applyConfig() {
  const root = document.documentElement;
  Object.entries(COLORS).forEach(([k, v]) => root.style.setProperty(`--color-${k}`, v));
  document.body.style.background = COLORS.background;
  document.body.style.color      = COLORS.text;
  document.getElementById('header-title').textContent   = SITE.name;
  document.getElementById('header-tagline').textContent = SITE.tagline;
}

// ── NAVIGATION ───────────────────────────────────────────────
function navigateTo(page) {
  currentPage = page;
  const content = document.getElementById('page-content');
  content.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'page-enter';

  switch (page) {
    case 'gallery': wrapper.innerHTML = renderGallery(); break;
    case 'social':  wrapper.innerHTML = renderSocial();  break;
    case 'shop':    wrapper.innerHTML = renderShop();    break;
    case 'admin':   wrapper.innerHTML = renderAdmin();   break;
  }

  content.appendChild(wrapper);
  content.scrollTop = 0;
  updateNav();

  // Post-render setup
  if (page === 'gallery') {
    renderZigzag();
    initCarousel();
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function updateNav() {
  // Bottom nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    const isActive = btn.dataset.page === currentPage;
    btn.classList.toggle('active', isActive);
    btn.style.background = isActive ? COLORS.primary : 'transparent';
    btn.style.color      = isActive ? COLORS.white   : COLORS.text;
  });
  // Desktop sidenav buttons
  document.querySelectorAll('.sidenav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === currentPage);
  });
}

// ── NAV & SIDEBAR ─────────────────────────────────────────────
function buildNav() {
  const nav = document.getElementById('bottom-nav');
  const items = [
    { page:'gallery', label:'Gallery',  icon:'M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zm6 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5zM4 11a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4zm6 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4z' },
    { page:'social',  label:'Social',   icon:'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
    { page:'shop',    label:'Shop',     icon:'M6 2L3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6l-3-4H6zm0 2h12l2 2.67H4L6 4zm1 5h2v3h6V9h2v5H7V9z' },
    { page:'admin',   label:'Admin',    icon:'M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.32.07-.64.07-.98s-.03-.67-.07-1l2.16-1.63c.19-.15.24-.42.12-.64l-2.05-3.55c-.12-.22-.39-.3-.61-.22l-2.55 1.03c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98L4.9 5.01c-.22-.08-.49 0-.61.22L2.24 8.78c-.13.22-.07.49.12.64L4.52 11c-.05.33-.08.67-.08 1s.03.66.08.98l-2.16 1.65c-.19.15-.24.42-.12.64l2.05 3.55c.12.22.39.3.61.22l2.55-1.02c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.55 1.02c.22.08.49 0 .61-.22l2.05-3.55c.12-.22.07-.49-.12-.64l-2.16-1.65z' },
  ];
  nav.innerHTML = items.map(item => `
    <button class="nav-btn" data-page="${item.page}" onclick="navigateTo('${item.page}')">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="${item.icon}"/></svg>
      <span>${item.label}</span>
    </button>
  `).join('');
}

function buildSidebar() {
  document.getElementById('sidebar-panel').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <span class="sidebar-title">${SITE.name}</span>
      <button onclick="closeSidebar()" style="width:32px;height:32px;border-radius:50%;border:none;background:rgba(255,255,255,0.1);cursor:pointer;color:#F5F0E8;font-size:18px;">✕</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;">
      <button class="sidebar-link" onclick="navigateTo('gallery');closeSidebar()">🖼️ Gallery</button>
      <button class="sidebar-link" onclick="navigateTo('social');closeSidebar()">📱 Social & Contact</button>
      <button class="sidebar-link" onclick="navigateTo('shop');closeSidebar()">🛒 Buy & Commission Art</button>
      <button class="sidebar-link" onclick="navigateTo('admin');closeSidebar()">⚙️ Admin Panel</button>
    </div>
    <p class="sidebar-footer">${SITE.copyright}</p>
  `;
}

function openSidebar() {
  document.getElementById('sidebar-overlay').classList.add('open');
  document.getElementById('sidebar-panel').classList.add('open');
}
function closeSidebar() {
  document.getElementById('sidebar-overlay').classList.remove('open');
  document.getElementById('sidebar-panel').classList.remove('open');
}

// ── TOAST ────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

// ── HELPERS ──────────────────────────────────────────────────
function formatINR(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

// ── COVERFLOW CAROUSEL ───────────────────────────────────────
const CF_CARDS = [
  { offset:-2, w:62,  h:95,  op:0.45, ry: 65, tx:-190 },
  { offset:-1, w:88,  h:130, op:0.78, ry: 35, tx:-108 },
  { offset: 0, w:120, h:170, op:1.00, ry:  0, tx:   0 },
  { offset: 1, w:88,  h:130, op:0.78, ry:-35, tx: 108 },
  { offset: 2, w:62,  h:95,  op:0.45, ry:-65, tx: 190 },
];

function mod(n, m) { return ((n % m) + m) % m; }

function initCarousel() {
  renderCarousel();
  renderDots();

  const stage = document.getElementById('carousel-stage');
  if (!stage) return;

  stage.addEventListener('pointerdown', e => {
    cfDragging = true; cfStartX = e.clientX; cfLastX = e.clientX; cfVelocity = 0;
    stage.setPointerCapture(e.pointerId);
    document.querySelectorAll('.cf-card').forEach(c => c.classList.add('is-dragging'));
  });
  stage.addEventListener('pointermove', e => {
    if (!cfDragging) return;
    cfVelocity = e.clientX - cfLastX;
    cfLastX = e.clientX;
    updateCarouselDrag(e.clientX - cfStartX);
  });
  stage.addEventListener('pointerup',     snapCarousel);
  stage.addEventListener('pointercancel', snapCarousel);
}

function renderCarousel() {
  const stage = document.getElementById('carousel-stage');
  if (!stage) return;
  const N = ARTWORKS.length;
  stage.innerHTML = CF_CARDS.map(cfg => {
    const idx = mod(cfIndex + cfg.offset, N);
    const art = ARTWORKS[idx];
    const isCenter = cfg.offset === 0;
    return `
      <div class="cf-card" data-offset="${cfg.offset}"
        style="width:${cfg.w}px;height:${cfg.h}px;
               background:linear-gradient(145deg,${art.bgColor},${art.bgColor}bb);
               opacity:${cfg.op};z-index:${10 - Math.abs(cfg.offset)};
               transform:translateX(${cfg.tx}px) rotateY(${cfg.ry}deg);
               box-shadow:${isCenter ? '0 12px 40px rgba(0,0,0,0.25)' : '0 4px 16px rgba(0,0,0,0.12)'};"
        onclick="cfCardClick(${cfg.offset})">
        ${isCenter ? `
          <div class="cf-card-overlay"></div>
          <div class="cf-card-label">
            <h3>${art.title}</h3>
            <p>${art.artist}</p>
          </div>` : ''}
      </div>`;
  }).join('');
}

function updateCarouselDrag(drag) {
  document.querySelectorAll('.cf-card').forEach((card, i) => {
    const cfg = CF_CARDS[i];
    const dragFactor = cfg.offset === 0 ? 0.1 : 0.05 * Math.sign(cfg.offset);
    const liveTx = cfg.tx + drag * dragFactor;
    const liveRy = cfg.ry + drag * (cfg.offset !== 0 ? cfg.offset * -0.12 : 0);
    card.style.transform = `translateX(${liveTx}px) rotateY(${liveRy}deg)`;
  });
}

function snapCarousel() {
  if (!cfDragging) return;
  cfDragging = false;
  document.querySelectorAll('.cf-card').forEach(c => c.classList.remove('is-dragging'));
  const drag = cfLastX - cfStartX;
  if (Math.abs(drag) > 40 || Math.abs(cfVelocity) > 1.5) {
    cfIndex = mod(cfIndex + (drag < 0 ? 1 : -1), ARTWORKS.length);
  }
  renderCarousel();
  renderDots();
}

function cfCardClick(offset) {
  if (offset === 0) return;
  cfIndex = mod(cfIndex + offset, ARTWORKS.length);
  renderCarousel();
  renderDots();
}

function renderDots() {
  const dots = document.getElementById('carousel-dots');
  if (!dots) return;
  dots.innerHTML = ARTWORKS.map((_, i) =>
    `<div class="dot ${i === cfIndex ? 'active' : ''}" onclick="cfJump(${i})"></div>`
  ).join('');
}

function cfJump(i) { cfIndex = i; renderCarousel(); renderDots(); }

// ── BUY BUTTON (legacy inline handler) ───────────────────────
function buyArtwork(btn, title) {
  btn.textContent = '✓ Purchased';
  btn.classList.add('bought');
  showToast(`"${title}" added to your collection ✨`);
}


// ============================================================
//  SECTION 3: GALLERY PAGE  (gallery.js + pages.js gallery)
// ============================================================

const FILTERS = [
  { key: 'all',      label: 'All Works'   },
  { key: 'digital',  label: 'Digital Art' },
  { key: 'fine',     label: 'Fine Arts'   },
  { key: 'pictopia', label: 'Pictopia'    },
];

function renderGallery() {
  const pillsHTML = FILTERS.map(f =>
    `<button class="pill ${activeFilter === f.key ? 'active' : ''}"
      data-key="${f.key}" onclick="setFilter('${f.key}')"
      style="background:${activeFilter === f.key ? COLORS.primary : COLORS.surface};
             color:${activeFilter === f.key ? COLORS.white : COLORS.text};">
      ${f.label}
    </button>`
  ).join('');

  return `
    <div id="carousel-stage"></div>
    <div id="carousel-dots"></div>
    <div id="filter-pills">${pillsHTML}</div>
    <div id="artwork-rows"></div>
  `;
}

function renderZigzag() {
  const container = document.getElementById('artwork-rows');
  if (!container) return;

  const filtered = activeFilter === 'all'
    ? ARTWORKS
    : ARTWORKS.filter(a => a.category === activeFilter);

  if (filtered.length === 0) {
    container.innerHTML = `<p style="text-align:center;opacity:0.4;margin-top:32px;font-size:14px;">No artworks in this category yet.</p>`;
    return;
  }

  container.innerHTML = filtered.map((art, i) => {
    const isOdd = i % 2 === 0;
    const imgContent = art.imageUrl
      ? `<img src="${art.imageUrl}" alt="${art.title}">`
      : `<div class="art-placeholder-bg" style="background:linear-gradient(145deg,${art.bgColor},${art.bgColor}bb);width:100%;height:100%;"></div>`;

    return `
      <div class="zigzag-row ${isOdd ? '' : 'reverse'}" style="animation-delay:${i * 0.07}s;">
        <div class="art-img-block" style="background:${art.bgColor};">
          ${imgContent}
          ${art.forSale ? '<div class="for-sale-badge">⭐ For Sale</div>' : ''}
        </div>
        <div class="art-text-block">
          <p class="art-category">${art.category}</p>
          <h3 class="art-title">${art.title}</h3>
          <p class="art-artist">${art.artist}</p>
          <p class="art-desc">${art.desc}</p>
          ${art.forSale ? `<p class="art-price">${formatINR(art.price)}</p>` : ''}
        </div>
      </div>`;
  }).join('');
}

function setFilter(key) {
  activeFilter = key;
  document.querySelectorAll('.pill').forEach(p => {
    const isActive = p.dataset.key === key;
    p.classList.toggle('active', isActive);
    p.style.background = isActive ? COLORS.primary : COLORS.surface;
    p.style.color      = isActive ? COLORS.white   : COLORS.text;
  });
  renderZigzag();
}


// ============================================================
//  SECTION 4: SOCIAL PAGE  (social.js + pages.js social)
// ============================================================

function renderSocial() {
  const socialsHTML = SOCIALS.map(s => `
    <a href="#" class="social-card" onclick="event.preventDefault();showToast('Opening ${s.platform}...')">
      <div class="social-icon-wrap" style="background:${s.color}22;">
        <i data-lucide="${s.icon || 'link'}" style="color:${s.color};"></i>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="${s.color}"><circle cx="12" cy="12" r="10"/></svg>
      </div>
      <div class="social-info">
        <p class="social-platform">${s.platform}</p>
        <p class="social-handle">${s.handle}</p>
      </div>
      <svg style="margin-left:auto;opacity:0.3;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
      </svg>
    </a>`).join('');

  return `
    <div class="social-page page-enter">

      <section style="margin-bottom:32px;">
        <h2 class="social-heading">Connect with Us</h2>
        <p class="social-sub">Follow our creative journey across platforms</p>
        <div class="social-list">${socialsHTML}</div>
      </section>

      <section>
        <h2 class="contact-heading">Get in Touch</h2>
        <p class="contact-sub">Questions, collabs, or just want to say hi?</p>

        <div class="form-success" id="form-success">
          ✓ Message sent! We'll get back to you soon.
        </div>

        <form class="contact-form" onsubmit="handleContactSubmit(event)">
          <input  class="form-input"    type="text"  placeholder="Your Name"      required />
          <input  class="form-input"    type="email" placeholder="Email Address"  required />
          <textarea class="form-input form-textarea" rows="4" placeholder="Your message..." required></textarea>
          <button class="submit-btn" type="submit">Send Message →</button>
        </form>
      </section>

    </div>`;
}

function handleContactSubmit(e) {
  e.preventDefault();
  const success = document.getElementById('form-success');
  if (success) {
    success.classList.add('show');
    e.target.reset();
    setTimeout(() => success.classList.remove('show'), 3500);
  }
}

// Legacy handler (pages.js compat)
function submitContact() {
  const name  = document.getElementById('contact-name')?.value.trim();
  const email = document.getElementById('contact-email')?.value.trim();
  const msg   = document.getElementById('contact-msg')?.value.trim();
  if (!name || !email || !msg) { showToast('Please fill all fields'); return; }
  document.getElementById('contact-success').style.display = 'block';
  document.getElementById('contact-name').value  = '';
  document.getElementById('contact-email').value = '';
  document.getElementById('contact-msg').value   = '';
}


// ============================================================
//  SECTION 5: SHOP PAGE  (shop.js + pages.js shop)
// ============================================================

const purchasedIds = new Set();

function renderShop() {
  const forSale     = ARTWORKS.filter(a => a.forSale);
  const available   = COMMISSION_ARTISTS.filter(a => a.available);
  const unavailable = COMMISSION_ARTISTS.filter(a => !a.available);

  const shopGrid = forSale.map(art => buildShopCard(art)).join('');

  const txHTML = TRANSACTIONS.map(tx => `
    <div class="tx-row">
      <div>
        <p class="tx-artwork">${tx.artwork}</p>
        <p class="tx-meta">${tx.artist} · ${tx.date}</p>
      </div>
      <p class="tx-amount">${formatINR(tx.amount)}</p>
    </div>`).join('');

  return `
    <div class="shop-page page-enter">

      <!-- BUY MY ART -->
      <section>
        <div class="shop-section-header">
          <div>
            <h2 class="shop-section-title">Buy My Art</h2>
            <p class="shop-section-sub">Support student artists directly</p>
          </div>
          <button class="add-btn" onclick="showToast('Add artwork — connect your backend here')">+ Add</button>
        </div>

        <div class="artwork-grid">${shopGrid}</div>

        <h3 class="tx-title">Transaction History</h3>
        <div>${txHTML}</div>
      </section>

      <!-- DIVIDER -->
      <div class="section-divider"></div>

      <!-- COMMISSION ART -->
      <section>
        <h2 class="shop-section-title">Commission Art</h2>
        <p class="shop-section-sub">Connect directly with our artists to create something unique</p>

        <div class="how-it-works">
          ${[['1','Browse artists'],['2','Email or DM them'],['3','Receive your art']].map(([n, l]) =>
            `<div class="how-step"><span class="how-step-num">${n}</span><span class="how-step-label">${l}</span></div>`
          ).join('')}
        </div>

        <p class="artists-label">Available Now</p>
        <div class="artist-list">
          ${available.map(a => buildArtistCard(a)).join('')}
        </div>

        ${unavailable.length > 0 ? `
          <p class="artists-label closed">Currently Closed</p>
          <div class="artist-list closed">
            ${unavailable.map(a => buildArtistCard(a)).join('')}
          </div>` : ''}
      </section>

    </div>`;
}

function buildShopCard(art) {
  const bought = purchasedIds.has(art.id);
  const imgContent = art.imageUrl
    ? `<img src="${art.imageUrl}" alt="${art.title}" style="width:100%;height:100%;object-fit:cover;" />`
    : `<div style="width:100%;height:100%;background:linear-gradient(145deg,${art.bgColor},${art.bgColor}aa);"></div>`;

  return `
    <div class="shop-card">
      <div class="shop-card-img">${imgContent}</div>
      <div class="shop-card-body">
        <p class="shop-card-title">${art.title}</p>
        <p class="shop-card-artist">${art.artist}</p>
        <p class="shop-card-price">${formatINR(art.price)}</p>
        <button class="buy-btn ${bought ? 'bought' : ''}"
          onclick="handleBuy(${art.id})" ${bought ? 'disabled' : ''}>
          ${bought ? '✓ Purchased' : 'Buy →'}
        </button>
      </div>
    </div>`;
}

function handleBuy(id) {
  purchasedIds.add(id);
  document.getElementById('page-content').innerHTML = renderShop();
  if (typeof lucide !== 'undefined') lucide.createIcons();
  showToast('Added to purchases! ✨');
}

function buildArtistCard(artist) {
  const photoContent = artist.photoUrl
    ? `<img src="${artist.photoUrl}" alt="${artist.name}" style="width:100%;height:100%;object-fit:cover;object-position:top;" />`
    : `<span class="artist-initial">${artist.name.charAt(0)}</span>`;

  const tags = artist.artTypes.map(t => `<span class="art-tag">${t}</span>`).join('');

  return `
    <div class="artist-card">
      <div class="availability-badge ${artist.available ? 'open' : 'closed'}">
        ● ${artist.available ? 'Open' : 'Closed'}
      </div>

      <div class="artist-banner" style="background:linear-gradient(145deg,${artist.bgColor},${artist.bgColor}99);">
        ${photoContent}
        <div class="artist-banner-fade"></div>
      </div>

      <div class="artist-body">
        <h3 class="artist-name">${artist.name}</h3>
        <p class="artist-role">${artist.role}</p>
        <p class="artist-bio">${artist.bio}</p>
        <div class="art-tags">${tags}</div>
        <p class="artist-price">Starting from ${formatINR(artist.startingPrice)}</p>

        <div class="artist-contact-btns">
          <a href="mailto:${artist.email}"
            class="contact-btn email ${!artist.available ? 'disabled' : ''}">
            ✉ Email
          </a>
          <a href="https://instagram.com/${artist.instagram.replace('@', '')}"
            target="_blank" rel="noopener" class="contact-btn instagram">
            📷 Instagram
          </a>
        </div>
      </div>
    </div>`;
}


// ============================================================
//  SECTION 6: ADMIN PAGE  (admin.js + pages.js admin)
// ============================================================

let adminArtworks = [...ARTWORKS];

function renderAdmin() {
  const uniqueArtists = new Set(adminArtworks.map(a => a.artist)).size;

  const manageItems = adminArtworks.map(art => `
    <div class="manage-item" id="manage-${art.id}">
      <div class="manage-swatch" style="background:linear-gradient(145deg,${art.bgColor},${art.bgColor}aa);"></div>
      <div>
        <p class="manage-title">${art.title}</p>
        <p class="manage-meta">${art.artist} · ${art.category}</p>
      </div>
      <button class="delete-btn" onclick="deleteItem(${art.id})" title="Remove">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${COLORS.accent}" stroke-width="2">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
        </svg>
      </button>
    </div>`).join('');

  return `
    <div style="padding:16px 20px 32px;">
      <h2 class="section-heading" style="margin-bottom:16px;">Admin Panel</h2>

      <!-- Stats -->
      <div class="stats-row">
        <div class="stat-card">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${COLORS.primary}" style="margin:0 auto;">
            <rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/>
            <rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>
          </svg>
          <p class="stat-num" id="stat-artworks">${adminArtworks.length}</p>
          <p class="stat-label">Total Artworks</p>
        </div>
        <div class="stat-card">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${COLORS.accent}" style="margin:0 auto;">
            <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
          <p class="stat-num">${uniqueArtists}</p>
          <p class="stat-label">Total Artists</p>
        </div>
        <div class="stat-card">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#C4652A" style="margin:0 auto;">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3" stroke="#fff" stroke-width="2" fill="none"/>
          </svg>
          <p class="stat-num" id="pending-count">2</p>
          <p class="stat-label">Pending</p>
        </div>
      </div>

      <!-- Action buttons -->
      <button class="admin-btn" onclick="showToast('Add artwork form — connect your backend here')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        Add New Artwork
      </button>
      <button class="admin-btn" onclick="showToast('User management — connect your backend here')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
        Manage Users
      </button>
      <button class="admin-btn" onclick="approveAll()" style="margin-bottom:20px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
        Approve Listings (<span id="pending-inline">2</span>)
      </button>

      <!-- Manage artworks -->
      <h3 style="font-family:'Playfair Display',serif;font-size:17px;font-weight:700;margin:0 0 12px;">
        Manage Artworks
      </h3>
      <div id="manage-list">${manageItems}</div>

      <!-- Preview toggle -->
      <div class="toggle-row" style="margin-top:20px;">
        <div>
          <p class="toggle-label">Preview Mode</p>
          <p class="toggle-sub">See site as a visitor</p>
        </div>
        <button class="toggle-switch" id="preview-toggle" onclick="togglePreview(this)">
          <div class="toggle-knob"></div>
        </button>
      </div>
    </div>`;
}

function deleteItem(id) {
  adminArtworks = adminArtworks.filter(a => a.id !== id);
  document.getElementById(`manage-${id}`)?.remove();
  const statEl = document.getElementById('stat-artworks');
  if (statEl) statEl.textContent = adminArtworks.length;
  showToast('Artwork removed');
}

// Legacy alias used by admin.js's deleteArtwork
function deleteArtwork(id) { deleteItem(id); }

function approveAll() {
  document.getElementById('pending-count').textContent  = '0';
  document.getElementById('pending-inline').textContent = '0';
  showToast('All listings approved ✓');
}

function togglePreview(btn) {
  btn.classList.toggle('on');
  showToast(btn.classList.contains('on') ? 'Preview mode ON' : 'Preview mode OFF');
}
