# Siti Jilbab — Katalog Hijab Premium Digital

Katalog Digital Premium untuk **Siti Jilbab** yang berlokasi di Pasar Unit 2, Tulang Bawang, Lampung. Berkonsep elegan, modest, bersih, dan mengusung nilai-nilai keislaman yang anggun tanpa berlebihan.

Website ini dirancang sebagai katalog statis fungsional modern. Pelanggan dapat menyaring kategori hijab, memilih varian warna khusus secara visual, mencari model tertentu, lalu mengklik tombol pemesanan untuk langsung mengirimkan pesan berisi rincian barang pilihan ke WhatsApp pemilik toko secara otomatis.

---

## 🛠️ Tech Stack & Spesifikasi

- **Bahasa Utama**: HTML5, Vanilla JavaScript (ES6+), CSS3 kustom.
- **Engine Compiler**: [Vite.js](https://vitejs.dev/) untuk kompilasi modul statis Multi-Page Application (MPA) di dalam aset folder `dist/`.
- **Framework Styling**: [Tailwind CSS v4](https://tailwindcss.com/) terintegrasi langsung di dalam berkas global.
- **Desain Font**: Display menggunakan **Cormorant Garamond** (Google Fonts) & Body menggunakan **DM Sans** (Google Fonts).
- **Kapasitas Database**: Data statis berbasis file `/data/products.json` yang di-fetch secara asynchronous klien secara langsung.
- **Integrasi WhatsApp**: Automasi pesan dinamis (Link Builder) menggunakan skema URL `wa.me` berkode UTF-8.

---

## 📂 Struktur Folder Proyek

```text
siti-jilbab/
├── data/
│   └── products.json         → Dataset list katalog jilbab utama
├── assets/
│   ├── css/
│   │   └── style.css         → CSS utama, resets, variabel, & animasi kustom
│   └── js/
│       ├── main.js           → Komponen global (Nav, Footer, Floating WA, SEO, Toasts, dll.)
│       ├── katalog.js        → Filter multi-faceted, search bar, & pagination
│       └── produk.js         → Gallery switcher, swatch listener, & WA URL builder
├── berkas statis & pages/
│   ├── index.html            → Halaman Beranda (Homepage)
│   ├── katalog.html          → Halaman katalog interaktif & filter
│   ├── tentang.html          → Halaman bercerita sejarah & misi brand
│   ├── kontak.html           → Halaman alamat, jam buka, maps, dsb.
│   └── produk/
│       └── detail.html       → Detail model hijab (membaca ?slug=)
├── vercel.json               → Aturan SEO routing Vercel Clean URLs
├── robots.txt                → Kebijakan crawling search engine
└── sitemap.xml               → Map link halaman statis untuk SEO indexer
```

---

## 🚀 Panduan Menjalankan Secara Lokal

Situs ini menggunakan Vite.js sebagai bundler. Anda dapat dengan mudah menjalankan mode development atau memproduksi versi terkompilasi bersih menggunakan baris instruksi berikut:

### 1. Jalankan Mode Developer (Sandbox Run)
Buka terminal Anda di direktori utama proyek, lalu jalankan perintah:
```bash
npm run dev
```
Vite akan menyalakan server lokal yang secara instan dapat Anda akses langsung melalui browser pada alamat default `http://localhost:3000/`.

### 2. Membangun Berkas Produksi (Build Compilation)
Untuk mem-build seluruh berkas HTML, CSS, dan JS statis yang siap dideploy menjadi satu folder produksi mandiri `/dist`:
```bash
npm run build
```
Seluruh halaman dinamis, file json, sitemap, dan vercel routing akan dipasangkan ke dalam folder `/dist` secara otomatis oleh Rollup Engine.

---

## ☁️ Petunjuk Deployment

### Opsi A: Menggunakan Vercel (Direkomendasikan)
1. Buat akun gratis di [Vercel](https://vercel.com).
2. Install Vercel CLI di komputer Anda (`npm i -g vercel`), jalankan perintah `vercel` di terminal dan ikuti petunjuknya.
3. *Atau*, Anda dapat menghubungkan repositori GitHub Anda secara langsung ke dasbor Vercel untuk deployment otomatis setiap push.

### Opsi B: Menggunakan Netlify
1. Masuk ke [Netlify](https://netlify.com).
2. Hubungkan repositori atau tarik langsung isi folder `/dist` hasil kompilasi Anda ke dalam kotak upload Netlify.

---

## ✍️ Cara Memperbarui Konten Toko

### 1. Menambah / Mengubah Data Produk Hijab
Segala perubahan data produk dapat dilakukan langsung di dalam file `/data/products.json`. Pastikan skema data sesuai dengan format berikut:
```json
{
  "id": "p001",
  ... (id unik berikutnya dsb.)
  "slug": "voal-ultra-fine",
  "name": "Voal Ultra Fine",
  "category": "voal",
  "price": 85000,
  "colors": ["Cream", "Navy", "Dusty Rose"],
  "material": "Voal Superfine",
  "description": "2-3 kalimat deskripsi yang menawan dan natural di sini.",
  "images": ["Tautan link gambar atau aset lokal di sini"],
  "badge": "baru",
  "inStock": true
}
```

### 2. Memperbarui Nomor Tujuan WhatsApp Toko
Nomor WhatsApp toko default yang dipasang adalah **`+62 823-7252-6773`** milik Siti Jilbab Tulang Bawang. Jika ingin mengubah nomor tujuan:
1. Buka teks editor Anda, lalu lakukan pencarian global (Global Search) untuk nilai: `6282372526773`.
2. Ganti angka tersebut dengan nomor baru Anda. Pastikan menggunakan format nomor internasional tanpa tanda tambah (`+`) atau spasi, contoh: `6281234567890`.
