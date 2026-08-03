/* ==========================================================================
   STITBD — App Logic (vanilla JS port of the React components)
   Depends on data.js being loaded first.
   ========================================================================== */

/* Small escaping helper for text interpolated into HTML strings */
function esc(str) {
  const div = document.createElement('div');
  div.textContent = String(str ?? '');
  return div.innerHTML;
}

function waLink(message) {
  const digits = COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '');
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

/* --------------------------------------------------------------------------
   Static company info (footer / contact / hero use this directly)
   -------------------------------------------------------------------------- */
function fillCompanyInfo() {
  document.querySelectorAll('[data-since-year]').forEach((el) => (el.textContent = COMPANY_INFO.sinceYear));
  document.querySelectorAll('[data-copyright-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
  document.querySelectorAll('[data-company-address]').forEach((el) => (el.textContent = COMPANY_INFO.address));
  document.querySelectorAll('[data-company-phone-primary]').forEach((el) => (el.textContent = COMPANY_INFO.phonePrimary));
  document.querySelectorAll('[data-company-phone-secondary]').forEach((el) => (el.textContent = COMPANY_INFO.phoneSecondary));
  document.querySelectorAll('[data-company-email]').forEach((el) => (el.textContent = COMPANY_INFO.email));
  document.querySelectorAll('[data-company-support-email]').forEach((el) => (el.textContent = COMPANY_INFO.supportEmail));
  document.querySelectorAll('[data-company-office-hours]').forEach((el) => (el.textContent = COMPANY_INFO.officeHours));
  document.querySelectorAll('[data-wa-link]').forEach((el) => (el.href = waLink()));
  document.querySelectorAll('[data-fb-link]').forEach((el) => (el.href = COMPANY_INFO.facebook));
  document.querySelectorAll('[data-li-link]').forEach((el) => (el.href = COMPANY_INFO.linkedin));
  document.querySelectorAll('[data-yt-link]').forEach((el) => (el.href = COMPANY_INFO.youtube));
  document.querySelectorAll('[data-gh-link]').forEach((el) => (el.href = COMPANY_INFO.github));
}

/* --------------------------------------------------------------------------
   Navbar: scroll shadow state
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const nav = document.getElementById('mainNavbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll);
  onScroll();
}

/* --------------------------------------------------------------------------
   Navbar height -> CSS var (drives hero full-viewport-height calc)
   -------------------------------------------------------------------------- */
function syncNavbarHeightVar() {
  const nav = document.getElementById('mainNavbar');
  if (!nav) return;
  document.documentElement.style.setProperty('--navbar-height', `${nav.offsetHeight}px`);
}

// Sticky Header Scroll Behavior - Smart hide/show on desktop, always visible on mobile
(function () {
  const navbar = document.getElementById('mainNavbar');
  let lastScrollY = 0;
  let isHidden = false;
  let ticking = false;

  function updateNavbar() {
    const currentScrollY = window.scrollY;
    const isDesktop = window.innerWidth >= 992;

    if (isDesktop) {
      // Desktop: Hide when scrolling down, show when scrolling up
      // But always show at the very top of the page
      if (currentScrollY <= 50) {
        // At the top - always show
        navbar.classList.remove('hidden');
        navbar.classList.add('scrolled');
        isHidden = false;
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down - hide navbar
        if (!isHidden) {
          navbar.classList.add('hidden');
          navbar.classList.remove('scrolled');
          isHidden = true;
        }
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        if (isHidden) {
          navbar.classList.remove('hidden');
          navbar.classList.add('scrolled');
          isHidden = false;
        }
      }
    } else {
      // Mobile: Always keep navbar visible
      navbar.classList.remove('hidden');
      navbar.classList.add('scrolled');
      isHidden = false;
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  // Throttled scroll listener
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateNavbar();
      });
      ticking = true;
    }
  });

  // Initial check on load - ensure navbar is visible
  window.addEventListener('load', function () {
    // Small delay to ensure layout is complete
    setTimeout(function () {
      // Ensure navbar is visible on load
      navbar.classList.remove('hidden');
      navbar.classList.add('scrolled');
      isHidden = false;
      lastScrollY = window.scrollY;
    }, 100);
  });

  // Handle resize events (desktop <-> mobile)
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Reset state on resize
      if (window.innerWidth < 992) {
        navbar.classList.remove('hidden');
        navbar.classList.add('scrolled');
        isHidden = false;
      }
      updateNavbar();
    }, 250);
  });

  // Also update on orientation change for mobile
  window.addEventListener('orientationchange', function () {
    setTimeout(function () {
      navbar.classList.remove('hidden');
      navbar.classList.add('scrolled');
      isHidden = false;
      updateNavbar();
    }, 300);
  });
})();

/* --------------------------------------------------------------------------
   Hero Background Slider (auto-rotating photo slideshow) — each slide
   carries its own heading text, typed out letter-by-letter in sync with
   the photo change for a modern, professional feel.
   -------------------------------------------------------------------------- */
const HERO_SLIDES = [
  { image: 'asset/slider/01.png', prefix: 'Transforming Businesses with ', highlight: 'Next-Gen Software', suffix: ', Web & Mobile Engineering' },
  { image: 'asset/slider/02.png', prefix: 'Engineering ', highlight: 'Enterprise ERP & POS', suffix: ' for Bangladesh' },
  { image: 'asset/slider/03.png', prefix: 'Building ', highlight: 'High-Speed Websites', suffix: ' That Convert' },
  { image: 'asset/slider/04.png', prefix: 'Delivering ', highlight: 'Android & iOS Apps', suffix: ' People Love to Use' },
  { image: 'asset/slider/05.png', prefix: '36+ Engineers, ', highlight: '1,200+ Projects', suffix: ' Systems' },
  { image: 'asset/slider/06.png', prefix: 'Your ', highlight: '24/7 Technology Partner', suffix: ' Since 2014' },
  { image: 'asset/slider/07.png', prefix: 'Trusted ', highlight: 'BTTB Domain & Cloud Hosting', suffix: ' Delivered On Time' },
  { image: 'asset/slider/08.png', prefix: 'Automating Workflows with ', highlight: 'Custom Software', suffix: ' Built for You' },
  { image: 'asset/slider/15.png', prefix: 'Securing Businesses with  ', highlight: 'CCTV & Biometric Access', suffix: ' in Bangladesh' },
];

const HeroSlider = {
  current: 0,
  timer: null,

  init() {
    this.track = document.getElementById('heroSliderBg');
    if (!this.track) return;

    this.track.innerHTML = HERO_SLIDES
      .map(
        (slide, i) =>
          `<div class="hero-slider-slide${i === 0 ? ' active' : ''}" style="background-image:url('${esc(slide.image)}');"></div>`
      )
      .join('');

    this.slides = this.track.querySelectorAll('.hero-slider-slide');

    TypingHeadline.init(HERO_SLIDES[0]);

    if (this.slides.length > 1) {
      this.timer = setInterval(() => this.next(), 5000);
    }
  },

  next() {
    this.slides[this.current].classList.remove('active');
    this.current = (this.current + 1) % this.slides.length;
    this.slides[this.current].classList.add('active');
    TypingHeadline.type(HERO_SLIDES[this.current]);
  },
};

/* --------------------------------------------------------------------------
   Typing Headline — types each slide's heading letter-by-letter, keeping
   the highlighted phrase colored (matches the old static markup's
   <span class="text-warning">) while it types.
   -------------------------------------------------------------------------- */
const TypingHeadline = {
  el: null,
  typeTimer: null,
  typeSpeed: 32,

  init(firstSlide) {
    this.el = document.getElementById('heroTypingHeading');
    if (!this.el) return;
    this.type(firstSlide);
  },

  type(slide) {
    if (!this.el) return;
    clearTimeout(this.typeTimer);

    const full = `${slide.prefix}${slide.highlight}${slide.suffix}`;
    const highlightStart = slide.prefix.length;
    const highlightEnd = highlightStart + slide.highlight.length;
    let i = 0;

    this.el.classList.add('is-typing');

    const step = () => {
      const shown = full.slice(0, i);
      const prefixPart = esc(shown.slice(0, Math.min(shown.length, highlightStart)));
      const highlightPart = shown.length > highlightStart
        ? esc(shown.slice(highlightStart, Math.min(shown.length, highlightEnd)))
        : '';
      const suffixPart = shown.length > highlightEnd ? esc(shown.slice(highlightEnd)) : '';

      this.el.innerHTML =
        prefixPart +
        (highlightPart ? `<span class="text-warning">${highlightPart}</span>` : '') +
        suffixPart;

      i++;
      if (i <= full.length) {
        this.typeTimer = setTimeout(step, this.typeSpeed);
      } else {
        this.el.classList.remove('is-typing');
      }
    };

    step();
  },
};

/* --------------------------------------------------------------------------
   Desktop Navbar Dropdowns: open on hover (>=992px), click still works
   -------------------------------------------------------------------------- */
function initDesktopDropdownHover() {
  const dropdowns = document.querySelectorAll('#navbarNav .nav-item.dropdown');
  let closeTimer = null;

  dropdowns.forEach((item) => {
    const menu = item.querySelector('.dropdown-menu');
    const toggle = item.querySelector('.dropdown-toggle');
    if (!menu || !toggle) return;

    item.addEventListener('mouseenter', () => {
      if (window.innerWidth < 992) return;
      clearTimeout(closeTimer);
      dropdowns.forEach((other) => {
        if (other !== item) {
          other.classList.remove('show');
          other.querySelector('.dropdown-menu')?.classList.remove('show');
          other.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.add('show');
      menu.classList.add('show');
      toggle.setAttribute('aria-expanded', 'true');
    });

    item.addEventListener('mouseleave', () => {
      if (window.innerWidth < 992) return;
      closeTimer = setTimeout(() => {
        item.classList.remove('show');
        menu.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      }, 150);
    });

    const caret = toggle.querySelector('[data-dropdown-caret]');
    if (caret) {
      caret.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = item.classList.contains('show');
        dropdowns.forEach((other) => {
          other.classList.remove('show');
          other.querySelector('.dropdown-menu')?.classList.remove('show');
          other.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('show');
          menu.classList.add('show');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.nav-item.dropdown')) return;
    dropdowns.forEach((item) => {
      item.classList.remove('show');
      item.querySelector('.dropdown-menu')?.classList.remove('show');
      item.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   Products Nav Dropdown — populated from READY_SOFTWARE_PRODUCTS
   -------------------------------------------------------------------------- */
function renderProductsNavMenu() {
  const desktopMenu = document.getElementById('productsDropdownMenu');
  const mobileMenu = document.getElementById('mobProductsMenu');
  if (!desktopMenu && !mobileMenu) return;

  // #ready-software only exists on index.html — on other pages (about.html etc.)
  // link back to the homepage gallery instead of a same-page anchor.
  const hasReadySoftwareSection = !!document.getElementById('ready-software');
  const navHref = hasReadySoftwareSection ? '#ready-software' : 'index.html#ready-software';

  if (desktopMenu) {
    desktopMenu.innerHTML = READY_SOFTWARE_PRODUCTS.map(
      (p) => `<li><a class="dropdown-item rounded-2" href="${navHref}" data-nav-product="${esc(p.id)}">${esc(p.name)}</a></li>`
    ).join('');
  }

  if (mobileMenu) {
    mobileMenu.innerHTML = READY_SOFTWARE_PRODUCTS.map(
      (p) => `<li data-bs-dismiss="offcanvas"><a class="text-dark text-decoration-none" href="${navHref}" data-nav-product="${esc(p.id)}">${esc(p.name)}</a></li>`
    ).join('');
  }

  document.querySelectorAll('[data-nav-product]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const product = READY_SOFTWARE_PRODUCTS.find((p) => p.id === link.getAttribute('data-nav-product'));
      const target = document.getElementById('ready-software');
      if (target) {
        // Already on index.html: scroll + open the product modal in place
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => ProductDetailModal.open(product), 500);
      }
      // On other pages: let the browser navigate to index.html#ready-software normally
    });
  });
}

function esc(str) {
  const div = document.createElement('div');
  div.textContent = String(str ?? '');
  return div.innerHTML;
}

/* NEW — converts a product heading into a safe .html filename */
function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/* --------------------------------------------------------------------------
   Quote / Cost Estimator Modal
   -------------------------------------------------------------------------- */
const QuoteModal = {
  el: null,
  formSection: null,
  successSection: null,
  serviceTypeSelect: null,
  productField: null,
  productSelect: null,
  nameInput: null,
  phoneInput: null,
  successServiceType: null,
  successPhone: null,
  successName: null,
  waButton: null,

  init() {
    this.el = document.getElementById('quoteModal');
    this.formSection = document.getElementById('quoteFormSection');
    this.successSection = document.getElementById('quoteSuccessSection');
    this.serviceTypeSelect = document.getElementById('quoteServiceType');
    this.productField = document.getElementById('quoteProductField');
    this.productSelect = document.getElementById('quoteProduct');
    this.nameInput = document.getElementById('quoteName');
    this.phoneInput = document.getElementById('quotePhone');
    this.successServiceType = document.getElementById('quoteSuccessServiceType');
    this.successPhone = document.getElementById('quoteSuccessPhone');
    this.successName = document.getElementById('quoteSuccessName');
    this.waButton = document.getElementById('quoteSuccessWaBtn');
    this.dynamicFieldsContainer = document.getElementById('quoteDynamicFields');
    this.currentProductId = null;

    // Populate product dropdown
    this.productSelect.innerHTML = READY_SOFTWARE_PRODUCTS.map(
      (p) => `<option value="${esc(p.name)}">${esc(p.name)}</option>`
    ).join('');

    this.serviceTypeSelect.addEventListener('change', () => this.syncProductField());

    document.getElementById('quoteForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.showSuccess();
    });

    document.querySelectorAll('[data-open-quote-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const prefill = btn.getAttribute('data-open-quote-modal') || '';
        this.open(prefill);
      });
    });

    document.querySelectorAll('[data-close-quote-modal]').forEach((btn) => {
      btn.addEventListener('click', () => this.close());
    });
  },

  syncProductField() {
    const isReady = this.serviceTypeSelect.value === 'Ready Software Purchase';
    this.productField.classList.toggle('d-none', !isReady);
  },

  /* NEW — builds the product-specific extra fields */
  renderDynamicFields(productId) {
    const fields = (productId && PRODUCT_DEMO_FIELDS[productId]) || PRODUCT_DEMO_FIELDS.default;
    this.dynamicFieldsContainer.innerHTML = fields
      .map(
        (f) => `
      <div class="col-md-6">
        <label class="form-label fw-semibold text-dark small">${esc(f.label)}</label>
        ${f.type === 'select'
            ? `<select id="${esc(f.id)}" class="form-select form-select-lg fs-6 focus-ring-none quote-dynamic-field">
                ${f.options.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join('')}
              </select>`
            : `<input type="number" id="${esc(f.id)}" min="0" placeholder="${esc(f.placeholder || '')}" class="form-control form-control-lg fs-6 focus-ring-none quote-dynamic-field" data-field-label="${esc(f.label)}">`
          }
      </div>`
      )
      .join('');
  },

  open(prefillProduct, productId) {
    this.reset();
    this.currentProductId = productId || null; // NEW
    if (prefillProduct) {
      // Mirror React logic: a prefill implies "Ready Software Purchase" only
      // when it exactly matches a known product name; otherwise it's used
      // as free-form context for a general/service quote request.
      const matched = READY_SOFTWARE_PRODUCTS.find((p) => p.name === prefillProduct);
      if (matched) {
        this.serviceTypeSelect.value = 'Ready Software Purchase';
        this.productSelect.value = matched.name;
        if (!this.currentProductId) this.currentProductId = matched.id; // NEW
      } else {
        // Custom notes field: stash the prefill text into the notes textarea
        document.getElementById('quoteNotes').value = prefillProduct;
      }
    }
    this.syncProductField();
    this.renderDynamicFields(this.currentProductId); // NEW
    this.el.classList.add('show', 'd-block');
    document.body.classList.add('modal-open');
    this.ensureBackdrop(true);
  },

  close() {
    this.el.classList.remove('show', 'd-block');
    document.body.classList.remove('modal-open');
    this.ensureBackdrop(false);
  },

  ensureBackdrop(show) {
    let backdrop = document.getElementById('genericModalBackdrop');
    const anyOpen = document.querySelector('.modal.show.d-block');
    if (show) {
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        backdrop.id = 'genericModalBackdrop';
        document.body.appendChild(backdrop);
      }
    } else if (backdrop && !anyOpen) {
      backdrop.remove();
    }
  },

  reset() {
    document.getElementById('quoteForm').reset();
    this.formSection.classList.remove('d-none');
    this.successSection.classList.add('d-none');
    if (this.dynamicFieldsContainer) this.dynamicFieldsContainer.innerHTML = ''; // NEW
    this.currentProductId = null; // NEW
  },

  showSuccess() {
    const serviceType = this.serviceTypeSelect.value;
    const name = this.nameInput.value;
    const phone = this.phoneInput.value;
    const product = this.productSelect.value;

    /* NEW — collect the product-specific field values */
    const dynamicDetails = Array.from(document.querySelectorAll('.quote-dynamic-field'))
      .map((el) => {
        const label = el.tagName === 'SELECT'
          ? (el.previousElementSibling ? el.previousElementSibling.textContent : el.id)
          : (el.dataset.fieldLabel || el.id);
        return `${label}: ${el.value || 'N/A'}`;
      })
      .join(', ');

    this.successName.textContent = name;
    this.successServiceType.textContent = serviceType;
    this.successPhone.textContent = phone;
    this.waButton.href = waLink(
      `Hello STITBD, I submitted a quote request for ${serviceType} (${product}).${dynamicDetails ? ' ' + dynamicDetails + '.' : ''} Name: ${name}, Phone: ${phone}`
    );

    this.formSection.classList.add('d-none');
    this.successSection.classList.remove('d-none');
  },
};

/* --------------------------------------------------------------------------
   Contact Section form (inline success state, not a modal)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const formWrap = document.getElementById('contactFormWrap');
  const successWrap = document.getElementById('contactSuccessWrap');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const phone = document.getElementById('contactPhone').value;
    const email = document.getElementById('contactEmail').value;

    document.getElementById('contactSuccessName').textContent = name;
    document.getElementById('contactSuccessContact').textContent = phone || email;

    formWrap.classList.add('d-none');
    successWrap.classList.remove('d-none');
  });

  document.getElementById('contactSendAnother').addEventListener('click', () => {
    form.reset();
    successWrap.classList.add('d-none');
    formWrap.classList.remove('d-none');
  });
}

/* --------------------------------------------------------------------------
   Services Section
   -------------------------------------------------------------------------- */
function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return; // section only exists on index.html
  grid.innerHTML = SERVICES.map(
    (service, index) => `
    <div class="col-12 col-sm-6 col-lg-4" data-aos="fade-up" data-aos-delay="${index * 80}">
      <div class="card card-modern card-hover-lift h-100 p-0 border overflow-hidden d-flex flex-column justify-content-between">
        <div class="svc-card-img-wrap position-relative">
          <img src="${esc(service.image)}" alt="${esc(service.title)}" class="svc-card-img" loading="lazy">
          ${service.badge ? `<span class="badge-gold svc-card-badge">${esc(service.badge)}</span>` : ''}
        </div>
        <div class="svc-card-body p-4 d-flex flex-column flex-grow-1">
          <div>
            <h4 class="fw-bold font-heading text-dark mb-2 fs-5">${esc(service.title)}</h4>
            <p class="text-muted small mb-4 leading-relaxed">${esc(service.description)}</p>
            <ul class="list-unstyled mb-4 gap-2 d-flex flex-column">
              ${service.features
        .slice(0, 2)
        .map(
          (feat) => `
              <li class="d-flex align-items-start gap-2 small text-dark">
                <i class="bi bi-check-circle-fill text-primary mt-1"></i>
                <span>${esc(feat)}</span>
              </li>`
        )
        .join('')}
              ${service.features.length > 2 ? `<li class="d-flex align-items-start gap-2 small text-muted">
                <i class="bi bi-plus-circle-fill text-primary mt-1"></i>
                <span>+${service.features.length - 2} more features</span>
              </li>` : ''}
            </ul>
          </div>
          <div class="pt-3 border-top d-flex flex-column gap-2 mt-auto">
            <button type="button" class="btn btn-outline-primary w-100 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2" data-view-service="${esc(service.id)}">
              <i class="bi bi-eye"></i>
              <span>Read More</span>
            </button>
            <button type="button" class="btn btn-brand-primary w-100 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2" data-request-service="${esc(service.title)}">
              <i class="bi bi-envelope-paper-fill"></i>
              <span>Request This Service</span>
            </button>
          </div>
        </div>
      </div>
    </div>`
  ).join('');

  grid.querySelectorAll('[data-view-service]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const service = SERVICES.find((s) => s.id === btn.getAttribute('data-view-service'));
      ServiceDetailModal.open(service);
    });
  });

  grid.querySelectorAll('[data-request-service]').forEach((btn) => {
    btn.addEventListener('click', () => {
      QuoteModal.open(`Service Request: ${btn.getAttribute('data-request-service')}`);
    });
  });
}

/* --------------------------------------------------------------------------
   Ready Software Gallery (search + category filter + detail modal)
   -------------------------------------------------------------------------- */
const CATEGORIES = [
  'All',
  'Enterprise & ERP',
  'Retail & POS',
  'Education & Health',
  'Services & Logistics',
  'Real Estate & Infrastructure',
];

const ReadySoftwareGallery = {
  activeCategory: 'All',
  searchQuery: '',

  init() {
    this.tabsEl = document.getElementById('readySoftwareTabs');
    if (!this.tabsEl) return; // section only exists on index.html
    this.searchInput = document.getElementById('readySoftwareSearch');
    this.clearBtn = document.getElementById('readySoftwareClear');
    this.grid = document.getElementById('readySoftwareGrid');
    this.emptyState = document.getElementById('readySoftwareEmpty');
    this.resetBtn = document.getElementById('readySoftwareReset');

    this.tabsEl.innerHTML = CATEGORIES.map(
      (cat) => `
      <button type="button" class="filter-tab-btn${cat === this.activeCategory ? ' active' : ''}" data-category="${esc(cat)}">
        ${esc(cat)}
        ${cat === 'All' ? `<span class="badge bg-white text-primary rounded-pill ms-2 extra-small">${READY_SOFTWARE_PRODUCTS.length}</span>` : ''}
      </button>`
    ).join('');

    this.tabsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-category]');
      if (!btn) return;
      this.activeCategory = btn.getAttribute('data-category');
      this.syncTabs();
      this.render();
    });

    this.searchInput.addEventListener('input', () => {
      this.searchQuery = this.searchInput.value;
      this.clearBtn.classList.toggle('d-none', !this.searchQuery);
      this.render();
    });

    this.clearBtn.addEventListener('click', () => {
      this.searchInput.value = '';
      this.searchQuery = '';
      this.clearBtn.classList.add('d-none');
      this.render();
    });

    this.resetBtn.addEventListener('click', () => {
      this.searchInput.value = '';
      this.searchQuery = '';
      this.clearBtn.classList.add('d-none');
      this.activeCategory = 'All';
      this.syncTabs();
      this.render();
    });

    this.render();
  },

  syncTabs() {
    this.tabsEl.querySelectorAll('[data-category]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-category') === this.activeCategory);
    });
  },

  filtered() {
    const q = this.searchQuery.toLowerCase();
    return READY_SOFTWARE_PRODUCTS.filter((product) => {
      const matchesCategory = this.activeCategory === 'All' || product.category === this.activeCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q) ||
        product.targetUsers.toLowerCase().includes(q) ||
        product.modules.some((m) => m.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  },

  render() {
    const list = this.filtered();

    if (list.length === 0) {
      this.grid.innerHTML = '';
      this.grid.classList.add('d-none');
      this.emptyState.classList.remove('d-none');
      return;
    }

    this.emptyState.classList.add('d-none');
    this.grid.classList.remove('d-none');

    this.grid.innerHTML = list
      .map(
        (product) => `
  <div class="col-12 col-sm-6 col-lg-3" data-aos="fade-up">
        <div class="card card-modern card-hover-lift h-100 border overflow-hidden p-0 d-flex flex-column justify-content-between">
          <div class="rs-card-img-wrap position-relative">
            <img src="${esc(product.image)}" alt="${esc(product.name)}" class="rs-card-img" loading="lazy">
            ${product.badge ? `<span class="badge-gold rs-card-badge">${esc(product.badge)}</span>` : ''}
          </div>
          <div class="rs-card-body p-4 d-flex flex-column flex-grow-1">
            <div>
              <h5 class="fw-bold font-heading text-dark mb-1 fs-5">${esc(product.name)}</h5>
              <span class="text-muted extra-small d-block mb-2"><i class="bi bi-building me-1"></i> ${esc(product.targetUsers)}</span>
              <p class="text-muted small mb-3 leading-relaxed">${esc(product.shortDescription)}</p>
              <div class="d-flex flex-wrap gap-1 mb-4">
                ${product.modules
            .slice(0, 4)
            .map((mod) => `<span class="badge bg-light text-dark border extra-small font-normal">${esc(mod)}</span>`)
            .join('')}
                ${product.modules.length > 4
            ? `<span class="badge bg-primary-subtle text-primary extra-small font-semibold">+${product.modules.length - 4} more</span>`
            : ''
          }
              </div>
            </div>
            <div class="pt-3 border-top d-flex flex-column gap-2 mt-auto">
              <button type="button" class="btn btn-outline-primary w-100 rounded-3 fw-semibold small d-flex align-items-center justify-content-center gap-2" data-view-product="${esc(product.id)}">
                <i class="bi bi-eye"></i>
                <span>View Modules & Features</span>
              </button>
              <button type="button" class="btn btn-brand-primary w-100 rounded-3 fw-semibold small d-flex align-items-center justify-content-center gap-2" data-demo-product="${esc(product.name)}" data-demo-product-id="${esc(product.id)}">
                <i class="bi bi-calendar-event"></i>
                <span>Request Live Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>`
      )
      .join('');

    this.grid.querySelectorAll('[data-view-product]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const product = READY_SOFTWARE_PRODUCTS.find((p) => p.id === btn.getAttribute('data-view-product'));
        if (product) {
          window.location.href = `${slugify(product.name)}.html`;
        }
      });
    });

    this.grid.querySelectorAll('[data-demo-product]').forEach((btn) => {
      btn.addEventListener('click', () => {
        QuoteModal.open(btn.getAttribute('data-demo-product'), btn.getAttribute('data-demo-product-id'));
      });
    });

    if (window.AOS) window.AOS.refreshHard();
  },
};

/* --------------------------------------------------------------------------
   Product Detail Modal
   -------------------------------------------------------------------------- */
const ProductDetailModal = {
  init() {
    this.el = document.getElementById('productDetailModal');
    if (!this.el) return; // this modal markup only exists on index.html
    this.body = document.getElementById('productDetailBody');
    document.querySelectorAll('[data-close-product-modal]').forEach((btn) => {
      btn.addEventListener('click', () => this.close());
    });
    const demoBtn = document.getElementById('productDetailDemoBtn');
    if (demoBtn) {
      demoBtn.addEventListener('click', () => {
        const productName = this.el.dataset.currentProduct;
        this.close();
        QuoteModal.open(productName);
      });
    }
  },

  open(product) {
    if (!product || !this.el) return;
    this.el.dataset.currentProduct = product.name;

    document.getElementById('productDetailIcon').className = `bi ${product.icon} fs-2`;
    document.getElementById('productDetailCategory').textContent = product.category;
    document.getElementById('productDetailName').textContent = product.name;
    document.getElementById('productDetailTarget').textContent = product.targetUsers;
    document.getElementById('productDetailOverview').textContent = product.fullDescription;

    document.getElementById('productDetailModulesCount').textContent = product.modules.length;
    document.getElementById('productDetailModules').innerHTML = product.modules
      .map(
        (mod) => `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="p-2 bg-light rounded-3 border d-flex align-items-center gap-2 small fw-semibold text-dark">
          <i class="bi bi-check2-square text-primary"></i>
          <span>${esc(mod)}</span>
        </div>
      </div>`
      )
      .join('');

    document.getElementById('productDetailFeatures').innerHTML = product.features
      .map(
        (feat) => `
      <li class="list-group-item d-flex align-items-center gap-2 text-dark small py-2">
        <i class="bi bi-patch-check-fill text-success fs-6"></i>
        <span>${esc(feat)}</span>
      </li>`
      )
      .join('');

    this.el.classList.add('show', 'd-block');
    document.body.classList.add('modal-open');
    QuoteModal.ensureBackdrop(true);
  },

  close() {
    this.el.classList.remove('show', 'd-block');
    document.body.classList.remove('modal-open');
    QuoteModal.ensureBackdrop(false);
  },
};


/* --------------------------------------------------------------------------
   Service Detail Modal
   -------------------------------------------------------------------------- */
const ServiceDetailModal = {
  init() {
    this.el = document.getElementById('serviceDetailModal');
    if (!this.el) return; // this modal markup only exists on index.html
    document.querySelectorAll('[data-close-service-modal]').forEach((btn) => {
      btn.addEventListener('click', () => this.close());
    });
    const quoteBtn = document.getElementById('serviceDetailQuoteBtn');
    if (quoteBtn) {
      quoteBtn.addEventListener('click', () => {
        const serviceName = this.el.dataset.currentService;
        this.close();
        QuoteModal.open(`Service Request: ${serviceName}`);
      });
    }
  },

  open(service) {
    if (!service) return;
    this.el.dataset.currentService = service.title;

    document.getElementById('serviceDetailIcon').className = `bi ${service.iconName} fs-2`;
    document.getElementById('serviceDetailBadge').textContent = service.badge || 'Service';
    document.getElementById('serviceDetailName').textContent = service.title;
    document.getElementById('serviceDetailDescription').textContent = service.fullDescription || service.description;

    document.getElementById('serviceDetailFeatures').innerHTML = service.features
      .map(
        (feat) => `
      <li class="list-group-item d-flex align-items-center gap-2 text-dark small py-2">
        <i class="bi bi-patch-check-fill text-success fs-6"></i>
        <span>${esc(feat)}</span>
      </li>`
      )
      .join('');

    this.el.classList.add('show', 'd-block');
    document.body.classList.add('modal-open');
    QuoteModal.ensureBackdrop(true);
  },

  close() {
    this.el.classList.remove('show', 'd-block');
    document.body.classList.remove('modal-open');
    QuoteModal.ensureBackdrop(false);
  },
};


/* --------------------------------------------------------------------------
   Tech Stack
   -------------------------------------------------------------------------- */
const TechStackSection = {
  selectedCategory: 'All',
  categories: ['Frontend', 'Backend', 'Mobile', 'Databases', 'Languages & Tools'],

  init() {
    this.tabsEl = document.getElementById('techStackTabs');
    if (!this.tabsEl) return; // section only exists on index.html
    this.grid = document.getElementById('techStackGrid');

    this.tabsEl.innerHTML =
      `<button type="button" class="filter-tab-btn active" data-tech-category="All">All Tech Stack</button>` +
      this.categories
        .map((cat) => `<button type="button" class="filter-tab-btn" data-tech-category="${esc(cat)}">${esc(cat)}</button>`)
        .join('');

    this.tabsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-tech-category]');
      if (!btn) return;
      this.selectedCategory = btn.getAttribute('data-tech-category');
      this.tabsEl.querySelectorAll('[data-tech-category]').forEach((b) => {
        b.classList.toggle('active', b === btn);
      });
      this.render();
    });

    this.render();
  },

  render() {
    const list =
      this.selectedCategory === 'All' ? TECH_STACK : TECH_STACK.filter((t) => t.category === this.selectedCategory);

    this.grid.innerHTML = list
      .map(
        (tech, index) => `
  <div class="col-4 col-md-3 col-lg-9th" data-aos="zoom-in" data-aos-delay="${index * 30}">
        <div class="tech-card h-100 d-flex flex-column align-items-center justify-content-center position-relative overflow-hidden">
          <div class="tech-icon mb-2"><i class="${esc(tech.iconClass)}"></i></div>
          <h6 class="fw-bold font-heading text-dark mb-0 fs-6 tech-name">${esc(tech.name)}</h6>
          <div class="tech-description position-absolute w-100 h-100 d-flex align-items-center justify-content-center p-3">
            <p class="text-white small mb-0 text-center leading-tight">${esc(tech.description)}</p>
          </div>
        </div>
      </div>`
      )
      .join('');

    if (window.AOS) window.AOS.refreshHard();
  },
};

/* --------------------------------------------------------------------------
   Industries We Serve
   -------------------------------------------------------------------------- */
function renderIndustries() {
  const grid = document.getElementById('industriesGrid');
  if (!grid) return;

  grid.innerHTML = INDUSTRIES.map(
    (item, idx) => `
    <div class="col-4 col-md-3 col-lg-2" data-aos="zoom-in" data-aos-delay="${idx * 40}">
      <div class="industry-card h-100 d-flex flex-column align-items-center justify-content-center text-center">
        <div class="industry-icon mb-2" style="background:${esc(item.color)}22;color:${esc(item.color)};">
          <i class="bi ${esc(item.icon)}"></i>
        </div>
        <h6 class="industry-name fw-bold font-heading mb-0">${esc(item.name)}</h6>
      </div>
    </div>`
  ).join('');

  if (window.AOS) window.AOS.refreshHard();
}

/* --------------------------------------------------------------------------
   Stats Counter
   -------------------------------------------------------------------------- */
function renderStats() {
  const grid = document.getElementById('statsGrid');
  if (!grid) return; // JS-rendered stats grid only exists on index.html (about.html has its own static markup)
  grid.innerHTML = COMPANY_STATS.map(
    (stat) => `
    <div class="stat-card">
      <span class="stat-card-value">${esc(stat.value)}</span>
      <span class="stat-card-label">${esc(stat.label)}</span>
    </div>`
  ).join('');
}

/* --------------------------------------------------------------------------
   Recent Blogs
   -------------------------------------------------------------------------- */
function renderBlogs() {
  const grid = document.getElementById('blogsGrid');
  if (!grid) return;

  grid.innerHTML = BLOG_POSTS.map(
    (post, idx) => `
    <div class="col-12 col-sm-6 col-lg-4" data-aos="fade-up" data-aos-delay="${idx * 80}">
      <a href="blog-details.html?id=${encodeURIComponent(post.id)}" class="blog-card-link text-decoration-none d-block h-100">
        <div class="card card-modern card-hover-lift h-100 border overflow-hidden p-0 d-flex flex-column">
          <div class="blog-card-img-wrap position-relative">
            <img src="${esc(post.image)}" alt="${esc(post.title)}" class="blog-card-img" loading="lazy">
            <span class="badge-gold blog-card-badge">${esc(post.category)}</span>
          </div>
          <div class="p-4 d-flex flex-column flex-grow-1">
            <span class="text-muted extra-small d-block mb-2"><i class="bi bi-calendar3 me-1"></i> ${esc(post.date)}</span>
            <h5 class="fw-bold font-heading text-dark mb-2 fs-5 blog-card-title">${esc(post.title)}</h5>
            <p class="text-muted small leading-relaxed mb-3 flex-grow-1">${esc(post.excerpt)}</p>
            <span class="fw-semibold small text-primary d-flex align-items-center gap-1 mt-auto">
              Read Full Article <i class="bi bi-arrow-right"></i>
            </span>
          </div>
        </div>
      </a>
    </div>`
  ).join('');

  if (window.AOS) window.AOS.refreshHard();
}

/* --------------------------------------------------------------------------
   Leadership Team
   -------------------------------------------------------------------------- */
function renderTeam() {
  const grid = document.getElementById('teamGrid');
  if (!grid) return;

  grid.innerHTML = TEAM_MEMBERS.map(
    (member, idx) => `
    <div class="col-12 col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="${idx * 80}">
      <div class="team-card-v2 h-100">
        <img src="${esc(member.image)}" alt="${esc(member.name)}" class="team-photo-v2" loading="lazy">
        <div class="team-overlay-v2">
          <h5 class="team-name-v2 font-heading">${esc(member.name)}</h5>
          <span class="team-designation-pill">${esc(member.designation)}</span>
          <div class="team-social-row-v2">
            <a href="${esc(member.facebook)}" target="_blank" rel="noreferrer"
              class="team-social-btn-v2" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
            <a href="${esc(member.linkedin)}" target="_blank" rel="noreferrer"
              class="team-social-btn-v2" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>
    </div>`
  ).join('');

  if (window.AOS) window.AOS.refreshHard();
}

/* --------------------------------------------------------------------------
   Clients & Testimonials - Auto Sliding
   -------------------------------------------------------------------------- */
function renderClientsAndTestimonials() {
  // Render Clients Grid (static, max 4 rows x 8 per row = 32 logos)
  const clientsGrid = document.getElementById('clientsGrid');
  if (clientsGrid) {
    const MAX_CLIENTS_DISPLAY = 32;
    const displayClients = CLIENT_LOGOS.slice(0, MAX_CLIENTS_DISPLAY);

    clientsGrid.innerHTML = displayClients.map(
      (client) => `
      <div class="client-col" data-aos="zoom-in">
        <div class="client-card d-flex flex-column align-items-center justify-content-center">
          <div class="client-logo-box-grid">
            <img src="${esc(client.image)}" alt="${esc(client.name)}" loading="lazy">
          </div>
        </div>
      </div>`
    ).join('');
  }

  // Render Testimonials Slider
  const sliderTrack = document.getElementById('testimonialsSliderTrack');
  if (sliderTrack) {
    // Double the testimonials for seamless loop
    const allTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

    sliderTrack.innerHTML = allTestimonials.map(
      (t) => `
      <div class="testimonial-slide flex-shrink-0 px-3" style="width:320px;">
        <div class="card card-modern h-100 p-4 border shadow-sm" style="min-height:280px;">
          <div class="d-flex align-items-center gap-1 text-warning mb-3">
            ${'<i class="bi bi-star-fill fs-6"></i>'.repeat(t.rating)}
          </div>
          <p class="text-muted small leading-relaxed mb-3 flex-grow-1">"${esc(t.text)}"</p>
          <div class="pt-3 border-top d-flex align-items-center gap-3">
            <img src="${esc(t.avatar)}" alt="${esc(t.name)}" class="rounded-circle object-fit-cover border" style="width:46px;height:46px;">
            <div>
              <h6 class="fw-bold text-dark font-heading mb-0 small">${esc(t.name)}</h6>
              <span class="text-muted extra-small d-block">${esc(t.role)}</span>
              <span class="text-primary fw-semibold extra-small">${esc(t.company)}</span>
            </div>
          </div>
        </div>
      </div>`
    ).join('');
  }

  // Initialize the auto-sliding animations
  initAutoSliders();
}

/* --------------------------------------------------------------------------
   Built by People Who Deliver — Auto Sliding Culture Gallery
   -------------------------------------------------------------------------- */
function renderCultureGallery() {
  const track = document.getElementById('cultureSliderTrack');
  if (!track) return;

  // Triple the set for a seamless infinite loop
  const allPhotos = [...CULTURE_GALLERY, ...CULTURE_GALLERY, ...CULTURE_GALLERY];

  track.innerHTML = allPhotos.map(
    (item) => `
    <div class="culture-slide flex-shrink-0 px-2">
      <div class="culture-card">
        <img src="${esc(item.image)}" alt="${esc(item.caption)}" loading="lazy">
        <span class="culture-caption">${esc(item.caption)}</span>
      </div>
    </div>`
  ).join('');

  track.style.animation = 'none';
  void track.offsetWidth;
  track.style.animation = 'cultureScroll 55s linear infinite';
}

/* --------------------------------------------------------------------------
   Auto Sliding Animations
   -------------------------------------------------------------------------- */
function initAutoSliders() {
  // Testimonials Slider - Slower speed (Clients section is now a static grid)
  const sliderTrack = document.getElementById('testimonialsSliderTrack');
  if (sliderTrack) {
    sliderTrack.style.animation = 'none';
    void sliderTrack.offsetWidth;
    sliderTrack.style.animation = 'testimonialScroll 70s linear infinite';
  }
}


/* --------------------------------------------------------------------------
   Domain Search
   -------------------------------------------------------------------------- */
function initDomainSearch() {
  const form = document.getElementById('domainSearchForm');
  if (!form) return; // section only exists on index.html
  const tldSelect = document.getElementById('domainTldSelect');
  const queryInput = document.getElementById('domainQueryInput');
  const submitBtn = document.getElementById('domainSearchSubmit');
  const resultBox = document.getElementById('domainResultBox');
  const resultName = document.getElementById('domainResultName');
  const resultPrice = document.getElementById('domainResultPrice');
  const orderBtn = document.getElementById('domainOrderBtn');
  const pricingGrid = document.getElementById('domainPricingGrid');

  // Populate TLD select
  tldSelect.innerHTML = DOMAIN_PRICING.map(
    (d) => `<option value="${esc(d.tld)}">${esc(d.tld)}</option>`
  ).join('');

  // Populate pricing grid tags
  pricingGrid.innerHTML = DOMAIN_PRICING.map(
    (item) => `
    <div class="col-6 col-sm-4 col-md-3 col-lg-8th">
      <div class="card card-modern p-3 text-center cursor-pointer h-100 domain-pricing-card" data-tld="${esc(item.tld)}">
        ${item.tag ? `<span class="badge ${item.popular ? 'bg-warning text-dark' : 'bg-secondary'} mb-2 text-truncate">${esc(item.tag)}</span>` : ''}
        <h5 class="fw-extrabold text-primary font-heading mb-1">${esc(item.tld)}</h5>
        <div class="fw-bold text-dark fs-5">${esc(item.priceBdt)}<span class="text-muted extra-small">${esc(item.period)}</span></div>
        
      </div>
    </div>`
  ).join('');


  function matchedPricing() {
    return DOMAIN_PRICING.find((d) => d.tld === tldSelect.value) || DOMAIN_PRICING[0];
  }

  function highlightSelectedTld() {
    pricingGrid.querySelectorAll('.domain-pricing-card').forEach((card) => {
      card.classList.toggle('border-primary', card.dataset.tld === tldSelect.value);
      card.classList.toggle('bg-primary', card.dataset.tld === tldSelect.value);
      card.classList.toggle('bg-opacity-10', card.dataset.tld === tldSelect.value);
      card.classList.toggle('shadow-sm', card.dataset.tld === tldSelect.value);
    });
  }
  highlightSelectedTld();

  pricingGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.domain-pricing-card');
    if (!card) return;
    tldSelect.value = card.dataset.tld;
    highlightSelectedTld();
    if (queryInput.value.trim()) {
      showResult();
    }
  });

  function showResult() {
    const cleaned = queryInput.value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    const domain = `${cleaned}${tldSelect.value}`;
    const pricing = matchedPricing();
    resultName.textContent = `${domain} is available!`;
    resultPrice.innerHTML = `Price: <strong class="text-dark">${esc(pricing.priceBdt)}</strong> (${esc(pricing.priceUsd)}) ${esc(pricing.period)} \u2022 Free SSL & cPanel DNS Included`;
    orderBtn.dataset.domain = domain;
    orderBtn.dataset.tld = pricing.tld;
    orderBtn.dataset.price = pricing.priceBdt;
    resultBox.classList.remove('d-none');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!queryInput.value.trim()) return;
    resultBox.classList.add('d-none');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span>Checking...</span>';
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="bi bi-lightning-charge-fill"></i><span>Check Domain</span>';
      showResult();
    }, 600);
  });

  queryInput.addEventListener('input', () => resultBox.classList.add('d-none'));

  orderBtn.addEventListener('click', () => {
    QuoteModal.open(`Domain Registration: ${orderBtn.dataset.domain} (${orderBtn.dataset.price})`);
  });
}

/* --------------------------------------------------------------------------
   Premium UI Animations & Micro-interactions (additive, non-breaking)
   -------------------------------------------------------------------------- */
function initPremiumAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest(
        '.btn-brand-primary, .btn-outline-light, .btn-outline-primary, .btn-outline-secondary, .btn-success, .filter-tab-btn'
      );
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple-ink';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  }

  // img 'load' doesn't bubble — use the capturing phase to catch all images
  document.addEventListener('load', (e) => {
    if (e.target.tagName === 'IMG') e.target.classList.add('img-loaded');
  }, true);

  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    if (img.complete) img.classList.add('img-loaded-fallback');
  });

  const statValues = document.querySelectorAll('.stat-card-value');
  if (statValues.length && 'IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.textContent.trim();
        const match = raw.match(/^(\d+)(.*)$/);
        observer.unobserve(el);
        if (!match || prefersReduced) return;
        const target = parseInt(match[1], 10);
        const suffix = match[2];
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = `${Math.round(target * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = raw;
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    statValues.forEach((el) => statObserver.observe(el));
  }

  const revealEls = document.querySelectorAll('.reveal-init');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => revealObserver.observe(el));
  }
}

window.addEventListener('load', () => {
  document.body.classList.add('page-loaded');
});


/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  fillCompanyInfo();
  initNavbarScroll();
  syncNavbarHeightVar();
  window.addEventListener('resize', syncNavbarHeightVar);
  HeroSlider.init();
  renderProductsNavMenu();
  initDesktopDropdownHover();
  QuoteModal.init();
  ProductDetailModal.init();
  ServiceDetailModal.init();
  initContactForm();
  initDomainSearch();
  renderServices();
  ReadySoftwareGallery.init();
  TechStackSection.init();
  renderStats();
  renderIndustries();
  renderBlogs();
  renderTeam();
  renderCultureGallery();
  renderClientsAndTestimonials();
  initPremiumAnimations();

  if (window.AOS) {
    window.AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  }
});
