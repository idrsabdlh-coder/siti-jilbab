/**
 * Siti Jilbab - Product Details Logic
 * Extracts URL parameters, renders dynamic data, manages swatches, and compiles WhatsApp links.
 */

// Colors mapping matching katalog.js
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

// 1. Parse URL Parameter slug
function getSlugFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('slug');
}

// 2. Render Gallery Photos
function renderGallery(images, productName) {
  const container = document.getElementById('gallery-container');
  if (!container) return;

  if (!images || images.length === 0) {
    container.innerHTML = `<p class="text-stone-400 text-sm">Tidak ada galeri foto.</p>`;
    return;
  }

  const primaryPhoto = images[0];
  let html = `
    <!-- Large showcase -->
    <div class="overflow-hidden bg-stone-100 rounded-2xl border border-primary-burgundy/5 relative">
      <img id="main-photo" src="${primaryPhoto}" alt="${productName} — Siti Jilbab" referrerpolicy="no-referrer" />
    </div>
  `;

  // Render thumbnails if multiple images are provided
  if (images.length > 1) {
    html += `<div class="flex gap-3 overflow-x-auto pb-2">`;
    images.forEach((img, idx) => {
      html += `
        <button class="thumb-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}" onclick="switchGalleryPhoto(this, '${img}')">
          <img src="${img}" alt="Thumbnail ${idx + 1}" />
        </button>
      `;
    });
    html += `</div>`;
  }

  container.innerHTML = html;
}

// Switches primary image source with a sleek fade
window.switchGalleryPhoto = (button, imgSrc) => {
  const mainPhoto = document.getElementById('main-photo');
  if (!mainPhoto) return;

  // Deactivate other thumb buttons
  const container = document.getElementById('gallery-container');
  container.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
  
  // Set active onto current click
  button.classList.add('active');

  // Animation execution
  mainPhoto.style.opacity = '0.3';
  setTimeout(() => {
    mainPhoto.src = imgSrc;
    mainPhoto.style.opacity = '1';
  }, 150);
};

// 3. Render Product Info Columns, breadcrumbs, selections, and WA controls
let selectedColor = null;

function renderProductInfo(product) {
  const infoContainer = document.getElementById('product-info');
  const breadcrumbContainer = document.getElementById('breadcrumb');

  if (!infoContainer || !breadcrumbContainer) return;

  // A. Build Breadcrumbs
  breadcrumbContainer.innerHTML = `
    <a href="../index.html" class="hover:text-primary-burgundy transition-colors">Beranda</a>
    <span class="mx-1.5 text-stone-300">&rsaquo;</span>
    <a href="../katalog.html" class="hover:text-primary-burgundy transition-colors">Katalog</a>
    <span class="mx-1.5 text-stone-300">&rsaquo;</span>
    <span class="text-stone-400 capitalize">${product.category}</span>
    <span class="mx-1.5 text-stone-300">&rsaquo;</span>
    <span class="text-primary-burgundy font-semibold">${product.name}</span>
  `;

  // B. Construct badges
  const badgeHTML = product.badge
    ? `<span class="self-start text-xs font-bold px-3 py-1 rounded bg-stone-100 border border-primary-burgundy/15 mb-3 ${product.badge === 'terlaris' ? 'text-amber-600 bg-amber-50' : 'text-primary-burgundy bg-rose-50'}">${product.badge === 'terlaris' ? '🔥 TERLARIS' : '✨ BARU'}</span>`
    : '';

  // C. Assemble Swatch List
  let swatchListHTML = '';
  product.colors.forEach(color => {
    const hex = getHexColor(color);
    swatchListHTML += `
      <button class="swatch" data-warna="${color}" style="background-color: ${hex};" onclick="selectColorOption(this, '${color}')">
        <span class="swatch-tooltip">${color}</span>
      </button>
    `;
  });

  // D. Create Information Base HTML structure
  infoContainer.innerHTML = `
    <div class="space-y-2 flex flex-col">
      ${badgeHTML}
      <p class="text-xs uppercase tracking-wider text-secondary-rose font-bold">${product.category}</p>
      <h1 class="text-3xl sm:text-4xl font-bold text-text-charcoal leading-tight">${product.name}</h1>
    </div>

    <!-- Pricing Area -->
    <div class="py-4 border-y border-primary-burgundy/10 flex items-center justify-between">
      <span class="text-2xl sm:text-3xl font-serif font-bold text-primary-burgundy">Rp ${product.price.toLocaleString('id-ID')}</span>
      <span class="text-xs ${product.inStock ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-stone-500 bg-stone-50 border-stone-200'} border px-2.5 py-1 rounded-full font-medium">
        ● ${product.inStock ? 'Tersedia' : 'Habis Stok'}
      </span>
    </div>

    <!-- Specification table lists -->
    <div class="text-sm space-y-2 text-stone-600">
      <p><span class="font-bold text-text-charcoal w-24 inline-block">Bahan / Material:</span> ${product.material}</p>
      <p><span class="font-bold text-text-charcoal w-24 inline-block">Kategori:</span> <span class="capitalize">${product.category}</span></p>
    </div>

    <!-- Paragraf deskripsi -->
    <div class="text-stone-600 text-sm sm:text-base leading-relaxed">
      <p>${product.description}</p>
    </div>

    <!-- Color swatch area container -->
    <div class="space-y-3">
      <p class="text-sm font-bold text-text-charcoal">Pilih Varian Warna:</p>
      <div class="flex flex-wrap gap-3 items-center" id="product-swatches-grid">
        ${swatchListHTML}
      </div>
      <p id="selected-color-label" class="text-xs text-stone-500 font-medium">Warna belum dipilih. Silakan pilih di atas 👆</p>
    </div>

    <!-- WhatsApp and Share Action Buttons -->
    <div class="pt-6 space-y-3">
      <!-- WhatsApp btn (Initially disabled styled styling) -->
      <button id="btn-pesan-wa" onclick="handleWhatsAppSubmit()" class="w-full btn-primary disabled-wa-btn font-semibold flex items-center justify-center gap-2.5 py-4">
        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Pesan Sekarang via WhatsApp
      </button>

      <!-- URL Share link btn -->
      <button onclick="shareThisProduct('${product.name}')" class="w-full btn-secondary font-semibold flex items-center justify-center gap-2 py-3 text-sm">
        🔗 Bagikan Detail Produk
      </button>
    </div>
  `;
}

// Handles selecting swatch Option
window.selectColorOption = (button, colorName) => {
  const container = document.getElementById('product-info');
  if (!container) return;

  // Toggle off others active swatch rings
  container.querySelectorAll('.swatch').forEach(sw => sw.classList.remove('active'));

  // Toggle on active state
  button.classList.add('active');
  selectedColor = colorName;

  // Update label
  const label = document.getElementById('selected-color-label');
  if (label) {
    label.innerHTML = `Varian dipilih: <strong class="text-primary-burgundy">${colorName}</strong>`;
  }

  // De-disable WhatsApp button and make it bright WA Green
  const waBtn = document.getElementById('btn-pesan-wa');
  if (waBtn) {
    waBtn.classList.remove('disabled-wa-btn');
    waBtn.style.backgroundColor = 'var(--wa-green)';
    waBtn.style.color = '#ffffff';
    waBtn.style.opacity = '1';
  }
};

// 4. Construct WhatsApp Message and Redirection Link
window.handleWhatsAppSubmit = () => {
  if (!selectedColor) {
    window.showToast("Silakan pilih varian warna jilbab Anda terlebih dahulu! 😊");
    return;
  }

  // Retrieve product instance via a search path on parent
  const slug = getSlugFromURL();
  fetch('../data/products.json')
    .then(r => r.json())
    .then(products => {
      const product = products.find(p => p.slug === slug);
      if (product) {
        const waLink = buildWALink(product, selectedColor);
        window.open(waLink, '_blank', 'noopener,noreferrer');
      }
    });
};

function buildWALink(product, color) {
  const message = `Halo Siti Jilbab 👋\n\nSaya tertarik dengan produk ini:\n\n*${product.name}*\nWarna: *${color}*\nHarga: Rp ${product.price.toLocaleString('id-ID')}\n\nApakah masih tersedia? 🙏\n\nLink: ${window.location.href}`;
  return `https://wa.me/6282372526773?text=${encodeURIComponent(message)}`;
}

// 5. Native Native Share API with browser Clipboard Fallback
window.shareThisProduct = (name) => {
  const shareData = {
    title: `${name} — Siti Jilbab`,
    text: `Lihat koleksi hijab ${name} premium istimewa dari Siti Jilbab Tulang Bawang, Lampung.`,
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData)
      .then(() => console.log('Successfully shared'))
      .catch((err) => console.log('Error sharing:', err));
  } else {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        window.showToast("Link detail produk disalin ke Clipboard! 🔗");
      })
      .catch(err => {
        console.error('Copy to clipboard failed:', err);
      });
  }
};

// 6. Related Products carousel builder (same category matching)
function renderRelated(products, currentProduct) {
  const relatedGrid = document.getElementById('related-products');
  const title = document.getElementById('related-title');
  if (!relatedGrid) return;

  // Sieve products of same category minus current model up to 4 items max
  const related = products
    .filter(p => p.category.toLowerCase() === currentProduct.category.toLowerCase() && p.id !== currentProduct.id)
    .slice(0, 4);

  if (related.length === 0) {
    relatedGrid.innerHTML = '';
    if (title) title.style.display = 'none'; // Hide whole header space if dry
    return;
  }

  if (title) {
    title.innerText = `Koleksi ${currentProduct.category.charAt(0).toUpperCase() + currentProduct.category.slice(1)} Lainnya`;
  }

  relatedGrid.innerHTML = related.map(p => {
    return `
      <div class="product-card">
        ${p.badge ? `<span class="badge-${p.badge}">${p.badge === 'terlaris' ? '🔥 Terlaris' : '✨ Baru'}</span>` : ''}
        <div class="overflow-hidden bg-stone-100">
          <img src="${p.images[0]}" alt="${p.name} — Siti Jilbab" loading="lazy" width="400" height="500">
        </div>
        <div class="product-card-body">
          <p class="product-category">${p.category}</p>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-price">Rp ${p.price.toLocaleString('id-ID')}</p>
          <a href="./detail.html?slug=${p.slug}" class="btn-primary btn-sm text-center w-full mt-auto">Lihat Detail</a>
        </div>
      </div>
    `;
  }).join('');
}

// 7. Missing Slug or Item Not Found layouts
function renderNotFound() {
  const main = document.querySelector('main');
  if (!main) return;

  main.innerHTML = `
    <div class="container py-24 flex flex-col items-center justify-center text-center gap-6">
      <span class="text-7xl">😔</span>
      <h1 class="text-3xl font-bold text-text-charcoal font-serif">Detail Jilbab Tidak Ditemukan</h1>
      <p class="text-stone-500 text-sm max-w-sm">Maaf, kami tidak mengenali alamat jilbab yang Anda minta. Model tersebut kemungkinan besar belum siap atau sudah habis dihapus.</p>
      <a href="../katalog.html" class="btn-primary">Kembalikan ke Katalog</a>
    </div>
  `;
}

// 8. Bootstrap trigger sequence
async function init() {
  const slug = getSlugFromURL();
  if (!slug) {
    renderNotFound();
    return;
  }

  try {
    const res = await fetch('../data/products.json');
    if (!res.ok) throw new Error('Data endpoint load failed');

    const products = await res.json();
    const product = products.find(p => p.slug === slug);

    if (!product) {
      renderNotFound();
      return;
    }

    // Set layout elements
    window.renderNav('katalog');
    window.renderFooter();

    // Set gallery
    renderGallery(product.images, product.name);

    // Set Info specifications
    renderProductInfo(product);

    // Set Related row suggestions
    renderRelated(products, product);

    // Set SEO Meta
    window.setPageMeta({
      title: `${product.name} — Siti Jilbab Tulang Bawang`,
      description: product.description,
      image: product.images[0],
      url: window.location.href
    });

  } catch (error) {
    console.error(error);
    renderNotFound();
  }
}

document.addEventListener('DOMContentLoaded', init);
