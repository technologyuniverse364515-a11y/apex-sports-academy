/* ============================================================
 * Apex Sports Academy — Dynamic Renderer
 * Everything is rendered from /config/*.js
 * ============================================================ */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; };

const B = window.BUTTONS, T = window.TEXT, M = window.MESSAGES, I = window.IMAGES;

/* ---------- Helpers ---------- */
function btn(key, cls = 'btn-primary') {
  const b = B[key]; if (!b) return '';
  const ext = /^https?:|^tel:|^mailto:/.test(b.link);
  const target = /^https?:/.test(b.link) ? ' target="_blank" rel="noopener"' : '';
  return `<a class="btn ${cls}" href="${b.link}"${target}>${b.text}</a>`;
}

/* ---------- Header ---------- */
function renderHeader(activePage) {
  const host = $('#site-header'); if (!host) return;
  const links = [
    ['index.html', T.navHome],
    ['about.html', T.navAbout],
    ['sports.html', T.navSports],
    ['gallery.html', T.navGallery],
    ['schedule.html', T.navSchedule],
    ['coaches.html', T.navCoaches],
    ['contact.html', T.navContact],
  ];
  host.innerHTML = `
    <header class="site-header">
      <div class="container">
        <nav class="nav" id="mainNav">
          <a class="brand" href="index.html">
            <span class="brand-mark"></span>
            <span>${T.brandName}</span>
          </a>
          <ul class="nav-links">
            ${links.map(([h,l]) => `<li><a href="${h}" class="${activePage===h?'active':''}">${l}</a></li>`).join('')}
          </ul>
          <div class="nav-cta">
            ${btn('joinNow', 'btn-primary')}
            <button class="nav-toggle" aria-label="Menu" id="navToggle"><span></span></button>
          </div>
        </nav>
      </div>
    </header>`;
  $('#navToggle')?.addEventListener('click', () => $('#mainNav').classList.toggle('open'));
}

/* ---------- Footer ---------- */
function renderFooter() {
  const host = $('#site-footer'); if (!host) return;
  host.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="brand" style="color:#fff"><span class="brand-mark"></span><span>${T.brandName}</span></div>
            <p>${T.footerAbout}</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <a href="about.html">${T.navAbout}</a>
            <a href="sports.html">${T.navSports}</a>
            <a href="coaches.html">${T.navCoaches}</a>
            <a href="schedule.html">${T.navSchedule}</a>
          </div>
          <div>
            <h4>Contact</h4>
            <a href="tel:${T.contactPhone}">${T.contactPhone}</a>
            <a href="mailto:${T.contactEmail}">${T.contactEmail}</a>
            <a>${T.contactAddress}</a>
            <a>${T.contactHours}</a>
          </div>
        </div>
        <div class="footer-bottom">${T.copyright}</div>
      </div>
    </footer>
    <a class="fab-whatsapp" href="${B.contactWhatsApp.link}" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>`;
}

/* ---------- Home: Hero ---------- */
function renderHero() {
  const host = $('#hero'); if (!host) return;
  host.style.setProperty('--hero-img', `url('${I.hero}')`);
  host.innerHTML = `
    <div class="container">
      <span class="hero-badge">${T.heroBadge}</span>
      <h1>${T.heroTitle.split(' ').slice(0,-1).join(' ')} <span>${T.heroTitle.split(' ').slice(-1)}</span></h1>
      <p>${T.heroSubtitle}</p>
      <div class="hero-cta">
        ${btn('joinNow','btn-primary')}
        ${btn('viewSchedule','btn-secondary')}
      </div>
    </div>`;
}

/* ---------- Page Hero (sub-pages) ---------- */
function renderPageHero(id, title, subtitle, img) {
  const host = $(id); if (!host) return;
  host.style.setProperty('--hero-img', `url('${img}')`);
  host.innerHTML = `<div class="container"><h1>${title}</h1><p>${subtitle}</p></div>`;
}

/* ---------- Benefits ---------- */
function renderBenefits() {
  const host = $('#benefits'); if (!host) return;
  host.innerHTML = `
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Why Us</span>
        <h2>${T.benefitsTitle}</h2>
        <p>${T.benefitsSubtitle}</p>
      </div>
      <div class="grid grid-4">
        ${T.benefits.map(b => `
          <div class="card">
            <div class="icon">${b.icon}</div>
            <h3>${b.title}</h3>
            <p>${b.desc}</p>
          </div>`).join('')}
      </div>
    </div>`;
}

/* ---------- Sports Grid ---------- */
function renderSports(limit) {
  const host = $('#sports'); if (!host) return;
  const list = limit ? T.sports.slice(0, limit) : T.sports;
  host.innerHTML = `
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Programs</span>
        <h2>${T.sportsTitle}</h2>
        <p>${T.sportsSubtitle}</p>
      </div>
      <div class="grid grid-3">
        ${list.map(s => `
          <article class="sport-card">
            <div class="thumb"><img src="${I[s.key]}" alt="${s.name} training"></div>
            <div class="body">
              <h3>${s.name}</h3>
              <p>${s.desc}</p>
              <a class="more" href="contact.html">Enroll Now →</a>
            </div>
          </article>`).join('')}
      </div>
      ${limit ? `<div style="text-align:center;margin-top:40px">${btn('exploreSports','btn-dark')}</div>` : ''}
    </div>`;
}

/* ---------- Testimonials Slider ---------- */
function renderTestimonials() {
  const host = $('#testimonials'); if (!host) return;
  host.innerHTML = `
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Reviews</span>
        <h2>${T.testimonialsTitle}</h2>
        <p>${T.testimonialsSubtitle}</p>
      </div>
      <div class="testimonials">
        <div class="t-track"><div class="t-slides" id="tSlides">
          ${T.testimonials.map(t => `
            <div class="t-slide">
              <p class="quote">${t.quote}</p>
              <div class="name">${t.name}</div>
              <div class="role">${t.role}</div>
            </div>`).join('')}
        </div></div>
        <div class="t-controls" id="tDots">
          ${T.testimonials.map((_,i)=>`<span class="t-dot ${i===0?'active':''}" data-i="${i}"></span>`).join('')}
        </div>
      </div>
    </div>`;
  const slides = $('#tSlides'); let idx = 0;
  const go = (i) => {
    idx = (i + T.testimonials.length) % T.testimonials.length;
    slides.style.transform = `translateX(-${idx*100}%)`;
    $$('#tDots .t-dot').forEach((d,j)=>d.classList.toggle('active', j===idx));
  };
  $$('#tDots .t-dot').forEach(d => d.addEventListener('click', () => go(+d.dataset.i)));
  setInterval(() => go(idx + 1), 5500);
}

/* ---------- Events ---------- */
function renderEvents() {
  const host = $('#events'); if (!host) return;
  const imgs = [I.event1, I.event2, I.event3];
  host.innerHTML = `
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">What's On</span>
        <h2>${T.eventsTitle}</h2>
        <p>${T.eventsSubtitle}</p>
      </div>
      <div class="grid grid-3">
        ${T.events.map((e,i) => `
          <article class="event-card">
            <div class="thumb"><img src="${imgs[i % imgs.length]}" alt="${e.title}"></div>
            <div class="body">
              <span class="date">${e.date}</span>
              <h3>${e.title}</h3>
              <p>${e.desc}</p>
            </div>
          </article>`).join('')}
      </div>
    </div>`;
}

/* ---------- CTA Banner ---------- */
function renderCtaBanner() {
  const host = $('#ctaBanner'); if (!host) return;
  host.innerHTML = `
    <div class="container">
      <div class="cta-banner" style="--cta-img:url('${I.ctaBanner}')">
        <h2>${T.ctaBannerTitle}</h2>
        <p>${T.ctaBannerSubtitle}</p>
        <div class="hero-cta">
          ${btn('bookTrial','btn-primary')}
          ${btn('contactWhatsApp','btn-secondary')}
        </div>
      </div>
    </div>`;
}

/* ---------- About ---------- */
function renderAbout() {
  const host = $('#about'); if (!host) return;
  host.innerHTML = `
    <div class="container">
      <div class="about-grid">
        <img src="${I.aboutHero}" alt="About ${T.brandName}">
        <div>
          <span class="eyebrow">Our Story</span>
          <h2>${T.aboutStoryTitle}</h2>
          <p>${T.aboutStory}</p>
          <div class="mv-grid">
            <div class="mv-card"><h3>${T.missionTitle}</h3><p>${T.missionText}</p></div>
            <div class="mv-card"><h3>${T.visionTitle}</h3><p>${T.visionText}</p></div>
          </div>
        </div>
      </div>
    </div>`;
}
function renderStats() {
  const host = $('#stats'); if (!host) return;
  host.innerHTML = `
    <div class="container">
      <div class="section-head">
        <span class="eyebrow" style="color:#ffb27a">Achievements</span>
        <h2>${T.statsTitle}</h2>
      </div>
      <div class="stats">
        ${T.stats.map(s => `<div class="stat"><div class="value">${s.value}</div><div class="label">${s.label}</div></div>`).join('')}
      </div>
    </div>`;
}

/* ---------- Gallery ---------- */
function renderGallery() {
  const host = $('#gallery'); if (!host) return;
  const imgs = ['gallery1','gallery2','gallery3','gallery4','gallery5','gallery6','gallery7','gallery8','gallery9','gallery10','gallery11','gallery12','gallery13','gallery14','gallery15'];
  host.innerHTML = `
    <div class="container">
      <div class="gallery-grid">
        ${imgs.map((k,i) => `<div class="gallery-item"><img src="${I[k]}" alt="Gallery image ${i+1}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80'"></div>`).join('')}
      </div>
    </div>`;
}

/* ---------- Schedule ---------- */
function renderSchedule() {
  const host = $('#schedule'); if (!host) return;
  host.innerHTML = `
    <div class="container">
      <div class="schedule-wrap">
        <table class="schedule-table">
          <thead><tr>${T.scheduleHeaders.map(h=>`<th>${h}</th>`).join('')}</tr></thead>
          <tbody>
            ${T.schedule.map(r => `
              <tr><td>${r.day}</td><td>${r.cricket}</td><td>${r.football}</td><td>${r.tennis}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <p class="schedule-note">${T.scheduleNote}</p>
      <div style="text-align:center;margin-top:30px">${btn('joinNow','btn-primary')}</div>
    </div>`;
}

/* ---------- Coaches ---------- */
function renderCoaches() {
  const host = $('#coaches'); if (!host) return;
  const imgs = [I.coach1, I.coach2, I.coach3, I.coach4, I.coach5, I.coach6];
  host.innerHTML = `
    <div class="container">
      <div class="grid grid-3">
        ${T.coaches.map((c,i) => `
          <article class="coach-card">
            <div class="avatar"><img src="${imgs[i % imgs.length]}" alt="${c.name}"></div>
            <div class="body">
              <h3>${c.name}</h3>
              <div class="role">${c.sport}</div>
              <span class="exp">${c.exp} experience</span>
              <p>${c.bio}</p>
            </div>
          </article>`).join('')}
      </div>
    </div>`;
}

/* ---------- Contact + Multi-step Form ---------- */
function renderContact() {
  const host = $('#contact'); if (!host) return;
  host.innerHTML = `
    <div class="container">
      <div class="contact-grid">
        <div class="info-card">
          <h3>${T.contactInfoTitle}</h3>
          <div class="info-row"><div class="ic">📍</div><div><div class="lbl">Address</div><div class="val">${T.contactAddress}</div></div></div>
          <div class="info-row"><div class="ic">📞</div><div><div class="lbl">Phone</div><div class="val">${T.contactPhone}</div></div></div>
          <div class="info-row"><div class="ic">✉️</div><div><div class="lbl">Email</div><div class="val">${T.contactEmail}</div></div></div>
          <div class="info-row"><div class="ic">🕒</div><div><div class="lbl">Hours</div><div class="val">${T.contactHours}</div></div></div>
          <div class="info-buttons">
            ${btn('contactWhatsApp','btn-whatsapp btn-block')}
            ${btn('callNow','btn-secondary btn-block')}
          </div>
        </div>

        <div class="form-card" id="form">
          <h3>${T.formTitle}</h3>
          <p class="sub">${T.formSubtitle}</p>

          <div class="stepper" id="stepper">
            ${T.formStepLabels.map((l,i)=>`
              <div class="step ${i===0?'active':''}" data-step="${i+1}">
                <div class="num">${i+1}</div>
                <span>${l}</span>
                <div class="bar"></div>
              </div>`).join('')}
          </div>

          <form id="inquiryForm" novalidate>
            <div class="form-step active" data-step="1">
              <div class="field">
                <label>${T.fieldName}</label>
                <input type="text" name="name" required placeholder="John Doe">
                <div class="err">${M.fieldRequired}</div>
              </div>
              <div class="field">
                <label>${T.fieldPhone}</label>
                <input type="tel" name="phone" required placeholder="+1 234 567 8900">
                <div class="err">${M.invalidPhone}</div>
              </div>
              <div class="field">
                <label>${T.fieldEmail}</label>
                <input type="email" name="email" placeholder="you@email.com">
                <div class="err">${M.invalidEmail}</div>
              </div>
            </div>

            <div class="form-step" data-step="2">
              <div class="field">
                <label>${T.fieldSport}</label>
                <select name="sport" required>
                  <option value="">— Choose a sport —</option>
                  ${T.sportOptions.map(s=>`<option>${s}</option>`).join('')}
                </select>
                <div class="err">${M.fieldRequired}</div>
              </div>
            </div>

            <div class="form-step" data-step="3">
              <div class="field">
                <label>${T.fieldMessage}</label>
                <textarea name="message" required placeholder="I'd like to know about training timings, fees, and a free trial..."></textarea>
                <div class="err">${M.fieldRequired}</div>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-ghost" id="prevBtn" style="visibility:hidden">${B.prevStep.text}</button>
              <button type="button" class="btn btn-dark" id="nextBtn">${B.nextStep.text}</button>
              <button type="submit" class="btn btn-primary" id="submitBtn" style="display:none">${B.submitInquiry.text}</button>
            </div>
            <div class="form-msg" id="formMsg"></div>
          </form>
        </div>
      </div>

      <div class="map-wrap">
        <iframe loading="lazy"
          src="https://www.google.com/maps?q=${encodeURIComponent(T.contactAddress)}&output=embed"
          title="${T.brandName} location"></iframe>
      </div>
    </div>`;

  initMultiStepForm();
}

function initMultiStepForm() {
  const form = $('#inquiryForm'); if (!form) return;
  const steps = $$('.form-step', form);
  const stepperItems = $$('#stepper .step');
  const prevBtn = $('#prevBtn'), nextBtn = $('#nextBtn'), submitBtn = $('#submitBtn');
  const msg = $('#formMsg');
  let cur = 0;

  const validateStep = () => {
    const inputs = $$('input,select,textarea', steps[cur]);
    let ok = true;
    inputs.forEach(inp => {
      const field = inp.closest('.field');
      let valid = true;
      if (inp.hasAttribute('required') && !inp.value.trim()) valid = false;
      if (inp.type === 'email' && inp.value && !/^\S+@\S+\.\S+$/.test(inp.value)) valid = false;
      if (inp.type === 'tel' && inp.value && !/^[+\d\s().-]{7,}$/.test(inp.value)) valid = false;
      field.classList.toggle('invalid', !valid);
      if (!valid) ok = false;
    });
    return ok;
  };

  const update = () => {
    steps.forEach((s,i)=>s.classList.toggle('active', i===cur));
    stepperItems.forEach((s,i)=>{
      s.classList.toggle('active', i===cur);
      s.classList.toggle('done', i<cur);
    });
    prevBtn.style.visibility = cur === 0 ? 'hidden' : 'visible';
    nextBtn.style.display = cur === steps.length - 1 ? 'none' : 'inline-flex';
    submitBtn.style.display = cur === steps.length - 1 ? 'inline-flex' : 'none';
  };

  nextBtn.addEventListener('click', () => { if (validateStep() && cur < steps.length - 1) { cur++; update(); }});
  prevBtn.addEventListener('click', () => { if (cur > 0) { cur--; update(); }});
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    msg.className = 'form-msg success';
    msg.textContent = M.formSuccess;
    form.reset(); cur = 0; update();
  });
  update();
}

/* ---------- Init per page ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  renderHeader(page + '.html');
  renderFooter();

  switch (page) {
    case 'index':
      renderHero();
      renderBenefits();
      renderSports(3);
      renderTestimonials();
      renderEvents();
      renderCtaBanner();
      break;
    case 'about':
      renderPageHero('#pageHero', T.aboutTitle, T.aboutSubtitle, I.aboutHero);
      renderAbout();
      renderStats();
      renderCtaBanner();
      break;
    case 'sports':
      renderPageHero('#pageHero', T.sportsPageTitle, T.sportsPageSubtitle, I.cricket);
      renderSports();
      renderCtaBanner();
      break;
    case 'gallery':
      renderPageHero('#pageHero', T.galleryTitle, T.gallerySubtitle, I.gallery3);
      renderGallery();
      break;
    case 'schedule':
      renderPageHero('#pageHero', T.scheduleTitle, T.scheduleSubtitle, I.athletics);
      renderSchedule();
      renderCtaBanner();
      break;
    case 'coaches':
      renderPageHero('#pageHero', T.coachesTitle, T.coachesSubtitle, I.football);
      renderCoaches();
      renderCtaBanner();
      break;
    case 'contact':
      renderPageHero('#pageHero', T.contactTitle, T.contactSubtitle, I.tennis);
      renderContact();
      break;
  }
});
