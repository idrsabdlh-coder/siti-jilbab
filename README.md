<div align="center">

# 🧕 Siti Jilbab

### *Anggun dalam kesederhanaan. Modest tanpa berlebihan.*

Katalog hijab premium digital dari **Pasar Unit 2, Tulang Bawang, Lampung**,
dari layar ke tangan pembeli hanya dengan satu ketukan WhatsApp.

[![Live](https://img.shields.io/badge/🌐_Live-GitHub_Pages-1f6f5c?style=for-the-badge)](https://idrsabdlh-coder.github.io/siti-jilbab/)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![WhatsApp](https://img.shields.io/badge/Order_via-WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/6282372526773)

[🛍️ Lihat Katalog](https://idrsabdlh-coder.github.io/siti-jilbab/) · [📋 PRD](./PRD.md) · [✅ TODO](./TODO.md)

</div>

---

## ✨ Cerita Singkat

Bayangkan seorang pelanggan sedang santai di rumah. Ia membuka katalog, memilih **Voal Ultra Fine** warna **Dusty Rose**, lalu menekan satu tombol. WhatsApp terbuka dan pesan pesanan sudah tertulis rapi, tinggal dikirim.

Tidak ada keranjang yang rumit, tidak ada aplikasi tambahan, dan tidak ada tanya-jawab panjang soal "yang warna apa tadi ya?". Itulah **Siti Jilbab**: katalog yang cantik di mata, ringan di ponsel, dan akrab seperti ngobrol dengan penjualnya.

## 🌸 Apa yang Bisa Dilakukan Pelanggan?

| | Fitur | Rasanya seperti... |
|---|---|---|
| 🔍 | **Cari model** | Mengetik "voal" dan hasilnya langsung muncul |
| 🗂️ | **Filter kategori** | Berjalan di lorong toko, tapi hanya ke rak yang diinginkan |
| 🎨 | **Pilih varian warna** | Memegang kain dan memilih warna favorit |
| 🖼️ | **Galeri foto produk** | Melihat dari berbagai sisi sebelum memutuskan |
| 💬 | **Pesan lewat WhatsApp** | Satu klik, pesan siap kirim ke pemilik toko |
| 📍 | **Info toko lengkap** | Alamat, jam buka, dan peta tanpa tanya-tanya |

## 🎨 Nuansa Desain

Elegan, bersih, dan teduh.

- **Display:** *Cormorant Garamond*, klasik dan berkelas untuk judul
- **Body:** *DM Sans*, modern dan nyaman dibaca
- **Gaya:** modest, lapang, dengan animasi halus yang tidak berisik

## 🧰 Dapur Teknis

| Lapisan | Pilihan |
|---|---|
| Bahasa | HTML5 · Vanilla JavaScript (ES6+) · CSS3 |
| Bundler | **Vite.js** (Multi-Page Application, output ke `dist/`) |
| Styling | **Tailwind CSS v4** |
| Data | `data/products.json` (di-fetch secara async di sisi klien) |
| Pemesanan | Link builder `wa.me` dengan encoding UTF-8 |
| Hosting | **GitHub Pages** (deploy otomatis via GitHub Actions) |

> 💡 **Kenapa tanpa backend?** Toko kecil butuh sesuatu yang murah, cepat, dan mudah dirawat. Data cukup satu file JSON, hosting gratis, dan tidak ada server yang perlu dijaga.

## 🗺️ Peta Proyek

```text
siti-jilbab/
├── 📦 data/
│   └── products.json        # Etalase: seluruh produk hijab
├── 🎀 assets/
│   ├── css/style.css        # Variabel, reset, animasi kustom
│   └── js/
│       ├── main.js          # Nav, Footer, Floating WA, SEO, Toast
│       ├── katalog.js       # Filter multi-faset, pencarian, pagination
│       └── produk.js        # Galeri, swatch warna, pembuat link WA
├── 🏠 index.html            # Beranda
├── 🛍️ katalog.html          # Katalog interaktif
├── 📖 tentang.html          # Kisah & misi brand
├── 📞 kontak.html           # Alamat, jam buka, peta
├── 🔎 produk/detail.html    # Detail model (?slug=...)
├── ⚙️ .github/workflows/
│   └── deploy.yml           # Deploy otomatis ke GitHub Pages
├── 🤖 robots.txt
└── 🗺️ sitemap.xml
```

## 🚀 Coba Sekarang dalam 60 Detik

```bash
git clone https://github.com/idrsabdlh-coder/siti-jilbab.git
cd siti-jilbab
npm install
npm run dev
```

Buka **http://localhost:3000/** dan katalog sudah berjalan.

Untuk membuat versi produksi:

```bash
npm run build     # hasil siap deploy ada di /dist
```

## ☁️ Rilis ke Dunia (GitHub Pages)

Situs terbit otomatis setiap kali ada `push` ke branch `main`, tanpa layanan tambahan.

**Setup sekali saja:**

1. Buka repo di GitHub → **Settings → Pages**.
2. Pada **Source**, pilih **GitHub Actions**.
3. `vite.config.ts` sudah memakai `base: './'` (path relatif), jadi tidak perlu diubah.
4. `git push` ke `main`, lalu pantau di tab **Actions**.

Alamat situs: **https://idrsabdlh-coder.github.io/siti-jilbab/**

> 💡 Skrip di `assets/js/`, `data/`, dan `assets/images/` disalin ke `dist/` oleh plugin kecil di `vite.config.ts`, karena Vite tidak membundel skrip klasik. Tulis gambar lokal di `products.json` sebagai `assets/images/nama.jpg`; path-nya otomatis disesuaikan untuk halaman biasa maupun `produk/`.

## 🧵 Merawat Isi Toko

### 1. Menambah atau mengubah produk

Cukup edit `data/products.json`, tidak perlu menyentuh kode:

```json
{
  "id": "p001",
  "slug": "voal-ultra-fine",
  "name": "Voal Ultra Fine",
  "category": "voal",
  "price": 85000,
  "colors": ["Cream", "Navy", "Dusty Rose"],
  "material": "Voal Superfine",
  "description": "Deskripsi 2-3 kalimat yang menawan dan natural.",
  "images": ["assets/img/voal-ultra-fine-1.jpg"],
  "badge": "baru",
  "inStock": true
}
```

> ✅ **Tips:** `id` dan `slug` harus unik. Pakai huruf kecil dan tanda hubung untuk `slug`.

### 2. Mengganti nomor WhatsApp toko

Nomor saat ini adalah **+62 823-7252-6773**. Untuk menggantinya:

1. Cari global `6282372526773` di editor Anda.
2. Ganti dengan nomor baru dalam format internasional **tanpa `+` dan tanpa spasi**, misalnya `6281234567890`.

## 🧭 Arah Pengembangan

Dokumen perencanaan proyek ini ada di:

- 📋 **[PRD.md](./PRD.md)**: visi, target pengguna, kebutuhan produk, dan ukuran keberhasilan
- ✅ **[TODO.md](./TODO.md)**: daftar pekerjaan bertahap, dari yang paling mendesak

## 🤝 Berkontribusi

```bash
git checkout -b fitur/nama-fitur
# ...kerjakan perubahan...
git commit -m "feat: deskripsi singkat"
git push origin fitur/nama-fitur
```

Lalu buka Pull Request. Gunakan awalan `feat:`, `fix:`, `docs:`, atau `chore:` pada pesan commit agar riwayat tetap rapi.

## 📍 Kunjungi Tokonya

**Siti Jilbab**
Pasar Unit 2, Tulang Bawang, Lampung
💬 WhatsApp: [+62 823-7252-6773](https://wa.me/6282372526773)

---

<div align="center">

*Dibuat dengan ❤️ untuk setiap kerudung yang membuat pemakainya merasa percaya diri.*

</div>
