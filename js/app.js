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
   Hero Background Slider (auto-rotating photo slideshow)
   -------------------------------------------------------------------------- */
const HeroSlider = {
  images: [
    'asset/slider/01.jpg',
    'asset/slider/02.jpg',
    'asset/slider/03.jpg',
    'asset/slider/04.jpg',
    'asset/slider/05.png',
    'asset/slider/06.png',
    'asset/slider/07.jpg',
  ],
  current: 0,
  timer: null,

  init() {
    this.track = document.getElementById('heroSliderBg');
    if (!this.track) return;

    this.track.innerHTML = this.images
      .map(
        (src, i) =>
          `<div class="hero-slider-slide${i === 0 ? ' active' : ''}" style="background-image:url('${esc(src)}');"></div>`
      )
      .join('');

    this.slides = this.track.querySelectorAll('.hero-slider-slide');
    if (this.slides.length > 1) {
      this.timer = setInterval(() => this.next(), 5000);
    }
  },

  next() {
    this.slides[this.current].classList.remove('active');
    this.current = (this.current + 1) % this.slides.length;
    this.slides[this.current].classList.add('active');
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
  });
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

  open(prefillProduct) {
    this.reset();
    if (prefillProduct) {
      // Mirror React logic: a prefill implies "Ready Software Purchase" only
      // when it exactly matches a known product name; otherwise it's used
      // as free-form context for a general/service quote request.
      const matched = READY_SOFTWARE_PRODUCTS.find((p) => p.name === prefillProduct);
      if (matched) {
        this.serviceTypeSelect.value = 'Ready Software Purchase';
        this.productSelect.value = matched.name;
      } else {
        // Custom notes field: stash the prefill text into the notes textarea
        document.getElementById('quoteNotes').value = prefillProduct;
      }
    }
    this.syncProductField();
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
  },

  showSuccess() {
    const serviceType = this.serviceTypeSelect.value;
    const name = this.nameInput.value;
    const phone = this.phoneInput.value;
    const product = this.productSelect.value;

    this.successName.textContent = name;
    this.successServiceType.textContent = serviceType;
    this.successPhone.textContent = phone;
    this.waButton.href = waLink(
      `Hello STITBD, I submitted a quote request for ${serviceType} (${product}). Name: ${name}, Phone: ${phone}`
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
   Domain Search
   -------------------------------------------------------------------------- */
function initDomainSearch() {
  const form = document.getElementById('domainSearchForm');
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
    <div class="col-6 col-sm-4 col-md-3 col-lg-2-4">
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
   Services Section
   -------------------------------------------------------------------------- */
function renderServices() {
  const grid = document.getElementById('servicesGrid');
  grid.innerHTML = SERVICES.map(
    (service, index) => `
    <div class="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${index * 80}">
      <div class="card card-modern card-hover-lift h-100 p-4 border d-flex flex-column justify-content-between">
        <div>
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="bg-primary bg-opacity-10 text-primary rounded-3 p-3 d-flex align-items-center justify-content-center" style="width:56px;height:56px;">
              <i class="bi ${esc(service.iconName)} fs-3"></i>
            </div>
            ${service.badge ? `<span class="badge-gold">${esc(service.badge)}</span>` : ''}
          </div>
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
        <div class="pt-3 border-top d-flex flex-column gap-2">
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
      <div class="col-12 col-sm-6 col-lg-4" data-aos="fade-up">
        <div class="card card-modern card-hover-lift h-100 border overflow-hidden p-0 d-flex flex-column justify-content-between">
          <div class="rs-card-img-wrap position-relative">
            <img src="${esc(product.image)}" alt="${esc(product.name)}" class="rs-card-img" loading="lazy">
            ${product.badge ? `<span class="badge rs-card-badge bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded-pill px-3 py-1 font-semibold small">${esc(product.badge)}</span>` : ''}
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
              <button type="button" class="btn btn-brand-primary w-100 rounded-3 fw-semibold small d-flex align-items-center justify-content-center gap-2" data-demo-product="${esc(product.name)}">
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
        ProductDetailModal.open(product);
      });
    });

    this.grid.querySelectorAll('[data-demo-product]').forEach((btn) => {
      btn.addEventListener('click', () => {
        QuoteModal.open(btn.getAttribute('data-demo-product'));
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
    this.body = document.getElementById('productDetailBody');
    document.querySelectorAll('[data-close-product-modal]').forEach((btn) => {
      btn.addEventListener('click', () => this.close());
    });
    document.getElementById('productDetailDemoBtn').addEventListener('click', () => {
      const productName = this.el.dataset.currentProduct;
      this.close();
      QuoteModal.open(productName);
    });
  },

  open(product) {
    if (!product) return;
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
    document.querySelectorAll('[data-close-service-modal]').forEach((btn) => {
      btn.addEventListener('click', () => this.close());
    });
    document.getElementById('serviceDetailQuoteBtn').addEventListener('click', () => {
      const serviceName = this.el.dataset.currentService;
      this.close();
      QuoteModal.open(`Service Request: ${serviceName}`);
    });
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
      <div class="col-4 col-md-3 col-lg-2" data-aos="zoom-in" data-aos-delay="${index * 30}">
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
   Stats Counter
   -------------------------------------------------------------------------- */
function renderStats() {
  const grid = document.getElementById('statsGrid');
  grid.innerHTML = COMPANY_STATS.map(
    (stat, idx) => `
    <div class="col-6 col-sm-6 col-md-4 col-lg-2-4" data-aos="fade-up" data-aos-delay="${idx * 80}">
      <div class="stat-card h-100 d-flex flex-column align-items-center justify-content-center text-center">
        <div class="stat-card-icon mb-2 mb-md-3"><i class="bi ${esc(stat.icon)}"></i></div>
        <h2 class="stat-card-value fw-extrabold font-heading text-white mb-1">${esc(stat.value)}</h2>
        <h6 class="stat-card-label fw-bold font-heading mb-1">${esc(stat.label)}</h6>
        <p class="stat-card-desc mb-0">${esc(stat.description)}</p>
      </div>
    </div>`
  ).join('');
}

/* --------------------------------------------------------------------------
   Clients & Testimonials - Auto Sliding
   -------------------------------------------------------------------------- */
function renderClientsAndTestimonials() {
  // Render Clients Marquee
  const marqueeTrack = document.getElementById('clientsMarqueeTrack');
  if (marqueeTrack) {
    // Double the items for seamless loop
    const allClients = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

    marqueeTrack.innerHTML = allClients.map(
      (client) => `
      <div class="client-logo-item flex-shrink-0 mx-3 d-flex flex-column align-items-center">
        <div class="client-logo-box bg-white rounded-3 p-3 d-flex align-items-center justify-content-center shadow-sm border" style="width:130px;height:90px;">
          <img src="${esc(client.image)}" alt="${esc(client.name)}" class="img-fluid" style="max-width:100%;max-height:70px;object-fit:contain;" loading="lazy">
        </div>
        <span class="client-logo-name text-muted extra-small mt-1 text-center">${esc(client.name)}</span>
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
   Auto Sliding Animations
   -------------------------------------------------------------------------- */
function initAutoSliders() {
  // Clients Marquee - Slower speed
  const marqueeTrack = document.getElementById('clientsMarqueeTrack');
  if (marqueeTrack) {
    marqueeTrack.style.animation = 'none';
    void marqueeTrack.offsetWidth;
    marqueeTrack.style.animation = 'marqueeScroll 60s linear infinite';
  }

  // Testimonials Slider - Slower speed
  const sliderTrack = document.getElementById('testimonialsSliderTrack');
  if (sliderTrack) {
    sliderTrack.style.animation = 'none';
    void sliderTrack.offsetWidth;
    sliderTrack.style.animation = 'testimonialScroll 70s linear infinite';
  }
}

/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  fillCompanyInfo();
  initNavbarScroll();
  syncNavbarHeightVar();
  window.addEventListener('resize', syncNavbarHeightVar);
  HeroSlider.init();
  initDesktopDropdownHover();
  QuoteModal.init();
  ProductDetailModal.init();
  ServiceDetailModal.init();  // <-- ADD THIS LINE
  initContactForm();
  initDomainSearch();
  renderServices();
  ReadySoftwareGallery.init();
  TechStackSection.init();
  renderStats();
  renderClientsAndTestimonials();

  if (window.AOS) {
    window.AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  }
});
