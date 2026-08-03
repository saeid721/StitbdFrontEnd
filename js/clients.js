/* ==========================================================================
   STITBD — Clients Page Logic (detailed project cards + category filters)
   Depends on data.js (CLIENT_PROJECTS) and app.js (esc helper) being loaded.
   ========================================================================== */

const ClientsPage = {
    activeCategory: 'All',
    categories: ['All', 'ERP', 'Government', 'International', 'Private'],

    init() {
        this.tabsEl = document.getElementById('clientsFilterTabs');
        if (!this.tabsEl) return; // only runs on clients.html
        this.grid = document.getElementById('clientsProjectGrid');
        this.emptyState = document.getElementById('clientsProjectEmpty');

        this.tabsEl.innerHTML = this.categories
            .map(
                (cat) =>
                    `<button type="button" class="vc-filter-btn${cat === this.activeCategory ? ' active' : ''}" data-vc-category="${esc(cat)}">${esc(cat.toUpperCase())}</button>`
            )
            .join('');

        this.tabsEl.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-vc-category]');
            if (!btn) return;
            this.activeCategory = btn.getAttribute('data-vc-category');
            this.tabsEl.querySelectorAll('[data-vc-category]').forEach((b) => {
                b.classList.toggle('active', b === btn);
            });
            this.render();
        });

        this.render();
    },

    filtered() {
        if (this.activeCategory === 'All') return CLIENT_PROJECTS;
        return CLIENT_PROJECTS.filter((c) => c.category.includes(this.activeCategory));
    },

    render() {
        const list = this.filtered();

        if (list.length === 0) {
            this.grid.innerHTML = '';
            this.grid.classList.add('d-none');
            if (this.emptyState) this.emptyState.classList.remove('d-none');
            return;
        }

        if (this.emptyState) this.emptyState.classList.add('d-none');
        this.grid.classList.remove('d-none');

        this.grid.innerHTML = list
            .map(
                (client) => `
      <div class="vc-card" data-aos="fade-up">
        <div class="vc-card-logo">
          <img src="${esc(client.logo)}" alt="${esc(client.name)}" loading="lazy">
          <span>${esc(client.name)}</span>
        </div>
        <div class="vc-card-body">
          <div class="vc-card-info">
            <p><strong>Project Name:</strong> ${esc(client.projectName)}</p>
            <div class="vc-card-products">
              <strong style="font-size:0.85rem;">Implemented Products/ Solutions:</strong>
              ${client.products.map((p) => `<span class="badge bg-primary-subtle text-primary extra-small font-semibold">${esc(p)}</span>`).join('')}
            </div>
            <p><strong>Total Unit:</strong> ${esc(client.totalUnit)}</p>
            <div class="vc-features-title">Features and Modules</div>
            <ul class="vc-features-list">
              ${client.features.map((f) => `<li>${esc(f)}</li>`).join('')}
            </ul>
          </div>
          <div>
            <span class="vc-status ${client.status === 'Completed' ? 'status-completed' : 'status-ongoing'}">
              <i class="bi ${client.status === 'Completed' ? 'bi-check-circle-fill' : 'bi-arrow-repeat'}"></i>
              Status: ${esc(client.status)}
            </span>
          </div>
        </div>
      </div>`
            )
            .join('');

        if (window.AOS) window.AOS.refreshHard();
    },
};

document.addEventListener('DOMContentLoaded', () => {
    ClientsPage.init();
});