/* ==========================================================================
   STITBD — About Page Script
   Self-contained subset of the homepage logic. Only touches DOM that
   actually exists on about.html (navbar, quote modal, footer, animations),
   so it never throws on missing homepage-only sections like the Ready
   Software gallery or Domain Search.
   ========================================================================== */

function escAbout(str) {
    const div = document.createElement('div');
    div.textContent = String(str ?? '');
    return div.innerHTML;
}

function waLinkAbout(message) {
    const digits = COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '');
    return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

/* --------------------------------------------------------------------------
   Static company info (footer)
   -------------------------------------------------------------------------- */
function fillCompanyInfoAbout() {
    document.querySelectorAll('[data-since-year]').forEach((el) => (el.textContent = COMPANY_INFO.sinceYear));
    document.querySelectorAll('[data-copyright-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
    document.querySelectorAll('[data-company-address]').forEach((el) => (el.textContent = COMPANY_INFO.address));
    document.querySelectorAll('[data-company-phone-primary]').forEach((el) => (el.textContent = COMPANY_INFO.phonePrimary));
    document.querySelectorAll('[data-company-email]').forEach((el) => (el.textContent = COMPANY_INFO.email));
    document.querySelectorAll('[data-wa-link]').forEach((el) => (el.href = waLinkAbout()));
    document.querySelectorAll('[data-fb-link]').forEach((el) => (el.href = COMPANY_INFO.facebook));
    document.querySelectorAll('[data-li-link]').forEach((el) => (el.href = COMPANY_INFO.linkedin));
    document.querySelectorAll('[data-yt-link]').forEach((el) => (el.href = COMPANY_INFO.youtube));
    document.querySelectorAll('[data-gh-link]').forEach((el) => (el.href = COMPANY_INFO.github));
}

/* --------------------------------------------------------------------------
   Navbar: scroll shadow + smart hide/show (desktop), always visible (mobile)
   -------------------------------------------------------------------------- */
function initNavbarBehaviorAbout() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;

    let lastScrollY = 0;
    let isHidden = false;
    let ticking = false;

    function updateNavbar() {
        const currentScrollY = window.scrollY;
        const isDesktop = window.innerWidth >= 992;

        if (isDesktop) {
            if (currentScrollY <= 50) {
                navbar.classList.remove('hidden');
                navbar.classList.add('scrolled');
                isHidden = false;
            } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
                if (!isHidden) {
                    navbar.classList.add('hidden');
                    navbar.classList.remove('scrolled');
                    isHidden = true;
                }
            } else if (currentScrollY < lastScrollY) {
                if (isHidden) {
                    navbar.classList.remove('hidden');
                    navbar.classList.add('scrolled');
                    isHidden = false;
                }
            }
        } else {
            navbar.classList.remove('hidden');
            navbar.classList.add('scrolled');
            isHidden = false;
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth < 992) {
            navbar.classList.remove('hidden');
            navbar.classList.add('scrolled');
            isHidden = false;
        }
        updateNavbar();
    });

    navbar.classList.add('scrolled');

    const nav = document.getElementById('mainNavbar');
    if (nav) document.documentElement.style.setProperty('--navbar-height', `${nav.offsetHeight}px`);
}

/* --------------------------------------------------------------------------
   Desktop Navbar Dropdowns: open on hover (>=992px)
   -------------------------------------------------------------------------- */
function initDesktopDropdownHoverAbout() {
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
   Products Nav Dropdown — links back to the homepage gallery
   (about.html has no #ready-software section, so we navigate there instead
   of trying to open the product modal in place)
   -------------------------------------------------------------------------- */
function renderProductsNavMenuAbout() {
    const desktopMenu = document.getElementById('productsDropdownMenu');
    const mobileMenu = document.getElementById('mobProductsMenu');
    if (!desktopMenu && !mobileMenu) return;

    const items = (typeof READY_SOFTWARE_PRODUCTS !== 'undefined' ? READY_SOFTWARE_PRODUCTS : [])
        .map((p) => `<li><a class="dropdown-item rounded-2" href="index.html#ready-software">${escAbout(p.name)}</a></li>`)
        .join('');

    if (desktopMenu) desktopMenu.innerHTML = items;
    if (mobileMenu) {
        mobileMenu.innerHTML = (typeof READY_SOFTWARE_PRODUCTS !== 'undefined' ? READY_SOFTWARE_PRODUCTS : [])
            .map((p) => `<li data-bs-dismiss="offcanvas"><a class="text-dark text-decoration-none" href="index.html#ready-software">${escAbout(p.name)}</a></li>`)
            .join('');
    }
}

/* --------------------------------------------------------------------------
   Quote / Cost Estimator Modal
   -------------------------------------------------------------------------- */
const QuoteModalAbout = {
    init() {
        this.el = document.getElementById('quoteModal');
        if (!this.el) return; // page has no modal markup — nothing to wire up

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

        if (this.productSelect && typeof READY_SOFTWARE_PRODUCTS !== 'undefined') {
            this.productSelect.innerHTML = READY_SOFTWARE_PRODUCTS.map(
                (p) => `<option value="${escAbout(p.name)}">${escAbout(p.name)}</option>`
            ).join('');
        }

        this.serviceTypeSelect?.addEventListener('change', () => this.syncProductField());

        document.getElementById('quoteForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.showSuccess();
        });

        document.querySelectorAll('[data-open-quote-modal]').forEach((btn) => {
            btn.addEventListener('click', () => this.open());
        });

        document.querySelectorAll('[data-close-quote-modal]').forEach((btn) => {
            btn.addEventListener('click', () => this.close());
        });
    },

    syncProductField() {
        if (!this.productField || !this.serviceTypeSelect) return;
        const isReady = this.serviceTypeSelect.value === 'Ready Software Purchase';
        this.productField.classList.toggle('d-none', !isReady);
    },

    open() {
        this.reset();
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
        document.getElementById('quoteForm')?.reset();
        this.formSection?.classList.remove('d-none');
        this.successSection?.classList.add('d-none');
        if (this.dynamicFieldsContainer) this.dynamicFieldsContainer.innerHTML = '';
    },

    showSuccess() {
        const serviceType = this.serviceTypeSelect?.value ?? '';
        const name = this.nameInput?.value ?? '';
        const phone = this.phoneInput?.value ?? '';
        const product = this.productSelect?.value ?? '';

        if (this.successName) this.successName.textContent = name;
        if (this.successServiceType) this.successServiceType.textContent = serviceType;
        if (this.successPhone) this.successPhone.textContent = phone;
        if (this.waButton) {
            this.waButton.href = waLinkAbout(
                `Hello STITBD, I submitted a quote request for ${serviceType} (${product}). Name: ${name}, Phone: ${phone}`
            );
        }

        this.formSection?.classList.add('d-none');
        this.successSection?.classList.remove('d-none');
    },
};

/* --------------------------------------------------------------------------
   Premium UI Animations & Micro-interactions
   -------------------------------------------------------------------------- */
function initPremiumAnimationsAbout() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest(
                '.btn-brand-primary, .btn-brand-gold, .btn-outline-light, .btn-outline-primary, .btn-outline-secondary, .btn-success, .filter-tab-btn'
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
}

window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
});

/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    fillCompanyInfoAbout();
    initNavbarBehaviorAbout();
    renderProductsNavMenuAbout();
    initDesktopDropdownHoverAbout();
    QuoteModalAbout.init();
    initPremiumAnimationsAbout();

    if (window.AOS) {
        window.AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
    }
});