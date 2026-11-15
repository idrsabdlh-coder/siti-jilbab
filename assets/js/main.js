/**
 * Siti Jilbab - Shared Javascript Utilities
 * Handles navigation, footer, floating WA, SEO meta, scroll reveal, and toast notifications.
 */

// Helper to check if the current page is inside a nested folder (like /produk/detail.html)
const getPathPrefix = () => {
  const isSubfolder = window.location.pathname.includes('/produk/') || window.location.pathname.includes('/produk');
  return isSubfolder ? '../' : './';
};

// 1. Render Navbar component dynamically
window.renderNav = (activePage) => {
  const placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  const prefix = getPathPrefix();
  
  const navHTML = `
    <nav class="glass-nav py-4">
      <div class="container flex justify-between items-center">
        <!-- Logo -->
        <a href="${prefix}index.html" class="flex items-center gap-2">
          <span style="font-family: var(--font-display); font-weight: 700; font-size: 1.65rem;" class="text-primary-burgundy transition-colors hover:text-secondary-rose">Siti.Jilbab</span>
        </a>

        <!-- Desktop Navigation Items -->
        <div class="hidden md:flex items-center gap-8 font-medium text-sm tracking-wide text-text-charcoal">
          <a href="${prefix}index.html" class="hover:text-primary-burgundy transition-colors relative py-1 ${activePage === 'home' ? 'text-primary-burgundy border-b-2 border-primary-burgundy' : ''}">Beranda</a>
          <a href="${prefix}katalog.html" class="hover:text-primary-burgundy transition-colors relative py-1 ${activePage === 'katalog' ? 'text-primary-burgundy border-b-2 border-primary-burgundy' : ''}">Katalog</a>
          <a href="${prefix}tentang.html" class="hover:text-primary-burgundy transition-colors relative py-1 ${activePage === 'tentang' ? 'text-primary-burgundy border-b-2 border-primary-burgundy' : ''}">Tentang Kami</a>
          <a href="${prefix}kontak.html" class="hover:text-primary-burgundy transition-colors relative py-1 ${activePage === 'kontak' ? 'text-primary-burgundy border-b-2 border-primary-burgundy' : ''}">Kontak</a>
        </div>

        <!-- Mobile Burger Menu Trigger -->
        <button id="mobile-menu-btn" class="md:hidden flex items-center justify-center text-primary-burgundy w-10 h-10 rounded-full border border-primary-burgundy/10 hover:bg-primary-burgundy/5 focus:outline-none" aria-label="Toggle Menu">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path id="burger-path" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div id="mobile-nav-panel" class="absolute top-[100%] left-0 w-full bg-bg-cream/98 border-b border-primary-burgundy/10 backdrop-blur-xl shadow-lg flex flex-col items-center gap-5 py-8 px-6 font-medium tracking-wide transition-all duration-300 transform -translate-y-[120%] opacity-0 pointer-events-none z-50">
        <a href="${prefix}index.html" class="w-full text-center py-2 hover:bg-primary-burgundy/5 rounded-lg hover:text-primary-burgundy transition-colors ${activePage === 'home' ? 'text-primary-burgundy bg-primary-burgundy/5 font-semibold' : ''}">Beranda</a>
        <a href="${prefix}katalog.html" class="w-full text-center py-2 hover:bg-primary-burgundy/5 rounded-lg hover:text-primary-burgundy transition-colors ${activePage === 'katalog' ? 'text-primary-burgundy bg-primary-burgundy/5 font-semibold' : ''}">Katalog</a>
        <a href="${prefix}tentang.html" class="w-full text-center py-2 hover:bg-primary-burgundy/5 rounded-lg hover:text-primary-burgundy transition-colors ${activePage === 'tentang' ? 'text-primary-burgundy bg-primary-burgundy/5 font-semibold' : ''}">Tentang Kami</a>
        <a href="${prefix}kontak.html" class="w-full text-center py-2 hover:bg-primary-burgundy/5 rounded-lg hover:text-primary-burgundy transition-colors ${activePage === 'kontak' ? 'text-primary-burgundy bg-primary-burgundy/5 font-semibold' : ''}">Kontak</a>
      </div>
    </nav>
  `;

  placeholder.innerHTML = navHTML;

  // Add scroll event logic to add '.scrolled' styling
  const navElement = placeholder.querySelector('.glass-nav');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navElement.classList.add('scrolled');
    } else {
      navElement.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  // Run once initially
  handleScroll();

  // Mobile menu click toggle logic
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navPanel = document.getElementById('mobile-nav-panel');
  const burgerPath = document.getElementById('burger-path');

  if (menuBtn && navPanel) {
    let isOpen = false;
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isOpen = !isOpen;
      
      if (isOpen) {
        document.body.classList.add('nav-open');
        navPanel.classList.remove('-translate-y-[120%]', 'opacity-0', 'pointer-events-none');
        navPanel.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
        burgerPath.setAttribute('d', 'M6 18L18 6M6 6l12 12'); // Transition to Close Icon
      } else {
        document.body.classList.remove('nav-open');
        navPanel.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
        navPanel.classList.add('-translate-y-[120%]', 'opacity-0', 'pointer-events-none');
        burgerPath.setAttribute('d', 'M4 6h16M4 12h16m-7 6h7'); // Back to Burger Icon
      }
    });

    // Close panel when clicking anything else
    document.addEventListener('click', () => {
      if (isOpen) {
        isOpen = false;
        document.body.classList.remove('nav-open');
        navPanel.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
        navPanel.classList.add('-translate-y-[120%]', 'opacity-0', 'pointer-events-none');
        burgerPath.setAttribute('d', 'M4 6h16M4 12h16m-7 6h7');
      }
    });
  }
};

// 2. Render Footer component dynamically
window.renderFooter = () => {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  const prefix = getPathPrefix();

  const footerHTML = `
    <footer style="background-color: var(--charcoal); color: var(--gold);" class="py-16 mt-auto border-t border-primary-burgundy/10">
      <div class="container grid grid-cols-1 md:grid-cols-3 gap-12">
        
        <!-- Info Brand -->
        <div class="flex flex-col gap-4">
          <span style="font-family: var(--font-display); font-weight: 700; font-size: 2rem; font-style: italic;" class="text-accent-gold selection:bg-primary-burgundy">Siti Jilbab</span>
          <p class="text-stone-300 text-sm max-w-sm">Toko hijab premium melayani kebutuhan busana muslimah istimewa di Pasar Unit 2, Tulang Bawang, Lampung. Mengusung keindahan syari dalam kesederhanaan.</p>
        </div>

        <!-- Links Navigasi -->
        <div class="flex flex-col gap-4">
          <h4 class="text-accent-gold text-lg font-serif tracking-wider uppercase font-semibold">Tautan Navigasi</h4>
          <ul class="flex flex-col gap-2.5 text-stone-300 text-sm font-medium">
            <li><a href="${prefix}index.html" class="hover:text-white hover:underline transition-all">Beranda</a></li>
            <li><a href="${prefix}katalog.html" class="hover:text-white hover:underline transition-all">Katalog Digital</a></li>
            <li><a href="${prefix}tentang.html" class="hover:text-white hover:underline transition-all">Tentang Kami</a></li>
            <li><a href="${prefix}kontak.html" class="hover:text-white hover:underline transition-all">Kontak & Lokasi</a></li>
          </ul>
        </div>

        <!-- Alamat Kontak -->
        <div class="flex flex-col gap-4">
          <h4 class="text-accent-gold text-lg font-serif tracking-wider uppercase font-semibold">Hubungi Kami</h4>
          <div class="flex flex-col gap-2.5 text-stone-300 text-sm">
            <span class="flex items-center gap-2">📍 Pasar Unit 2, Tulang Bawang, Lampung</span>
            <span class="flex items-center gap-2">📱 WhatsApp: <a href="https://wa.me/6282372526773" target="_blank" class="hover:underline text-white font-medium">+62 823-7252-6773</a></span>
            <span class="flex items-center gap-2">📸 Instagram: <a href="https://instagram.com/hijab_tulangbawang" target="_blank" class="hover:underline text-white font-medium">@hijab_tulangbawang</a></span>
          </div>
        </div>

      </div>

      <div class="container mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-400 text-xs">
        <p>&copy; 2026 Siti Jilbab — Premium Hijab Store. Hak Cipta Dilindungi.</p>
        <p class="font-serif italic text-accent-gold">Ketaatan dalam Keanggunan</p>
      </div>
    </footer>
  `;

  placeholder.innerHTML = footerHTML;
};

// 3. Render Floating WhatsApp button
window.renderFloatingWA = () => {
  // Check if button already exists in markup
  if (document.getElementById('wa-floating-btn')) return;

  const container = document.createElement('div');
  container.id = 'wa-floating-btn';
  
  // High quality SVG for WhatsApp icon
  container.innerHTML = `
    <a href="https://wa.me/6282372526773?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20koleksi%20Siti%20Jilbab%20%F0%9F%99%8F" target="_blank" rel="noopener noreferrer" class="whatsapp-floating" aria-label="WhatsApp Chatting">
      <span class="whatsapp-tooltip">Chat Kami ✨</span>
      <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  `;

  document.body.appendChild(container);
};

// 4. Set SEO dynamic Meta Tags
window.setPageMeta = ({ title, description, image, url }) => {
  if (title) document.title = title;

  // Function to create or update meta
  const checkAndUpdateMeta = (propertyAttr, valueAttr, key, value) => {
    let element = document.querySelector(`meta[${propertyAttr}="${key}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(propertyAttr, key);
      document.head.appendChild(element);
    }
    element.setAttribute(valueAttr, value);
  };

  if (description) {
    checkAndUpdateMeta('name', 'content', 'description', description);
    checkAndUpdateMeta('property', 'content', 'og:description', description);
  }

  if (title) {
    checkAndUpdateMeta('property', 'content', 'og:title', title);
  }

  if (image) {
    checkAndUpdateMeta('property', 'content', 'og:image', image);
  }

  if (url) {
    checkAndUpdateMeta('property', 'content', 'og:url', url);
  }

  // Canonical tag setup
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url || window.location.href);
};

// 5. Scroll Reveal implementation
window.initScrollReveal = () => {
  const elements = document.querySelectorAll('.reveal');
  if (elements.length === 0) return;

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, observerOptions);

  elements.forEach((el) => observer.observe(el));
};

// 6. Sliding Toast notifications helper
window.showToast = (message) => {
  let container = document.getElementById('toast-notification-root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-notification-root';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span>✨</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Dismiss sequence
  setTimeout(() => {
    toast.classList.add('dismissing');
    toast.addEventListener('animationend', () => {
      toast.remove();
      if (container.children.length === 0) {
        container.remove();
      }
    });
  }, 3000);
};

// Auto initializations on loads
document.addEventListener('DOMContentLoaded', () => {
  window.renderFloatingWA();
  window.initScrollReveal();
});
