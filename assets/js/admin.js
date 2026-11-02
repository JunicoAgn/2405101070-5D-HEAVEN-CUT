// admin.js - login admin dan dashboard

var ADMIN_USER = 'admin';
var ADMIN_PASS = 'admin123';

// ===== LOGIN ADMIN =====
function prosesLoginAdmin(e) {
  e.preventDefault();

  var user = document.getElementById('username').value;
  var pass = document.getElementById('password').value;
  var pesan = document.getElementById('pesan');

  if (user == ADMIN_USER && pass == ADMIN_PASS) {
    sessionStorage.setItem('adminLogin', 'ya');
    location.href = 'dashboard.html';
  } else {
    pesan.textContent = 'Username atau password salah';
    pesan.className = 'pesan error';
  }
}

// ===== CEK LOGIN (dipanggil di dashboard) =====
function cekAdmin() {
  if (sessionStorage.getItem('adminLogin') != 'ya') {
    location.href = 'login.html';
  }
}

function logoutAdmin() {
  sessionStorage.removeItem('adminLogin');
  location.href = 'login.html';
}

// ===== AMBIL DATA =====
function ambilData(nama) {
  var data = localStorage.getItem(nama);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

// ===== BUAT TABEL =====
// idTabel : id elemen tempat tabel
// kolom   : daftar kolom [{judul:'Nama', key:'nama'}, ...]
// data    : array data
// namaData: nama key di localStorage (untuk hapus)
function buatTabel(idTabel, kolom, data, namaData) {
  var tempat = document.getElementById(idTabel);
  tempat.innerHTML = '';

  if (data.length == 0) {
    tempat.textContent = 'Belum ada data.';
    return;
  }

  var tabel = document.createElement('table');
  tabel.className = 'tabel';

  // baris judul
  var thead = document.createElement('tr');
  for (var i = 0; i < kolom.length; i++) {
    var th = document.createElement('th');
    th.textContent = kolom[i].judul;
    thead.appendChild(th);
  }
  var thAksi = document.createElement('th');
  thAksi.textContent = 'Aksi';
  thead.appendChild(thAksi);
  tabel.appendChild(thead);

  // baris data
  for (var j = 0; j < data.length; j++) {
    var tr = document.createElement('tr');

    for (var k = 0; k < kolom.length; k++) {
      var td = document.createElement('td');
      td.textContent = data[j][kolom[k].key];
      tr.appendChild(td);
    }

    // tombol hapus
    var tdAksi = document.createElement('td');
    var tombol = document.createElement('button');
    tombol.textContent = 'Hapus';
    tombol.className = 'btn-batal';
    tombol.setAttribute('data-index', j);
    tombol.setAttribute('data-nama', namaData);
    tombol.addEventListener('click', hapusData);
    tdAksi.appendChild(tombol);
    tr.appendChild(tdAksi);

    tabel.appendChild(tr);
  }

  tempat.appendChild(tabel);
}

// ===== HAPUS DATA =====
function hapusData() {
  if (!confirm('Yakin ingin menghapus data ini?')) {
    return;
  }

  var nama = this.getAttribute('data-nama');
  var index = this.getAttribute('data-index');

  var data = ambilData(nama);
  data.splice(index, 1);
  localStorage.setItem(nama, JSON.stringify(data));

  tampilSemua();
}

// ===== TAMPILKAN SEMUA DATA =====
function tampilSemua() {
  var booking = ambilData('dataBooking');
  var pesan = ambilData('dataPesan');
  var users = ambilData('daftarUser');

  // angka statistik
  document.getElementById('jml-booking').textContent = booking.length;
  document.getElementById('jml-pesan').textContent = pesan.length;
  document.getElementById('jml-user').textContent = users.length;

  buatTabel('tabel-booking', [
    { judul: 'Nama', key: 'nama' },
    { judul: 'Telepon', key: 'telepon' },
    { judul: 'Layanan', key: 'layanan' },
    { judul: 'Barber', key: 'barber' },
    { judul: 'Tanggal', key: 'tanggal' },
    { judul: 'Jam', key: 'jam' }
  ], booking, 'dataBooking');

  buatTabel('tabel-pesan', [
    { judul: 'Nama', key: 'nama' },
    { judul: 'Telepon', key: 'telepon' },
    { judul: 'Pesan', key: 'pesan' },
    { judul: 'Waktu', key: 'waktu' }
  ], pesan, 'dataPesan');

  // password sengaja tidak ditampilkan
  buatTabel('tabel-user', [
    { judul: 'Nama', key: 'nama' },
    { judul: 'Email', key: 'email' }
  ], users, 'daftarUser');
}

// ===== GANTI TAB =====
function bukaTab(namaTab) {
  var semuaTab = document.querySelectorAll('.isi-tab');
  var semuaTombol = document.querySelectorAll('.tombol-tab');

  for (var i = 0; i < semuaTab.length; i++) {
    semuaTab[i].style.display = 'none';
    semuaTombol[i].classList.remove('aktif');
  }

  document.getElementById('tab-' + namaTab).style.display = 'block';
  document.getElementById('btn-' + namaTab).classList.add('aktif');
}
