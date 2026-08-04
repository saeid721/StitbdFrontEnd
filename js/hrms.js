/* ==========================================================================
   hrms.js — page-specific logic for hr-and-payroll-management-software.html
   Depends on data.js + app.js being loaded first (uses esc(), COMPANY_INFO,
   CLIENT_PROJECTS, QuoteModal from app.js/data.js).
   ========================================================================== */

const HRMS_OBJECTIVES = [
    { icon: 'bi-diagram-3-fill', title: 'Streamline HR Processes' },
    { icon: 'bi-hourglass-split', title: 'Save Time & Resources' },
    { icon: 'bi-patch-check-fill', title: 'Ensure Data Accuracy' },
    { icon: 'bi-shield-lock-fill', title: 'Enhance Security & Compliance' },
    { icon: 'bi-plug-fill', title: 'Enable Seamless Integration' },
    { icon: 'bi-emoji-smile-fill', title: 'Improve Employee Experience' },
];

const HRMS_FEATURES = [
    { icon: 'bi-building-gear', title: 'Company & Branch Setup' },
    { icon: 'bi-person-vcard-fill', title: 'Employee Information Management' },
    { icon: 'bi-fingerprint', title: 'Attendance & Shift Management' },
    { icon: 'bi-calendar2-check-fill', title: 'Leave & Holiday Management' },
    { icon: 'bi-cash-stack', title: 'Payroll & Salary Processing' },
    { icon: 'bi-piggy-bank-fill', title: 'Allowance & Deduction Management' },
    { icon: 'bi-bank2', title: 'Loan Management' },
    { icon: 'bi-award-fill', title: 'Performance Evaluation & KPI Tracking' },
    { icon: 'bi-box-arrow-right', title: 'Resignation & Final Settlement' },
    { icon: 'bi-safe2-fill', title: 'Provident Fund Management' },
    { icon: 'bi-receipt-cutoff', title: 'Tax Calculation & Certificate' },
    { icon: 'bi-key-fill', title: 'Role-Based Access & User Control' },
    { icon: 'bi-bar-chart-line-fill', title: 'Real-Time HR & Payroll Reporting' },
];

const HRMS_MODULES = [
    {
        id: 'company-setup', title: 'Company Setup', icon: 'bi-building-gear',
        body: 'Manage your entire organizational structure — branches, departments, designations, work schedules and holidays — with flexible, role-based settings that mirror how your business is actually organized.',
    },
    {
        id: 'employee-info', title: 'Employee Information', icon: 'bi-person-vcard-fill',
        body: 'One record per employee: personal details, documents, job history and emergency contacts, kept searchable and audit-ready instead of scattered across spreadsheets.',
    },
    {
        id: 'attendance', title: 'Attendance Management', icon: 'bi-fingerprint',
        body: 'Biometric and mobile check-in sync straight into shift rosters, so late marks, overtime and absences are calculated automatically — no manual register required.',
    },
    {
        id: 'leave', title: 'Leave Management', icon: 'bi-calendar2-check-fill',
        body: 'Configurable leave policies, approval chains and balances that update in real time, visible to both employees and managers from the mobile app.',
    },
    {
        id: 'payroll', title: 'Payroll & Salary', icon: 'bi-cash-stack',
        body: 'Automated salary runs that pull directly from attendance and leave data, with payslip generation and bank-ready disbursement files in a few clicks.',
    },
    {
        id: 'allowance', title: 'Allowance & Deduction', icon: 'bi-piggy-bank-fill',
        body: 'Set recurring or one-time allowances and deductions per employee or grade, and let every payroll cycle apply them consistently and transparently.',
    },
    {
        id: 'loan', title: 'Loan Management', icon: 'bi-bank2',
        body: 'Track employee loan requests, approvals and installment schedules, with automatic deduction from monthly salary until the balance is cleared.',
    },
    {
        id: 'reports', title: 'Performance & Reports', icon: 'bi-bar-chart-line-fill',
        body: 'KPI tracking, appraisal cycles and real-time HR & payroll dashboards give leadership a clear read on workforce cost and performance at any moment.',
    },
];

function hrmsEsc(str) {
    const div = document.createElement('div');
    div.textContent = String(str ?? '');
    return div.innerHTML;
}

/* --------------------------------------------------------------------------
   Objectives + Features grids
   -------------------------------------------------------------------------- */
function renderHrmsObjectives() {
    const grid = document.getElementById('hrmsObjectivesGrid');
    if (!grid) return;
    grid.innerHTML = HRMS_OBJECTIVES.map(
        (o) => `
    <div class="col-6">
      <div class="hrms-objective-card">
        <div class="hrms-objective-icon"><i class="bi ${hrmsEsc(o.icon)}"></i></div>
        <span>${hrmsEsc(o.title)}</span>
      </div>
    </div>`
    ).join('');
}

function renderHrmsFeatures() {
    const grid = document.getElementById('hrmsFeaturesGrid');
    if (!grid) return;
    grid.innerHTML = HRMS_FEATURES.map(
        (f, i) => `
    <div class="col-6 col-md-4 col-lg-3" data-aos="fade-up" data-aos-delay="${(i % 4) * 60}">
      <div class="hrms-feature-tile">
        <div class="hrms-feature-tile-icon"><i class="bi ${hrmsEsc(f.icon)}"></i></div>
        <span>${hrmsEsc(f.title)}</span>
      </div>
    </div>`
    ).join('');
}

/* --------------------------------------------------------------------------
   Modules tab explorer
   -------------------------------------------------------------------------- */
const HrmsModulesExplorer = {
    active: HRMS_MODULES[0].id,

    init() {
        this.nav = document.getElementById('hrmsModulesNav');
        this.panel = document.getElementById('hrmsModulesPanel');
        if (!this.nav || !this.panel) return;

        this.nav.innerHTML = HRMS_MODULES.map(
            (m) => `
      <button type="button" class="hrms-module-nav-item${m.id === this.active ? ' active' : ''}" data-module="${hrmsEsc(m.id)}" role="tab">
        <i class="bi ${hrmsEsc(m.icon)}"></i>
        <span>${hrmsEsc(m.title)}</span>
        <i class="bi bi-chevron-right hrms-module-nav-arrow"></i>
      </button>`
        ).join('');

        this.nav.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-module]');
            if (!btn) return;
            this.active = btn.getAttribute('data-module');
            this.syncNav();
            this.renderPanel();
        });

        this.renderPanel();
    },

    syncNav() {
        this.nav.querySelectorAll('[data-module]').forEach((btn) => {
            btn.classList.toggle('active', btn.getAttribute('data-module') === this.active);
        });
    },

    renderPanel() {
        const mod = HRMS_MODULES.find((m) => m.id === this.active) || HRMS_MODULES[0];
        this.panel.innerHTML = `
      <div class="hrms-module-panel-inner">
        <div class="hrms-module-panel-icon"><i class="bi ${hrmsEsc(mod.icon)}"></i></div>
        <h4 class="fw-bold text-dark mb-2">${hrmsEsc(mod.title)}</h4>
        <p class="text-muted mb-4">${hrmsEsc(mod.body)}</p>
        <button type="button" class="btn btn-brand-primary rounded-pill px-4 py-2 fw-bold" data-open-quote-modal="HR & Payroll Management Software">
          Request This Module <i class="bi bi-arrow-right ms-1"></i>
        </button>
      </div>`;

        // Buttons rendered dynamically need their own listener since app.js
        // only wires up [data-open-quote-modal] elements present at DOMContentLoaded.
        this.panel.querySelectorAll('[data-open-quote-modal]').forEach((btn) => {
            btn.addEventListener('click', () => {
                if (typeof QuoteModal !== 'undefined') QuoteModal.open(btn.getAttribute('data-open-quote-modal'));
            });
        });
    },
};

/* --------------------------------------------------------------------------
   Condensed client trust-strip (first N logos from CLIENT_PROJECTS)
   -------------------------------------------------------------------------- */
function renderHrmsClientsStrip() {
    const strip = document.getElementById('hrmsClientsStrip');
    if (!strip || typeof CLIENT_PROJECTS === 'undefined') return;
    const list = CLIENT_PROJECTS.slice(0, 12);
    strip.innerHTML = list.map(
        (c) => `<div class="hrms-client-chip" title="${hrmsEsc(c.name)}"><img src="${hrmsEsc(c.logo)}" alt="${hrmsEsc(c.name)}" loading="lazy"></div>`
    ).join('');
}

/* --------------------------------------------------------------------------
   Hero parallax — mouse move (desktop) + scroll drift, reduced-motion safe
   -------------------------------------------------------------------------- */
function initHrmsParallax() {
    const field = document.getElementById('hrmsParallaxField');
    const hero = document.getElementById('hrmsHero');
    if (!field || !hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const icons = field.querySelectorAll('.hrms-parallax-icon');

    hero.addEventListener('pointermove', (e) => {
        const rect = hero.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        icons.forEach((icon) => {
            const depth = parseFloat(icon.getAttribute('data-depth')) || 0.5;
            icon.style.transform = `translate3d(${px * 30 * depth}px, ${py * 30 * depth}px, 0)`;
        });
    });

    hero.addEventListener('pointerleave', () => {
        icons.forEach((icon) => { icon.style.transform = 'translate3d(0,0,0)'; });
    });

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const heroRect = hero.getBoundingClientRect();
            if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
                icons.forEach((icon) => {
                    const depth = parseFloat(icon.getAttribute('data-depth')) || 0.5;
                    icon.style.setProperty('--scrollShift', `${scrollY * 0.04 * depth}px`);
                });
            }
            ticking = false;
        });
    });
}

/* --------------------------------------------------------------------------
   Custom-work form -> reuses the existing QuoteModal success screen
   -------------------------------------------------------------------------- */
function initHrmsCustomForm() {
    const form = document.getElementById('hrmsCustomForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('hrmsCustomName').value;
        const email = document.getElementById('hrmsCustomEmail').value;
        const phone = document.getElementById('hrmsCustomPhone').value;
        const country = document.getElementById('hrmsCustomCountry').value;
        const notes = document.getElementById('hrmsCustomNotes').value;

        if (typeof QuoteModal === 'undefined') return;
        QuoteModal.open('HR & Payroll Management Software');

        document.getElementById('quoteName').value = name;
        document.getElementById('quotePhone').value = phone || 'N/A';
        document.getElementById('quoteEmail').value = email;
        document.getElementById('quoteNotes').value = `${notes ? notes + ' — ' : ''}Country: ${country}`;

        QuoteModal.showSuccess();
    });
}

/* --------------------------------------------------------------------------
   Fill in the two contact rows that don't use the generic data- attributes
   -------------------------------------------------------------------------- */
function fillHrmsContactLinks() {
    const emailLink = document.querySelector('[data-company-email-link]');
    if (emailLink && typeof COMPANY_INFO !== 'undefined') emailLink.href = `mailto:${COMPANY_INFO.email}`;
    const phoneLink = document.querySelector('[data-company-phone-link]');
    if (phoneLink && typeof COMPANY_INFO !== 'undefined') phoneLink.href = `tel:${COMPANY_INFO.phoneSecondary.replace(/[^0-9+]/g, '')}`;
}

/* --------------------------------------------------------------------------
   Boot (runs after app.js's own DOMContentLoaded handler since this file
   is included after app.js — window.QuoteModal is already initialized)
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    renderHrmsObjectives();
    renderHrmsFeatures();
    HrmsModulesExplorer.init();
    renderHrmsClientsStrip();
    initHrmsParallax();
    initHrmsCustomForm();
    fillHrmsContactLinks();

    if (window.AOS) window.AOS.refreshHard();
});