/* =============================================
   Flagro_HomePage — script.js
   ============================================= */

// =============================================
// TAILWIND CONFIG
// =============================================
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'terra':       '#C8745A',
        'terra-soft':  '#D6A190',
        'olive':       '#8FA47C',
        'bark':        '#2B1F1B',
        'beige':       '#F5F3EF',
        'beige-dark':  '#E8DED2',
        'footer-bg':   '#161212',
        'muted':       '#6B6B6B'
      },
      fontFamily: {
        'heading': ['"Playfair Display"', 'serif'],
        'body':    ['"DM Sans"', 'sans-serif']
      }
    }
  }
};


// =============================================
// SLIDER
// =============================================
const sliderImages = [
  'linear-gradient(135deg, #C8745A 0%, #8FA47C 100%)',
  'linear-gradient(135deg, #2B1F1B 0%, #5A4A42 100%)',
  'linear-gradient(135deg, #D6A190 0%, #8FA47C 100%)',
  'linear-gradient(135deg, #8FA47C 0%, #C8745A 100%)',
  'linear-gradient(135deg, #5A4A42 0%, #2B1F1B 100%)'
];

let currentSlide = 0;

function initSlider() {
  const track = document.getElementById('sliderTrack');
  const dotsContainer = document.getElementById('sliderDots');

  sliderImages.forEach((img, idx) => {
    // Slide element
    const slide = document.createElement('div');
    slide.style.width      = '100%';
    slide.style.height     = '100%';
    slide.style.background = img;
    slide.style.position   = 'absolute';
    slide.style.top        = '0';
    slide.style.left       = '0';
    slide.style.opacity    = idx === 0 ? '1' : '0';
    slide.style.transition = 'opacity 0.6s ease';
    slide.dataset.slide    = idx;
    track.appendChild(slide);

    // Dot element
    const dot = document.createElement('button');
    dot.style.width        = '10px';
    dot.style.height       = '10px';
    dot.style.borderRadius = '50%';
    dot.style.background   = idx === 0 ? 'white' : 'rgba(255,255,255,0.5)';
    dot.style.border       = 'none';
    dot.style.cursor       = 'pointer';
    dot.style.transition   = 'background 0.3s ease';
    dot.onclick = () => goToSlide(idx);
    dotsContainer.appendChild(dot);
  });
}

function goToSlide(n) {
  currentSlide = n;
  const slides = document.querySelectorAll('#sliderTrack div');
  const dots   = document.querySelectorAll('#sliderDots button');

  slides.forEach(s => s.style.opacity = '0');
  dots.forEach(d => d.style.background = 'rgba(255,255,255,0.5)');

  slides[currentSlide].style.opacity = '1';
  dots[currentSlide].style.background = 'white';
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % sliderImages.length;
  goToSlide(currentSlide);
}

// Auto-advance slider on mouse move over hero
document.addEventListener('mousemove', (e) => {
  const hero = document.querySelector('header');
  const rect = hero.getBoundingClientRect();
  if (e.clientY < rect.bottom) {
    if (!window.sliderActive) {
      window.sliderActive = true;
      setInterval(nextSlide, 4000);
    }
  }
});


// =============================================
// DATA
// =============================================
const galleryItems = [
  { cat: 'fine',    hue: 'linear-gradient(135deg, #C8745A, #D6A190)', title: 'Golden Hour',  artist: 'Maya Chen' },
  { cat: 'photo',   hue: 'linear-gradient(135deg, #8FA47C, #B8C9A3)', title: 'Urban Light',  artist: 'Leo Park'  },
  { cat: 'digital', hue: 'linear-gradient(135deg, #2B1F1B, #5A4A42)', title: 'Neon Dreams',  artist: 'Aria Ross' },
  { cat: 'graphic', hue: 'linear-gradient(135deg, #D6A190, #E8DED2)', title: 'Type Play',    artist: 'Sam Lee'   },
  { cat: 'fine',    hue: 'linear-gradient(135deg, #8FA47C, #C8745A)', title: 'Still Life',   artist: 'Priya Nair'}
];

const eventItems = [
  { color: '#C8745A', title: 'Spring Exhibition',  date: 'Mar 15, 2024', desc: 'Annual showcase of emerging artists',          img: 'linear-gradient(135deg, #C8745A 0%, #D6A190 100%)' },
  { color: '#8FA47C', title: 'Plein Air Workshop',  date: 'Apr 02, 2024', desc: 'Outdoor painting in the botanical garden',     img: 'linear-gradient(135deg, #8FA47C 0%, #B8C9A3 100%)' },
  { color: '#2B1F1B', title: 'Digital Art Night',   date: 'Apr 18, 2024', desc: 'Explore creative coding and generative art',   img: 'linear-gradient(135deg, #2B1F1B 0%, #5A4A42 100%)' },
  { color: '#D6A190', title: 'Gallery Opening',     date: 'May 05, 2024', desc: 'New member works debut exhibition',            img: 'linear-gradient(135deg, #D6A190 0%, #C8745A 100%)' },
  { color: '#C8745A', title: 'Portrait Session',    date: 'May 22, 2024', desc: 'Live model drawing and techniques',            img: 'linear-gradient(135deg, #C8745A 0%, #8FA47C 100%)' },
  { color: '#8FA47C', title: 'Art Fair',            date: 'Jun 10, 2024', desc: 'Community art market and networking',          img: 'linear-gradient(135deg, #8FA47C 0%, #2B1F1B 100%)' }
];

const teamMembers = [
  { name: 'Elena Voss',   role: 'Creative Director', color: '#C8745A', initials: 'EV' },
  { name: 'Marcus Reed',  role: 'Lead Curator',      color: '#8FA47C', initials: 'MR' },
  { name: 'Sofia Lin',    role: 'Events Manager',    color: '#2B1F1B', initials: 'SL' },
  { name: 'David Okafor', role: 'Community Lead',    color: '#D6A190', initials: 'DO' }
];

const newsItems = [
  { title: 'Spring Exhibition Opens', badge: 'Exhibition',   date: 'March 15, 2024', desc: 'Join us for our most vibrant showcase yet.'        },
  { title: 'New Artist Residency',    badge: 'Announcement', date: 'March 8, 2024',  desc: 'Applications now open for summer program.'         },
  { title: 'Digital Art Workshop',    badge: 'Event',        date: 'April 2, 2024',  desc: 'Learn cutting-edge digital techniques.'             }
];

const contactCards = [
  { icon: 'mail',      label: 'Email',     value: 'flagroartclub@iiserbpr.ac.in',       link: 'mailto:flagroartclub@iiserbpr.ac.in' },
  { icon: 'instagram', label: 'Instagram', value: 'flagro_iiserbpr',            link: 'https://www.instagram.com/flagro_iiserbpr?igsh=MWNkejVqMnVpNjBveg=='                        },
  { icon: 'map-pin',   label: 'Location',  value: 'Arts Building, Room 204', link: '#'                        }
];

const Colors = ['#C8745A', '#8FA47C', '#E8DED2', '#2B1F1B', '#D6A190', '#8FA47C'];


// =============================================
// RENDER FUNCTIONS
// =============================================

function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';

  galleryItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'gallery-item cursor-pointer';
    card.style.borderRadius = '16px';
    card.style.overflow     = 'hidden';
    card.style.boxShadow    = '0 12px 30px rgba(0,0,0,0.06)';
    card.innerHTML = `
      <div style="height:200px; background:${item.hue}; position:relative;">
        <div style="position:absolute; bottom:0; left:0; right:0; padding:12px; background:linear-gradient(transparent, rgba(0,0,0,0.4));">
          <p class="font-heading text-white" style="font-size:14px; font-weight:600;">${item.title}</p>
          <p class="font-body text-white/70" style="font-size:11px;">${item.artist}</p>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderEvents() {
  const track = document.getElementById('eventsTrack');
  track.innerHTML = '';

  eventItems.forEach(ev => {
    const card = document.createElement('div');
    card.className        = 'snap-card event-card flex-shrink-0';
    card.style.width      = '260px';
    card.style.borderRadius = '16px';
    card.style.background = 'white';
    card.style.boxShadow  = '0 12px 30px rgba(0,0,0,0.06)';
    card.style.overflow   = 'hidden';
    card.style.display    = 'flex';
    card.style.flexDirection = 'column';
    card.innerHTML = `
      <div style="width:100%; height:120px; background:${ev.img};"></div>
      <div style="padding:16px;">
        <span class="font-body text-muted" style="font-size:12px; letter-spacing:1px; text-transform:uppercase;">${ev.date}</span>
        <h3 class="font-heading text-bark mt-2" style="font-size:16px; font-weight:600;">${ev.title}</h3>
        <p class="font-body text-muted mt-2" style="font-size:13px; line-height:1.5;">${ev.desc}</p>
        <div class="mt-3">
          <span class="font-body text-terra text-sm font-medium cursor-pointer hover:underline">Learn more →</span>
        </div>
      </div>
    `;
    track.appendChild(card);
  });
}

function renderTeam() {
  const grid = document.getElementById('teamGrid');
  grid.innerHTML = '';

  teamMembers.forEach(m => {
    const card = document.createElement('div');
    card.className        = 'text-center';
    card.style.position   = 'relative';
    card.innerHTML = `
      <div class="avatar-circle absolute left-1/2"
        style="transform:translateX(-50%); top:-50px; z-index:10;
               background:${m.color}; display:flex; align-items:center; justify-content:center;">
        <span class="font-heading font-bold text-white" style="font-size:22px;">${m.initials}</span>
      </div>
      <div class="blob-card" style="height:120px; background:${m.color}; margin-bottom:30px;"></div>
      <h3 class="font-heading text-bark" style="font-size:18px; font-weight:600;">${m.name}</h3>
      <p class="font-body text-muted mt-1" style="font-size:14px;">${m.role}</p>
    `;
    grid.appendChild(card);
  });
}

function renderNews() {
  const grid = document.getElementById('newsGrid');
  grid.innerHTML = '';

  newsItems.forEach(item => {
    const card = document.createElement('div');
    card.className        = 'news-card';
    card.style.background = 'white';
    card.style.borderRadius = '14px';
    card.style.padding    = '20px';
    card.style.height     = '170px';
    card.style.boxShadow  = '0 12px 30px rgba(0,0,0,0.06)';
    card.style.display    = 'flex';
    card.style.flexDirection = 'column';

    const badgeColors = { Exhibition: '#C8745A', Announcement: '#8FA47C', Event: '#2B1F1B' };
    const badgeColor  = badgeColors[item.badge] || '#C8745A';

    card.innerHTML = `
      <span class="font-body text-white text-xs font-semibold"
        style="background:${badgeColor}; padding:4px 12px; border-radius:999px; width:fit-content; margin-bottom:10px;">
        ${item.badge}
      </span>
      <h3 class="font-heading text-bark" style="font-size:16px; font-weight:600;">${item.title}</h3>
      <p class="font-body text-muted mt-2 flex-1" style="font-size:13px; line-height:1.5;">${item.desc}</p>
      <p class="font-body text-muted text-xs" style="font-size:12px; margin-top:auto;">${item.date}</p>
    `;
    grid.appendChild(card);
  });
}

function renderContactCards() {
  const grid = document.getElementById('contactCardsGrid');
  grid.innerHTML = '';

  contactCards.forEach(card => {
    const div = document.createElement('div');
    div.className = 'contact-card';
    div.style.background     = '#E8DED2';
    div.style.borderRadius   = '14px';
    div.style.padding        = '24px';
    div.style.height         = '120px';
    div.style.display        = 'flex';
    div.style.flexDirection  = 'column';
    div.style.alignItems     = 'center';
    div.style.justifyContent = 'center';
    div.style.textAlign      = 'center';
    div.innerHTML = `
      <i data-lucide="${card.icon}" style="width:28px; height:28px; color:#C8745A; margin-bottom:8px;"></i>
      <p class="font-body text-bark font-semibold" style="font-size:13px; letter-spacing:0.5px; text-transform:uppercase;">${card.label}</p>
      <p class="font-body text-bark mt-2" style="font-size:14px; font-weight:500;">${card.value}</p>
    `;
    grid.appendChild(div);
  });

  lucide.createIcons();
}

function renderStrip() {
  const strip = document.getElementById('instagramStrip');
  strip.innerHTML = '';

  instagramColors.forEach(color => {
    const sq = document.createElement('div');
    sq.className        = 'instagram-sq';
    sq.style.width      = '70px';
    sq.style.height     = '70px';
    sq.style.borderRadius = '12px';
    sq.style.background = color;
    sq.style.cursor     = 'pointer';
    strip.appendChild(sq);
  });
}


// =============================================
// INTERACTIONS
// =============================================

function scrollEvents(dir) {
  const track = document.getElementById('eventsTrack');
  track.scrollBy({ left: dir * 284, behavior: 'smooth' });
}


// =============================================
// CONFIG / THEME (Element SDK hook)
// =============================================
const defaultConfig = {
  background_color:       '#F5F3EF',
  surface_color:          '#FFFFFF',
  text_color:             '#2B1F1B',
  primary_action_color:   '#C8745A',
  secondary_action_color: '#8FA47C',
  font_family:            'Playfair Display',
  font_size:              16,
  hero_tagline:           'A creative community exploring fine arts, digital art and visual expression.',
  about_title:            'About Our Club',
  gallery_title:          'Art Gallery',
  events_title:           'Events',
  team_title:             'Meet Our Creative Visionaries',
  commission_title:       'Art Commissions',
  commission_desc:        'Want a unique piece of art? Our talented members create custom artwork — portraits, illustrations, murals, and digital pieces tailored to your vision.',
  news_title:             'News & Updates',
  contact_title:          "Let's Create Together",
  contact_subtitle:       "Have a question, want to join, or just say hi? We'd love to hear from you.",
  footer_contact_email:   'hello@flagro.club',
  footer_contact_address: 'Creative Arts Building, Room 204'
};

function applyConfig(config) {
  const bg      = config.background_color       || defaultConfig.background_color;
  const txt     = config.text_color             || defaultConfig.text_color;
  const primary = config.primary_action_color   || defaultConfig.primary_action_color;
  const fontFam = config.font_family            || defaultConfig.font_family;
  const baseSize = config.font_size             || defaultConfig.font_size;

  document.getElementById('appRoot').style.background = bg;
  document.querySelectorAll('.text-bark').forEach(el => el.style.color = txt);

  // Dynamic style overrides
  let styleTag = document.getElementById('dynamicStyles');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'dynamicStyles';
    document.head.appendChild(styleTag);
  }
  styleTag.textContent = `
    .dot-active   { background: white !important; }
    .chip-active  { background: ${primary} !important; color: white !important; border-color: ${primary} !important; }
    .nav-link::after { background: ${primary} !important; }
  `;

  const headingFont = `${fontFam}, serif`;
  document.querySelectorAll('.font-heading').forEach(el => el.style.fontFamily = headingFont);

  const heroH1 = document.getElementById('heroTitle');
  if (heroH1) heroH1.style.fontSize = `${baseSize * 4}px`;

  document.querySelectorAll('h2').forEach(el => {
    el.style.fontSize = `${baseSize * 2.125}px`;
  });

  updateTexts(config);
}

function updateTexts(config) {
  const set = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.textContent = config[key] || defaultConfig[key];
  };

  set('heroTagline',    'hero_tagline');
  set('aboutTitle',     'about_title');
  set('galleryTitle',   'gallery_title');
  set('eventsTitle',    'events_title');
  set('teamTitle',      'team_title');
  set('commissionTitle','commission_title');
  set('commissionDesc', 'commission_desc');
  set('newsTitle',      'news_title');
  set('contactTitle',   'contact_title');
  set('contactSubtitle','contact_subtitle');
  set('footerEmail',    'footer_contact_email');
  set('footerAddress',  'footer_contact_address');
}


// =============================================
// INITIALISE
// =============================================
initSlider();
renderGallery();
renderEvents();
renderTeam();
renderNews();
renderContactCards();
renderInstagramStrip();
lucide.createIcons();

// Form submit handler
document.getElementById('feedbackForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const origText = btn.textContent;
  btn.textContent = 'Sent! ✓';
  btn.style.opacity = '0.7';
  setTimeout(() => {
    e.target.reset();
    btn.textContent = origText;
    btn.style.opacity = '1';
  }, 2000);
});

// Element SDK integration (optional)
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => { applyConfig(config); },
    mapToCapabilities: (config) => ({
      recolorables: [
        { get: () => config.background_color       || defaultConfig.background_color,       set: (v) => window.elementSdk.setConfig({ background_color: v })       },
        { get: () => config.surface_color          || defaultConfig.surface_color,          set: (v) => window.elementSdk.setConfig({ surface_color: v })          },
        { get: () => config.text_color             || defaultConfig.text_color,             set: (v) => window.elementSdk.setConfig({ text_color: v })             },
        { get: () => config.primary_action_color   || defaultConfig.primary_action_color,   set: (v) => window.elementSdk.setConfig({ primary_action_color: v })   },
        { get: () => config.secondary_action_color || defaultConfig.secondary_action_color, set: (v) => window.elementSdk.setConfig({ secondary_action_color: v }) }
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family || defaultConfig.font_family,
        set: (v) => window.elementSdk.setConfig({ font_family: v })
      },
      fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (v) => window.elementSdk.setConfig({ font_size: v })
      }
    }),
    mapToEditPanelValues: (config) => new Map([
      ['hero_tagline',           config.hero_tagline           || defaultConfig.hero_tagline],
      ['about_title',            config.about_title            || defaultConfig.about_title],
      ['gallery_title',          config.gallery_title          || defaultConfig.gallery_title],
      ['events_title',           config.events_title           || defaultConfig.events_title],
      ['team_title',             config.team_title             || defaultConfig.team_title],
      ['commission_title',       config.commission_title       || defaultConfig.commission_title],
      ['commission_desc',        config.commission_desc        || defaultConfig.commission_desc],
      ['news_title',             config.news_title             || defaultConfig.news_title],
      ['contact_title',          config.contact_title          || defaultConfig.contact_title],
      ['contact_subtitle',       config.contact_subtitle       || defaultConfig.contact_subtitle],
      ['footer_contact_email',   config.footer_contact_email   || defaultConfig.footer_contact_email],
      ['footer_contact_address', config.footer_contact_address || defaultConfig.footer_contact_address]
    ])
  });
}
