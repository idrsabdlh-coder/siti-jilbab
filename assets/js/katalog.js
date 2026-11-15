/**
 * Siti Jilbab - Katalog Page Logic
 * Manages states, inputs, client-side queries, multifaceted filters, and paging grids.
 */

const state = {
  products: [],          // All products from JSON API
  filtered: [],          // Filtered list matching states
  currentPage: 1,
  itemsPerPage: 12,
  activeKategori: 'semua',
  activeWarna: null,
  activeHarga: 'semua',
  searchQuery: ''
};

// Map of Indonesian Color names to Hex strings for perfect swatch styling
const COLOR_HEX_MAP = {
  "Cream": "#EEDC82",
  "Navy": "#0F1E36",
  "Dusty Rose": "#C88EA7",
  "Sage": "#9EB39B",
  "Hitam": "#1C1C1D",
  "Putih": "#F5F5F7",
  "White": "#F8F9FA",
  "Cokelat": "#6F4E37",
  "Abu-abu": "#8A9A86",
  "Merah Muda": "#FFC0CB",
  "Tosca": "#008080"
};

const getHexColor = (name) => {
  return COLOR_HEX_MAP[name] || '#CCCCCC';
};

// 1. Fetch products dataset initially
async function loadProducts() {
  const resultText = document.getElementById('hasil-count');
  try {
    const response = await fetch('./data/products.json');
    if (!response.ok) throw new Error('Failed to fetch resource products.json');

    state.products = window.resolveProducts(await response.json());
    state.filtered = [...state.products];

    buildColorSwatches();
    applyFilters();
  } catch (error) {
    console.error(error);
    if (resultText) resultText.innerHTML = `<span class="text-rose-600 font-semibold">❌ Gagal memuat data produk.</span>`;
  }
}

// 2. Build color swatch list dynamically based on items present
function buildColorSwatches() {
  const container = document.getElementById('filter-warna');
  if (!container) return;

  // Gather unique colors with Set
  const colorsSet = new Set();
  state.products.forEach(p => {
    if (p.colors && Array.isArray(p.colors)) {
      p.colors.forEach(col => colorsSet.add(col));
    }
  });

  const uniqueColors = Array.from(colorsSet);

  // Render swatches
  let swatchesHTML = '';
  uniqueColors.forEach(color => {
    const hex = getHexColor(color);
    swatchesHTML += `
      <button class="color-dot relative focus:outline-none" data-warna="${color}" style="background-color: ${hex};" aria-label="Warna ${color}">
        <span class="color-dot-tooltip">${color}</span>
      </button>
    `;
  });

  container.innerHTML = swatchesHTML;

  // Add event listeners to newly formatted swatch buttons
  container.querySelectorAll('.color-dot').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const colorClicked = btn.getAttribute('data-warna');

      if (state.activeWarna === colorClicked) {
        state.activeWarna = null; // Toggle off if clicked twice
        btn.classList.remove('active');
      } else {
        container.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
        state.activeWarna = colorClicked;
        btn.classList.add('active');
      }

      applyFilters();
    });
  });
}

// 3. Apply combined logical filters simultaneously
function applyFilters() {
  let temp = [...state.products];

  // A. Filter by Active Category
  if (state.activeKategori !== 'semua') {
    temp = temp.filter(p => p.category.toLowerCase() === state.activeKategori.toLowerCase());
  }

  // B. Filter by Color
  if (state.activeWarna) {
    temp = temp.filter(p => p.colors.includes(state.activeWarna));
  }

  // C. Filter by Price Bracket
  if (state.activeHarga !== 'semua') {
    if (state.activeHarga === 'under-50') {
      temp = temp.filter(p => p.price < 50000);
    } else if (state.activeHarga === '50-100') {
      temp = temp.filter(p => p.price >= 50000 && p.price <= 100000);
    } else if (state.activeHarga === '100-200') {
      temp = temp.filter(p => p.price >= 100000 && p.price <= 200000);
    } else if (state.activeHarga === 'over-200') {
      temp = temp.filter(p => p.price > 200000);
    }
  }

  // D. Filter by Text Search queries
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase().trim();
    temp = temp.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q)
    );
  }

  state.filtered = temp;
  state.currentPage = 1; // Always reset back to page 1 on active filter adjustments
  
  renderGrid();
  renderPagination();
}

// 4. Render sliced product list
function renderGrid() {
  const grid = document.getElementById('products-grid');
  const countText = document.getElementById('hasil-count');
  const emptyState = document.getElementById('empty-state');
  
  if (!grid || !countText) return;

  const totalFiltered = state.filtered.length;
  countText.innerText = `Menampilkan ${totalFiltered} pilihan Hijab terbaik`;

  if (totalFiltered === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'flex';
    return;
  }

  emptyState.style.display = 'none';

  // Compute indices for windowing
  const startIdx = (state.currentPage - 1) * state.itemsPerPage;
  const endIdx = startIdx + state.itemsPerPage;
  const currentItems = state.filtered.slice(startIdx, endIdx);

  // Render cards
  grid.innerHTML = currentItems.map(p => renderProductCard(p)).join('');
}

// 5. Render Pagination Controller Buttons
function renderPagination() {
  const container = document.getElementById('pagination');
  if (!container) return;

  const totalFiltered = state.filtered.length;
  if (totalFiltered <= state.itemsPerPage) {
    container.innerHTML = ''; // Hide pagination if fits in one frame
    return;
  }

  const totalPages = Math.ceil(totalFiltered / state.itemsPerPage);
  let html = '';

  // Prev Button
  html += `
    <button class="page-nav-btn" ${state.currentPage === 1 ? 'disabled' : ''} onclick="changePage(${state.currentPage - 1})">
      &larr; Sebelumnya
    </button>
  `;

  // Numeric Buttons
  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button class="page-btn ${state.currentPage === i ? 'active' : ''}" onclick="changePage(${i})">
        ${i}
      </button>
    `;
  }

  // Next Button
  html += `
    <button class="page-nav-btn" ${state.currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${state.currentPage + 1})">
      Berikutnya &rarr;
    </button>
  `;

  container.innerHTML = html;
}

// Exposed globally for pagination clicks inline
window.changePage = (pageNum) => {
  state.currentPage = pageNum;
  renderGrid();
  renderPagination();
  
  // Smooth scroll up target when shifting lists
  window.scrollTo({ top: 120, behavior: 'smooth' });
};

// 6. Map Single Item to HTML Design Cards
function renderProductCard(p) {
  const badgeHTML = p.badge 
    ? `<span class="badge-${p.badge}">${p.badge === 'terlaris' ? '🔥 Terlaris' : '✨ Baru'}</span>` 
    : '';

  return `
    <div class="product-card">
      ${badgeHTML}
      <div class="overflow-hidden bg-stone-100">
        <img src="${p.images[0]}" alt="${p.name} — Siti Jilbab" loading="lazy" width="400" height="500">
      </div>
      <div class="product-card-body">
        <p class="product-category">${p.category}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-price">Rp ${p.price.toLocaleString('id-ID')}</p>
        <a href="produk/detail.html?slug=${p.slug}" class="btn-primary btn-sm text-center w-full mt-auto">Lihat Detail</a>
      </div>
    </div>`;
}

// Search debouncer helper prevents excessive updates
let debounceTimer;
function debounceSearch(callback, delay = 350) {
  return function(...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => callback.apply(this, args), delay);
  };
}

// 7. Initialize Filters bindings & Events
function initFilterBindings() {
  // A. Search Input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', debounceSearch((e) => {
      state.searchQuery = e.target.value;
      applyFilters();
    }));
  }

  // B. Category Pills Clicking
  const kategoriContainer = document.getElementById('filter-kategori');
  if (kategoriContainer) {
    kategoriContainer.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        kategoriContainer.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeKategori = btn.getAttribute('data-kategori');
        applyFilters();
      });
    });
  }

  // C. Price Filter Links Clicking
  const hargaContainer = document.getElementById('filter-harga');
  if (hargaContainer) {
    hargaContainer.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        hargaContainer.querySelectorAll('button').forEach(b => b.classList.remove('active-link'));
        btn.classList.add('active-link');
        state.activeHarga = btn.getAttribute('data-harga');
        applyFilters();
      });
    });
  }

  // D. Empty State Clean Up Button Click
  const clearBtn = document.getElementById('clear-filters-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', resetFilters);
  }
}

// Clear override
function resetFilters() {
  state.activeKategori = 'semua';
  state.activeWarna = null;
  state.activeHarga = 'semua';
  state.searchQuery = '';
  state.currentPage = 1;

  // Reset UI components
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';

  const katContainer = document.getElementById('filter-kategori');
  if (katContainer) {
    katContainer.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    katContainer.querySelector('[data-kategori="semua"]').classList.add('active');
  }

  const warnaContainer = document.getElementById('filter-warna');
  if (warnaContainer) {
    warnaContainer.querySelectorAll('.color-dot').forEach(b => b.classList.remove('active'));
  }

  const hargaContainer = document.getElementById('filter-harga');
  if (hargaContainer) {
    hargaContainer.querySelectorAll('button').forEach(b => b.classList.remove('active-link'));
    hargaContainer.querySelector('[data-harga="semua"]').classList.add('active-link');
  }

  applyFilters();
}

// 8. Load initialization sequence safely
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  initFilterBindings();
});
