# 📋 PRD: Siti Jilbab Katalog Digital

| | |
|---|---|
| **Produk** | Katalog hijab premium digital Siti Jilbab |
| **URL** | https://idrsabdlh-coder.github.io/siti-jilbab/ |
| **Repo** | https://github.com/idrsabdlh-coder/siti-jilbab |
| **Versi dokumen** | 1.0 |
| **Tanggal** | 15 November 2026 |
| **Status** | Draft untuk review pemilik toko |

---

## 1. Ringkasan

Siti Jilbab adalah toko hijab fisik di Pasar Unit 2, Tulang Bawang, Lampung. Situs ini adalah **katalog statis** yang memudahkan pelanggan melihat produk, memilih warna, lalu memesan lewat **WhatsApp** dengan pesan yang sudah terisi otomatis. Tidak ada checkout, pembayaran online, atau akun pengguna.

## 2. Masalah yang Diselesaikan

| Masalah | Dampak |
|---|---|
| Pelanggan tidak bisa melihat stok dan warna tanpa datang atau chat panjang | Calon pembeli menyerah sebelum bertanya |
| Pemilik harus membalas pertanyaan yang sama berulang kali ("ada warna apa?", "harganya berapa?") | Waktu pemilik habis untuk hal repetitif |
| Pesan WhatsApp dari pelanggan sering tidak lengkap | Bolak-balik klarifikasi |
| Foto produk tersebar di status atau chat | Sulit dicari dan tidak tertata |

## 3. Tujuan & Non-Tujuan

### Tujuan
1. Menampilkan seluruh produk dengan rapi, cepat, dan nyaman di ponsel.
2. Mengubah pengunjung menjadi **pesan WhatsApp yang lengkap** (produk, warna, harga) dengan satu klik.
3. Memudahkan pemilik memperbarui produk **tanpa menulis kode** (cukup edit data).
4. Muncul di pencarian lokal, seperti "toko hijab Tulang Bawang".

### Non-Tujuan (di luar cakupan saat ini)
- Keranjang belanja multi-item dan pembayaran online
- Akun pelanggan dan login
- Manajemen stok real-time dan backend/database server
- Ongkir otomatis

## 4. Target Pengguna

| Persona | Deskripsi | Kebutuhan utama |
|---|---|---|
| **Ibu Rina, 35, pelanggan lokal** | Biasa belanja di pasar, aktif WhatsApp, ponsel Android kelas menengah | Lihat model & warna cepat, pesan tanpa ribet |
| **Nadia, 22, pembeli muda** | Mencari hijab trendi via Instagram/Google | Foto jelas, filter kategori, harga transparan |
| **Siti, pemilik toko** | Tidak teknis, mengelola toko sendiri | Update produk mudah, pesanan masuk terstruktur |

## 5. User Stories

**Pelanggan**
- Sebagai pelanggan, saya ingin **mencari** model hijab dengan kata kunci agar cepat menemukan yang saya mau.
- Sebagai pelanggan, saya ingin **memfilter berdasarkan kategori** agar tidak membuka semua produk.
- Sebagai pelanggan, saya ingin **memilih warna** dan melihat fotonya agar yakin sebelum memesan.
- Sebagai pelanggan, saya ingin **satu tombol pesan** yang membuka WhatsApp dengan pesan terisi agar tidak mengetik ulang.
- Sebagai pelanggan, saya ingin melihat **alamat, jam buka, dan peta** agar bisa datang langsung.

**Pemilik**
- Sebagai pemilik, saya ingin **menambah/ubah produk** lewat satu berkas data agar tidak perlu programmer untuk hal kecil.
- Sebagai pemilik, saya ingin **mengganti nomor WhatsApp** dengan mudah jika nomor berubah.
- Sebagai pemilik, saya ingin **menandai stok habis** agar pelanggan tidak memesan barang kosong.

## 6. Kebutuhan Fungsional

| ID | Kebutuhan | Prioritas | Status |
|---|---|---|---|
| F-01 | Halaman beranda dengan hero, produk unggulan, dan ajakan beraksi | Must | ✅ Ada |
| F-02 | Halaman katalog dengan grid produk | Must | ✅ Ada |
| F-03 | Pencarian produk (nama, kategori) | Must | ✅ Ada |
| F-04 | Filter multi-faset (kategori, dll.) | Must | ✅ Ada |
| F-05 | Pagination katalog | Should | ✅ Ada |
| F-06 | Halaman detail produk via `?slug=` | Must | ✅ Ada |
| F-07 | Galeri gambar dengan pengalih gambar | Must | ✅ Ada |
| F-08 | Pemilih warna (swatch) | Must | ✅ Ada |
| F-09 | Tombol pesan membangun link `wa.me` berisi nama produk, warna, harga | Must | ✅ Ada |
| F-10 | Tombol WhatsApp mengambang di semua halaman | Should | ✅ Ada |
| F-11 | Halaman Tentang & Kontak (alamat, jam buka, peta) | Must | ✅ Ada |
| F-12 | Badge produk (mis. "baru") dan penanda `inStock` | Should | ⚠️ Perlu verifikasi tampilan |
| F-13 | Notifikasi toast untuk umpan balik aksi | Could | ✅ Ada |
| F-14 | Filter lanjutan: rentang harga, warna, bahan | Should | 🔲 Rencana |
| F-15 | Pengurutan (termurah, terbaru) | Should | 🔲 Rencana |
| F-16 | Tombol bagikan produk ke WhatsApp/salin link | Could | 🔲 Rencana |
| F-17 | Testimoni pelanggan | Could | 🔲 Rencana |

## 7. Kebutuhan Non-Fungsional

| Area | Target |
|---|---|
| **Performa** | Lighthouse Performance ≥ 90 di mobile; LCP < 2,5 dtk di jaringan 4G |
| **Gambar** | Format modern (WebP/AVIF), ukuran responsif, lazy-load |
| **Aksesibilitas** | Lighthouse Accessibility ≥ 95; kontras memadai; navigasi keyboard; `alt` pada semua gambar |
| **SEO** | Title/meta/OG unik per halaman, `sitemap.xml`, `robots.txt`, data terstruktur LocalBusiness & Product |
| **Responsif** | Mobile-first, nyaman dari 320 px ke atas |
| **Kompatibilitas** | Dua versi terakhir Chrome, Safari, Firefox, Edge; Android WebView |
| **Keamanan** | Tanpa data sensitif di klien; header keamanan dasar di hosting |
| **Perawatan** | Pembaruan konten cukup lewat `products.json` |

## 8. Alur Utama Pengguna

```text
Beranda ──► Katalog ──► (cari / filter) ──► Detail Produk
                                              │
                                  pilih warna + lihat galeri
                                              │
                                  klik "Pesan via WhatsApp"
                                              │
                         WhatsApp terbuka, pesan sudah terisi
                                              │
                                   Pemilik membalas & closing
```

**Contoh isi pesan otomatis:**

```text
Assalamu'alaikum, saya tertarik memesan:
• Produk: Voal Ultra Fine
• Warna: Dusty Rose
• Harga: Rp 85.000
Apakah masih tersedia?
```

## 9. Model Data

Sumber data: `data/products.json`

| Field | Tipe | Wajib | Catatan |
|---|---|---|---|
| `id` | string | ✅ | Unik, mis. `p001` |
| `slug` | string | ✅ | Unik, huruf kecil + tanda hubung |
| `name` | string | ✅ | Nama tampil |
| `category` | string | ✅ | Mis. `voal`, `pashmina` |
| `price` | number | ✅ | Rupiah, tanpa titik |
| `colors` | string[] | ✅ | Daftar varian warna |
| `material` | string | ✅ | Bahan |
| `description` | string | ✅ | 2-3 kalimat |
| `images` | string[] | ✅ | URL atau aset lokal |
| `badge` | string | ⬜ | Mis. `baru` |
| `inStock` | boolean | ✅ | Stok tersedia atau tidak |

## 10. Metrik Keberhasilan

| Metrik | Cara ukur | Target awal (3 bulan) |
|---|---|---|
| Klik tombol "Pesan via WhatsApp" | Event analytics | Baseline, lalu naik 30% |
| Rasio pengunjung → klik pesan | Analytics | ≥ 5% |
| Kunjungan organik dari pencarian | Search Console | Naik tiap bulan |
| Skor Lighthouse (mobile) | Lighthouse CI | Performance ≥ 90 |
| Waktu pemilik mengubah 1 produk | Uji langsung | < 5 menit |

## 11. Risiko & Mitigasi

| Risiko | Tingkat | Mitigasi |
|---|---|---|
| Pemilik salah mengedit JSON sehingga katalog rusak | Tinggi | Validasi JSON saat build, atau panel admin ringan (Decap CMS) |
| Gambar berat membuat situs lambat di sinyal desa | Tinggi | Kompres otomatis, WebP, lazy-load |
| Nomor WhatsApp tersebar di banyak berkas | Sedang | Pusatkan ke satu konfigurasi |
| Path absolut dan clean URL (`vercel.json`) tidak berfungsi di sub-folder GitHub Pages | Sedang | Atur `base` di Vite, pakai path relatif, tautkan halaman dengan `.html` |
| Tanpa analytics, tidak tahu apa yang berhasil | Sedang | Pasang analytics ringan (privasi-ramah) |

## 12. Roadmap

| Fase | Fokus | Hasil |
|---|---|---|
| **Fase 1: Rapikan fondasi** | Dokumentasi, deploy GitHub Pages, validasi data, aset gambar | Repo siap kerja tim |
| **Fase 2: Performa & SEO** | Optimasi gambar, meta/OG, data terstruktur | Cepat dan mudah ditemukan |
| **Fase 3: Pengalaman belanja** | Filter harga/warna, urutan, bagikan produk | Pelanggan lebih cepat menemukan |
| **Fase 4: Kemudahan pemilik** | CMS ringan atau form update produk | Pemilik mandiri tanpa kode |
| **Fase 5: Pertumbuhan** | Analytics, testimoni, integrasi sosial | Terukur dan terpercaya |

## 13. Pertanyaan Terbuka

1. Berapa jumlah produk saat ini, dan seberapa sering berubah?
2. Apakah foto produk sudah tersedia dalam resolusi baik, atau masih perlu disiapkan?
3. Apakah pemilik ingin panel admin sendiri, atau cukup dibantu developer?
4. Apakah ada domain khusus (mis. `sitijilbab.com`) yang ingin dipasang?
5. Apakah pemilik punya Instagram/TikTok yang perlu ditautkan?
