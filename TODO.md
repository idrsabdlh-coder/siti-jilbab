# ✅ TODO: Siti Jilbab

> Acuan: [PRD.md](./PRD.md) · Terakhir diperbarui: 15 November 2026
> Legenda: 🔴 Mendesak · 🟠 Penting · 🟡 Bagus untuk dimiliki · 🟢 Nanti

---

## 🏁 Fase 1: Rapikan Fondasi

- [ ] 🔴 Ganti `README.md` dengan versi baru yang lebih hidup
- [ ] 🔴 Tambahkan `PRD.md` dan `TODO.md` ke repo
- [x] 🔴 `.github/workflows/deploy.yml` sudah ada; tinggal aktifkan **Settings → Pages → Source: GitHub Actions**
- [x] 🔴 `base: './'` di `vite.config.ts`, dan `data/`, `assets/js`, `assets/images` disalin ke `dist/` saat build
- [x] 🔴 Path gambar lokal diselesaikan lewat `window.resolveProducts` (halaman biasa dan `produk/`)
- [ ] 🟠 Hapus `vercel.json` (link antarhalaman sudah berbentuk `.html`, jadi file ini tidak dipakai GitHub Pages)
- [ ] 🟠 Perbarui `sitemap.xml`, `robots.txt`, dan canonical ke `https://idrsabdlh-coder.github.io/siti-jilbab/`
- [ ] 🟠 Nonaktifkan atau hapus situs Netlify lama setelah situs baru dipastikan jalan
- [ ] 🔴 Pastikan file `package.json` memuat skrip `dev`, `build`, `preview`
- [ ] 🟠 Pusatkan nomor WhatsApp ke **satu** berkas konfigurasi (mis. `assets/js/config.js`) agar tidak perlu cari-ganti global
- [ ] 🟠 Tambah `.gitignore` (`node_modules`, `dist`, `.env`)
- [ ] 🟠 Pastikan `.nvmrc` atau kolom `engines` di `package.json` menentukan versi Node
- [ ] 🟡 Tambah `.editorconfig` dan Prettier agar gaya kode seragam
- [ ] 🟡 Tambah template Issue dan Pull Request di `.github/`

## 🎨 Perbaikan Tampilan (selesai)

- [x] Reset CSS global menimpa semua utilitas Tailwind v4 (jarak, warna, `mx-auto`); dipindah ke `@layer base` / `@layer components`
- [x] Font Cormorant Garamond & DM Sans tidak pernah termuat; `<link>` Google Fonts ditambahkan di 5 halaman
- [x] Hasil build tidak memuat JS, data, dan gambar; kini disalin otomatis ke `dist/`
- [x] Nama produk 2 baris di mobile, label "Bahan:" tidak terbelah, bagian "Koleksi Lainnya" otomatis dilengkapi
- [x] Foto asli dipasang untuk Voal Ultra Fine dan Voal Premium Laser Cut

## 🖼️ Fase 2: Konten & Gambar

- [ ] 🔴 Ganti sisa placeholder `placehold.co` (8 produk dan foto hero di `index.html`) dengan foto asli
- [ ] 🟠 `assets/images/pasmina-rayon-premium.jpg` belum dipakai produk mana pun; tambahkan produknya atau hapus
- [ ] 🟠 Bersihkan sisa template AI Studio: folder `src/`, `tsconfig.json`, `metadata.json`, `.env.example`, dan dependensi tak terpakai (`express`, `@google/genai`, `dotenv`, `react`)

- [ ] 🔴 Audit seluruh `images` di `products.json` (tidak ada link mati)
- [ ] 🔴 Standarkan ukuran dan rasio foto produk (mis. 4:5)
- [ ] 🟠 Konversi gambar ke WebP/AVIF dan sediakan ukuran responsif (`srcset`)
- [ ] 🟠 Tambah `loading="lazy"` dan `width`/`height` pada semua gambar untuk mencegah layout shift
- [ ] 🟠 Pastikan setiap gambar punya `alt` yang deskriptif
- [ ] 🟡 Siapkan folder `assets/img/` dengan penamaan konsisten (`slug-1.webp`)
- [ ] 🟡 Rapikan deskripsi produk (2-3 kalimat, nada konsisten)

## 🔎 Fase 3: SEO & Performa

- [ ] 🔴 Title, meta description, dan canonical **unik** di setiap halaman
- [ ] 🔴 Pastikan halaman detail produk punya title dan meta dinamis sesuai `slug`
- [ ] 🟠 Tambah Open Graph + Twitter Card (agar link cantik saat dibagikan di WhatsApp)
- [ ] 🟠 Tambah JSON-LD `LocalBusiness` (alamat, jam buka, telepon)
- [ ] 🟠 Tambah JSON-LD `Product` di halaman detail (nama, harga, ketersediaan)
- [ ] 🟠 Perbarui `sitemap.xml` agar memuat seluruh URL produk
- [ ] 🟠 Daftarkan situs ke Google Search Console dan Google Business Profile
- [ ] 🟡 Preload font (Cormorant Garamond, DM Sans) dan gunakan `font-display: swap`
- [ ] 🟡 Jalankan Lighthouse mobile; target Performance ≥ 90, Accessibility ≥ 95
- [ ] 🟡 Tambah favicon, `apple-touch-icon`, dan `manifest.webmanifest`

## 🛍️ Fase 4: Pengalaman Belanja

- [ ] 🟠 Verifikasi tampilan **badge** (`baru`, dll.) dan penanda **stok habis** di kartu dan halaman detail
- [ ] 🟠 Nonaktifkan atau ubah tombol pesan jika `inStock: false`
- [ ] 🟠 Tambah filter rentang **harga**, **warna**, dan **bahan**
- [ ] 🟠 Tambah **pengurutan**: terbaru, termurah, termahal
- [ ] 🟠 Sinkronkan filter dengan URL (`?kategori=voal&sort=harga`) agar bisa dibagikan
- [ ] 🟡 Tampilan "tidak ada hasil" yang ramah beserta tombol hapus filter
- [ ] 🟡 Skeleton loading saat `products.json` di-fetch
- [ ] 🟡 Penanganan error fetch (pesan ramah + tombol coba lagi)
- [ ] 🟡 Tombol bagikan/salin link produk
- [ ] 🟡 Bagian "Produk serupa" di halaman detail
- [ ] 🟢 Perbesar gambar (lightbox) di galeri
- [ ] 🟢 Daftar favorit tersimpan di `localStorage`

## 💬 Fase 5: Pesan WhatsApp

- [ ] 🔴 Uji format pesan otomatis di Android, iOS, dan WhatsApp Web (encoding UTF-8, baris baru, karakter `•`)
- [ ] 🟠 Pastikan pesan memuat: nama produk, warna terpilih, harga (format Rupiah), dan tautan produk
- [ ] 🟠 Tambah opsi jumlah (qty) opsional di halaman detail
- [ ] 🟡 Tombol WhatsApp umum (tanya-tanya) berbeda dari tombol pesan produk
- [ ] 🟡 Catat klik tombol pesan sebagai event analytics

## 👩‍💼 Fase 6: Kemudahan untuk Pemilik

- [ ] 🔴 Tambah **validasi `products.json`** saat build (id/slug unik, field wajib, harga angka)
- [ ] 🟠 Tulis panduan singkat bergambar "Cara menambah produk" untuk pemilik (non-teknis)
- [ ] 🟠 Pertimbangkan **Decap CMS** atau form admin ringan agar pemilik tidak mengedit JSON langsung
- [ ] 🟡 Skrip `npm run check` untuk memeriksa link gambar dan data
- [ ] 🟡 Siapkan template produk kosong (`data/product.template.json`)

## 📊 Fase 7: Analytics & Kualitas

- [ ] 🟠 Pasang analytics ringan dan ramah privasi (Plausible / Umami / Cloudflare Web Analytics)
- [ ] 🟠 Definisikan event: lihat produk, pilih warna, klik pesan WhatsApp, buka kontak
- [ ] 🟡 Tambah linter (ESLint) dan formatter (Prettier) ke skrip `npm`
- [ ] 🟡 Tambah GitHub Actions: build + validasi data + Lighthouse CI pada setiap PR
- [ ] 🟡 Uji manual di perangkat Android kelas menengah dan jaringan lambat
- [ ] 🟢 Uji aksesibilitas dengan pembaca layar dan navigasi keyboard

## 🌟 Fase 8: Pertumbuhan

- [ ] 🟡 Bagian testimoni pelanggan (dengan izin)
- [ ] 🟡 Tautan Instagram/TikTok toko
- [ ] 🟡 Halaman "Panduan Memilih Hijab" (konten SEO)
- [ ] 🟢 Domain khusus (mis. `sitijilbab.com`) dan penyambungan ke GitHub Pages (Settings → Pages → Custom domain)
- [ ] 🟢 Mode gelap
- [ ] 🟢 Dukungan PWA (bisa dipasang di layar utama)

---

## 🧾 Definisi Selesai (Definition of Done)

Sebuah tugas dianggap selesai jika:

1. Berjalan baik di `npm run dev` **dan** `npm run build`
2. Tampil benar di ponsel (lebar 360 px) dan desktop
3. Tidak menurunkan skor Lighthouse
4. Dokumentasi (README/PRD/TODO) ikut diperbarui bila perlu
5. Perubahan masuk lewat commit dengan pesan jelas (`feat:`, `fix:`, `docs:`, `chore:`)

## 🔁 Alur Kerja Git yang Disarankan

```bash
git checkout -b docs/readme-prd-todo
git add README.md PRD.md TODO.md
git commit -m "docs: README baru, tambah PRD dan TODO"
git push origin docs/readme-prd-todo
# buka Pull Request → merge ke main → GitHub Actions deploy otomatis ke GitHub Pages
```
