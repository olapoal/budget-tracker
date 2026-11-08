# 💰 Aplikasi Budget Tracker Pro — Sistem Pengatur Keuangan & Kekayaan Pribadi Tercanggih

Aplikasi modern berbasis web untuk mengelola keuangan pribadi, arus kas, perencanaan anggaran, hingga pemantauan total kekayaan bersih (*Net Worth*) secara real-time dan otomatis.

Aplikasi ini siap dikomersialkan dan dijual sebagai produk digital di **Lynk.id** dengan proteksi **Lock Screen & Sistem Lisensi Email Otomatis**.

---

## 🌟 Fitur-Fitur Tercanggih Aplikasi

1. **Dashboard Arus Kas & Kekayaan Bersih (Executive Financial Summary)**:
   - **Total Net Worth**: Perhitungan otomatis nilai kekayaan bersih (Total Saldo Semua Dompet/Bank/Investasi dikurangi Hutang).
   - **Cashflow Bulanan**: Pemasukan, Pengeluaran, Tabungan Bersih (*Net Savings*), dan *Savings Rate* (%) dalam periode aktif.
   - **Pemilihan Periode Fleksibel**: Bulan Ini, Bulan Lalu, 3 Bulan Terakhir, Tahun Ini, hingga Semua Waktu.

2. **Skor Kesehatan Finansial & AI Advisory (Financial Health Engine)**:
   - Penilaian skor dinamis (0–100) berdasarkan 4 pilar: Rasio Tabungan (*Savings Ratio*), Rasio Hutang terhadap Pemasukan (*Debt-to-Income / DTI*), Dana Darurat (*Emergency Fund*), dan Disiplin Anggaran.
   - Rekomendasi finansial otomatis yang memberikan peringatan jika pengeluaran kebutuhan atau gaya hidup melebihi batas aman.

3. **Aturan Anggaran 50 / 30 / 20 & Budget Amplop (*Envelope Budgeting*)**:
   - **Metode 50/30/20 Otomatis**: Membagi otomatis pendapatan ke dalam 50% Kebutuhan Pokok (*Needs*), 30% Keinginan (*Wants*), dan 20% Tabungan/Investasi (*Savings*).
   - **Budget Amplop per Kategori**: Tetapkan batas maksimal pengeluaran bulanan per pos belanja (Makan, Belanja Pokok, Bensin, Nongkrong, dll.) lengkap dengan indikator warna status aman (hijau), waspada (oranye), dan *over-budget* (merah).

4. **Multi-Rekening & Dompet Digital (*Accounts & Wallets*)**:
   - Mendukung berbagai jenis rekening: Tunai (*Cash*), Bank (BCA, Mandiri, BRI, BNI, Jago, Seabank), E-Wallet (GoPay, OVO, DANA, ShopeePay), dan Investasi (Bibit, Stockbit, Emas).
   - Fitur **Transfer Antar Akun** (memindahkan saldo antar dompet tanpa mengganggu perhitungan riil pendapatan/pengeluaran).

5. **Tagihan Rutin & Langganan (*Recurring Subscriptions*)**:
   - Pencatatan langganan berkala: Netflix, Spotify, WiFi Indihome, Listrik PLN, BPJS Kesehatan, Gym, Cicilan.
   - Penghitung mundur jatuh tempo (*due date countdown*) dan tombol 1-klik **"Bayar"** yang langsung memotong saldo rekening terpilih.

6. **Pencatatan Hutang & Piutang (*Debt & Loan Manager*)**:
   - Tab Hutang Saya (Kewajiban) & Piutang Saya (Orang lain berhutang ke kita).
   - Fitur **Tagih via WhatsApp**: Tombol 1-klik yang otomatis membuka WhatsApp dengan draf pesan tagihan santun berisi rincian pinjaman dan nomor rekening.

7. **Tabungan Impian & Target Goals (*Savings Goals*)**:
   - Tetapkan target Dana Darurat 6 Bulan, DP Rumah, Liburan Jepang, Mobil, Pernikahan, atau Gadget Baru.
   - Visual progress bar pencapaian dan tombol **"Setor Tabungan"** langsung dari rekening terpilih.

8. **Pusat Mutasi Transaksi Cerdas (*Smart Transactions Hub*)**:
   - Shortcut **Quick Add**: 1-klik catat makan siang (Rp 25rb), bensin (Rp 50rb), kopi (Rp 20rb), belanja (Rp 100rb).
   - Pencarian real-time, filter jenis transaksi, filter kategori, dan filter rekening.

9. **Visual Analytics & Chart Interaktif**:
   - Grafik Tren Arus Kas Bulanan (Pemasukan vs Pengeluaran).
   - Donut Chart Komposisi Pengeluaran per Kategori.

10. **Export, Backup & Keamanan Data 100% Privat**:
    - **Export to Excel (.xlsx)**: File spreadsheet multi-sheet (Ringkasan Finansial, Mutasi Transaksi, Saldo Rekening).
    - **Cetak / PDF**: Mode print stylesheet profesional untuk laporan keuangan bulanan.
    - **Backup & Restore JSON**: Cadangkan dan pulihkan data kapan saja tanpa risiko hilang.
    - **Load Demo Data**: 1-klik mengisi contoh data simulasi finansial Indonesia yang realistis.

---

## 🚀 Cara Menjalankan Aplikasi

### Cara 1: Menjalankan Server Lokal (Sangat Direkomendasikan di Windows)
Cukup **klik dua kali (double click)** file:
👉 **[`start.bat`](file:///G:/My%20Drive/Personal/Project/Aplikasi%20Budget%20Tracker/start.bat)**
- Web server lokal PowerShell otomatis aktif di `http://localhost:5505`.
- Browser otomatis terbuka menampilkan aplikasi.

### Cara 2: Buka Langsung di Web Browser (Offline Tanpa Server)
Cukup **klik dua kali** file:
👉 **[`index.html`](file:///G:/My%20Drive/Personal/Project/Aplikasi%20Budget%20Tracker/index.html)**
- Langsung terbuka di Google Chrome atau Microsoft Edge.
- Mode pengujian lokal mengizinkan bypass unlock instan untuk pemilik/developer.

---

## 🔒 Sistem Lisensi Otomatis Lynk.id & Netlify Serverless

Aplikasi web ini dilengkapi sistem **Lock Screen Eksklusif** yang terhubung secara otomatis dengan pembelian di **Lynk.id**.

### 🌟 Alur Pembelian & Buka Akses Otomatis:
1. **Pembeli Checkout di Lynk.id**: Pembeli memasukkan alamat email dan menyelesaikan pembayaran produk di Lynk.id.
2. **Lynk.id Mengirim Notifikasi**:
   - **Pilihan A (Webhook Resmi)**: Lynk.id mengirim HTTP POST ke `https://<nama-aplikasi>.netlify.app/.netlify/functions/lynk-webhook`.
   - **Pilihan B (Auto-Redirect URL)**: Lynk.id mengarahkan pembeli ke URL website:  
     `https://<nama-aplikasi>.netlify.app/?email={buyer_email}` *(Website otomatis auto-fill email & membuka akses tanpa pembeli mengetik apa pun!)*
   - **Pilihan C (Admin Whitelist)**: Anda dapat memasukkan email pembeli secara manual via portal `admin.html`.
3. **Penyimpanan Data**: Data email pembeli disimpan di **Netlify Blobs** (Database cloud bawaan Netlify) atau **Supabase**.
4. **Buka Akses Website**:
   - Pembeli membuka website Anda.
   - Layar terkunci (**Lock Screen**) tampil meminta alamat email pembelian.
   - Pembeli mengetik emailnya, lalu klik **"Buka Akses Aplikasi"**.
   - Netlify Function `verify-email` memvalidasi email pembeli.
   - Setelah terverifikasi, aplikasi terbuka permanen di browser pembeli (`localStorage`) dan navbar menampilkan badge lisensi aktif:  
     `● Lisensi: nama@email.com`

---

## ⚙️ Panduan Konfigurasi di Dashboard Lynk.id

### 1. Pengaturan Produk di Lynk.id
- Toko Produk Lynk.id: **[https://lynk.id/olapoal](https://lynk.id/olapoal)**
- **Format Judul Produk**: Berikan awalan **`[BTR]`**, contoh: **`[BTR] Aplikasi Budget Tracker Pro`**.  
  *(Fungsi: Memastikan script dan webhook hanya memproses pembeli produk Budget Tracker, tidak tercampur dengan produk KPR [KPR] atau produk lainnya di toko Anda).*
- **Pengaturan Redirect URL (Halaman Terima Kasih / Thank You Page)**:
  Arahkan pembeli setelah bayar ke URL website Netlify Anda:
  `https://<nama-aplikasi-anda>.netlify.app/?email={buyer_email}`

### 2. Pengaturan Webhook di Lynk.id (Jika Tersedia)
- URL Webhook: `https://<nama-aplikasi-anda>.netlify.app/.netlify/functions/lynk-webhook`
- Event: `Payment Success` / `Order Paid`

---

## 🛡️ Portal Admin (`admin.html`)

Aplikasi dilengkapi halaman admin khusus untuk mengelola pembeli:
👉 **[`admin.html`](file:///G:/My%20Drive/Personal/Project/Aplikasi%20Budget%20Tracker/admin.html)**

### Fitur Portal Admin:
- **Kunci Rahasia (Default Admin Key)**: `olapoal2026` *(atau atur env variable `ADMIN_SECRET_KEY` di Netlify)*.
- **Lihat Daftar Pembeli**: Memantau daftar email, nama, dan tanggal transaksi pembeli Lynk.id.
- **Tambah Akses Manual (Whitelist)**: Berikan akses instan ke teman, pembeli via transfer manual, atau akun tester.
- **Salin Link Aktivasi Instan**: Menghasilkan tautan `/?email=customer@gmail.com` untuk dikirimkan langsung ke WhatsApp pembeli.
- **Download Rekap CSV**: Unduh database pembeli ke file spreadsheet CSV.

---

## ☁️ Panduan Deploy ke Netlify (100% Gratis)

1. Buat akun di **[Netlify.com](https://www.netlify.com)** (bisa login dengan akun GitHub atau Email).
2. Di dashboard Netlify, pilih **"Add new site"** ➔ **"Deploy manually"**.
3. Drag & drop seluruh folder proyek `Aplikasi Budget Tracker` ini ke area upload Netlify.
4. Website Anda langsung online dalam hitungan detik dengan subdomain gratis (misal: `budget-tracker-pro.netlify.app`).
5. Masuk ke menu **Site Configuration** ➔ **Environment variables**, tambahkan variabel berikut (opsional):
   - `ADMIN_SECRET_KEY` = `olapoal2026` (kunci masuk portal admin)
   - `ADMIN_EMAILS` = `olapoal.artgallery@gmail.com` (email tester yang selalu lolos verifikasi)
   - `SUPABASE_URL` & `SUPABASE_KEY` (jika ingin mencadangkan pembeli ke Supabase database).

---

## 📁 Struktur File Proyek

```text
Aplikasi Budget Tracker/
├── Glossy Wallet Finance Icon.png   # Logo & Icon Aplikasi
├── index.html                       # Aplikasi Utama Budget Tracker Pro & Lock Screen
├── admin.html                       # Portal Administrator Manajemen Pembeli
├── start.bat                        # Launcher Server Lokal Windows
├── server.ps1                       # Script Web Server Lokal PowerShell
├── netlify.toml                     # Konfigurasi Build & Routing Netlify
├── package.json                     # Dependensi Netlify Blobs
├── .gitignore                       # File Pengabaian Git
├── README.md                        # Dokumentasi Lengkap Proyek
└── netlify/
    └── functions/
        ├── verify-email.js          # Endpoint Validasi Email Pembeli Lynk.id
        ├── lynk-webhook.js          # Endpoint Webhook Notifikasi Bayar Lynk.id
        └── admin-buyers.js          # Endpoint CRUD Admin Data Pembeli
```

---

Dibuat dengan dedikasi untuk efisiensi finansial dan pertumbuhan aset pribadi Anda! 🚀
