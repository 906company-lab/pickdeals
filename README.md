# PickDeals — Affiliate Shopee Website

## Struktur File
```
pickdeals/
├── index.html      → Halaman publik (pengunjung HP)
├── admin.html      → Halaman admin (kamu edit produk di sini)
├── products.json   → Data produk
├── api/
│   ├── products.js → API baca produk
│   └── update.js   → API update produk (via GitHub)
├── vercel.json     → Config Vercel
└── README.md
```

## CARA DEPLOY (Step by Step)

### STEP 1 — Buat Akun GitHub
1. Buka https://github.com
2. Klik Sign Up, daftar gratis
3. Verifikasi email

### STEP 2 — Buat Repository GitHub
1. Login GitHub → klik tombol "+" pojok kanan atas → "New repository"
2. Isi nama repo: `pickdeals` (atau nama apapun)
3. Pilih **Public**
4. Klik "Create repository"

### STEP 3 — Upload File ke GitHub
1. Di halaman repo kamu → klik "uploading an existing file"
2. Drag & drop SEMUA FILE dari folder `pickdeals/` ini
   - index.html
   - admin.html
   - products.json
   - vercel.json
3. Untuk folder `api/`, klik "create new file" → ketik `api/products.js` → paste isinya
4. Ulangi untuk `api/update.js`
5. Klik "Commit changes"

### STEP 4 — Buat GitHub Personal Access Token
1. Buka https://github.com/settings/tokens
2. Klik "Generate new token (classic)"
3. Nama token: `pickdeals`
4. Centang scope: **repo** (full control)
5. Klik Generate → COPY tokennya, simpan di notepad!

### STEP 5 — Deploy ke Vercel
1. Buka https://vercel.com → Sign Up dengan GitHub
2. Klik "Add New Project" → pilih repo `pickdeals`
3. Klik "Deploy" (jangan ubah setting apapun)
4. Tunggu ~1 menit → dapat URL gratis!

### STEP 6 — Set Environment Variables di Vercel
Ini yang paling penting! Tanpa ini tombol Publish tidak akan bekerja.

1. Di Vercel → klik project kamu → Settings → Environment Variables
2. Tambahkan 3 variable ini:

| Name | Value |
|------|-------|
| `ADMIN_PASSWORD` | password yang kamu mau (bebas, contoh: `rahasia123`) |
| `GITHUB_TOKEN` | token dari Step 4 |
| `GITHUB_REPO` | `username/pickdeals` (ganti username dengan username GitHub kamu) |

3. Klik Save
4. Pergi ke tab "Deployments" → klik titik tiga → "Redeploy"

### SELESAI! 🎉

- **Website publik:** `https://nama-project.vercel.app`
- **Admin panel:** `https://nama-project.vercel.app/admin.html`

## CARA PAKAI ADMIN PANEL
1. Buka `your-url.vercel.app/admin.html`
2. Masukkan password yang kamu set di ADMIN_PASSWORD
3. Tambah/edit/hapus produk
4. Klik **🚀 Publish Perubahan**
5. Tunggu ~30 detik → website publik langsung update!

## CARA DAPAT LINK SHOPEE AFFILIATE
1. Daftar di https://affiliate.shopee.co.id
2. Cari produk → klik "Dapatkan Link Afiliasi"
3. Copy link pendek `shope.ee/...`
4. Paste di kolom "Link Shopee Affiliate" di admin panel
