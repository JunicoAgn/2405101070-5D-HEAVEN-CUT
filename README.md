# 2405101070-5D-HEAVEN-CUT

## Identitas Mahasiswa

- Nama: Junico Agnesia Perdana Kusuma
- NIM: 240101070
- Kelas: 5D
- Program Studi: Teknik Informatika
- Mata Kuliah: Pemrograman Web Dasar
- Tahun Akademik: 2026

## Deskripsi

Repository ini berisi source code, dokumentasi hasil pengerjaan Ujian Tengah Semester (UTS)
mata kuliah Pemrograman Web Dasar.

## Deskripsi Pengerjaan UTS

Aplikasi yang dibuat adalah **Heaven Cut**, website barbershop berbasis HTML, CSS, dan
JavaScript murni (tanpa framework dan tanpa server). Pelanggan dapat melihat profil
barbershop, daftar layanan dan harga, membuat akun, masuk, lalu memesan jadwal potong
rambut secara online. Admin dapat melihat data reservasi, pesan masuk, dan akun terdaftar
melalui dashboard.

Seluruh data (akun, reservasi, dan pesan) disimpan di `localStorage` browser, sehingga
aplikasi ini bersifat demo dan tidak membutuhkan database. Tampilan dibuat responsif untuk
layar HP, tablet, dan laptop, dengan menu hamburger yang beranimasi halus.

## Fitur yang Diimplementasikan

1. **Beranda responsif**: bagian Tentang, Layanan, Barber, Galeri, dan Kontak dengan
   navbar yang berubah saat halaman di-scroll.
2. **Menu hamburger beranimasi**: ikon tiga garis berubah menjadi tanda X, menu turun
   halus dengan item muncul satu per satu, dan halaman di belakangnya menggelap. Menu
   dapat ditutup lewat tombol hamburger, klik area gelap, tombol Esc, atau klik link.
3. **Halaman Layanan**: daftar layanan lengkap beserta harga dan durasi.
4. **Daftar dan Masuk akun pelanggan**: validasi kata sandi minimal 6 karakter,
   pengecekan email yang sudah terdaftar, dan nama pengguna tampil di navbar setelah masuk.
5. **Booking online**: pilihan layanan, barber, tanggal, dan jam, dengan validasi tanggal
   minimal hari ini dan penolakan jadwal yang bentrok. Pelanggan dapat membatalkan booking.
6. **Form kontak**: pesan pengunjung disimpan beserta waktu pengirimannya.
7. **Dashboard admin**: login admin, statistik jumlah data, tabel reservasi, pesan masuk,
   dan akun pengguna, serta fitur hapus data.
8. **Jam realtime** (zona waktu WIB) di pojok kanan bawah halaman beranda.
9. **Efek gelembung** saat kartu layanan diklik.

## Struktur Folder

- `uts/`: Source code dan file pendukung UTS.
- `uts/screenshots/`: Bukti visual hasil implementasi.

Isi folder `uts/`:

```
uts/
├── index.html              Beranda
├── layanan/
│   └── layanan.html        Daftar layanan dan harga
├── booking/
│   └── booking.html        Form reservasi
├── auth/
│   ├── login.html          Masuk pelanggan
│   └── register.html       Daftar pelanggan
├── admin/
│   ├── login.html          Masuk admin
│   └── dashboard.html      Dashboard admin
├── assets/
│   ├── css/
│   │   └── style.css       Semua gaya dan aturan responsif
│   ├── js/
│   │   ├── script.js       Navbar, hamburger, dan efek kartu
│   │   ├── auth.js         Daftar dan masuk pelanggan
│   │   ├── booking.js      Form dan daftar reservasi
│   │   ├── admin.js        Login dan dashboard admin
│   │   ├── kontak.js       Menyimpan pesan dari form kontak
│   │   └── jam.js          Jam realtime
│   └── images/             Foto barber, interior, dan galeri
└── screenshots/            Bukti visual hasil implementasi
```

## Cara Menjalankan Aplikasi

Aplikasi ini hanya memakai HTML, CSS, dan JavaScript, sehingga cukup dijalankan di browser.

1. Unduh atau clone repository ini.
2. Buka folder `uts/`.
3. Jalankan salah satu cara berikut:
   - Klik dua kali `uts/index.html` agar terbuka di browser, atau
   - Buka folder `uts/` di VS Code, klik kanan `index.html`, lalu pilih
     **Open with Live Server** (ekstensi Live Server).
4. Pastikan komputer terhubung ke internet agar font Google dan gambar latar hero dapat dimuat.

Untuk mencoba halaman admin, buka `uts/admin/login.html` dengan akun demo berikut:

| Kolom    | Nilai      |
| -------- | ---------- |
| Username | `admin`    |
| Password | `admin123` |

Akun pelanggan dibuat sendiri lewat halaman **Daftar** (`uts/auth/register.html`).

Untuk melihat tampilan menu hamburger di layar laptop, jendela browser cukup selebar
1600 px atau kurang. Jika setelah mengubah file tampilan belum berubah, tekan
**Ctrl + Shift + R** untuk menyegarkan cache browser.
