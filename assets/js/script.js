// script.js - dipakai di semua halaman

// tahun otomatis di footer
var tahun = document.getElementById('tahun');
if (tahun) {
  tahun.textContent = new Date().getFullYear();
}

// navbar berubah saat di-scroll (hanya di beranda yang ada hero)
var navbar = document.getElementById('navbar');
var hero = document.getElementById('hero');

if (hero && navbar) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ===== TOMBOL HAMBURGER (HP & TABLET) =====
var hamburger = document.getElementById('hamburger');

if (hamburger && navbar) {

  // lapisan gelap di belakang menu (dibuat otomatis, tidak perlu ditulis di HTML)
  var overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);

  // membuka menu
  var bukaMenu = function () {
    navbar.classList.add('buka');
    overlay.classList.add('tampil');
    document.body.classList.add('menu-terbuka');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Tutup menu');
  };

  // menutup menu
  var tutupMenu = function () {
    navbar.classList.remove('buka');
    overlay.classList.remove('tampil');
    document.body.classList.remove('menu-terbuka');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Buka menu');
  };

  // klik hamburger: buka kalau tertutup, tutup kalau terbuka
  hamburger.addEventListener('click', function () {
    if (navbar.classList.contains('buka')) {
      tutupMenu();
    } else {
      bukaMenu();
    }
  });

  // klik area gelap di luar menu: menu menutup
  overlay.addEventListener('click', tutupMenu);

  // tekan tombol Esc: menu menutup
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      tutupMenu();
    }
  });

  // layar dilebarkan melewati batas hamburger (sama dengan CSS: 1600px):
  // menu otomatis tertutup
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1600) {
      tutupMenu();
    }
  });

  // menu menutup otomatis setelah salah satu link diklik
  var linkMenu = navbar.querySelectorAll('.menu a');
  for (var k = 0; k < linkMenu.length; k++) {
    linkMenu[k].addEventListener('click', tutupMenu);
  }
}

// cek apakah user sudah login
var linkMasuk = document.getElementById('link-masuk');
var user = null;

try {
  user = JSON.parse(localStorage.getItem('userLogin'));
} catch (err) {
  user = null;
}

if (user && linkMasuk) {
  linkMasuk.textContent = 'Keluar (' + user.nama + ')';
  linkMasuk.removeAttribute('href');
  linkMasuk.style.cursor = 'pointer';

  linkMasuk.addEventListener('click', function () {
    localStorage.removeItem('userLogin');
    location.reload();
  });
}

// efek gelembung saat kartu dipencet
var semuaKartu = document.querySelectorAll('.kartu');

for (var i = 0; i < semuaKartu.length; i++) {
  semuaKartu[i].addEventListener('click', buatGelembung);
}

function buatGelembung(e) {
  var kartu = this;
  var kotak = kartu.getBoundingClientRect();

  // posisi klik di dalam kartu
  var x = e.clientX - kotak.left;
  var y = e.clientY - kotak.top;

  // 1. kartu membal
  kartu.classList.remove('pop');
  void kartu.offsetWidth; // supaya animasi bisa diulang
  kartu.classList.add('pop');

  // 2. lingkaran besar
  var besar = document.createElement('span');
  besar.className = 'bubble';
  besar.style.left = x + 'px';
  besar.style.top = y + 'px';
  kartu.appendChild(besar);

  // 3. gelembung kecil naik (5 buah)
  for (var j = 0; j < 5; j++) {
    var kecil = document.createElement('span');
    var ukuran = 6 + Math.random() * 10;
    kecil.className = 'bubble-kecil';
    kecil.style.width = ukuran + 'px';
    kecil.style.height = ukuran + 'px';
    kecil.style.left = (x - 30 + Math.random() * 60) + 'px';
    kecil.style.top = y + 'px';
    kecil.style.animationDelay = (j * 0.05) + 's';
    kartu.appendChild(kecil);

    setTimeout(function (el) {
      el.remove();
    }, 1100, kecil);
  }

  // hapus lingkaran besar setelah selesai
  setTimeout(function () {
    besar.remove();
    kartu.classList.remove('pop');
  }, 700);
}

// ===== ANTRIAN BERDASARKAN BOOKING =====

function hitungAntrian() {

  var semuaBooking = [];

  try {
    semuaBooking = JSON.parse(localStorage.getItem('daftarBooking')) || [];
  } catch (err) {
    semuaBooking = [];
  }

  var tanggalDipilih = document.getElementById('tanggal-antrian');

  var tanggal = (tanggalDipilih && tanggalDipilih.value)
    ? tanggalDipilih.value
    : new Date().toLocaleDateString('en-CA');

  var barber = ['Mupet', 'Wibi', 'Pito'];

  var bookingHariIni = semuaBooking.filter(function (item) {
    return item.tanggal === tanggal;
  });

  barber.forEach(function (nama) {

    var jumlah = bookingHariIni.filter(function (item) {
      return item.barber === nama;
    }).length;

    var elemen = document.getElementById('antrian-' + nama.toLowerCase());

    if (elemen) {
      elemen.textContent = jumlah;
    }
  });

  var total = document.getElementById('totalAntrian');

  if (total) {
    total.textContent = bookingHariIni.length;
  }
}

hitungAntrian();

// kalau ada pilihan tanggal, antrian ikut berubah saat tanggal diganti
var inputTanggal = document.getElementById('tanggal-antrian');

if (inputTanggal) {
  inputTanggal.addEventListener('change', hitungAntrian);
}